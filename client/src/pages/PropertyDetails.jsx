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
    // Compact page container
    pageContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      paddingTop: '1.5rem',
      paddingBottom: '2rem'
    },

    // Compact back button
    backButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      padding: '8px 16px',
      color: 'rgba(255, 255, 255, 0.9)',
      textDecoration: 'none',
      fontSize: '0.85rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      marginBottom: '1.5rem'
    },

    // Much smaller carousel container
    carouselContainer: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      overflow: 'hidden',
      marginBottom: '1.5rem',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
      position: 'relative',
      maxWidth: '100%'
    },

    // Smaller carousel image
    carouselImage: {
      height: '250px', // Reduced from 300px
      width: '100%',
      objectFit: 'cover',
      borderRadius: '16px'
    },

    // Compact image counter
    imageCounter: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '700',
      zIndex: 10,
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },

    // Tighter content layout
    contentLayout: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'flex-start'
    },

    // Compact details card
    detailsCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
      color: 'white',
      flex: 1
    },

    // Smaller badges
    badgeContainer: {
      display: 'flex',
      gap: '6px',
      marginBottom: '1rem',
      flexWrap: 'wrap'
    },

    primaryBadge: {
      background: 'rgba(59, 130, 246, 0.2)',
      backdropFilter: 'blur(6px)',
      color: '#60a5fa',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '12px',
      padding: '3px 8px',
      fontSize: '0.7rem',
      fontWeight: '700'
    },

    secondaryBadge: {
      background: 'rgba(107, 114, 128, 0.2)',
      backdropFilter: 'blur(6px)',
      color: '#9ca3af',
      border: '1px solid rgba(107, 114, 128, 0.3)',
      borderRadius: '12px',
      padding: '3px 8px',
      fontSize: '0.7rem',
      fontWeight: '700'
    },

    infoBadge: {
      background: 'rgba(16, 185, 129, 0.2)',
      backdropFilter: 'blur(6px)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '12px',
      padding: '3px 8px',
      fontSize: '0.7rem',
      fontWeight: '700'
    },

    // Compact typography
    propertyTitle: {
      fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', // Reduced size
      fontWeight: '800',
      marginBottom: '0.75rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: 1.2
    },

    // Smaller price container
    priceContainer: {
      background: 'rgba(34, 197, 94, 0.15)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      borderRadius: '10px',
      padding: '0.75rem',
      marginBottom: '1rem'
    },

    priceText: {
      fontSize: '1.3rem', // Reduced from 1.5rem
      fontWeight: '800',
      color: '#22c55e',
      marginBottom: '0.25rem'
    },

    addressText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },

    // Tighter details grid
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '0.75rem',
      marginBottom: '1rem'
    },

    detailItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.75rem'
    },

    detailIcon: {
      fontSize: '0.9rem',
      opacity: 0.8
    },

    detailLabel: {
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.9)'
    },

    detailValue: {
      color: 'rgba(255, 255, 255, 0.7)',
      marginLeft: 'auto',
      fontSize: '0.75rem'
    },

    // Compact description
    descriptionSection: {
      marginBottom: '1rem'
    },

    sectionTitle: {
      fontSize: '1rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },

    descriptionText: {
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.5',
      fontSize: '0.8rem',
      whiteSpace: 'pre-line'
    },

    // Compact owner section
    ownerSection: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      padding: '0.75rem',
      marginTop: '1rem'
    },

    ownerInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },

    ownerAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      fontWeight: '700',
      color: 'white'
    },

    ownerName: {
      fontSize: '0.9rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '0.1rem'
    },

    ownerContact: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.7rem'
    },

    // Smaller booking sidebar
    bookingSidebar: {
      width: '300px', // Reduced from 340px
      minWidth: '300px'
    },

    bookingCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
      position: 'sticky',
      top: '2rem',
      marginBottom: '1.5rem'
    },

    bookingHeader: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      padding: '0.75rem',
      textAlign: 'center'
    },

    bookingHeaderTitle: {
      fontSize: '0.9rem',
      fontWeight: '700',
      color: 'white',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px'
    },

    bookingBody: {
      padding: '1rem'
    },

    bookingPrice: {
      textAlign: 'center',
      marginBottom: '1rem'
    },

    bookingPriceAmount: {
      fontSize: '1.3rem', // Reduced
      fontWeight: '800',
      color: '#22c55e',
      marginBottom: '0.1rem'
    },

    bookingPriceNote: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.7rem'
    },

    bookingButton: {
      width: '100%',
      background: isBookingHovered 
        ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
        : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      border: 'none',
      borderRadius: '10px',
      padding: '0.6rem 0.8rem',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: '700',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      transition: 'all 0.3s ease',
      boxShadow: '0 6px 20px rgba(34, 197, 94, 0.3)',
      marginBottom: '0.75rem',
      transform: isBookingHovered ? 'translateY(-1px)' : 'translateY(0)'
    },

    paymentNote: {
      textAlign: 'center',
      background: 'rgba(255, 193, 7, 0.15)',
      border: '1px solid rgba(255, 193, 7, 0.3)',
      borderRadius: '6px',
      padding: '6px',
      color: '#fbbf24',
      fontSize: '0.7rem',
      fontWeight: '600',
      marginBottom: '0.75rem'
    },

    // Smaller features list
    featuresList: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      padding: '0.75rem',
      marginBottom: '0.75rem'
    },

    featuresTitle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },

    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      marginBottom: '6px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.7rem'
    },

    featureIcon: {
      color: '#22c55e',
      fontSize: '0.8rem'
    },

    // Compact contact card
    contactCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      padding: '0.75rem'
    },

    contactTitle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },

    contactInfo: {
      marginBottom: '0.5rem'
    },

    contactLabel: {
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '0.1rem',
      fontSize: '0.7rem'
    },

    contactValue: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.7rem'
    },

    // Loading states
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      color: 'white'
    },

    loadingSpinner: {
      marginBottom: '1rem'
    },

    loadingText: {
      fontSize: '1rem',
      fontWeight: '600'
    },

    errorContainer: {
      background: 'rgba(239, 68, 68, 0.15)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      padding: '1.5rem',
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
                borderRadius: '8px',
                padding: '10px 20px',
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
                borderRadius: '8px',
                padding: '10px 20px',
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
      {/* Compact CSS with reduced sizes */}
      <style>
        {`
          .back-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            color: white !important;
            transform: translateX(-3px) !important;
          }
          
          .carousel {
            max-width: 100%;
            margin: 0 auto;
          }
          
          .carousel-item img {
            height: 250px !important;
            width: 100% !important;
            object-fit: cover !important;
            border-radius: 16px !important;
          }
          
          .carousel-control-prev, .carousel-control-next {
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(8px) !important;
            border-radius: 50% !important;
            width: 40px !important;
            height: 40px !important;
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
            left: 12px !important;
          }
          
          .carousel-control-next {
            right: 12px !important;
          }
          
          .carousel-indicators {
            bottom: 12px !important;
            margin-bottom: 0 !important;
          }
          
          .carousel-indicators [data-bs-target] {
            background-color: rgba(255, 255, 255, 0.5) !important;
            border-radius: 8px !important;
            width: 10px !important;
            height: 3px !important;
            border: none !important;
            transition: all 0.3s ease !important;
          }
          
          .carousel-indicators .active {
            background-color: #3b82f6 !important;
            width: 20px !important;
          }
          
          .carousel-caption {
            background: rgba(0, 0, 0, 0.7) !important;
            backdrop-filter: blur(8px) !important;
            border-radius: 10px !important;
            bottom: 20px !important;
            left: 15px !important;
            right: 15px !important;
            padding: 8px 12px !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
          
          @media (max-width: 768px) {
            .content-layout {
              flex-direction: column !important;
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
              height: 200px !important;
            }
            
            .carousel-control-prev, .carousel-control-next {
              width: 35px !important;
              height: 35px !important;
            }
          }
          
          @media (max-width: 480px) {
            .carousel-item img {
              height: 180px !important;
            }
          }
        `}
      </style>

      <div style={styles.pageContainer}>
        <Container style={{ maxWidth: '1000px' }}>
          {/* Compact Back Button */}
          <Link
            to="/find-property"
            style={styles.backButton}
            className="back-btn"
          >
            <span>←</span>
            <span>Back to Properties</span>
          </Link>

          {/* Compact Carousel - 250px height, 2 second auto-slide */}
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
                          fontSize: '0.75rem',
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
                fontSize: '0.9rem'
              }}>
                📷 No images available
              </div>
            )}
          </div>

          {/* Compact Main Content */}
          <div style={styles.contentLayout} className="content-layout">
            {/* Property Details */}
            <div style={styles.detailsCard}>
              {/* Smaller Badges */}
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

              {/* Compact Title */}
              <h1 style={styles.propertyTitle}>
                {property.title}
              </h1>

              {/* Smaller Price */}
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

              {/* Tighter Details Grid */}
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

              {/* Compact Description */}
              <div style={styles.descriptionSection}>
                <h5 style={styles.sectionTitle}>
                  <span>📝</span>
                  <span>Description</span>
                </h5>
                <p style={styles.descriptionText}>
                  {property.description}
                </p>
              </div>

              {/* Compact Owner Section */}
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

            {/* Smaller Booking Sidebar */}
            <div style={styles.bookingSidebar} className="booking-sidebar">
              {/* Compact Booking Card */}
              <div style={styles.bookingCard}>
                <div style={styles.bookingHeader}>
                  <h5 style={styles.bookingHeaderTitle}>
                    <span>📋</span>
                    <span>Book This Property</span>
                  </h5>
                </div>

                <div style={styles.bookingBody}>
                  <div style={styles.bookingPrice}>
                    <h3 style={styles.bookingPriceAmount}>
                      {formatPrice(property.price, property.rentType[0])}
                    </h3>
                    <p style={styles.bookingPriceNote}>
                      Available for {property.rentType.join(', ')} rental
                    </p>
                  </div>

                  <Link
                    to={`/book/${property._id}`}
                    style={styles.bookingButton}
                    onMouseEnter={() => setIsBookingHovered(true)}
                    onMouseLeave={() => setIsBookingHovered(false)}
                  >
                    <span>📅</span>
                    <span>Book Now</span>
                  </Link>

                  <div style={styles.paymentNote}>
                    💳 Payment: On Spot Only
                  </div>

                  <div style={styles.featuresList}>
                    <h6 style={styles.featuresTitle}>
                      <span>✨</span>
                      <span>Features</span>
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
                    fontSize: '0.65rem', 
                    color: 'rgba(255, 255, 255, 0.6)' 
                  }}>
                    ⚠️ Complete your profile before booking
                  </div>
                </div>
              </div>

              {/* Compact Contact Card */}
              <div style={styles.contactCard}>
                <h6 style={styles.contactTitle}>
                  <span>📞</span>
                  <span>Contact Info</span>
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
