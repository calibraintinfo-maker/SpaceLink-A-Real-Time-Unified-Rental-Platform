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

  // ✅ FIXED: Handles nested API response structures
  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔍 Fetching property ID:', id);
      const response = await api.properties.getById(id);
      
      console.log('📡 Property Response:', response);
      console.log('📊 Property Data:', response.data);
      
      // ✅ ROBUST: Extract property from nested response
      let propertyData = null;
      
      if (response?.data?.property) {
        propertyData = response.data.property;
      } else if (response?.data) {
        propertyData = response.data;
      } else if (response) {
        propertyData = response;
      }
      
      console.log('🏠 Final Property Data:', propertyData);
      
      if (propertyData && propertyData._id) {
        setProperty(propertyData);
        console.log('✅ Property loaded successfully');
      } else {
        setProperty(null);
        console.log('❌ No valid property data found');
      }
    } catch (err) {
      console.error('❌ Property Fetch Error:', err);
      console.error('❌ Error Response:', err.response);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const getRentTypeDisplay = () => {
    if (!property?.rentType) return '';
    return Array.isArray(property.rentType) ? property.rentType.join(', ') : property.rentType;
  };

  const getFirstRentType = () => {
    if (!property?.rentType) return 'rental';
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

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" style={{ color: '#7c3aed' }} />
        <p className="mt-3">Loading property details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>⚠️ Error Loading Property</Alert.Heading>
          <p>{error}</p>
          <Button 
            onClick={() => navigate('/find-property')} 
            variant="primary"
          >
            ← Back to Properties
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <Alert.Heading>🏠 Property Not Found</Alert.Heading>
          <p>The property you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/find-property')} 
            variant="primary"
          >
            ← Back to Properties
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Back Button */}
      <Row>
        <Col>
          <Button 
            onClick={() => navigate('/find-property')} 
            variant="outline-secondary" 
            className="mb-4"
          >
            ← Back to Properties
          </Button>
        </Col>
      </Row>

      <Row>
        {/* Main Content */}
        <Col lg={8} className="mb-4">
          {/* Property Images */}
          <Card className="mb-4">
            {property.images && property.images.length > 0 ? (
              <Carousel 
                activeIndex={activeIndex} 
                onSelect={setActiveIndex}
                interval={null}
              >
                {property.images.map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      src={getImageUrl(img)}
                      alt={`${property.title} - Image ${idx + 1}`}
                      className="d-block w-100"
                      style={{ height: '400px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x400?text=Property+Image';
                      }}
                    />
                    <Carousel.Caption style={{ 
                      background: 'rgba(0,0,0,0.7)', 
                      borderRadius: '8px',
                      bottom: '20px',
                      left: '20px',
                      right: '20px'
                    }}>
                      <p className="mb-0">Image {idx + 1} of {property.images.length}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : property.image ? (
              <img
                src={getImageUrl(property.image)}
                alt={property.title}
                className="d-block w-100"
                style={{ height: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Property+Image';
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
                  color: '#6b7280'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
                <p>No images available</p>
              </div>
            )}
          </Card>

          {/* Property Details */}
          <Card>
            <Card.Body>
              {/* Badges */}
              <div className="mb-3">
                <Badge bg="primary" className="me-2">
                  {getCategoryIcon(property.category)} {property.category}
                </Badge>
                {property.subtype && (
                  <Badge bg="secondary" className="me-2">
                    {property.subtype}
                  </Badge>
                )}
                {property.rentType && Array.isArray(property.rentType) && 
                  property.rentType.map(type => (
                    <Badge key={type} bg="info" className="me-1">
                      {type}
                    </Badge>
                  ))
                }
              </div>

              {/* Title */}
              <h1 className="mb-3">{property.title}</h1>

              {/* Price & Address */}
              <div className="mb-4">
                <h4 className="text-success mb-2">
                  {formatPrice(property.price, getFirstRentType())}
                </h4>
                <p className="text-muted mb-0">
                  📍 {property.address?.street && `${property.address.street}, `}
                  {property.address?.city}, {property.address?.state}
                  {property.address?.pincode && ` - ${property.address.pincode}`}
                </p>
              </div>

              {/* Property Info Grid */}
              <Row className="mb-4">
                <Col md={6}>
                  <div className="d-flex align-items-center mb-2">
                    <strong className="me-2">📐 Size:</strong>
                    <span>{property.size}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <strong className="me-2">🏷️ Category:</strong>
                    <span>{property.category}</span>
                  </div>
                  {property.subtype && (
                    <div className="d-flex align-items-center mb-2">
                      <strong className="me-2">🏷️ Type:</strong>
                      <span>{property.subtype}</span>
                    </div>
                  )}
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center mb-2">
                    <strong className="me-2">📞 Contact:</strong>
                    <span>{property.contact}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <strong className="me-2">💰 Rent Types:</strong>
                    <span>{getRentTypeDisplay()}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <strong className="me-2">📅 Added:</strong>
                    <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                </Col>
              </Row>

              {/* Description */}
              <div className="mb-4">
                <h5 className="mb-3">📝 Description</h5>
                <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>
                  {property.description}
                </p>
              </div>

              {/* Owner Information */}
              {property.ownerId && (
                <div className="border-top pt-4">
                  <h5 className="mb-3">👤 Property Owner</h5>
                  <div className="d-flex align-items-center">
                    <div 
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        marginRight: '1rem'
                      }}
                    >
                      {property.ownerId.name?.charAt(0)?.toUpperCase() || 'O'}
                    </div>
                    <div>
                      <h6 className="mb-1">{property.ownerId.name}</h6>
                      <p className="text-muted mb-0">📧 {property.ownerId.email}</p>
                      {property.ownerId.contact && (
                        <p className="text-muted mb-0">📞 {property.ownerId.contact}</p>
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
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">📋 Book This Property</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <h3 className="text-success mb-2">
                  {formatPrice(property.price, getFirstRentType())}
                </h3>
                <p className="text-muted mb-0">
                  Available for {getRentTypeDisplay()} rental
                </p>
              </div>
              
              <div className="d-grid gap-3">
                <Button 
                  as={Link} 
                  to={`/book/${property._id}`}
                  variant="success" 
                  size="lg"
                >
                  📅 Book Now
                </Button>
                
                <div className="text-center">
                  <small className="text-muted">💳 Payment: On Spot Only</small>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top">
                <h6 className="mb-3">✨ Property Features</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">✓ {property.category} Space</li>
                  <li className="mb-2">✓ {property.size} Area</li>
                  <li className="mb-2">✓ {getRentTypeDisplay().replace(/,/g, '/')} Rental</li>
                  <li className="mb-2">✓ Direct Owner Contact</li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-top text-center">
                <small className="text-muted">⚠️ Complete your profile before booking</small>
              </div>
            </Card.Body>
          </Card>

          {/* Contact Card */}
          <Card className="mt-4">
            <Card.Header>
              <h6 className="mb-0">📞 Contact Information</h6>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Property Contact:</strong>
                <p className="mb-0">{property.contact}</p>
              </div>
              {property.ownerId && (
                <div>
                  <strong>Owner:</strong>
                  <p className="mb-1">{property.ownerId.name}</p>
                  <p className="mb-0 text-muted">{property.ownerId.email}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetails;
