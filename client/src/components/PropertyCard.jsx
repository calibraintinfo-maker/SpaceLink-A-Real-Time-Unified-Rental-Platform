import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ 
  property, 
  viewMode = 'grid', 
  onViewDetails, 
  onBookNow 
}) => {
  const navigate = useNavigate();
  
  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x250/f8f9fa/6c757d?text=Property+Image';
  };

  // 🎯 RENT TYPE COMPLETELY FIXED
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
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
      }}>
        <Row className="g-0 align-items-center">
          <Col md={4}>
            <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
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
                  borderRadius: '8px',
                  fontWeight: '600'
                }}>
                  ✓ AVAILABLE
                </Badge>
                <Badge bg="primary" style={{ 
                  fontSize: '0.7rem', 
                  padding: '4px 8px',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}>
                  ✓ VERIFIED
                </Badge>
              </div>
            </div>
          </Col>
          
          <Col md={8}>
            <Card.Body style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ marginRight: '6px', color: '#dc3545' }}>📍</span>
                <small style={{ 
                  color: '#6b7280', 
                  textTransform: 'uppercase', 
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {property.address?.city || 'NAMAKKAL'}, {property.address?.state || 'TAMIL NADU'}
                </small>
              </div>
              
              <Card.Title style={{ 
                fontSize: '1.4rem', 
                fontWeight: '700', 
                marginBottom: '8px',
                color: '#111827',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                {property.title || 'land'}
              </Card.Title>
              
              <Card.Text style={{ 
                color: '#6b7280', 
                marginBottom: '1rem',
                fontSize: '0.9rem',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                {property.description ? 
                  property.description.substring(0, 100) + '...' : 
                  'good place to agriculture...'
                }
              </Card.Text>
              
              <div style={{ marginBottom: '1rem' }}>
                <Badge bg="primary" style={{ 
                  marginRight: '8px',
                  backgroundColor: '#7c3aed',
                  fontSize: '0.75rem',
                  padding: '6px 12px',
                  borderRadius: '8px'
                }}>
                  {property.category || 'Land'}
                </Badge>
                <small style={{ 
                  color: '#6b7280',
                  fontSize: '0.8rem'
                }}>
                  {property.size || '10000'}
                </small>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <div>
                  <h4 style={{ 
                    color: '#10b981', 
                    fontWeight: '700', 
                    margin: 0,
                    marginBottom: '4px',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    ₹{getFormattedPrice()}/{getRentType()}
                  </h4>
                  <small style={{ color: '#6b7280' }}>
                    Available for {getRentType()}
                  </small>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    variant="outline-primary"
                    onClick={handleViewDetailsClick}
                    style={{ 
                      borderRadius: '8px',
                      borderColor: '#7c3aed',
                      color: '#7c3aed',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      padding: '8px 16px'
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={handleBookNowClick}
                    style={{ 
                      borderRadius: '8px',
                      backgroundColor: '#7c3aed',
                      borderColor: '#7c3aed',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      padding: '8px 16px'
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
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 30px rgba(124, 58, 237, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
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
            borderRadius: '8px',
            fontWeight: '600'
          }}>
            ✓ AVAILABLE
          </Badge>
          <Badge bg="primary" style={{ 
            fontSize: '0.7rem', 
            padding: '4px 8px',
            borderRadius: '8px',
            fontWeight: '600'
          }}>
            ✓ VERIFIED
          </Badge>
        </div>
      </div>
      
      <Card.Body style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ marginRight: '6px', color: '#dc3545' }}>📍</span>
          <small style={{ 
            color: '#6b7280', 
            textTransform: 'uppercase', 
            fontWeight: '600',
            fontSize: '0.8rem',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            {property.address?.city || 'NAMAKKAL'}, {property.address?.state || 'TAMIL NADU'}
          </small>
        </div>
        
        <Card.Title style={{ 
          fontSize: '1.3rem', 
          fontWeight: '700', 
          marginBottom: '8px',
          color: '#111827',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          {property.title || 'land'}
        </Card.Title>
        
        <Card.Text style={{ 
          color: '#6b7280', 
          marginBottom: '12px',
          fontSize: '0.9rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          height: '2.5rem',
          overflow: 'hidden'
        }}>
          {property.description ? 
            property.description.substring(0, 80) + '...' : 
            'good place to agriculture...'
          }
        </Card.Text>
        
        <div style={{ marginBottom: '12px' }}>
          <Badge bg="primary" style={{ 
            marginRight: '8px',
            backgroundColor: '#7c3aed',
            fontSize: '0.75rem',
            padding: '6px 12px',
            borderRadius: '8px'
          }}>
            {property.category || 'Land'}
          </Badge>
          <small style={{ 
            color: '#6b7280',
            fontSize: '0.8rem'
          }}>
            {property.size || '10000'}
          </small>
        </div>

        <h5 style={{ 
          color: '#10b981', 
          fontWeight: '700', 
          margin: 0,
          marginBottom: '6px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          ₹{getFormattedPrice()}/{getRentType()}
        </h5>
        <small style={{ 
          color: '#6b7280', 
          display: 'block', 
          marginBottom: '16px',
          fontSize: '0.8rem'
        }}>
          Available for {getRentType()}
        </small>
        
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            className="flex-fill"
            onClick={handleViewDetailsClick}
            style={{ 
              borderRadius: '8px', 
              fontSize: '0.85rem',
              padding: '10px',
              borderColor: '#7c3aed',
              color: '#7c3aed',
              fontWeight: '600',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            View Details
          </Button>
          <Button
            className="flex-fill"
            onClick={handleBookNowClick}
            style={{ 
              borderRadius: '8px', 
              fontSize: '0.85rem',
              padding: '10px',
              backgroundColor: '#7c3aed',
              border: 'none',
              fontWeight: '600',
              fontFamily: 'Inter, system-ui, sans-serif'
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
