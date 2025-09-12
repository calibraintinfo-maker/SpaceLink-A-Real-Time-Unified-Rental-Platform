import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ property, viewMode = 'grid', showOwner = false }) => {
  const navigate = useNavigate();

  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x240/e2e8f0/64748b?text=Property+Image';
  };

  const renderPropertyDetails = () => {
    if (!property) return [];
    
    const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
          {property.size}
        </Badge>
      );
    }

    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="info" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
          {property.capacity}
        </Badge>
      );
    }

    return details;
  };

  const getSafeRentType = () => {
    if (!property?.rentType) return 'rental';
    return Array.isArray(property.rentType) ? property.rentType[0] : property.rentType;
  };

  const getSafeRentTypes = () => {
    if (!property?.rentType) return ['rental'];
    return Array.isArray(property.rentType) ? property.rentType : [property.rentType];
  };

  const handleViewDetails = () => {
    navigate(`/property/${property._id}`);
  };

  const handleBookNow = () => {
    navigate(`/book/${property._id}`);
  };

  if (viewMode === 'list') {
    // ✅ PROFESSIONAL LIST VIEW
    return (
      <Card className="border-0 shadow-sm" style={{ 
        borderRadius: '20px', 
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        minHeight: '240px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(124, 58, 237, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      }}>
        <Row className="g-0 align-items-center">
          <Col md={4}>
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
              <img
                src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
                alt={property.title || 'Property'}
                onError={handleImageError}
                loading="lazy"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '20px 0 0 20px'
                }}
              />
              <div className="position-absolute top-0 start-0 p-3">
                <Badge bg="success" className="me-2 fw-semibold shadow-sm" style={{
                  borderRadius: '20px',
                  padding: '8px 14px',
                  fontSize: '0.75rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em'
                }}>
                  Available
                </Badge>
                <Badge bg="primary" className="fw-semibold shadow-sm" style={{
                  borderRadius: '20px',
                  padding: '8px 14px',
                  fontSize: '0.75rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em'
                }}>
                  Verified
                </Badge>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <Card.Body className="p-4" style={{ minHeight: '240px', display: 'flex', flexDirection: 'column' }}>
              <div className="d-flex align-items-center mb-3">
                <span className="me-2" style={{ color: '#7c3aed', fontSize: '1.1rem' }}>📍</span>
                <span style={{
                  fontSize: '0.9rem',
                  color: '#64748b',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {property.address?.city || 'City'}, {property.address?.state || 'State'}
                </span>
              </div>
              
              {/* PROFESSIONAL Enhanced card title */}
              <Card.Title style={{
                color: '#111827', // PROFESSIONAL: Darker for better contrast
                fontSize: '1.5rem',
                lineHeight: '1.3',
                fontWeight: '800',
                marginBottom: '12px',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.015em'
              }}>
                {property.title || 'Property Title'}
              </Card.Title>
              
              {/* PROFESSIONAL Enhanced description */}
              <p className="mb-3" style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                flexGrow: 1,
                color: '#374151', // PROFESSIONAL: Better contrast
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: '400'
              }}>
                {property.description ? 
                  property.description.substring(0, 140) + '...' : 
                  'Premium property with modern amenities and excellent location.'
                }
              </p>
              
              <div className="mb-3">
                <div className="d-flex flex-wrap gap-2">
                  {renderPropertyDetails()}
                </div>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mt-auto">
                <div>
                  <div style={{
                    fontSize: '1.6rem',
                    fontWeight: '800',
                    color: '#059669',
                    marginBottom: '4px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '-0.01em'
                  }}>
                    ₹{formatPrice(property.price) || '1,234'}/month
                  </div>
                  <small style={{
                    color: '#64748b',
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Available for {getSafeRentTypes().join(', ') || 'rental'}
                  </small>
                </div>
                
                <div className="d-flex gap-3">
                  <Button 
                    variant="outline-primary" 
                    style={{
                      borderRadius: '12px',
                      padding: '12px 20px',
                      borderWidth: '2px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      borderColor: '#7c3aed',
                      color: '#7c3aed',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                    onClick={handleViewDetails}
                  >
                    View Details
                  </Button>
                  <Button 
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 20px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }

  // ✅ PROFESSIONAL GRID VIEW (Default)
  return (
    <Card className="h-100 border-0 shadow-sm" style={{ 
      borderRadius: '20px', 
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 30px rgba(124, 58, 237, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }}>
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
          alt={property.title || 'Property'}
          onError={handleImageError}
          loading="lazy"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            borderRadius: '20px 20px 0 0'
          }}
        />
        <div className="position-absolute top-0 start-0 p-3">
          <Badge bg="success" className="me-2 fw-semibold shadow-sm" style={{
            borderRadius: '20px',
            padding: '8px 14px',
            fontSize: '0.75rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.025em'
          }}>
            Available
          </Badge>
          <Badge bg="primary" className="fw-semibold shadow-sm" style={{
            borderRadius: '20px',
            padding: '8px 14px',
            fontSize: '0.75rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.025em'
          }}>
            Verified
          </Badge>
        </div>
      </div>
      
      <Card.Body className="p-4 d-flex flex-column">
        <div className="d-flex align-items-center mb-2">
          <span className="me-2" style={{ color: '#7c3aed', fontSize: '1.1rem' }}>📍</span>
          <span style={{
            fontSize: '0.9rem',
            color: '#64748b',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {property.address?.city || 'City'}, {property.address?.state || 'State'}
          </span>
        </div>
        
        {/* PROFESSIONAL Enhanced card title */}
        <Card.Title style={{
          color: '#111827', // PROFESSIONAL: Darker for better contrast
          fontSize: '1.3rem',
          lineHeight: '1.3',
          fontWeight: '700',
          marginBottom: '12px',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.015em'
        }}>
          {property.title || 'Property Title'}
        </Card.Title>
        
        {/* PROFESSIONAL Enhanced description */}
        <Card.Text className="mb-3" style={{
          fontSize: '0.9rem',
          lineHeight: '1.6',
          flexGrow: 1,
          color: '#374151', // PROFESSIONAL: Better contrast
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: '400'
        }}>
          {property.description ? 
            property.description.substring(0, 100) + '...' : 
            'Premium property with modern amenities and excellent location.'
          }
        </Card.Text>
        
        <div className="mb-3">
          <div className="d-flex flex-wrap gap-2">
            {renderPropertyDetails()}
          </div>
        </div>
        
        <div className="mt-auto">
          <div style={{
            fontSize: '1.4rem',
            fontWeight: '800',
            color: '#059669',
            marginBottom: '4px',
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '-0.01em'
          }}>
            ₹{formatPrice(property.price) || '1,234'}/month
          </div>
          <small style={{
            color: '#64748b',
            fontSize: '0.8rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Available for {getSafeRentTypes().join(', ') || 'rental'}
          </small>
          
          <div className="d-flex gap-2 mt-3">
            <Button 
              variant="outline-primary" 
              className="flex-fill"
              style={{
                borderRadius: '12px',
                padding: '12px 16px',
                borderWidth: '2px',
                fontWeight: '700',
                fontSize: '0.8rem',
                borderColor: '#7c3aed',
                color: '#7c3aed',
                fontFamily: 'Inter, system-ui, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onClick={handleViewDetails}
            >
              View Details
            </Button>
            <Button 
              className="flex-fill"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 16px',
                fontWeight: '700',
                fontSize: '0.8rem',
                fontFamily: 'Inter, system-ui, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
});

PropertyCard.displayName = 'PropertyCard';

export default PropertyCard;
