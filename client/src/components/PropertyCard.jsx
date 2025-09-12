import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ property, viewMode = 'grid', showOwner = false }) => {
  const navigate = useNavigate();

  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x250/e2e8f0/64748b?text=Property+Image';
  };

  const renderPropertyDetails = () => {
    if (!property) return [];
    
    const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="light" text="dark" className="me-2 mb-1" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-2 mb-1" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-2 mb-1" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
          {property.size}
        </Badge>
      );
    }

    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="info" className="me-2 mb-1" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
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

  const handleViewDetails = () => {
    navigate(`/property/${property._id}`);
  };

  const handleBookNow = () => {
    navigate(`/book/${property._id}`);
  };

  if (viewMode === 'list') {
    // ✅ FIXED LIST VIEW - No Overlap
    return (
      <Card className="mb-4 border-0 shadow-sm" style={{ 
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      }}>
        <Row className="g-0">
          <Col md={4}>
            <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
              <img
                src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
                alt={property.title || 'Property'}
                onError={handleImageError}
                loading="lazy"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover'
                }}
              />
              <div className="position-absolute top-0 start-0 p-3">
                <Badge bg="success" className="me-2 fw-semibold" style={{ fontSize: '0.7rem', borderRadius: '12px' }}>
                  AVAILABLE
                </Badge>
                <Badge bg="primary" className="fw-semibold" style={{ fontSize: '0.7rem', borderRadius: '12px' }}>
                  VERIFIED
                </Badge>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2" style={{ color: '#6d28d9', fontSize: '1rem' }}>📍</span>
                <span style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {property.address?.city || 'Namakkal'}, {property.address?.state || 'Tamil Nadu'}
                </span>
              </div>
              
              <Card.Title style={{
                color: '#111827',
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '12px',
                fontFamily: 'Inter, system-ui, sans-serif',
                lineHeight: '1.3'
              }}>
                {property.title || 'Premium Property'}
              </Card.Title>
              
              <Card.Text style={{
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: '#4b5563',
                fontFamily: 'Inter, system-ui, sans-serif',
                marginBottom: '16px'
              }}>
                {property.description ? 
                  property.description.substring(0, 120) + '...' : 
                  'Premium property with modern amenities and excellent location.'
                }
              </Card.Text>
              
              <div className="mb-3">
                {renderPropertyDetails()}
              </div>
              
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#059669',
                    marginBottom: '4px',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    ₹{formatPrice(property.price) || '1,22,345'}/month
                  </div>
                  <small style={{
                    color: '#6b7280',
                    fontSize: '0.75rem',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textTransform: 'uppercase'
                  }}>
                    Available for {getSafeRentType()}
                  </small>
                </div>
                
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={handleViewDetails}
                    style={{
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.8rem',
                      padding: '8px 16px',
                      borderColor: '#6d28d9',
                      color: '#6d28d9'
                    }}
                  >
                    VIEW DETAILS
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleBookNow}
                    style={{
                      background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.8rem',
                      padding: '8px 16px'
                    }}
                  >
                    BOOK NOW
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }

  // ✅ FIXED GRID VIEW - Consistent Sizing
  return (
    <Card className="h-100 border-0 shadow-sm" style={{ 
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      minHeight: '420px' // ✅ Fixed height for consistency
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
          alt={property.title || 'Property'}
          onError={handleImageError}
          loading="lazy"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
          }}
        />
        <div className="position-absolute top-0 start-0 p-3">
          <Badge bg="success" className="me-2 fw-semibold" style={{ fontSize: '0.7rem', borderRadius: '12px' }}>
            AVAILABLE
          </Badge>
          <Badge bg="primary" className="fw-semibold" style={{ fontSize: '0.7rem', borderRadius: '12px' }}>
            VERIFIED
          </Badge>
        </div>
      </div>
      
      <Card.Body className="d-flex flex-column p-3">
        <div className="d-flex align-items-center mb-2">
          <span className="me-2" style={{ color: '#6d28d9', fontSize: '0.9rem' }}>📍</span>
          <span style={{
            fontSize: '0.8rem',
            color: '#6b7280',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '500',
            textTransform: 'uppercase'
          }}>
            {property.address?.city || 'Namakkal'}, {property.address?.state || 'TN'}
          </span>
        </div>
        
        <Card.Title style={{
          color: '#111827',
          fontSize: '1.1rem',
          fontWeight: '700',
          marginBottom: '10px',
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.3'
        }}>
          {property.title || 'Premium Property'}
        </Card.Title>
        
        <Card.Text style={{
          fontSize: '0.85rem',
          lineHeight: '1.5',
          color: '#4b5563',
          fontFamily: 'Inter, system-ui, sans-serif',
          marginBottom: '12px',
          flexGrow: 1
        }}>
          {property.description ? 
            property.description.substring(0, 80) + '...' : 
            'Premium property with modern amenities.'
          }
        </Card.Text>
        
        <div className="mb-3">
          {renderPropertyDetails()}
        </div>
        
        <div className="mt-auto">
          <div style={{
            fontSize: '1.3rem',
            fontWeight: '700',
            color: '#059669',
            marginBottom: '8px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            ₹{formatPrice(property.price) || '1,234'}/month
          </div>
          <small style={{
            color: '#6b7280',
            fontSize: '0.75rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            textTransform: 'uppercase',
            marginBottom: '12px',
            display: 'block'
          }}>
            Available for {getSafeRentType()}
          </small>
          
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              className="flex-fill"
              onClick={handleViewDetails}
              style={{
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.75rem',
                padding: '8px 12px',
                borderColor: '#6d28d9',
                color: '#6d28d9'
              }}
            >
              VIEW DETAILS
            </Button>
            <Button 
              size="sm"
              className="flex-fill"
              onClick={handleBookNow}
              style={{
                background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.75rem',
                padding: '8px 12px'
              }}
            >
              BOOK NOW
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
});

PropertyCard.displayName = 'PropertyCard';

export default PropertyCard;
