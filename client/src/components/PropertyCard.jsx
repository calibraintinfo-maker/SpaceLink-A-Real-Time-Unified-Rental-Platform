import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = React.memo(({ 
  property, 
  showOwner = false,
  onViewDetails, 
  onBookNow 
}) => {
  const navigate = useNavigate();
  
  if (!property) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/350x200/f8f9fa/6c757d?text=Property+Image';
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
          <Badge key="bedrooms" bg="light" text="dark" className="me-1 mb-1" style={{ 
            fontSize: '0.7rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.375rem'
          }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms && property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-1 mb-1" style={{ 
            fontSize: '0.7rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.375rem'
          }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-1 mb-1" style={{ 
          fontSize: '0.7rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem'
        }}>
          {property.size}
        </Badge>
      );
    }

    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="info" className="me-1 mb-1" style={{ 
          fontSize: '0.7rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem'
        }}>
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
    <Card style={{ 
      borderRadius: '1rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      boxShadow: '0 0.25rem 0.9375rem rgba(0, 0, 0, 0.08)',
      height: '100%',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-0.25rem)';
      e.currentTarget.style.boxShadow = '0 0.75rem 1.875rem rgba(124, 58, 237, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 0.25rem 0.9375rem rgba(0, 0, 0, 0.08)';
    }}>
      <div style={{ position: 'relative', height: '12.5rem', overflow: 'hidden' }}>
        <img
          src={getImageUrl(Array.isArray(property.images) ? property.images[0] : property.image)}
          alt={property.title}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '1rem 1rem 0 0'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          display: 'flex',
          gap: '0.375rem'
        }}>
          <Badge style={{
            backgroundColor: '#059669',
            color: 'white',
            fontSize: '0.65rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.015625rem',
            boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)',
            border: 'none'
          }}>
            ✓ AVAILABLE
          </Badge>
          <Badge style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '0.65rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.015625rem',
            boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)',
            border: 'none'
          }}>
            ✓ VERIFIED
          </Badge>
        </div>
      </div>
      
      <Card.Body style={{ padding: '1.25rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '0.5rem' 
        }}>
          <span style={{ 
            marginRight: '0.375rem', 
            color: '#7c3aed', 
            fontSize: '0.875rem' 
          }}>📍</span>
          <small style={{ 
            color: '#64748b', 
            textTransform: 'uppercase', 
            fontWeight: '600',
            fontSize: '0.75rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '0.03125rem'
          }}>
            {property.address?.city || 'NAMAKKAL'}, {property.address?.state || 'TAMIL NADU'}
          </small>
        </div>
        
        <Card.Title style={{ 
          fontSize: '1.25rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          color: '#111827',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.00625rem',
          lineHeight: '1.3'
        }}>
          {property.title || 'Property Title'}
        </Card.Title>
        
        <Card.Text style={{ 
          color: '#64748b', 
          marginBottom: '0.75rem',
          fontSize: '0.875rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.5',
          height: '2.5rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {property.description ? 
            property.description : 
            'Premium property with modern amenities and excellent location.'
          }
        </Card.Text>
        
        <div style={{ marginBottom: '0.75rem' }}>
          <Badge style={{ 
            marginRight: '0.5rem',
            backgroundColor: '#7c3aed',
            color: 'white',
            fontSize: '0.7rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            border: 'none'
          }}>
            {property.category || 'Property'}
          </Badge>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.25rem', 
            marginTop: '0.5rem' 
          }}>
            {renderPropertyDetails()}
          </div>
        </div>

        {/* 🎯 RENT DISPLAY COMPLETELY FIXED - SINGLE FORMAT ONLY! */}
        <div style={{ 
          color: '#10b981', 
          fontWeight: '700', 
          marginBottom: '0.25rem',
          fontSize: '1.25rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.00625rem'
        }}>
          ₹{getFormattedPrice()}/{getRentType()}
        </div>
        <small style={{ 
          color: '#64748b', 
          display: 'block', 
          marginBottom: '1rem',
          fontSize: '0.75rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.03125rem'
        }}>
          Available for {getRentType()}
        </small>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="outline-primary"
            style={{ 
              flex: 1,
              borderRadius: '0.5rem', 
              fontSize: '0.8rem',
              padding: '0.625rem 1rem',
              borderWidth: '1.5px',
              borderColor: '#7c3aed',
              color: '#7c3aed',
              fontWeight: '600',
              fontFamily: 'Inter, system-ui, sans-serif',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.015625rem'
            }}
            onClick={handleViewDetailsClick}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
              e.target.style.color = '#1f2937';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#7c3aed';
            }}
          >
            View Details
          </Button>
          <Button
            style={{ 
              flex: 1,
              borderRadius: '0.5rem', 
              fontSize: '0.8rem',
              padding: '0.625rem 1rem',
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              border: 'none',
              color: 'white',
              fontWeight: '600',
              fontFamily: 'Inter, system-ui, sans-serif',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.015625rem'
            }}
            onClick={handleBookNowClick}
            onMouseEnter={(e) => {
              e.target.style.filter = 'brightness(1.1)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.filter = 'brightness(1)';
              e.target.style.transform = 'translateY(0)';
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
