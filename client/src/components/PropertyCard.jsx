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
            fontSize: '12px',
            padding: '4px 8px',
            borderRadius: '6px',
            fontWeight: '600',
            marginRight: '6px',
            marginBottom: '4px'
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
            fontSize: '12px',
            padding: '4px 8px',
            borderRadius: '6px',
            fontWeight: '600',
            marginRight: '6px',
            marginBottom: '4px'
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
          fontSize: '12px',
          padding: '4px 8px',
          borderRadius: '6px',
          fontWeight: '600',
          marginRight: '6px',
          marginBottom: '4px'
        }}>
          {property.size}
        </Badge>
      );
    }

    return details;
  };

  const handleViewDetails = () => navigate(`/property/${property._id}`);
  const handleBookNow = () => navigate(`/book/${property._id}`);

  if (viewMode === 'list') {
    return (
      <Card style={{
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '16px',
        overflow: 'hidden'
      }}>
        <Row className="g-0">
          <Col md={4}>
            <div style={{ position: 'relative', height: '160px' }}>
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
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  AVAILABLE
                </Badge>
                <Badge style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontSize: '10px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  VERIFIED
                </Badge>
              </div>
            </div>
          </Col>
          
          <Col md={5} className="p-3">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{ marginRight: '6px', fontSize: '14px' }}>📍</span>
              <span style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '600',
                textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif"
              }}>
                {property.address?.city || 'Namakkal'}, {property.address?.state || 'TN'}
              </span>
            </div>
            
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '8px',
              fontFamily: "'Inter', sans-serif"
            }}>
              {property.title || 'Premium Property'}
            </h3>
            
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '12px',
              fontFamily: "'Inter', sans-serif"
            }}>
              {property.description ? 
                property.description.substring(0, 100) + '...' : 
                'Premium property with excellent location and modern amenities.'
              }
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {renderDetails()}
            </div>
          </Col>
          
          <Col md={3} className="p-3 text-end">
            <div style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#059669',
              marginBottom: '4px',
              fontFamily: "'Inter', sans-serif"
            }}>
              ₹{formatPrice(property.price) || '1,22,345'}/monthly
            </div>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              fontWeight: '600',
              marginBottom: '16px',
              fontFamily: "'Inter', sans-serif"
            }}>
              per month
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button
                onClick={handleViewDetails}
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #7c3aed',
                  color: '#7c3aed',
                  fontSize: '12px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                VIEW
              </Button>
              <Button
                onClick={handleBookNow}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  border: 'none',
                  color: 'white',
                  fontSize: '12px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                BOOK
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }

  // Grid View
  return (
    <Card style={{
      border: 'none',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
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
            borderRadius: '12px',
            fontWeight: '600'
          }}>
            AVAILABLE
          </Badge>
          <Badge style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '10px',
            padding: '4px 8px',
            borderRadius: '12px',
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
          <span style={{ marginRight: '6px', fontSize: '14px' }}>📍</span>
          <span style={{
            fontSize: '12px',
            color: '#6b7280',
            fontWeight: '600',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif"
          }}>
            {property.address?.city || 'Namakkal'}, {property.address?.state || 'TN'}
          </span>
        </div>
        
        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '8px',
          fontFamily: "'Inter', sans-serif"
        }}>
          {property.title || 'Premium Property'}
        </h3>
        
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '12px',
          fontFamily: "'Inter', sans-serif"
        }}>
          {property.description ? 
            property.description.substring(0, 80) + '...' : 
            'Premium property with modern amenities.'
          }
        </p>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginBottom: '16px'
        }}>
          {renderDetails()}
        </div>

        <div style={{
          fontSize: '18px',
          fontWeight: '800',
          color: '#059669',
          marginBottom: '4px',
          fontFamily: "'Inter', sans-serif"
        }}>
          ₹{formatPrice(property.price) || '1,234'}/month
        </div>
        <div style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: '600',
          marginBottom: '16px',
          fontFamily: "'Inter', sans-serif"
        }}>
          Available for rental
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            onClick={handleViewDetails}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: '2px solid #7c3aed',
              color: '#7c3aed',
              fontSize: '12px',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            VIEW DETAILS
          </Button>
          <Button
            onClick={handleBookNow}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              border: 'none',
              color: 'white',
              fontSize: '12px',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif"
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
