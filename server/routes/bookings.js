const express = require('express');
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create new booking (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      propertyId,
      fromDate,
      toDate,
      bookingType,
      notes
    } = req.body;

    // Validate required fields
    if (!propertyId || !fromDate || !toDate || !bookingType) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if user profile is complete
    const user = await User.findById(req.userId);
    if (!user.checkProfileComplete()) {
      return res.status(400).json({ 
        message: 'Please complete your profile before making a booking',
        redirectTo: '/profile'
      });
    }

    // Check if property exists and is available
    const property = await Property.findById(propertyId);
    if (!property || property.isDisabled) {
      return res.status(404).json({ message: 'Property not found or not available' });
    }

    // Validate booking type matches property rent types
    if (!property.rentType.includes(bookingType)) {
      return res.status(400).json({ 
        message: `This property does not support ${bookingType} bookings` 
      });
    }

    // Convert dates
    const from = new Date(fromDate);
    const to = new Date(toDate);

    // Check for booking conflicts
    const hasConflict = await Booking.checkConflict(propertyId, from, to);
    if (hasConflict) {
      return res.status(400).json({ 
        message: 'Property is not available for the selected dates' 
      });
    }

    // Calculate total price (simplified calculation)
    let totalPrice = property.price;
    const timeDiff = to.getTime() - from.getTime();
    
    switch (bookingType) {
      case 'hourly':
        const hours = Math.ceil(timeDiff / (1000 * 3600));
        totalPrice = property.price * hours;
        break;
      case 'monthly':
        const months = Math.ceil(timeDiff / (1000 * 3600 * 24 * 30));
        totalPrice = property.price * months;
        break;
      case 'yearly':
        const years = Math.ceil(timeDiff / (1000 * 3600 * 24 * 365));
        totalPrice = property.price * years;
        break;
    }

    // Create booking
    const booking = new Booking({
      userId: req.userId,
      propertyId,
      fromDate: from,
      toDate: to,
      totalPrice,
      bookingType,
      notes
    });

    await booking.save();
    await booking.populate([
      { path: 'propertyId', select: 'title category address image' },
      { path: 'userId', select: 'name email contact' }
    ]);

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
});

// Get user's bookings (protected)
router.get('/my-bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate('propertyId', 'title category address image')
      .sort({ createdAt: -1 });

    // Update status for expired bookings
    for (const booking of bookings) {
      if (booking.updateStatus() === 'expired' && booking.isModified('status')) {
        await booking.save();
      }
    }

    res.json(bookings);
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
});

// Get single booking (protected)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      _id: req.params.id,
      userId: req.userId 
    })
      .populate('propertyId', 'title category address image contact')
      .populate('userId', 'name email contact');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update status if needed
    booking.updateStatus();
    if (booking.isModified('status')) {
      await booking.save();
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error while fetching booking' });
  }
});

// Cancel booking (protected)
router.patch('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      _id: req.params.id,
      userId: req.userId 
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status !== 'active') {
      return res.status(400).json({ message: 'Can only cancel active bookings' });
    }

    // Check if booking can be cancelled (e.g., at least 24 hours before start date)
    const now = new Date();
    const timeDiff = booking.fromDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);

    if (hoursDiff < 24) {
      return res.status(400).json({ 
        message: 'Bookings can only be cancelled at least 24 hours before the start date' 
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error while cancelling booking' });
  }
});

// Check property availability
router.post('/check-availability', async (req, res) => {
  try {
    const { propertyId, fromDate, toDate } = req.body;

    if (!propertyId || !fromDate || !toDate) {
      return res.status(400).json({ message: 'Property ID and date range are required' });
    }

    const hasConflict = await Booking.checkConflict(
      propertyId,
      new Date(fromDate),
      new Date(toDate)
    );

    res.json({ 
      available: !hasConflict,
      message: hasConflict ? 'Property is not available for selected dates' : 'Property is available'
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({ message: 'Server error while checking availability' });
  }
});

module.exports = router;
