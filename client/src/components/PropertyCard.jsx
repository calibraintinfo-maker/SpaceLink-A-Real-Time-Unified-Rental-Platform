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
    // Main Card Container - Light Theme Premium
    propertyCard: {
      background: '#ffffff', // Pure white background
      border: '1px solid #e2e8f0', // Light gray border
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      cursor: 'pointer',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: isHovered 
        ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)' 
        : '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.03)',
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

    // Light Image Overlay
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
      opacity: isHovered ? 0.5 : 0.2,
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

    // Light Theme Badges
    primaryBadge: {
      background: '#6366f1', // Solid purple
      color: 'white',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '0.7rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },

    secondaryBadge: {
      background: 'rgba(255, 255, 255, 0.95)', // Almost opaque white
      color: '#374151', // Dark gray text
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '0.7rem',
      fontWeight: 600,
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },

    imageBadge: {
      background: '#10b981', // Solid green
      color: 'white',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '0.7rem',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },

    // Card Body - Light Theme
    cardBody: {
      background: '#ffffff', // Pure white
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      position: 'relative'
    },

    // Title Styling - Dark Text
    propertyTitle: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: '#0f172a', // Dark text
      marginBottom: '8px',
      lineHeight: 1.3,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },

    // Location Styling - Light Theme
    locationText: {
      color: '#64748b', // Medium gray
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

    // Description Styling - Light Theme
    descriptionText: {
      color: '#475569', // Darker gray for readability
      fontSize: '0.85rem',
      lineHeight: 1.4,
      marginBottom: '16px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      flexGrow: 1
    },

    // Price and Size Container - Light Theme
    priceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
      padding: '12px',
      background: '#f8fafc', // Light gray background
      borderRadius: '10px',
      border: '1px solid #e2e8f0'
    },

    priceBadge: {
      color: '#059669', // Green for price
      fontSize: '1.1rem',
      fontWeight: 900
    },

    sizeText: {
      color: '#64748b', // Medium gray
      fontSize: '0.85rem',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },

    // Owner Info - Light Theme
    ownerInfo: {
      color: '#475569', // Darker gray
      fontSize: '0.8rem',
      marginBottom: '16px',
      padding: '8px 12px',
      background: '#f1f5f9', // Very light gray
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
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

    // Primary Button - Light Theme
    primaryButton: {
      flex: 1,
      padding: '12px 16px',
      background: '#6366f1', // Solid purple
      border: 'none',
      borderRadius: '8px',
      color: 'white',
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
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
    },

    // Secondary Button - Light Theme
    secondaryButton: {
      flex: 1,
      padding: '12px 16px',
      background: '#10b981', // Solid green
      border: 'none',
      borderRadius: '8px',
      color: 'white',
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
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
    }
  };

  // Button Hover Handlers - Updated for Light Theme
  const handlePrimaryHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.background = '#4f46e5'; // Darker purple
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
    } else {
      e.target.style.background = '#6366f1';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
    }
  };

  const handleSecondaryHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.background = '#059669'; // Darker green
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
    } else {
      e.target.style.background = '#10b981';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
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
