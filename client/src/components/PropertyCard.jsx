import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = ({ property, showOwner = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the first image from images array, or fallback to single image field
  const displayImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : property.image;

  const styles = {
    // Main Card Container - Ultra Premium Glass
    propertyCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      cursor: 'pointer',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: isHovered 
        ? '0 25px 60px rgba(0, 0, 0, 0.25), 0 12px 30px rgba(0, 0, 0, 0.15)' 
        : '0 12px 40px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.1)',
      transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
      position: 'relative'
    },

    // Image Container - Enhanced
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: '220px',
      overflow: 'hidden'
    },

    propertyImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.4s ease',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)'
    },

    // Image Overlay Gradient
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
      opacity: isHovered ? 0.7 : 0.4,
      transition: 'opacity 0.3s ease'
    },

    // Badge Container
    badgeContainer: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
      zIndex: 10
    },

    // Premium Badges
    primaryBadge: {
      background: 'rgba(59, 130, 246, 0.9)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '0.7rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },

    secondaryBadge: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      color: '#374151',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '0.7rem',
      fontWeight: 600,
      border: '1px solid rgba(0, 0, 0, 0.1)'
    },

    imageBadge: {
      background: 'rgba(16, 185, 129, 0.9)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '0.7rem',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },

    // Card Body - Premium Glass
    cardBody: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      position: 'relative'
    },

    // Title Styling
    propertyTitle: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: 'white',
      marginBottom: '8px',
      lineHeight: 1.3,
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },

    // Location Styling
    locationText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.9rem',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontWeight: 500
    },

    locationIcon: {
      fontSize: '0.9rem',
      opacity: 0.8
    },

    // Description Styling
    descriptionText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.85rem',
      lineHeight: 1.4,
      marginBottom: '16px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      flexGrow: 1
    },

    // Price and Size Container
    priceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
      padding: '12px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },

    priceBadge: {
      background: 'linear-gradient(135deg, #ffd700, #ffb347)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontSize: '1.1rem',
      fontWeight: 900,
      textShadow: 'none'
    },

    sizeText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.85rem',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },

    // Owner Info
    ownerInfo: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.8rem',
      marginBottom: '16px',
      padding: '8px 12px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },

    // Button Container
    buttonContainer: {
      display: 'flex',
      gap: '8px',
      marginTop: 'auto'
    },

    // Primary Button - Premium Glass
    primaryButton: {
      flex: 1,
      padding: '12px 16px',
      background: 'rgba(59, 130, 246, 0.2)',
      backdropFilter: 'blur(10px) saturate(180%)',
      WebkitBackdropFilter: 'blur(10px) saturate(180%)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '8px',
      color: '#60a5fa',
      fontSize: '0.85rem',
      fontWeight: 700,
      textDecoration: 'none',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
    },

    // Secondary Button - Premium Glass
    secondaryButton: {
      flex: 1,
      padding: '12px 16px',
      background: 'rgba(16, 185, 129, 0.2)',
      backdropFilter: 'blur(10px) saturate(180%)',
      WebkitBackdropFilter: 'blur(10px) saturate(180%)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '8px',
      color: '#10b981',
      fontSize: '0.85rem',
      fontWeight: 700,
      textDecoration: 'none',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
    },

    // Hover Effects
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
    },

    secondaryButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
    }
  };

  // Button Hover Handlers
  const handlePrimaryHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.background = 'rgba(59, 130, 246, 0.3)';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
    } else {
      e.target.style.background = 'rgba(59, 130, 246, 0.2)';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
    }
  };

  const handleSecondaryHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.background = 'rgba(16, 185, 129, 0.3)';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
    } else {
      e.target.style.background = 'rgba(16, 185, 129, 0.2)';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)';
    }
  };

  return (
    <div
      style={styles.propertyCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div style={styles.imageContainer}>
        <img 
          src={getImageUrl(displayImage)} 
          alt={property.title}
          style={styles.propertyImage}
        />
        <div style={styles.imageOverlay} />
        
        {/* Badges */}
        <div style={styles.badgeContainer}>
          <div style={styles.primaryBadge}>
            {property.category}
          </div>
          {property.subtype && (
            <div style={styles.secondaryBadge}>
              {property.subtype}
            </div>
          )}
          {property.images && property.images.length > 1 && (
            <div style={styles.imageBadge}>
              <span>📸</span>
              <span>{property.images.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div style={styles.cardBody}>
        {/* Title */}
        <h3 style={styles.propertyTitle}>
          {property.title}
        </h3>
        
        {/* Location */}
        <div style={styles.locationText}>
          <span style={styles.locationIcon}>📍</span>
          <span>{property.address.city}, {property.address.state}</span>
        </div>
        
        {/* Description */}
        <p style={styles.descriptionText}>
          {property.description}
        </p>
        
        {/* Price and Size */}
        <div style={styles.priceContainer}>
          <div style={styles.priceBadge}>
            {formatPrice(property.price, property.rentType[0])}
          </div>
          <div style={styles.sizeText}>
            <span>📐</span>
            <span>{property.size}</span>
          </div>
        </div>
        
        {/* Owner Info */}
        {showOwner && property.ownerId && (
          <div style={styles.ownerInfo}>
            <span>👤</span>
            <span>{property.ownerId.name}</span>
          </div>
        )}
        
        {/* Action Buttons */}
        <div style={styles.buttonContainer}>
          <Link 
            to={`/property/${property._id}`}
            style={styles.primaryButton}
            onMouseEnter={(e) => handlePrimaryHover(e, true)}
            onMouseLeave={(e) => handlePrimaryHover(e, false)}
          >
            View Details
          </Link>
          <Link 
            to={`/book/${property._id}`}
            style={styles.secondaryButton}
            onMouseEnter={(e) => handleSecondaryHover(e, true)}
            onMouseLeave={(e) => handleSecondaryHover(e, false)}
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
