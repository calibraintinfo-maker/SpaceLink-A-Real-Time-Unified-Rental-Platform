import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ property, viewMode = 'grid', showOwner = false }) => {
  const navigate = useNavigate();

  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200/e2e8f0/64748b?text=Property+Image';
  };

  const renderPropertyDetails = () => {
    const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.75rem' }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.75rem' }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.75rem' }}>
          {property.size}
        </Badge>
      );
    }

    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="info" className="me-1 mb-1" style={{ fontSize: '0.75rem' }}>
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

  if (viewMode === 'list') {
    // List View
    return (
      <Card className="border-0 shadow-sm mb-3" style={{ 
        borderRadius: '16px', 
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}>
        <div className="row g-0 align-items-center">
          <div className="col-md-4">
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
                <Badge bg="success" className="me-2 fw-semibold">Available</Badge>
                <Badge bg="primary" className="fw-semibold">Verified</Badge>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2" style={{ color: '#7c3aed', fontSize: '1.1rem' }}>📍</span>
                <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>
                  {property.address?.city || 'City'}, {property.address?.state || 'State'}
                </span>
              </div>
              
              <Card.Title style={{ 
                color: '#111827', 
                fontSize: '1.3rem', 
                fontWeight: '700', 
                marginBottom: '12px',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                {property.title || 'Property Title'}
              </Card.Title>
              
              <Card.Text style={{ 
                fontSize: '0.9rem', 
                color: '#374151', 
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
                    fontSize: '1.4rem', 
                    fontWeight: '700', 
                    color: '#059669',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    ₹{formatPrice(property.price) || '1,234'}/month
                  </div>
                  <small style={{ color: '#64748b', fontSize: '0.8rem' }}>
                    Available for {getSafeRentType()}
                  </small>
                </div>
                
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => navigate(`/property/${property._id}`)}
                    style={{ 
                      borderRadius: '8px', 
                      fontWeight: '600',
                      fontSize: '0.8rem'
                    }}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => navigate(`/book/${property._id}`)}
                    style={{ 
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      border: 'none',
                      borderRadius: '8px', 
                      fontWeight: '600',
                      fontSize: '0.8rem'
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    );
  }

  // Grid View (Default)
  return (
    <Card className="h-100 border-0 shadow-sm" style={{ 
      borderRadius: '16px', 
      transition: 'all 0.3s ease',
      overflow: 'hidden'
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
          <Badge bg="success" className="me-2 fw-semibold shadow-sm" style={{ fontSize: '0.7rem' }}>
            Available
          </Badge>
          <Badge bg="primary" className="fw-semibold shadow-sm" style={{ fontSize: '0.7rem' }}>
            Verified
          </Badge>
        </div>
      </div>
      
      <Card.Body className="d-flex flex-column" style={{ padding: '20px' }}>
        <div className="d-flex align-items-center mb-2">
          <span className="me-2" style={{ color: '#7c3aed', fontSize: '1rem' }}>📍</span>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
            {property.address?.city || 'City'}, {property.address?.state || 'State'}
          </span>
        </div>
        
        <Card.Title style={{ 
          color: '#111827', 
          fontSize: '1.1rem', 
          fontWeight: '600', 
          marginBottom: '10px',
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.3'
        }}>
          {property.title || 'Property Title'}
        </Card.Title>
        
        <Card.Text style={{ 
          fontSize: '0.85rem', 
          color: '#374151', 
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.5',
          flexGrow: 1,
          marginBottom: '12px'
        }}>
          {property.description ? 
            property.description.substring(0, 80) + '...' : 
            'Premium property with modern amenities and excellent location.'
          }
        </Card.Text>
        
        <div className="mb-3">
          {renderPropertyDetails()}
        </div>
        
        <div className="mt-auto">
          <div style={{ 
            fontSize: '1.2rem', 
            fontWeight: '700', 
            color: '#059669',
            marginBottom: '8px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            ₹{formatPrice(property.price) || '1,234'}/month
          </div>
          <small style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '12px', display: 'block' }}>
            Available for {getSafeRentType()}
          </small>
          
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              className="flex-fill"
              onClick={() => navigate(`/property/${property._id}`)}
              style={{ 
                borderRadius: '8px', 
                fontWeight: '600',
                fontSize: '0.75rem',
                padding: '8px 12px'
              }}
            >
              View Details
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              className="flex-fill"
              onClick={() => navigate(`/book/${property._id}`)}
              style={{ 
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                border: 'none',
                borderRadius: '8px', 
                fontWeight: '600',
                fontSize: '0.75rem',
                padding: '8px 12px'
              }}
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
