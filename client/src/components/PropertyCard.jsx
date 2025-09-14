import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ 
  property, 
  viewMode = 'grid', 
  violetColors = {
    primary: '#7c3aed',
    dark: '#6b46c1',
    light: '#a855f7'
  },
  onViewDetails, 
  onBookNow 
}) => {
  const navigate = useNavigate();
  
  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x250/f8f9fa/6c757d?text=Property+Image';
  };

  // 🎯 RENT TYPE COMPLETELY FIXED - NO MORE DUPLICATES FOREVER!
  const getRentType = () => {
    const price = Number(property.price) || 0;
    return price > 100000 ? 'yearly' : 'monthly';
  };

  const getFormattedPrice = () => {
    const price = Number(property.price) || 0;
    return price.toLocaleString('en-IN');
  };

  const handleViewDetailsClick = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      navigate(`/property/${property._id}`);
    }
  };

  const handleBookNowClick = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      navigate(`/book/${property._id}`);
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="mb-3 shadow-sm border-0" style={{ 
        borderRadius: '12px',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 25px rgba(124, 58, 237, 0.15)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }}>
        <Row className="g-0 align-items-center">
          <Col md={4}>
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
              <img
                src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
                alt={property.title}
                onError={handleImageError}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px 0 0 12px'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                display: 'flex',
                gap: '6px'
              }}>
                <Badge bg="success" style={{ 
                  fontSize: '0.7rem', 
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  ✓ AVAILABLE
                </Badge>
                <Badge bg="primary" style={{ 
                  fontSize: '0.7rem', 
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  ✓ VERIFIED
                </Badge>
              </div>
            </div>
          </Col>
          
          <Col md={8}>
            <Card.Body style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ marginRight: '0.5rem', color: '#dc3545' }}>📍</span>
                <small style={{ 
                  color: '#6c757d', 
                  textTransform: 'uppercase', 
                  fontWeight: '600',
                  fontSize: '0.8rem'
                }}>
                  {property.address?.city || 'NAMAKKAL'}, {property.address?.state || 'TAMIL NADU'}
                </small>
              </div>
              
              <Card.Title style={{ 
                fontSize: '1.4rem', 
                fontWeight: '700', 
                marginBottom: '0.5rem',
                color: '#212529'
              }}>
                {property.title || 'land'}
              </Card.Title>
              
              <Card.Text style={{ 
                color: '#6c757d', 
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                {property.description ? 
                  property.description.substring(0, 100) + '...' : 
                  'good place to agriculture...'
                }
              </Card.Text>
              
              <div style={{ marginBottom: '1rem' }}>
                <Badge bg="primary" style={{ 
                  marginRight: '0.5rem',
                  backgroundColor: violetColors.primary
                }}>
                  {property.category || 'Land'}
                </Badge>
                {property.subtype && ['Villa', 'Apartment', 'House', 'Studio', 'Flat'].includes(property.subtype) && property.bedrooms > 0 && (
                  <Badge bg="info" style={{ marginRight: '0.5rem' }}>
                    {property.bedrooms} BHK
                  </Badge>
                )}
                <small style={{ color: '#6c757d' }}>{property.size || '10000'}</small>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <div>
                  {/* 🎯 RENT DISPLAY COMPLETELY FIXED - SINGLE FORMAT ONLY! */}
                  <h4 style={{ 
                    color: '#198754', 
                    fontWeight: '700', 
                    margin: 0,
                    marginBottom: '0.25rem' 
                  }}>
                    ₹{getFormattedPrice()}/{getRentType()}
                  </h4>
                  <small style={{ color: '#6c757d' }}>
                    Available for {getRentType()}
                  </small>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    variant="outline-primary"
                    onClick={handleViewDetailsClick}
                    style={{ 
                      borderRadius: '8px',
                      borderColor: violetColors.primary,
                      color: violetColors.primary
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleBookNowClick}
                    style={{ 
                      borderRadius: '8px',
                      backgroundColor: violetColors.primary,
                      borderColor: violetColors.primary
                    }}
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

  // Grid View - EXACTLY LIKE REFERENCE
  return (
    <Card className="h-100 shadow-sm border-0" style={{ 
      borderRadius: '12px',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = `0 12px 25px rgba(124, 58, 237, 0.15)`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
          alt={property.title}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '12px 12px 0 0'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px'
        }}>
          <Badge bg="success" style={{ 
            fontSize: '0.7rem', 
            padding: '4px 8px',
            borderRadius: '12px',
            fontWeight: '600'
          }}>
            ✓ AVAILABLE
          </Badge>
          <Badge bg="primary" style={{ 
            fontSize: '0.7rem', 
            padding: '4px 8px',
            borderRadius: '12px',
            fontWeight: '600'
          }}>
            ✓ VERIFIED
          </Badge>
        </div>
      </div>
      
      <Card.Body style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ marginRight: '0.5rem', color: '#dc3545' }}>📍</span>
          <small style={{ 
            color: '#6c757d', 
            textTransform: 'uppercase', 
            fontWeight: '600',
            fontSize: '0.8rem'
          }}>
            {property.address?.city || 'NAMAKKAL'}, {property.address?.state || 'TAMIL NADU'}
          </small>
        </div>
        
        <Card.Title style={{ 
          fontSize: '1.25rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          color: '#212529'
        }}>
          {property.title || 'land'}
        </Card.Title>
        
        <Card.Text style={{ 
          color: '#6c757d', 
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          {property.description ? 
            property.description.substring(0, 60) + '...' : 
            'good place to agriculture...'
          }
        </Card.Text>
        
        <div style={{ marginBottom: '1rem' }}>
          <Badge bg="primary" style={{ 
            marginRight: '0.5rem',
            backgroundColor: violetColors.primary
          }}>
            {property.category || 'Land'}
          </Badge>
          <small style={{ color: '#6c757d' }}>{property.size || '10000'}</small>
        </div>

        {/* 🎯 RENT DISPLAY COMPLETELY FIXED - SINGLE FORMAT ONLY! */}
        <h5 style={{ 
          color: '#198754', 
          fontWeight: '700', 
          margin: 0,
          marginBottom: '0.25rem' 
        }}>
          ₹{getFormattedPrice()}/{getRentType()}
        </h5>
        <small style={{ color: '#6c757d', display: 'block', marginBottom: '1rem' }}>
          Available for {getRentType()}
        </small>
        
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            className="flex-fill"
            onClick={handleViewDetailsClick}
            style={{ 
              borderRadius: '8px', 
              fontSize: '0.9rem',
              borderColor: violetColors.primary,
              color: violetColors.primary
            }}
          >
            View Details
          </Button>
          <Button
            variant="primary"
            className="flex-fill"
            onClick={handleBookNowClick}
            style={{ 
              borderRadius: '8px', 
              fontSize: '0.9rem',
              backgroundColor: violetColors.primary,
              borderColor: violetColors.primary
            }}
          >
            Book Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
});

PropertyCard.displayName = 'PropertyCard';
export default PropertyCard;
