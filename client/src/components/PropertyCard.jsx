import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ property, viewMode = 'grid', showOwner = false }) => {
  const navigate = useNavigate();

  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x250/f8fafc/64748b?text=Property+Image';
  };

  const renderPropertyDetails = () => {
    if (!property) return [];
    
    const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="info" className="me-2 mb-1" style={{ 
            fontSize: '0.75rem', 
            fontWeight: '600',
            padding: '6px 10px',
            borderRadius: '8px'
          }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="secondary" className="me-2 mb-1" style={{ 
            fontSize: '0.75rem', 
            fontWeight: '600',
            padding: '6px 10px',
            borderRadius: '8px'
          }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="warning" text="dark" className="me-2 mb-1" style={{ 
          fontSize: '0.75rem', 
          fontWeight: '600',
          padding: '6px 10px',
          borderRadius: '8px'
        }}>
          {property.size}
        </Badge>
      );
    }

    return details;
  };

  const getSafeRentType = () => {
    if (!property?.rentType) return 'monthly';
    return Array.isArray(property.rentType) ? property.rentType[0] : property.rentType;
  };

  const handleViewDetails = () => {
    navigate(`/property/${property._id}`);
  };

  const handleBookNow = () => {
    navigate(`/book/${property._id}`);
  };

  if (viewMode === 'list') {
    // 🎯 PERFECT LIST VIEW
    return (
      <Card className="mb-4 border-0 shadow-sm" style={{ 
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 58, 237, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
      }}>
        <Row className="g-0">
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
                  objectFit: 'cover'
                }}
              />
              <div className="position-absolute top-0 start-0 p-3">
                <Badge bg="success" className="me-2 fw-bold shadow" style={{
                  borderRadius: '12px',
                  padding: '8px 12px',
                  fontSize: '0.7rem'
                }}>
                  AVAILABLE
                </Badge>
                <Badge bg="primary" className="fw-bold shadow" style={{
                  borderRadius: '12px',
                  padding: '8px 12px',
                  fontSize: '0.7rem'
                }}>
                  VERIFIED
                </Badge>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <Card.Body className="p-4 h-100 d-flex flex-column">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2" style={{ color: '#7c3aed', fontSize: '1rem' }}>📍</span>
                <span style={{
                  fontSize: '0.85rem',
                  color: '#64748b',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {property.address?.city || 'Namakkal'}, {property.address?.state || 'Tamil Nadu'}
                </span>
              </div>
              
              <Card.Title style={{
                color: '#1f2937',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginBottom: '12px',
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.3'
              }}>
                {property.title || 'Premium Property'}
              </Card.Title>
              
              <Card.Text style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: '#4b5563',
                fontFamily: "'Inter', sans-serif",
                marginBottom: '16px',
                flexGrow: 1
              }}>
                {property.description ? 
                  property.description.substring(0, 120) + '...' : 
                  'Premium property with modern amenities and excellent location.'
                }
              </Card.Text>
              
              <div className="mb-3">
                <div className="d-flex flex-wrap">
                  {renderPropertyDetails()}
                </div>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mt-auto">
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#059669',
                    marginBottom: '4px',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    Rs {formatPrice(property.price) || '1,22,345'}/month
                  </div>
                  <small style={{
                    color: '#64748b',
                    fontSize: '0.8rem',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: '500',
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
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      padding: '10px 16px',
                      borderColor: '#7c3aed',
                      color: '#7c3aed'
                    }}
                  >
                    VIEW DETAILS
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleBookNow}
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      padding: '10px 16px'
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

  // 🎯 PERFECT GRID VIEW
  return (
    <Card className="h-100 border-0 shadow-sm" style={{ 
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff',
      minHeight: '450px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 12px 30px rgba(124, 58, 237, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
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
            objectFit: 'cover'
          }}
        />
        <div className="position-absolute top-0 start-0 p-3">
          <Badge bg="success" className="me-2 fw-bold shadow" style={{
            borderRadius: '12px',
            padding: '8px 12px',
            fontSize: '0.7rem'
          }}>
            AVAILABLE
          </Badge>
          <Badge bg="primary" className="fw-bold shadow" style={{
            borderRadius: '12px',
            padding: '8px 12px',
            fontSize: '0.7rem'
          }}>
            VERIFIED
          </Badge>
        </div>
      </div>
      
      <Card.Body className="p-4 d-flex flex-column">
        <div className="d-flex align-items-center mb-2">
          <span className="me-2" style={{ color: '#7c3aed', fontSize: '1rem' }}>📍</span>
          <span style={{
            fontSize: '0.85rem',
            color: '#64748b',
            fontFamily: "'Inter', sans-serif",
            fontWeight: '600',
            textTransform: 'uppercase'
          }}>
            {property.address?.city || 'Namakkal'}, {property.address?.state || 'TN'}
          </span>
        </div>
        
        <Card.Title style={{
          color: '#1f2937',
          fontSize: '1.25rem',
          fontWeight: '800',
          marginBottom: '12px',
          fontFamily: "'Inter', sans-serif",
          lineHeight: '1.3'
        }}>
          {property.title || 'Premium Property'}
        </Card.Title>
        
        <Card.Text style={{
          fontSize: '0.9rem',
          lineHeight: '1.6',
          color: '#4b5563',
          fontFamily: "'Inter', sans-serif",
          marginBottom: '16px',
          flexGrow: 1
        }}>
          {property.description ? 
            property.description.substring(0, 90) + '...' : 
            'Premium property with modern amenities.'
          }
        </Card.Text>
        
        <div className="mb-3">
          <div className="d-flex flex-wrap">
            {renderPropertyDetails()}
          </div>
        </div>
        
        <div className="mt-auto">
          <div style={{
            fontSize: '1.3rem',
            fontWeight: '800',
            color: '#059669',
            marginBottom: '8px',
            fontFamily: "'Inter', sans-serif"
          }}>
            Rs {formatPrice(property.price) || '1,234'}/month
          </div>
          <small style={{
            color: '#64748b',
            fontSize: '0.8rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            textTransform: 'uppercase',
            marginBottom: '16px',
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
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.75rem',
                padding: '10px 12px',
                borderColor: '#7c3aed',
                color: '#7c3aed'
              }}
            >
              VIEW DETAILS
            </Button>
            <Button 
              size="sm"
              className="flex-fill"
              onClick={handleBookNow}
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.75rem',
                padding: '10px 12px'
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
