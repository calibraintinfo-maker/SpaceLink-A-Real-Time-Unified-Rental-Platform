import axios from 'axios';

// Base URL for API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://spacelink-a-real-time-unified-rental.onrender.com';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

// API endpoints
export const api = {
  // Auth endpoints
  auth: {
    login: (data) => axios.post('/api/auth/login', data),
    register: (data) => axios.post('/api/auth/register', data),
    verify: () => axios.get('/api/auth/verify'),
  },
  
  // User endpoints
  user: {
    getProfile: () => axios.get('/api/users/profile'),
    updateProfile: (data) => axios.put('/api/users/profile', data),
    checkProfileComplete: () => axios.get('/api/users/profile/check-complete'),
  },
  
  // Property endpoints
  properties: {
    getAll: (params) => axios.get('/api/properties', { params }),
    getFeatured: () => axios.get('/api/properties/featured'),
    getById: (id) => axios.get(`/api/properties/${id}`),
    create: (data) => axios.post('/api/properties', data),
    update: (id, data) => axios.put(`/api/properties/${id}`, data),
    disable: (id) => axios.patch(`/api/properties/${id}/disable`),
    enable: (id) => axios.patch(`/api/properties/${id}/enable`),
    getUserProperties: () => axios.get('/api/properties/user/my-properties'),
    getPropertyBookings: (id) => axios.get(`/api/properties/${id}/bookings`),
  },
  
  // Booking endpoints
  bookings: {
    create: (data) => axios.post('/api/bookings', data),
    getUserBookings: () => axios.get('/api/bookings/my-bookings'),
    getById: (id) => axios.get(`/api/bookings/${id}`),
    cancel: (id) => axios.patch(`/api/bookings/${id}/cancel`),
    checkAvailability: (data) => axios.post('/api/bookings/check-availability', data),
  },
};

// Utility functions
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatPrice = (price, type = 'monthly') => {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
  
  return `${formatted}/${type}`;
};

export const getImageUrl = (imageData) => {
  if (!imageData) return '/placeholder-image.jpg';
  
  // If it's already a URL, return as is
  if (imageData.startsWith('http')) return imageData;
  
  // If it's base64 data, return as data URL
  if (imageData.startsWith('data:')) return imageData;
  
  // Otherwise, assume it's base64 without prefix
  return `data:image/jpeg;base64,${imageData}`;
};

export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const categories = {
  'Property Rentals': {
    subtypes: ['Apartments', 'Flats', 'Houses', 'Villas'],
    rentTypes: ['monthly', 'yearly']
  },
  'Commercial': {
    subtypes: ['Offices', 'Shops', 'Warehouses', 'Showrooms'],
    rentTypes: ['monthly', 'yearly']
  },
  'Land': {
    subtypes: ['Agricultural Land', 'Commercial Plot', 'Residential Plot'],
    rentTypes: ['yearly']
  },
  'Parking': {
    subtypes: ['Car Parking', 'Bike Parking', 'Garage'],
    rentTypes: ['monthly']
  },
  'Event': {
    subtypes: ['Banquet Halls', 'Gardens', 'Meeting Rooms', 'Conference Halls'],
    rentTypes: ['hourly']
  }
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.';
  } else {
    // Other error
    return 'An unexpected error occurred';
  }
};
