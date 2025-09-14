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

  // EXACT REFERENCE GRID VIEW CARD
  return (
    <Card className="h-100 shadow-sm border-0" style={{ 
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 30px rgba(124, 58, 237, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
    }}>
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
          alt={property.title}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '16px 16px 0 0'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '8px'
        }}>
          <Badge bg="success" style={{ 
            fontSize: '0.7rem', 
            padding: '6px 10px',
            borderRadius: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.025em',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            ✓ AVAILABLE
          </Badge>
          <Badge bg="primary" style={{ 
            fontSize: '0.7rem', 
            padding: '6px 10px',
            borderRadius: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.025em',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            ✓ VERIFIED
          </Badge>
        </div>
      </div>
      
      <Card.Body style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ marginRight: '6px', color: '#dc3545' }}>📍</span>
          <small style={{ 
            color: '#64748b', 
            textTransform: 'uppercase', 
            fontWeight: '600',
            fontSize: '0.8rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '0.5px'
          }}>
            {property.address?.city || 'NAMAKKAL'}, {property.address?.state || 'TAMIL NADU'}
          </small>
        </div>
        
        <Card.Title style={{ 
          fontSize: '1.3rem', 
          fontWeight: '700', 
          marginBottom: '8px',
          color: '#111827',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.01em',
          lineHeight: '1.3'
        }}>
          {property.title || 'land'}
        </Card.Title>
        
        <Card.Text style={{ 
          color: '#64748b', 
          marginBottom: '12px',
          fontSize: '0.9rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.5',
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
            borderRadius: '12px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            {property.category || 'Land'}
          </Badge>
          <small style={{ 
            color: '#64748b',
            fontSize: '0.8rem',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            {property.size || '10000'}
          </small>
        </div>

        {/* 🎯 RENT DISPLAY COMPLETELY FIXED - SINGLE FORMAT ONLY! */}
        <h5 style={{ 
          color: '#10b981', 
          fontWeight: '700', 
          margin: 0,
          marginBottom: '6px',
          fontSize: '1.3rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.01em'
        }}>
          ₹{getFormattedPrice()}/{getRentType()}
        </h5>
        <small style={{ 
          color: '#64748b', 
          display: 'block', 
          marginBottom: '16px',
          fontSize: '0.8rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
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
              borderWidth: '2px',
              borderColor: '#7c3aed',
              color: '#7c3aed',
              fontWeight: '600',
              fontFamily: 'Inter, system-ui, sans-serif',
              transition: 'all 0.3s ease'
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
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              border: 'none',
              fontWeight: '600',
              fontFamily: 'Inter, system-ui, sans-serif',
              transition: 'all 0.3s ease'
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
