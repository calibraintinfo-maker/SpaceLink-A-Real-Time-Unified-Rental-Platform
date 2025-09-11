import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { api, formatPrice, getImageUrl, handleApiError } from '../utils/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.properties.getById(id);
      setProperty(response.data || response);
    } catch (err) {
      setError('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" style={{ color: '#7c3aed' }} />
        <p className="mt-3">Loading property details...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <Container className="py-4">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error || 'Property not found'}</p>
          <Button onClick={() => navigate('/find-property')} variant="primary">
            Back to Properties
          </Button>
        </Alert>
      </Container>
    );
  }

  const images = property.images || (property.image ? [property.image] : []);
  const currentImage = images[imageIndex] || '';

  return (
    <>
      <div className="property-details-page">
        <Container fluid className="property-container">
          
          {/* ✅ FIXED: Back Button */}
          <div className="back-button-container">
            <Button
              variant="outline-primary"
              onClick={() => navigate('/find-property')}
              className="back-button"
            >
              ← Back to Properties
            </Button>
          </div>

          {/* ✅ FIXED: Two Column Layout */}
          <div className="property-layout">
            
            {/* Left Column - Main Content */}
            <div className="main-content">
              
              {/* Image Gallery */}
              <Card className="image-card">
                <div className="image-container">
                  <img
                    src={getImageUrl(currentImage)}
                    alt={property.title || 'Property'}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/800x300/f1f5f9/64748b?text=Property+Image'; }}
                    className="property-image"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button className="nav-button nav-prev" onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)}>
                        ‹
                      </button>
                      <button className="nav-button nav-next" onClick={() => setImageIndex((imageIndex + 1) % images.length)}>
                        ›
                      </button>
                      <div className="image-indicator">
                        {imageIndex + 1} of {images.length}
                      </div>
                    </>
                  )}
                </div>
              </Card>

              {/* Property Tags */}
              <div className="property-tags">
                <Badge bg="primary" className="property-tag">🏷️ {property.category || 'Land'}</Badge>
                <Badge bg="secondary" className="property-tag">📐 {property.subtype || 'Agricultural Land'}</Badge>
                <Badge bg="info" className="property-tag">🕒 {Array.isArray(property.rentType) ? property.rentType.join(', ') : (property.rentType || 'yearly')}</Badge>
              </div>

              {/* Title and Location */}
              <div className="property-header">
                <h1 className="property-title">{property.title || 'Premium Property'}</h1>
                <div className="property-location">
                  <span className="location-icon">📍</span>
                  <span>{property.address?.city || 'namakkal'}, {property.address?.state || 'Tamil nadu'} - {property.address?.zipCode || '123456'}</span>
                </div>
                <div className="property-price">
                  {formatPrice(property.price, Array.isArray(property.rentType) ? property.rentType[0] : property.rentType)}
                </div>
                <p className="price-subtitle">Available for {Array.isArray(property.rentType) ? property.rentType.join(', ') : (property.rentType || 'yearly')} rental</p>
              </div>

              {/* Property Information */}
              <Card className="info-card">
                <Card.Body>
                  <h3 className="section-title">📊 Property Information</h3>
                  <Row className="info-grid">
                    <Col md={6} className="info-item">
                      <div className="info-label">📐 SIZE</div>
                      <div className="info-value">{property.size || '10000'} sq ft</div>
                    </Col>
                    <Col md={6} className="info-item">
                      <div className="info-label">📞 CONTACT</div>
                      <div className="info-value">{property.contact || '9087654321'}</div>
                    </Col>
                    <Col md={6} className="info-item">
                      <div className="info-label">🏷️ CATEGORY</div>
                      <div className="info-value">{property.category || 'Land'}</div>
                    </Col>
                    <Col md={6} className="info-item">
                      <div className="info-label">🔧 TYPE</div>
                      <div className="info-value">{property.subtype || 'Agricultural Land'}</div>
                    </Col>
                    <Col md={6} className="info-item">
                      <div className="info-label">🕒 RENT TYPES</div>
                      <div className="info-value">{Array.isArray(property.rentType) ? property.rentType.join(', ') : (property.rentType || 'yearly')}</div>
                    </Col>
                    <Col md={6} className="info-item">
                      <div className="info-label">📅 ADDED</div>
                      <div className="info-value">August 12, 2025</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Description */}
              <Card className="description-card">
                <Card.Body>
                  <h3 className="section-title">📝 Description</h3>
                  <p className="description-text">
                    {property.description || 'This is a prime agricultural land located in a strategic location, perfect for farming and cultivation. The property offers excellent accessibility and is ideal for various agricultural activities.'}
                  </p>
                </Card.Body>
              </Card>

              {/* Property Owner */}
              <Card className="owner-card">
                <Card.Body>
                  <h3 className="section-title">👤 Property Owner</h3>
                  <div className="owner-info">
                    <div className="owner-avatar">
                      {(property.owner?.name || 'BHARANEEDHARAN K').charAt(0)}
                    </div>
                    <div className="owner-details">
                      <h4 className="owner-name">{property.owner?.name || 'BHARANEEDHARAN K'}</h4>
                      <div className="owner-contact">
                        <span className="contact-icon">✉️</span>
                        <span>{property.owner?.email || 'bharaneedharan.cb22@bitsathy.ac.in'}</span>
                      </div>
                      <div className="owner-contact">
                        <span className="contact-icon">📞</span>
                        <span>{property.owner?.phone || property.contact || '9087654321'}</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* ✅ FIXED: Right Sidebar */}
            <div className="sidebar">
              
              {/* Booking Card */}
              <Card className="booking-card">
                <Card.Body>
                  <h4 className="booking-title">📅 Book This Property</h4>
                  <div className="booking-price">
                    {formatPrice(property.price, Array.isArray(property.rentType) ? property.rentType[0] : property.rentType)}
                  </div>
                  <p className="booking-subtitle">Available for {Array.isArray(property.rentType) ? property.rentType.join(', ') : (property.rentType || 'yearly')} rental</p>
                  <Button className="book-button" size="lg">
                    📅 Book Now
                  </Button>
                  <div className="payment-info">
                    <span>💳</span>
                    <span>Payment: On Spot Only</span>
                  </div>
                </Card.Body>
              </Card>

              {/* Property Features */}
              <Card className="features-card">
                <Card.Body>
                  <h4 className="features-title">✨ Property Features</h4>
                  <div className="features-list">
                    <div className="feature-item">
                      <span className="feature-icon">🌾</span>
                      <span className="feature-text">Land Space</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">📐</span>
                      <span className="feature-text">{property.size || '10000'} Area</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🕒</span>
                      <span className="feature-text">{Array.isArray(property.rentType) ? property.rentType.join(', ') : (property.rentType || 'yearly')} Rental</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">📞</span>
                      <span className="feature-text">Direct Owner Contact</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Warning Alert */}
              <Alert variant="warning" className="profile-alert">
                ⚠️ Complete your profile before booking
              </Alert>
            </div>
          </div>
        </Container>
      </div>

      {/* ✅ PROFESSIONAL: CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        .property-details-page {
          background-color: #f8fafc;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }
        
        .property-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          color: #64748b;
        }
        
        /* ✅ FIXED: Back Button */
        .back-button-container {
          margin-bottom: 2rem;
        }
        
        .back-button {
          background: white;
          border: 2px solid #7c3aed;
          border-radius: 12px;
          padding: 10px 20px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #7c3aed;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.1);
          transition: all 0.2s ease;
        }
        
        .back-button:hover {
          background: #7c3aed;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
        }
        
        /* ✅ FIXED: Two Column Layout */
        .property-layout {
          display: grid;
          grid-template-columns: 2fr 400px;
          gap: 2rem;
          align-items: start;
        }
        
        .main-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .sidebar {
          position: sticky;
          top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        /* ✅ FIXED: Card Styling */
        .image-card,
        .info-card,
        .description-card,
        .owner-card,
        .booking-card,
        .features-card {
          border: none;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .image-container {
          position: relative;
          height: 300px;
          background: #f1f5f9;
        }
        
        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        .nav-prev { left: 10px; }
        .nav-next { right: 10px; }
        
        .image-indicator {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 0.8rem;
        }
        
        /* Property Tags */
        .property-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .property-tag {
          font-size: 0.75rem;
          padding: 6px 12px;
          border-radius: 16px;
          font-weight: 500;
        }
        
        /* Property Header */
        .property-header {
          margin-bottom: 0;
        }
        
        .property-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        
        .property-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        
        .location-icon {
          color: #7c3aed;
          font-size: 1rem;
        }
        
        .property-price {
          font-size: 1.6rem;
          font-weight: 700;
          color: #059669;
          margin-bottom: 4px;
        }
        
        .price-subtitle {
          color: #6b7280;
          font-size: 0.85rem;
          font-weight: 500;
          margin: 0;
        }
        
        /* Section Titles */
        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        /* Info Grid */
        .info-grid {
          gap: 1rem;
        }
        
        .info-item {
          margin-bottom: 1rem;
        }
        
        .info-label {
          font-size: 0.8rem;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .info-value {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
        }
        
        /* Description */
        .description-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #374151;
          margin: 0;
        }
        
        /* Owner Info */
        .owner-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .owner-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .owner-name {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 2px;
        }
        
        .owner-contact {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 2px;
        }
        
        .contact-icon {
          color: #7c3aed;
          font-size: 0.8rem;
        }
        
        /* ✅ FIXED: Sidebar Cards */
        .booking-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        }
        
        .booking-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 1rem;
        }
        
        .booking-price {
          font-size: 1.4rem;
          font-weight: 700;
          color: #059669;
          margin-bottom: 4px;
        }
        
        .booking-subtitle {
          color: #6b7280;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        
        .book-button {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          border: none;
          border-radius: 12px;
          font-weight: 600;
          width: 100%;
          margin-bottom: 1rem;
        }
        
        .payment-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #6b7280;
          font-size: 0.8rem;
        }
        
        .features-title {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 1rem;
        }
        
        .features-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .feature-icon {
          font-size: 1rem;
        }
        
        .feature-text {
          font-size: 0.85rem;
          color: #374151;
          font-weight: 500;
        }
        
        .profile-alert {
          font-size: 0.8rem;
          padding: 0.75rem;
          border-radius: 8px;
          margin: 0;
        }
        
        /* ✅ FIXED: Responsive Design */
        @media (max-width: 1024px) {
          .property-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .sidebar {
            position: relative;
            top: auto;
            order: -1;
          }
          
          .property-container {
            padding: 1rem;
          }
        }
        
        @media (max-width: 768px) {
          .property-title {
            font-size: 1.5rem;
          }
          
          .property-price {
            font-size: 1.4rem;
          }
          
          .back-button {
            width: 100%;
            text-align: center;
          }
          
          .info-grid .info-item {
            margin-bottom: 0.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default PropertyDetails;
