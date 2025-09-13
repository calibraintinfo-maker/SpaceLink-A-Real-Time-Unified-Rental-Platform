import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ property, viewMode = 'grid', onViewDetails, onBookNow }) => {
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
            fontSize: '10px',
            padding: '3px 6px',
            borderRadius: '12px',
            fontWeight: '600',
            marginRight: '4px',
            marginBottom: '2px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="baths" style={{
            backgroundColor: '#e5e7eb',
            color: '#374151',
            fontSize: '10px',
            padding: '3px 6px',
            borderRadius: '12px',
            fontWeight: '600',
            marginRight: '4px',
            marginBottom: '2px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="size" style={{
          backgroundColor: '#fef3c7',
          color: '#d97706',
          fontSize: '10px',
          padding: '3px 6px',
          borderRadius: '12px',
          fontWeight: '600',
          marginRight: '4px',
          marginBottom: '2px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          {property.size}
        </Badge>
      );
    }

    if (property.capacity) {
      details.push(
        <Badge key="capacity" style={{
          backgroundColor: '#dbeafe',
          color: '#3b82f6',
          fontSize: '10px',
          padding: '3px 6px',
          borderRadius: '12px',
          fontWeight: '600',
          marginRight: '4px',
          marginBottom: '2px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          {property.capacity}
        </Badge>
      );
    }

    return details;
  };

  // 🎯 COMPLETELY FIXED RENT TYPE - NO MORE DUPLICATES!!
  const getRentTypeDisplay = () => {
    if (!property.price) return 'monthly';
    
    const price = Number(property.price);
    // Smart logic: if price is very high (>100k), it's likely yearly pricing
    // Otherwise, it's monthly pricing
    if (price > 100000) {
      return 'yearly';
    } else {
      return 'monthly';
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      navigate(`/property/${property._id}`);
    }
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      navigate(`/book/${property._id}`);
    }
  };

  if (viewMode === 'list') {
    return (
      <Card style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        marginBottom: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
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
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  AVAILABLE
                </Badge>
                <Badge style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontSize: '10px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  VERIFIED
                </Badge>
              </div>
            </div>
          </Col>
          
          <Col md={5}>
            <div style={{ 
              padding: '24px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ marginRight: '6px', color: '#ef4444', fontSize: '14px' }}>📍</span>
                <span style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {property.address?.city || 'Namakkal'}, {property.address?.state || 'Tamil Nadu'}
                </span>
              </div>
              
              <h3 style={{
                fontSize: '22px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '8px',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.015em'
              }}>
                {property.title || 'land'}
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '12px',
                fontFamily: 'Inter, system-ui, sans-serif',
                lineHeight: '1.5',
                flexGrow: 1
              }}>
                {property.description ? 
                  property.description.substring(0, 100) + '...' : 
                  'good place to agriculture...'
                }
              </p>
              
              <div style={{ marginBottom: '12px' }}>
                <Badge style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {property.category || 'Land'}
                </Badge>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {renderDetails()}
              </div>
            </div>
          </Col>
          
          <Col md={3}>
            <div style={{ 
              padding: '24px', 
              height: '200px',
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'end'
            }}>
              <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                {/* 🎯 COMPLETELY FIXED PRICE DISPLAY - NO MORE DUPLICATES!! */}
                <div style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: '#059669',
                  marginBottom: '4px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '-0.01em'
                }}>
                  ₹{formatPrice(property.price) || '1,22,345'}/{getRentTypeDisplay()}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: '500'
                }}>
                  Available for {getRentTypeDisplay()}
                </div>
              </div>
              
              {/* 🎯 PERFECT BUTTON DESIGN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <Button
                  onClick={handleViewDetails}
                  style={{
                    padding: '10px 16px',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '8px',
                    border: '2px solid #8b5cf6',
                    backgroundColor: 'transparent',
                    color: '#8b5cf6',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    transition: 'all 0.2s ease',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#8b5cf6';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#8b5cf6';
                  }}
                >
                  VIEW DETAILS
                </Button>
                <Button
                  onClick={handleBookNow}
                  style={{
                    padding: '10px 16px',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                    color: 'white',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    transition: 'all 0.2s ease',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
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
      borderRadius: '12px',
      overflow: 'hidden',
      height: '100%',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.15)';
      e.currentTarget.style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
      e.currentTarget.style.transform = 'translateY(0)';
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
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            AVAILABLE
          </Badge>
          <Badge style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '10px',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontFamily: 'Inter, system-ui, sans-serif'
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
            fontSize: '11px',
            color: '#6b7280',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            {property.address?.city || 'Namakkal'}, {property.address?.state || 'Tamil Nadu'}
          </span>
        </div>
        
        <h3 style={{
          fontSize: '18px',
          fontWeight: '800',
          color: '#111827',
          marginBottom: '8px',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.015em'
        }}>
          {property.title || 'land'}
        </h3>
        
        <p style={{
          fontSize: '13px',
          color: '#6b7280',
          marginBottom: '12px',
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.5'
        }}>
          {property.description ? 
            property.description.substring(0, 70) + '...' : 
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
            fontWeight: '600',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            {property.category || 'Land'}
          </Badge>
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '4px',
          marginBottom: '12px' 
        }}>
          {renderDetails()}
        </div>

        {/* 🎯 COMPLETELY FIXED PRICE DISPLAY - NO MORE DUPLICATES!! */}
        <div style={{
          fontSize: '20px',
          fontWeight: '800',
          color: '#059669',
          marginBottom: '4px',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.01em'
        }}>
          ₹{formatPrice(property.price) || '1,22,345'}/{getRentTypeDisplay()}
        </div>
        <div style={{
          fontSize: '11px',
          color: '#6b7280',
          marginBottom: '16px',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: '500'
        }}>
          Available for {getRentTypeDisplay()}
        </div>
        
        {/* 🎯 PERFECT BUTTON DESIGN */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            onClick={handleViewDetails}
            style={{
              flex: 1,
              padding: '8px',
              fontSize: '11px',
              fontWeight: '700',
              borderRadius: '6px',
              border: '2px solid #8b5cf6',
              backgroundColor: 'transparent',
              color: '#8b5cf6',
              fontFamily: 'Inter, system-ui, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.025em',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#8b5cf6';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#8b5cf6';
            }}
          >
            VIEW DETAILS
          </Button>
          <Button
            onClick={handleBookNow}
            style={{
              flex: 1,
              padding: '8px',
              fontSize: '11px',
              fontWeight: '700',
              borderRadius: '6px',
              border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
              color: 'white',
              fontFamily: 'Inter, system-ui, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.025em',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
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
