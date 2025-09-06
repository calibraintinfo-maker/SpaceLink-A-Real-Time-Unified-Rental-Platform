import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Carousel } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api, handleApiError, formatPrice, getImageUrl } from '../utils/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Real-time API call
      const response = await api.properties.getById(id);
      
      if (response && response.data) {
        setProperty(response.data);
      } else {
        setProperty(null);
      }
    } catch (err) {
      console.error('Error loading property:', err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // Safe array/string handling for rentType
  const getRentTypeDisplay = () => {
    if (!property || !property.rentType) return '';
    return Array.isArray(property.rentType) ? property.rentType.join(', ') : property.rentType;
  };

  // Get first rent type for pricing
  const getFirstRentType = () => {
    if (!property || !property.rentType) return 'rental';
    return Array.isArray(property.rentType) ? property.rentType[0] : property.rentType;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Property Rentals': '🏠',
      'Commercial': '🏢',
      'Land': '🌾',
      'Parking': '🚗',
      'Event': '🎉'
    };
    return icons[category] || '🏠';
  };

  // Loading state
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border" role="status" style={{ color: '#7c3aed' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading property details...</p>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>⚠️ Error Loading Property</Alert.Heading>
          <p>{error}</p>
          <Button 
            onClick={() => navigate('/find-property')} 
            variant="primary"
            style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
          >
            ← Back to Properties
          </Button>
        </Alert>
      </Container>
    );
  }

  // Property not found
  if (!property) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <Alert.Heading>🏠 Property Not Found</Alert.Heading>
          <p>The property you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/find-property')} 
            variant="primary"
            style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
          >
            ← Back to Properties
          </Button>
        </Alert>
      </Container>
    );
  }

  // Main render
  return (
    <>
      {/* Professional Styling */}
      <style>{`
        .property-image {
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .property-badge {
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
        }
        
        .owner-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-right: 1rem;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          color: #374151;
          font-size: 0.95rem;
        }
        
        .feature-icon {
          color: #10b981;
          margin-right: 0.75rem;
          font-size: 1.1rem;
        }
        
        .sticky-booking {
          position: sticky;
          top: 2rem;
        }
        
        @media (max-width: 768px) {
          .sticky-booking {
            position: relative;
            top: auto;
          }
        }
      `}</style>

      <Container className="py-4">
        {/* Back Button */}
        <Row>
          <Col>
            <Button 
              onClick={() => navigate('/find-property')} 
              variant="outline-secondary" 
              className="mb-4"
              style={{ 
                borderRadius: '8px',
                padding: '12px 20px',
                fontWeight: 600
              }}
            >
              ← Back to Properties
            </Button>
          </Col>
        </Row>

        <Row>
          {/* Main Content */}
          <Col lg={8} className="mb-4">
            {/* Property Images */}
            <Card className="mb-4" style={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              {property.images && property.images.length > 0 ? (
                <Carousel 
                  activeIndex={activeIndex} 
                  onSelect={setActiveIndex}
                  interval={null}
                  className="property-image"
                >
                  {property.images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        src={getImageUrl(img)}
                        alt={`${property.title} - Image ${idx + 1}`}
                        className="d-block w-100 property-image"
                        style={{ height: '400px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x400/e2e8f0/64748b?text=Property+Image';
                        }}
                      />
                      <Carousel.Caption 
                        style={{ 
                          background: 'rgba(0,0,0,0.7)', 
                          borderRadius: '8px',
                          bottom: '20px',
                          left: '20px',
                          right: '20px',
                          padding: '12px 16px'
                        }}
                      >
                        <p className="mb-0">Image {idx + 1} of {property.images.length}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : property.image ? (
                <img
                  src={getImageUrl(property.image)}
                  alt={property.title}
                  className="d-block w-100 property-image"
                  style={{ height: '400px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/e2e8f0/64748b?text=Property+Image';
                  }}
                />
              ) : (
                <div 
                  style={{
                    height: '400px',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#6b7280',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
                  <p>No images available</p>
                </div>
              )}
            </Card>

            {/* Property Details */}
            <Card style={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Card.Body className="p-4">
                {/* Badges */}
                <div className="mb-4">
                  <Badge bg="primary" className="me-2 property-badge">
                    {getCategoryIcon(property.category)} {property.category}
                  </Badge>
                  {property.subtype && (
                    <Badge bg="secondary" className="me-2 property-badge">
                      {property.subtype}
                    </Badge>
                  )}
                  {Array.isArray(property.rentType) && property.rentType.map(type => (
                    <Badge key={type} bg="success" className="me-2 property-badge">
                      {type}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <h1 className="mb-4" style={{ color: '#1f2937', fontWeight: 800 }}>
                  {property.title}
                </h1>

                {/* Price & Address */}
                <div className="mb-4">
                  <h3 className="text-success mb-2" style={{ fontWeight: 700 }}>
                    {formatPrice(property.price, getFirstRentType())}
                  </h3>
                  <p className="text-muted d-flex align-items-center" style={{ fontSize: '1.1rem' }}>
                    <span className="me-2">📍</span>
                    {property.address && [
                      property.address.street,
                      property.address.city,
                      property.address.state
                    ].filter(Boolean).join(', ')}
                    {property.address?.pincode && ` - ${property.address.pincode}`}
                  </p>
                </div>

                {/* Property Info Grid */}
                <Row className="mb-4">
                  <Col md={6}>
                    <div className="mb-3">
                      <strong className="text-dark">📐 Size:</strong>
                      <span className="ms-2">{property.size}</span>
                    </div>
                    <div className="mb-3">
                      <strong className="text-dark">🏷️ Category:</strong>
                      <span className="ms-2">{property.category}</span>
                    </div>
                    {property.subtype && (
                      <div className="mb-3">
                        <strong className="text-dark">🏠 Type:</strong>
                        <span className="ms-2">{property.subtype}</span>
                      </div>
                    )}
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong className="text-dark">📞 Contact:</strong>
                      <span className="ms-2">{property.contact}</span>
                    </div>
                    <div className="mb-3">
                      <strong className="text-dark">💰 Rent Types:</strong>
                      <span className="ms-2">{getRentTypeDisplay()}</span>
                    </div>
                    <div className="mb-3">
                      <strong className="text-dark">📅 Listed:</strong>
                      <span className="ms-2">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* Description */}
                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#374151', fontWeight: 700 }}>
                    📝 Description
                  </h5>
                  <p 
                    className="text-muted" 
                    style={{ 
                      whiteSpace: 'pre-line',
                      lineHeight: '1.6',
                      fontSize: '1rem'
                    }}
                  >
                    {property.description}
                  </p>
                </div>

                {/* Owner Information */}
                {property.ownerId && (
                  <div className="border-top pt-4">
                    <h5 className="mb-3" style={{ color: '#374151', fontWeight: 700 }}>
                      👤 Property Owner
                    </h5>
                    <div className="d-flex align-items-start">
                      <div className="owner-avatar">
                        {property.ownerId.name?.charAt(0)?.toUpperCase() || 'O'}
                      </div>
                      <div>
                        <h6 className="mb-1" style={{ fontWeight: 600 }}>
                          {property.ownerId.name}
                        </h6>
                        <p className="text-muted mb-1">
                          📧 {property.ownerId.email}
                        </p>
                        {property.ownerId.contact && (
                          <p className="text-muted mb-0">
                            📞 {property.ownerId.contact}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Booking Card */}
            <Card className="sticky-booking mb-4" style={{ 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '12px'
            }}>
              <Card.Header 
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  color: 'white',
                  borderRadius: '12px 12px 0 0',
                  padding: '1.5rem'
                }}
              >
                <h5 className="mb-0 d-flex align-items-center">
                  <span className="me-2">📋</span>
                  Book This Property
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                {/* Price Display */}
                <div className="text-center mb-4">
                  <h3 className="text-success mb-2" style={{ fontWeight: 700 }}>
                    {formatPrice(property.price, getFirstRentType())}
                  </h3>
                  <p className="text-muted mb-0">
                    Available for {getRentTypeDisplay()} rental
                  </p>
                </div>

                {/* Book Button */}
                <Button 
                  as={Link}
                  to={`/book/${property._id}`}
                  variant="success"
                  size="lg"
                  className="w-100 mb-3"
                  style={{
                    fontWeight: 600,
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: '#10b981',
                    borderColor: '#10b981'
                  }}
                >
                  📅 Book Now
                </Button>

                <div className="text-center mb-4">
                  <small className="text-muted">
                    💳 Payment: On Spot Only
                  </small>
                </div>

                {/* Features */}
                <div className="border-top pt-3">
                  <h6 className="mb-3" style={{ fontWeight: 600 }}>
                    ✨ Property Features
                  </h6>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{property.category} Space</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{property.size} Area</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{getRentTypeDisplay().replace(/,/g, '/')} Rental</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>Direct Owner Contact</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>Verified Listing</span>
                  </div>
                </div>

                <div className="text-center mt-4 pt-3 border-top">
                  <small className="text-muted">
                    ⚠️ Complete your profile before booking
                  </small>
                </div>
              </Card.Body>
            </Card>

            {/* Contact Card */}
            <Card style={{ 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '12px'
            }}>
              <Card.Header style={{ 
                backgroundColor: '#f8fafc',
                borderRadius: '12px 12px 0 0',
                padding: '1rem 1.5rem'
              }}>
                <h6 className="mb-0" style={{ fontWeight: 600 }}>
                  📞 Contact Information
                </h6>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="mb-3">
                  <strong className="text-dark">Property Contact:</strong>
                  <p className="mb-0 mt-1">{property.contact}</p>
                </div>
                {property.ownerId && (
                  <div>
                    <strong className="text-dark">Owner:</strong>
                    <p className="mb-1 mt-1">{property.ownerId.name}</p>
                    <p className="mb-0 text-muted">{property.ownerId.email}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PropertyDetails;
