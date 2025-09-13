import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ property, viewMode = 'grid', showOwner = false }) => {
  const navigate = useNavigate();

  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/350x200/f8fafc/64748b?text=Property+Image';
  };

  const renderPropertyDetails = () => {
    if (!property) return [];
    
    const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="info" className="me-1 mb-1" style={{ 
            fontSize: '0.65rem', 
            fontWeight: '600',
            padding: '4px 6px',
            borderRadius: '6px'
          }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="secondary" className="me-1 mb-1" style={{ 
            fontSize: '0.65rem', 
            fontWeight: '600',
            padding: '4px 6px',
            borderRadius: '6px'
          }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="warning" text="dark" className="me-1 mb-1" style={{ 
          fontSize: '0.65rem', 
          fontWeight: '600',
          padding: '4px 6px',
          borderRadius: '6px'
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

  // 🔥 PROFESSIONAL COMPACT GRID VIEW
  return (
    <Card className="h-100 border-0 shadow-sm" style={{ 
      borderRadius: '14px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff',
      minHeight: '350px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(124, 58, 237, 0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 3px 12px rgba(0, 0, 0, 0.08)';
    }}>
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
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
        <div className="position-absolute top-0 start-0 p-2">
          <Badge bg="success" className="me-1 fw-bold shadow" style={{
            borderRadius: '10px',
            padding: '4px 8px',
            fontSize: '0.6rem'
          }}>
            AVAILABLE
          </Badge>
          <Badge bg="primary" className="fw-bold shadow" style={{
            borderRadius: '10px',
            padding: '4px 8px',
            fontSize: '0.6rem'
          }}>
            VERIFIED
          </Badge>
        </div>
      </div>
      
      <Card.Body className="p-3 d-flex flex-column">
        <div className="d-flex align-items-center mb-2">
          <span className="me-2" style={{ color: '#7c3aed', fontSize: '0.8rem' }}>📍</span>
          <span style={{
            fontSize: '0.75rem',
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
          fontSize: '1rem',
          fontWeight: '700',
          marginBottom: '8px',
          fontFamily: "'Inter', sans-serif",
          lineHeight: '1.3'
        }}>
          {property.title || 'Premium Property'}
        </Card.Title>
        
        <Card.Text style={{
          fontSize: '0.8rem',
          lineHeight: '1.5',
          color: '#4b5563',
          fontFamily: "'Inter', sans-serif",
          marginBottom: '12px',
          flexGrow: 1
        }}>
          {property.description ? 
            property.description.substring(0, 70) + '...' : 
            'Premium property with modern amenities.'
          }
        </Card.Text>
        
        <div className="mb-2">
          <div className="d-flex flex-wrap">
            {renderPropertyDetails()}
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
            fontWeight: '500',
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
                fontSize: '0.7rem',
                padding: '8px 10px',
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
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.7rem',
                padding: '8px 10px'
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
