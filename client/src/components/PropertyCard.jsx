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

  // 🎯 FIXED RENT TYPE - NO MORE DUPLICATES!
  const getRentType = () => {
    if (!property.price) return 'monthly';
    const price = Number(property.price);
    // Smart logic: if price > 100k, likely yearly, otherwise monthly
    return price > 100000 ? 'yearly' : 'monthly';
  };

  const handleViewDetails = () => navigate(`/property/${property._id}`);
  const handleBookNow = () => navigate(`/book/${property._id}`);

  if (viewMode === 'list') {
    return (
      <Card style={{
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        marginBottom: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <Row className="g-0">
          <Col md={4}>
            <div style={{ position: 'relative', height: '180px' }}>
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
                top: '10px',
                left: '10px',
                display: 'flex',
                gap: '4px'
              }}>
                <Badge style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  fontSize: '9px',
                  padding: '3px 6px',
                  borderRadius: '3px',
                  fontWeight: '600'
                }}>
                  AVAILABLE
                </Badge>
                <Badge style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontSize: '9px',
                  padding: '3px 6px',
                  borderRadius: '3px',
                  fontWeight: '600'
                }}>
                  VERIFIED
                </Badge>
              </div>
            </div>
          </Col>
          
          <Col md={5}>
            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '6px'
              }}>
                <span style={{ marginRight: '6px', color: '#ef4444', fontSize: '12px' }}>📍</span>
                <span style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {property.address?.city || 'Namakkal'}, {property.address?.state || 'Tamil Nadu'}
                </span>
              </div>
              
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '6px'
              }}>
                {property.title || 'land'}
              </h3>
              
              <p style={{
                fontSize: '13px',
                color: '#6b7280',
                marginBottom: '10px'
              }}>
                {property.description ? 
                  property.description.substring(0, 80) + '...' : 
                  'good place to agriculture...'
                }
              </p>
              
              <div style={{ marginBottom: '12px' }}>
                <Badge style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontSize: '10px',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  {property.category || 'Land'}
                </Badge>
              </div>

              {/* 🎯 FIXED PRICE DISPLAY - NO MORE DUPLICATES */}
              <div style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#059669',
                marginBottom: '2px'
              }}>
                ₹{formatPrice(property.price) || '1,22,345'}/{getRentType()}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#6b7280'
              }}>
                Available for {getRentType()}
              </div>
            </div>
          </Col>
          
          <Col md={3}>
            <div style={{ 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'end',
              height: '100%'
            }}>
              {/* 🎯 FIXED BUTTON DESIGN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <Button
                  onClick={handleViewDetails}
                  style={{
                    padding: '8px 16px',
                    fontSize: '11px',
                    fontWeight: '600',
                    borderRadius: '4px',
                    border: '1px solid #8b5cf6',
                    backgroundColor: 'transparent',
                    color: '#8b5cf6',
                    transition: 'all 0.2s ease',
                    width: '100%'
                  }}
                >
                  VIEW DETAILS
                </Button>
                <Button
                  onClick={handleBookNow}
                  style={{
                    padding: '8px 16px',
                    fontSize: '11px',
                    fontWeight: '600',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    width: '100%'
                  }}
                >
                  BOOK NOW
                </Button>
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
      borderRadius: '10px',
      overflow: 'hidden',
      height: '100%',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ position: 'relative', height: '180px' }}>
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
          top: '10px',
          left: '10px',
          display: 'flex',
          gap: '4px'
        }}>
          <Badge style={{
            backgroundColor: '#10b981',
            color: 'white',
            fontSize: '9px',
            padding: '3px 6px',
            borderRadius: '3px',
            fontWeight: '600'
          }}>
            AVAILABLE
          </Badge>
          <Badge style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '9px',
            padding: '3px 6px',
            borderRadius: '3px',
            fontWeight: '600'
          }}>
            VERIFIED
          </Badge>
        </div>
      </div>
      
      <div style={{ padding: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '6px'
        }}>
          <span style={{ marginRight: '6px', color: '#ef4444', fontSize: '12px' }}>📍</span>
          <span style={{
            fontSize: '11px',
            color: '#6b7280',
            fontWeight: '600',
            textTransform: 'uppercase'
          }}>
            {property.address?.city || 'Namakkal'}, {property.address?.state || 'Tamil Nadu'}
          </span>
        </div>
        
        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '6px'
        }}>
          {property.title || 'land'}
        </h3>
        
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          marginBottom: '10px'
        }}>
          {property.description ? 
            property.description.substring(0, 50) + '...' : 
            'good place to agriculture...'
          }
        </p>
        
        <div style={{ marginBottom: '10px' }}>
          <Badge style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '9px',
            padding: '3px 6px',
            borderRadius: '3px',
            fontWeight: '600'
          }}>
            {property.category || 'Land'}
          </Badge>
        </div>

        {/* 🎯 FIXED PRICE DISPLAY - NO MORE DUPLICATES */}
        <div style={{
          fontSize: '18px',
          fontWeight: '800',
          color: '#059669',
          marginBottom: '2px'
        }}>
          ₹{formatPrice(property.price) || '1,22,345'}/{getRentType()}
        </div>
        <div style={{
          fontSize: '10px',
          color: '#6b7280',
          marginBottom: '12px'
        }}>
          Available for {getRentType()}
        </div>
        
        {/* 🎯 FIXED BUTTON DESIGN */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button
            onClick={handleViewDetails}
            style={{
              flex: 1,
              padding: '6px',
              fontSize: '10px',
              fontWeight: '600',
              borderRadius: '4px',
              border: '1px solid #8b5cf6',
              backgroundColor: 'transparent',
              color: '#8b5cf6',
              transition: 'all 0.2s ease'
            }}
          >
            VIEW DETAILS
          </Button>
          <Button
            onClick={handleBookNow}
            style={{
              flex: 1,
              padding: '6px',
              fontSize: '10px',
              fontWeight: '600',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#8b5cf6',
              color: 'white',
              transition: 'all 0.2s ease'
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
