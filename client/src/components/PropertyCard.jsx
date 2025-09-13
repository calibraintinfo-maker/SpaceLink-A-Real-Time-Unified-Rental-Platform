import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ property, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200/f8fafc/64748b?text=Property';
  };

  const renderDetails = () => {
    const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="beds" bg="info" className="me-1 mb-1" style={{ fontSize: '0.6rem', padding: '3px 6px' }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="baths" bg="secondary" className="me-1 mb-1" style={{ fontSize: '0.6rem', padding: '3px 6px' }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="size" bg="warning" text="dark" className="me-1 mb-1" style={{ fontSize: '0.6rem', padding: '3px 6px' }}>
          {property.size}
        </Badge>
      );
    }

    return details;
  };

  const handleViewDetails = () => navigate(`/property/${property._id}`);
  const handleBookNow = () => navigate(`/book/${property._id}`);

  if (viewMode === 'list') {
    // 🎯 PERFECT COMPACT LIST VIEW
    return (
      <Card className="mb-2 border-0" style={{ 
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(124, 58, 237, 0.08)',
        minHeight: '120px'
      }}>
        <Row className="g-0 align-items-center">
          <Col md={3}>
            <div style={{ position: 'relative', height: '120px' }}>
              <img
                src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
                alt={property.title}
                onError={handleImageError}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px 0 0 10px' }}
              />
              <div className="position-absolute top-0 start-0 p-2">
                <Badge bg="success" className="me-1" style={{ fontSize: '0.6rem', padding: '3px 6px' }}>
                  AVAILABLE
                </Badge>
                <Badge bg="primary" style={{ fontSize: '0.6rem', padding: '3px 6px' }}>
                  VERIFIED
                </Badge>
              </div>
            </div>
          </Col>
          
          <Col md={6} className="px-3 py-2">
            <div className="d-flex align-items-center mb-1">
              <span style={{ color: '#7c3aed', fontSize: '0.7rem' }}>📍</span>
              <span style={{
                fontSize: '0.7rem',
                color: '#64748b',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                marginLeft: '4px'
              }}>
                {property.address?.city || 'Namakkal'}, {property.address?.state || 'TN'}
              </span>
            </div>
            
            <h6 style={{
              color: '#1f2937',
              fontSize: '0.9rem',
              fontWeight: '700',
              marginBottom: '4px',
              fontFamily: "'Inter', sans-serif"
            }}>
              {property.title || 'Premium Property'}
            </h6>
            
            <p style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              marginBottom: '6px',
              fontFamily: "'Inter', sans-serif"
            }}>
              {property.description ? property.description.substring(0, 60) + '...' : 'Premium property with excellent location'}
            </p>
            
            <div className="d-flex flex-wrap gap-1">
              {renderDetails()}
            </div>
          </Col>
          
          <Col md={3} className="px-2 py-2 text-end">
            <div style={{
              fontSize: '1rem',
              fontWeight: '800',
              color: '#059669',
              marginBottom: '2px',
              fontFamily: "'Inter', sans-serif"
            }}>
              ₹{formatPrice(property.price) || '1,22,345'}
            </div>
            <small style={{
              fontSize: '0.65rem',
              color: '#64748b',
              fontFamily: "'Inter', sans-serif",
              display: 'block',
              marginBottom: '8px'
            }}>
              per month
            </small>
            
            <div className="d-flex gap-1 justify-content-end">
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={handleViewDetails}
                style={{
                  fontSize: '0.65rem',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  borderColor: '#7c3aed',
                  color: '#7c3aed'
                }}
              >
                VIEW
              </Button>
              <Button 
                size="sm"
                onClick={handleBookNow}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  border: 'none',
                  fontSize: '0.65rem',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: '600'
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

  // 🎯 PERFECT COMPACT GRID VIEW
  return (
    <Card className="h-100 border-0" style={{ 
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.08)',
      transition: 'all 0.3s ease',
      minHeight: '320px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.08)';
    }}>
      <div style={{ position: 'relative', height: '160px' }}>
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
        <div className="position-absolute top-0 start-0 p-2">
          <Badge bg="success" className="me-1" style={{ fontSize: '0.6rem', padding: '4px 8px', borderRadius: '8px' }}>
            AVAILABLE
          </Badge>
          <Badge bg="primary" style={{ fontSize: '0.6rem', padding: '4px 8px', borderRadius: '8px' }}>
            VERIFIED
          </Badge>
        </div>
      </div>
      
      <Card.Body className="p-3 d-flex flex-column">
        <div className="d-flex align-items-center mb-2">
          <span style={{ color: '#7c3aed', fontSize: '0.8rem' }}>📍</span>
          <span style={{
            fontSize: '0.75rem',
            color: '#64748b',
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            marginLeft: '4px'
          }}>
            {property.address?.city || 'Namakkal'}, {property.address?.state || 'TN'}
          </span>
        </div>
        
        <Card.Title style={{
          color: '#1f2937',
          fontSize: '1rem',
          fontWeight: '700',
          marginBottom: '8px',
          fontFamily: "'Inter', sans-serif"
        }}>
          {property.title || 'Premium Property'}
        </Card.Title>
        
        <Card.Text style={{
          fontSize: '0.8rem',
          color: '#6b7280',
          marginBottom: '10px',
          fontFamily: "'Inter', sans-serif",
          flexGrow: 1
        }}>
          {property.description ? 
            property.description.substring(0, 70) + '...' : 
            'Premium property with modern amenities'
          }
        </Card.Text>
        
        <div className="mb-2">
          <div className="d-flex flex-wrap gap-1">
            {renderDetails()}
          </div>
        </div>
        
        <div className="mt-auto">
          <div style={{
            fontSize: '1.1rem',
            fontWeight: '800',
            color: '#059669',
            marginBottom: '4px',
            fontFamily: "'Inter', sans-serif"
          }}>
            ₹{formatPrice(property.price) || '1,234'}/month
          </div>
          <small style={{
            color: '#64748b',
            fontSize: '0.7rem',
            fontFamily: "'Inter', sans-serif",
            marginBottom: '10px',
            display: 'block'
          }}>
            Available for rental
          </small>
          
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              className="flex-fill"
              onClick={handleViewDetails}
              style={{
                fontSize: '0.7rem',
                padding: '6px 8px',
                borderRadius: '6px',
                fontWeight: '600',
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
                fontSize: '0.7rem',
                padding: '6px 8px',
                borderRadius: '6px',
                fontWeight: '600'
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
