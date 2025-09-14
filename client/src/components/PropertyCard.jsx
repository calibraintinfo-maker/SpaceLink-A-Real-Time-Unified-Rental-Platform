import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ 
  property, 
  viewMode = 'grid', 
  compact = false,
  onViewDetails, 
  onBookNow 
}) => {
  const navigate = useNavigate();
  
  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200/f8f9fa/6c757d?text=Property+Image';
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

  // COMPACT GRID VIEW CARD
  return (
    <Card className="h-100 shadow-sm border-0" style={{ 
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      maxHeight: compact ? '350px' : '400px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 25px rgba(124, 58, 237, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
    }}>
      <div style={{ position: 'relative', height: compact ? '160px' : '200px', overflow: 'hidden' }}>
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
          <Badge bg="success" className="me-1 fw-semibold shadow-sm" style={{
            borderRadius: '10px',
            padding: '4px 8px',
            fontSize: '0.65rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.025em'
          }}>
            ✓ AVAILABLE
          </Badge>
          <Badge bg="primary" className="fw-semibold shadow-sm" style={{
            borderRadius: '10px',
            padding: '4px 8px',
            fontSize: '0.65rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.025em'
          }}>
            ✓ VERIFIED
          </Badge>
        </div>
      </div>
      
      <Card.Body style={{ padding: compact ? '1rem' : '1.25rem' }}>
        <div className="d-flex align-items-center mb-2">
          <span className="me-1" style={{ color: '#7c3aed', fontSize: '0.9rem' }}>📍</span>
          <small style={{ 
            color: '#64748b', 
            textTransform: 'uppercase', 
            fontWeight: '600',
            fontSize: '0.75rem',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            {property.address?.city || 'NAMAKKAL'}, {property.address?.state || 'TAMIL NADU'}
          </small>
        </div>
        
        <Card.Title style={{ 
          fontSize: compact ? '1.1rem' : '1.3rem', 
          fontWeight: '700', 
          marginBottom: '6px',
          color: '#111827',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          {property.title || 'land'}
        </Card.Title>
        
        <Card.Text style={{ 
          color: '#64748b', 
          marginBottom: '8px',
          fontSize: '0.8rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.4',
          height: compact ? '2rem' : '2.5rem',
          overflow: 'hidden'
        }}>
          {property.description ? 
            property.description.substring(0, compact ? 60 : 80) + '...' : 
            'good place to agriculture...'
          }
        </Card.Text>
        
        <div style={{ marginBottom: '8px' }}>
          <Badge bg="primary" style={{ 
            marginRight: '6px',
            backgroundColor: '#7c3aed',
            fontSize: '0.7rem',
            padding: '4px 8px',
            borderRadius: '8px'
          }}>
            {property.category || 'Land'}
          </Badge>
          <small style={{ 
            color: '#64748b',
            fontSize: '0.75rem'
          }}>
            {property.size || '10000'}
          </small>
        </div>

        {/* 🎯 RENT DISPLAY FIXED - WHITE NUMBERS */}
        <div style={{ 
          color: '#10b981', 
          fontWeight: '700', 
          margin: 0,
          marginBottom: '4px',
          fontSize: compact ? '1.1rem' : '1.3rem',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          ₹{getFormattedPrice()}/{getRentType()}
        </div>
        <small style={{ 
          color: '#64748b', 
          display: 'block', 
          marginBottom: '12px',
          fontSize: '0.75rem'
        }}>
          Available for {getRentType()}
        </small>
        
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            className="flex-fill"
            size="sm"
            onClick={handleViewDetailsClick}
            style={{ 
              borderRadius: '8px', 
              fontSize: '0.75rem',
              padding: '8px',
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
            size="sm"
            onClick={handleBookNowClick}
            style={{ 
              borderRadius: '8px', 
              fontSize: '0.75rem',
              padding: '8px',
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
