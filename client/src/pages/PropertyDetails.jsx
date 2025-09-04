import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Carousel, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { api, handleApiError, formatPrice, getImageUrl } from '../utils/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookingHovered, setIsBookingHovered] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await api.properties.getById(id);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Property Rentals': '🏠',
      'Commercial': '🏢',
      'Land': '🌾',
      'Parking': '🚗',
      'Event': '🎉'
    };
    return icons[category] || '🏠';
  };

  const styles = {
    // Premium page container
    pageContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      paddingTop: '2rem',
      paddingBottom: '3rem'
    },

    // Professional back button
    backButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '12px 20px',
      color: 'rgba(255, 255, 255, 0.9)',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '2rem'
    },

    // MUCH smaller, well-proportioned carousel
    carouselContainer: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '20px',
      overflow: 'hidden',
      marginBottom: '2.5rem',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
      position: 'relative',
      maxWidth: '800px', // Constrained width
      margin: '0 auto 2.5rem auto' // Centered
    },

    // Perfect carousel image size
    carouselImage: {
      height: '280px', // Much smaller than before
      width: '100%',
      objectFit: 'cover',
      borderRadius: '20px'
    },

    // Elegant image counter
    imageCounter: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '700',
      zIndex: 10,
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },

    // Perfect content layout
    contentLayout: {
      display: 'flex',
      gap: '2.5rem',
      alignItems: 'flex-start',
      maxWidth: '1200px',
      margin: '0 auto'
    },

    // Larger, more prominent details card
    detailsCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '24px',
      padding: '2.5rem', // More generous padding
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
      color: 'white',
      flex: 1
    },

    // Professional badge styling
    badgeContainer: {
      display: 'flex',
      gap: '10px',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },

    primaryBadge: {
      background: 'rgba(59, 130, 246, 0.2)',
      backdropFilter: 'blur(8px)',
      color: '#60a5fa',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '20px',
      padding: '6px 14px', // More padding
      fontSize: '0.8rem',
      fontWeight: '700'
    },

    secondaryBadge: {
      background: 'rgba(107, 114, 128, 0.2)',
      backdropFilter: 'blur(8px)',
      color: '#9ca3af',
      border: '1px solid rgba(107, 114, 128, 0.3)',
      borderRadius: '20px',
      padding: '6px 14px',
      fontSize: '0.8rem',
      fontWeight: '700'
    },

    infoBadge: {
      background: 'rgba(16, 185, 129, 0.2)',
      backdropFilter: 'blur(8px)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '20px',
      padding: '6px 14px',
      fontSize: '0.8rem',
      fontWeight: '700'
    },

    // Perfect typography hierarchy
    propertyTitle: {
      fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', // Larger title
      fontWeight: '800',
      marginBottom: '1.5rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: 1.2
    },

    // Prominent price container
    priceContainer: {
      background: 'rgba(34, 197, 94, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      borderRadius: '16px',
      padding: '1.5rem', // More padding
      marginBottom: '2rem'
    },

    priceText: {
      fontSize: '1.8rem', // Larger price
      fontWeight: '800',
      color: '#22c55e',
      marginBottom: '0.5rem'
    },

    addressText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1rem', // Larger address text
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    // Better details grid
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1.2rem', // More gap
      marginBottom: '2rem'
    },

    detailItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '1rem', // More padding
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '0.9rem' // Larger font
    },

    detailIcon: {
      fontSize: '1.1rem',
      opacity: 0.8
    },

    detailLabel: {
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.9)'
    },

    detailValue: {
      color: 'rgba(255, 255, 255, 0.7)',
      marginLeft: 'auto',
      fontSize: '0.85rem'
    },

    // Enhanced description section
    descriptionSection: {
      marginBottom: '2rem'
    },

    sectionTitle: {
      fontSize: '1.2rem', // Larger section titles
      fontWeight: '700',
      marginBottom: '1rem',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    descriptionText: {
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.7',
      fontSize: '1rem', // Larger description text
      whiteSpace: 'pre-line'
    },

    // Enhanced owner section
    ownerSection: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '1.5rem', // More padding
      marginTop: '2rem'
    },

    ownerInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },

    ownerAvatar: {
      width: '56px', // Larger avatar
      height: '56px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.4rem',
      fontWeight: '700',
      color: 'white'
    },

    ownerName: {
      fontSize: '1.1rem', // Larger name
      fontWeight: '700',
      color: 'white',
      marginBottom: '0.25rem'
    },

    ownerContact: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9rem' // Larger contact text
    },

    // Perfect booking sidebar
    bookingSidebar: {
      width: '380px', // Slightly wider
      minWidth: '380px'
    },

    bookingCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
      position: 'sticky',
      top: '2rem',
      marginBottom: '2rem'
    },

    bookingHeader: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      padding: '1.2rem',
      textAlign: 'center'
    },

    bookingHeaderTitle: {
      fontSize: '1.1rem', // Larger header
      fontWeight: '700',
      color: 'white',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },

    bookingBody: {
      padding: '2rem' // More padding
    },

    bookingPrice: {
      textAlign: 'center',
      marginBottom: '2rem'
    },

    bookingPriceAmount: {
      fontSize: '1.8rem', // Larger booking price
      fontWeight: '800',
      color: '#22c55e',
      marginBottom: '0.5rem'
    },

    bookingPriceNote: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9rem'
    },

    bookingButton: {
      width: '100%',
      background: isBookingHovered 
        ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
        : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      border: 'none',
      borderRadius: '16px',
      padding: '1rem 1.5rem', // Larger button
      color: 'white',
      fontSize: '1.1rem', // Larger button text
      fontWeight: '700',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      boxShadow: '0 12px 30px rgba(34, 197, 94, 0.3)',
      marginBottom: '1.5rem',
      transform: isBookingHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)'
    },

    paymentNote: {
      textAlign: 'center',
      background: 'rgba(255, 193, 7, 0.15)',
      border: '1px solid rgba(255, 193, 7, 0.3)',
      borderRadius: '12px',
      padding: '12px',
      color: '#fbbf24',
      fontSize: '0.85rem',
      fontWeight: '600',
      marginBottom: '1.5rem'
    },

    // Enhanced features list
    featuresList: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '1.5rem', // More padding
      marginBottom: '1.5rem'
    },

    featuresTitle: {
      fontSize: '1rem', // Larger features title
      fontWeight: '700',
      color: 'white',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.9rem' // Larger feature text
    },

    featureIcon: {
      color: '#22c55e',
      fontSize: '1rem'
    },

    // Enhanced contact card
    contactCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '1.5rem' // More padding
    },

    contactTitle: {
      fontSize: '1rem', // Larger contact title
      fontWeight: '700',
      color: 'white',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    contactInfo: {
      marginBottom: '1rem'
    },

    contactLabel: {
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '0.25rem',
      fontSize: '0.85rem'
    },

    contactValue: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.85rem'
    },

    // Loading states
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'white'
    },

    loadingSpinner: {
      marginBottom: '1rem'
    },

    loadingText: {
      fontSize: '1.1rem',
      fontWeight: '600'
    },

    errorContainer: {
      background: 'rgba(239, 68, 68, 0.15)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center',
      color: '#fca5a5'
    }
  };

  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <Container>
          <div style={styles.loadingContainer}>
            <Spinner animation="border" style={styles.loadingSpinner} />
            <p style={styles.loadingText}>Loading property details...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.pageContainer}>
        <Container>
          <div style={styles.errorContainer}>
            <h4>⚠️ Error Loading Property</h4>
            <p>{error}</p>
            <Button 
              as={Link} 
              to="/find-property" 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                marginTop: '1rem'
              }}
            >
              ← Back to Properties
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  if (!property) {
    return (
      <div style={styles.pageContainer}>
        <Container>
          <div style={styles.errorContainer}>
            <h4>🏠 Property Not Found</h4>
            <p>The property you're looking for doesn't exist or has been removed.</p>
            <Button 
              as={Link} 
              to="/find-property" 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                marginTop: '1rem'
              }}
            >
              ← Back to Properties
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      {/* World-class professional CSS */}
      <style>
        {`
          .back-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            color: white !important;
            transform: translateX(-4px) !important;
          }
          
          .carousel {
            max-width: 800px;
            margin: 0 auto;
          }
          
          .carousel-item img {
            height: 280px !important;
            width: 100% !important;
            object-fit: cover !important;
            border-radius: 20px !important;
          }
          
          .carousel-control-prev, .carousel-control-next {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 50% !important;
            width: 50px !important;
            height: 50px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            opacity: 0.8 !important;
            transition: all 0.3s ease !important;
          }
          
          .carousel-control-prev:hover, .carousel-control-next:hover {
            opacity: 1 !important;
            transform: translateY(-50%) scale(1.1) !important;
            background: rgba(0, 0, 0, 0.8) !important;
          }
          
          .carousel-control-prev {
            left: 20px !important;
          }
          
          .carousel-control-next {
            right: 20px !important;
          }
          
          .carousel-indicators {
            bottom: 20px !important;
            margin-bottom: 0 !important;
          }
          
          .carousel-indicators [data-bs-target] {
            background-color: rgba(255, 255, 255, 0.5) !important;
            border-radius: 12px !important;
            width: 14px !important;
            height: 4px !important;
            border: none !important;
            transition: all 0.3s ease !important;
          }
          
          .carousel-indicators .active {
            background-color: #3b82f6 !important;
            width: 28px !important;
          }
          
          .carousel-caption {
            background: rgba(0, 0, 0, 0.7) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 16px !important;
            bottom: 30px !important;
            left: 25px !important;
            right: 25px !important;
            padding: 12px 18px !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
          
          @media (max-width: 768px) {
            .content-layout {
              flex-direction: column !important;
              gap: 2rem !important;
            }
            
            .booking-sidebar {
              width: 100% !important;
              min-width: unset !important;
            }
            
            .booking-card {
              position: static !important;
            }
            
            .details-grid {
              grid-template-columns: 1fr !important;
            }
            
            .carousel-item img {
              height: 220px !important;
            }
            
            .carousel-control-prev, .carousel-control-next {
              width: 45px !important;
              height: 45px !important;
            }
          }
          
          @media (max-width: 480px) {
            .carousel-item img {
              height: 200px !important;
            }
          }
        `}
      </style>

      <div style={styles.pageContainer}>
        <Container>
          {/* Professional Back Button */}
          <Link
            to="/find-property"
            style={styles.backButton}
            className="back-btn"
          >
            <span>←</span>
            <span>Back to Properties</span>
          </Link>

          {/* Perfect-sized Carousel - Centered & Constrained */}
          <div style={styles.carouselContainer}>
            {property.images && property.images.length > 0 ? (
              <>
                <div style={styles.imageCounter}>
                  {activeImageIndex + 1} / {property.images.length}
                </div>
                <Carousel
                  activeIndex={activeImageIndex}
                  onSelect={(selectedIndex) => setActiveImageIndex(selectedIndex)}
                  interval={2000}
                  fade={false}
                  controls={property.images.length > 1}
                  indicators={property.images.length > 1}
                  pause="hover"
                >
                  {property.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img 
                        src={getImageUrl(image)} 
                        alt={`${property.title} - Image ${index + 1}`}
                        style={styles.carouselImage}
                      />
                      <Carousel.Caption>
                        <p style={{ 
                          margin: 0, 
                          fontWeight: '600', 
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.9)'
                        }}>
                          {property.title} - Gallery {index + 1}
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </>
            ) : property.image ? (
              <img 
                src={getImageUrl(property.image)} 
                alt={property.title}
                style={styles.carouselImage}
              />
            ) : (
              <div style={{
                ...styles.carouselImage,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem'
              }}>
                📷 No images available
              </div>
            )}
          </div>

          {/* Perfect Professional Content Layout */}
          <div style={styles.contentLayout} className="content-layout">
            {/* Enhanced Property Details */}
            <div style={styles.detailsCard}>
              {/* Professional Badges */}
              <div style={styles.badgeContainer}>
                <span style={styles.primaryBadge}>
                  {getCategoryIcon(property.category)} {property.category}
                </span>
                {property.subtype && (
                  <span style={styles.secondaryBadge}>
                    {property.subtype}
                  </span>
                )}
                {property.rentType.map(type => (
                  <span key={type} style={styles.infoBadge}>
                    {type}
                  </span>
                ))}
              </div>

              {/* Prominent Title */}
              <h1 style={styles.propertyTitle}>
                {property.title}
              </h1>

              {/* Enhanced Price Display */}
              <div style={styles.priceContainer}>
                <div style={styles.priceText}>
                  {formatPrice(property.price, property.rentType[0])}
                </div>
                <div style={styles.addressText}>
                  <span>📍</span>
                  <span>
                    {property.address.street && `${property.address.street}, `}
                    {property.address.city}, {property.address.state} - {property.address.pincode}
                  </span>
                </div>
              </div>

              {/* Professional Details Grid */}
              <div style={styles.detailsGrid} className="details-grid">
                <div style={styles.detailItem}>
                  <span style={styles.detailIcon}>📐</span>
                  <span style={styles.detailLabel}>Size:</span>
                  <span style={styles.detailValue}>{property.size}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailIcon}>🏷️</span>
                  <span style={styles.detailLabel}>Category:</span>
                  <span style={styles.detailValue}>{property.category}</span>
                </div>
                {property.subtype && (
                  <div style={styles.detailItem}>
                    <span style={styles.detailIcon}>🏷️</span>
                    <span style={styles.detailLabel}>Type:</span>
                    <span style={styles.detailValue}>{property.subtype}</span>
                  </div>
                )}
                <div style={styles.detailItem}>
                  <span style={styles.detailIcon}>📞</span>
                  <span style={styles.detailLabel}>Contact:</span>
                  <span style={styles.detailValue}>{property.contact}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailIcon}>💰</span>
                  <span style={styles.detailLabel}>Rent Types:</span>
                  <span style={styles.detailValue}>{property.rentType.join(', ')}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailIcon}>📅</span>
                  <span style={styles.detailLabel}>Listed:</span>
                  <span style={styles.detailValue}>
                    {new Date(property.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Enhanced Description */}
              <div style={styles.descriptionSection}>
                <h5 style={styles.sectionTitle}>
                  <span>📝</span>
                  <span>Description</span>
                </h5>
                <p style={styles.descriptionText}>
                  {property.description}
                </p>
              </div>

              {/* Enhanced Owner Section */}
              {property.ownerId && (
                <div style={styles.ownerSection}>
                  <h5 style={styles.sectionTitle}>
                    <span>👤</span>
                    <span>Property Owner</span>
                  </h5>
                  <div style={styles.ownerInfo}>
                    <div style={styles.ownerAvatar}>
                      {property.ownerId.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h6 style={styles.ownerName}>{property.ownerId.name}</h6>
                      <p style={styles.ownerContact}>
                        📧 {property.ownerId.email}
                      </p>
                      {property.ownerId.contact && (
                        <p style={styles.ownerContact}>
                          📞 {property.ownerId.contact}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Professional Booking Sidebar */}
            <div style={styles.bookingSidebar} className="booking-sidebar">
              {/* Enhanced Booking Card */}
              <div style={styles.bookingCard}>
                <div style={styles.bookingHeader}>
                  <h5 style={styles.bookingHeaderTitle}>
                    <span>📋</span>
                    <span>Book This Property</span>
                  </h5>
                </div>

                <div style={styles.bookingBody}>
                  {/* Prominent Price Display */}
                  <div style={styles.bookingPrice}>
                    <h3 style={styles.bookingPriceAmount}>
                      {formatPrice(property.price, property.rentType[0])}
                    </h3>
                    <p style={styles.bookingPriceNote}>
                      Available for {property.rentType.join(', ')} rental
                    </p>
                  </div>

                  {/* Professional Booking Button */}
                  <Link
                    to={`/book/${property._id}`}
                    style={styles.bookingButton}
                    onMouseEnter={() => setIsBookingHovered(true)}
                    onMouseLeave={() => setIsBookingHovered(false)}
                  >
                    <span>📅</span>
                    <span>Book Now</span>
                  </Link>

                  {/* Payment Note */}
                  <div style={styles.paymentNote}>
                    💳 Payment: On Spot Only
                  </div>

                  {/* Enhanced Features */}
                  <div style={styles.featuresList}>
                    <h6 style={styles.featuresTitle}>
                      <span>✨</span>
                      <span>Property Features</span>
                    </h6>
                    <div style={styles.featureItem}>
                      <span style={styles.featureIcon}>✓</span>
                      <span>{property.category} Space</span>
                    </div>
                    <div style={styles.featureItem}>
                      <span style={styles.featureIcon}>✓</span>
                      <span>{property.size} Area</span>
                    </div>
                    <div style={styles.featureItem}>
                      <span style={styles.featureIcon}>✓</span>
                      <span>{property.rentType.join('/')} Rental</span>
                    </div>
                    <div style={styles.featureItem}>
                      <span style={styles.featureIcon}>✓</span>
                      <span>Direct Owner Contact</span>
                    </div>
                    <div style={styles.featureItem}>
                      <span style={styles.featureIcon}>✓</span>
                      <span>Verified Listing</span>
                    </div>
                  </div>

                  <div style={{ 
                    textAlign: 'center', 
                    fontSize: '0.8rem', 
                    color: 'rgba(255, 255, 255, 0.6)' 
                  }}>
                    ⚠️ Complete your profile before booking
                  </div>
                </div>
              </div>

              {/* Enhanced Contact Card */}
              <div style={styles.contactCard}>
                <h6 style={styles.contactTitle}>
                  <span>📞</span>
                  <span>Contact Information</span>
                </h6>
                <div style={styles.contactInfo}>
                  <div style={styles.contactLabel}>Property Contact:</div>
                  <div style={styles.contactValue}>{property.contact}</div>
                </div>
                {property.ownerId && (
                  <div style={styles.contactInfo}>
                    <div style={styles.contactLabel}>Owner:</div>
                    <div style={styles.contactValue}>{property.ownerId.name}</div>
                    <div style={styles.contactValue}>{property.ownerId.email}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PropertyDetails;
