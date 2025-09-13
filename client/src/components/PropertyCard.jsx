import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ property, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x250/f8fafc/64748b?text=Property+Image';
  };

  const renderDetails = () => {
    const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="beds" style={{
            backgroundColor: '#ddd6fe',
            color: '#7c3aed',
            fontSize: '11px',
            padding: '4px 8px',
            borderRadius: '12px',
            fontWeight: '600',
            marginRight: '6px'
          }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="size" style={{
          backgroundColor: '#fef3c7',
          color: '#d97706',
          fontSize: '11px',
          padding: '4px 8px',
          borderRadius: '12px',
          fontWeight: '600',
          marginRight: '6px'
        }}>
          {property.size}
        </Badge>
      );
    }

    return details;
  };

  // 🎯 FIXED RENT TYPE - NO DUPLICATES!
  const getRentType = () => {
    if (!property.price) return 'monthly';
    const price = Number(property.price);
    return price > 100000 ? 'yearly' : 'monthly';
  };

  const handleViewDetails = () => navigate(`/property/${property._id}`);
  const handleBookNow = () => navigate(`/book/${property._id}`);

  if (viewMode === 'list') {
    return (
      <Card style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        marginBottom: '16px',
        overflow: 'hidden'
      }}>
        <Row className="g-0">
          <Col md={4}>
            <div style={{ position: 'relative', height: '200px' }}>
              <img
                src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
                alt={property.title}
                onError={handleImageError}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                display: 'flex',
                gap: '6px'
              }}>
                <Badge style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  fontSize: '10px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  AVAILABLE
                </Badge>
                <Badge style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontSize: '10px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  VERIFIED
                </Badge>
              </div>
            </div>
          </Col>
          
          <Col md={8}>
            <div style={{ padding: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ marginRight: '6px', color: '#ef4444', fontSize: '14px' }}>📍</span>
                <span style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {property.address?.city || 'Namakkal'}, {property.address?.state || 'Tamil Nadu'}
                </span>
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '8px',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                {property.title || 'land'}
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '12px',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                {property.description ? 
                  property.description.substring(0, 100) + '...' : 
                  'good place to agriculture...'
                }
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <Badge style={{
                  backgroundColor: '#fbbf24',
                  color: 'white',
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  {property.category || '10000'}
                </Badge>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  {/* 🎯 FIXED PRICE DISPLAY */}
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#059669',
                    marginBottom: '4px',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    ₹{formatPrice(property.price) || '1,22,345'}/{getRentType()}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    Available for {getRentType()}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    variant="outline-primary"
                    onClick={handleViewDetails}
                    style={{
                      padding: '8px 16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '6px',
                      borderColor: '#8b5cf6',
                      color: '#8b5cf6'
                    }}
                  >
                    VIEW DETAILS
                  </Button>
                  <Button
                    onClick={handleBookNow}
                    style={{
                      background: '#8b5cf6',
                      border: 'none',
                      padding: '8px 16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '6px'
                    }}
                  >
                    BOOK NOW
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }

  // Grid View
  return (
    <Card style={{
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
      height: '100%'
    }}>
      <div style={{ position: 'relative', height: '200px' }}>
        <img
          src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
          alt={property.title}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px'
        }}>
          <Badge style={{
            backgroundColor: '#10b981',
            color: 'white',
            fontSize: '10px',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: '600'
          }}>
            AVAILABLE
          </Badge>
          <Badge style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '10px',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: '600'
          }}>
            VERIFIED
          </Badge>
        </div>
      </div>
      
      <div style={{ padding: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{ marginRight: '6px', color: '#ef4444', fontSize: '14px' }}>📍</span>
          <span style={{
            fontSize: '12px',
            color: '#6b7280',
            fontWeight: '600',
            textTransform: 'uppercase',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            {property.address?.city || 'Namakkal'}, {property.address?.state || 'Tamil Nadu'}
          </span>
        </div>
        
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '8px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          {property.title || 'land'}
        </h3>
        
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '12px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          {property.description ? 
            property.description.substring(0, 60) + '...' : 
            'good place to agriculture...'
          }
        </p>
        
        <div style={{ marginBottom: '12px' }}>
          <Badge style={{
            backgroundColor: '#fbbf24',
            color: 'white',
            fontSize: '11px',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: '600'
          }}>
            {property.category || '10000'}
          </Badge>
        </div>

        {/* 🎯 FIXED PRICE DISPLAY */}
        <div style={{
          fontSize: '20px',
          fontWeight: '800',
          color: '#059669',
          marginBottom: '4px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          ₹{formatPrice(property.price) || '1,22,345'}/{getRentType()}
        </div>
        <div style={{
          fontSize: '12px',
          color: '#6b7280',
          marginBottom: '16px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          Available for {getRentType()}
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="outline-primary"
            onClick={handleViewDetails}
            style={{
              flex: 1,
              padding: '8px',
              fontSize: '12px',
              fontWeight: '600',
              borderRadius: '6px',
              borderColor: '#8b5cf6',
              color: '#8b5cf6'
            }}
          >
            VIEW DETAILS
          </Button>
          <Button
            onClick={handleBookNow}
            style={{
              flex: 1,
              background: '#8b5cf6',
              border: 'none',
              padding: '8px',
              fontSize: '12px',
              fontWeight: '600',
              borderRadius: '6px'
            }}
          >
            BOOK NOW
          </Button>
        </div>
      </div>
    </Card>
  );
});

PropertyCard.displayName = 'PropertyCard';
export default PropertyCard;
