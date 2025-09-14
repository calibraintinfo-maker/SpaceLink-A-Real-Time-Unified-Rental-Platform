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

  // 🎯 RENT TYPE COMPLETELY FIXED - NO MORE DUPLICATES FOREVER!
  const getRentType = () => {
    const price = Number(property.price) || 0;
    return price > 100000 ? 'yearly' : 'monthly';
  };

  const getFormattedPrice = () => {
    const price = Number(property.price) || 0;
    return price.toLocaleString('en-IN');
  };

  const renderPropertyDetails = () => {
    const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms && property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms && property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
          {property.size}
        </Badge>
      );
    }

    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="info" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
          {property.capacity}
        </Badge>
      );
    }

    return details;
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

  // PROFESSIONAL GRID VIEW CARD
  return (
    <Card className="h-100 shadow-sm border-0" style={{ 
      borderRadius: '20px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }}>
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img
          src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
          alt={property.title}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '20px 20px 0 0'
          }}
        />
        <div className="position-absolute top-0 start-0 p-3">
          <Badge bg="success" className="me-2 fw-semibold shadow-sm" style={{
            borderRadius: '20px',
            padding: '8px 14px',
            fontSize: '0.75rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.025em'
          }}>
            ✓ Available
          </Badge>
          <Badge bg="primary" className="fw-semibold shadow-sm" style={{
            borderRadius: '20px',
            padding: '8px 14px',
            fontSize: '0.75rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.025em'
          }}>
            ✓ Verified
          </Badge>
        </div>
      </div>
      
      <Card.Body className="p-4">
        <div className="d-flex align-items-center mb-3">
          <span className="me-2" style={{ color: '#7c3aed', fontSize: '1.1rem' }}>📍</span>
          <span style={{
            fontSize: '0.9rem',
            color: '#64748b',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {property.address?.city || 'NAMAKKAL'}, {property.address?.state || 'TAMIL NADU'}
          </span>
        </div>
        
        <Card.Title style={{
          color: '#111827',
          fontSize: '1.4rem',
          lineHeight: '1.3',
          fontWeight: '800',
          marginBottom: '12px',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.015em'
        }}>
          {property.title || 'land'}
        </Card.Title>
        
        <p className="mb-3" style={{
          fontSize: '0.9rem',
          lineHeight: '1.5',
          color: '#374151',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: '400',
          height: '3rem',
          overflow: 'hidden'
        }}>
          {property.description ? 
            property.description.substring(0, 80) + '...' : 
            'good place to agriculture...'
          }
        </p>
        
        <div className="mb-3">
          <Badge bg="primary" style={{
            marginRight: '8px',
            backgroundColor: '#7c3aed',
            fontSize: '0.8rem',
            padding: '6px 12px',
            borderRadius: '20px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            {property.category || 'Land'}
          </Badge>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {renderPropertyDetails()}
          </div>
        </div>

        {/* 🎯 RENT DISPLAY COMPLETELY FIXED - SINGLE FORMAT ONLY! */}
        <div style={{
          fontSize: '1.4rem',
          fontWeight: '800',
          color: '#059669',
          marginBottom: '4px',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.01em'
        }}>
          ₹{getFormattedPrice()}/{getRentType()}
        </div>
        <small style={{
          color: '#64748b',
          fontSize: '0.8rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'block',
          marginBottom: '16px'
        }}>
          Available for {getRentType()}
        </small>
        
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            className="flex-fill"
            style={{
              borderRadius: '12px',
              padding: '12px',
              borderWidth: '2px',
              fontWeight: '700',
              fontSize: '0.8rem',
              borderColor: '#7c3aed',
              color: '#7c3aed',
              fontFamily: 'Inter, system-ui, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onClick={handleViewDetailsClick}
          >
            View Details
          </Button>
          <Button
            className="flex-fill"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px',
              fontWeight: '700',
              fontSize: '0.8rem',
              fontFamily: 'Inter, system-ui, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onClick={handleBookNowClick}
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
