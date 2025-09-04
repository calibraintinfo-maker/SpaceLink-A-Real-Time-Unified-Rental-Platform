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
    // Main container with background
    pageContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      paddingTop: '2rem',
      paddingBottom: '3rem'
    },

    // Back button
    backButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '12px 24px',
      color: 'rgba(255, 255, 255, 0.9)',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '2rem'
    },

    // Image carousel container
    carouselContainer: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '24px',
      overflow: 'hidden',
      marginBottom: '2rem',
      boxShadow: '0 32px 80px rgba(0, 0, 0, 0.4)',
      position: 'relative'
    },

    carouselImage: {
      height: '500px',
      width: '100%',
      objectFit: 'cover',
      borderRadius: '24px'
    },

    carouselCaption: {
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      bottom: '20px',
      left: '20px',
      right: '20px',
      padding: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },

    imageCounter: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '600',
      zIndex: 10
    },

    // Main content layout
    contentLayout: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'flex-start'
    },

    // Property details card
    detailsCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '24px',
      padding: '2.5rem',
      boxShadow: '0 32px 80px rgba(0, 0, 0, 0.4)',
      color: 'white',
      flex: 1
    },

    // Badge styling
    badgeContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },

    primaryBadge: {
      background: 'rgba(59, 130, 246, 0.2)',
      backdropFilter: 'blur(8px)',
      color: '#60a5fa',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '20px',
      padding: '6px 12px',
      fontSize: '0.8rem',
      fontWeight: '700'
    },

    secondaryBadge: {
      background: 'rgba(107, 114, 128, 0.2)',
      backdropFilter: 'blur(8px)',
      color: '#9ca3af',
      border: '1px solid rgba(107, 114, 128, 0.3)',
      borderRadius: '20px',
      padding: '6px 12px',
      fontSize: '0.8rem',
      fontWeight: '700'
    },

    infoBadge: {
      background: 'rgba(16, 185, 129, 0.2)',
      backdropFilter: 'blur(8px)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '20px',
      padding: '6px 12px',
      fontSize: '0.8rem',
      fontWeight: '700'
    },

    // Typography
    propertyTitle: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: '800',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    priceContainer: {
      background: 'rgba(34, 197, 94, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      borderRadius: '16px',
      padding: '1rem 1.5rem',
      marginBottom: '1.5rem'
    },

    priceText: {
      fontSize: '1.8rem',
      fontWeight: '800',
      color: '#22c55e',
      marginBottom: '0.5rem'
    },

    addressText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    // Details grid
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },

    detailItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },

    detailIcon: {
      fontSize: '1.2rem',
      opacity: 0.8
    },

    detailLabel: {
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.9)'
    },

    detailValue: {
      color: 'rgba(255, 255, 255, 0.7)',
      marginLeft: 'auto'
    },

    // Description section
    descriptionSection: {
      marginBottom: '2rem'
    },

    sectionTitle: {
      fontSize: '1.3rem',
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
      fontSize: '1rem',
      whiteSpace: 'pre-line'
    },

    // Owner section
    ownerSection: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginTop: '2rem'
    },

    ownerInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },

    ownerAvatar: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'white'
    },

    ownerDetails: {
      flex: 1
    },

    ownerName: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '0.25rem'
    },

    ownerContact: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9rem'
    },

    // Booking sidebar
    bookingSidebar: {
      width: '380px',
      minWidth: '380px'
    },

    bookingCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0, 0, 0, 0.4)',
      position: 'sticky',
      top: '2rem',
      marginBottom: '2rem'
    },

    bookingHeader: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      padding: '1.5rem',
      textAlign: 'center'
    },

    bookingHeaderTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: 'white',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },

    bookingBody: {
      padding: '2rem'
    },

    bookingPrice: {
      textAlign: 'center',
      marginBottom: '2rem'
    },

    bookingPriceAmount: {
      fontSize: '2rem',
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
      padding: '1rem 1.5rem',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: '700',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      boxShadow: '0 12px 40px rgba(34, 197, 94, 0.3)',
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

    // Features list
    featuresList: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    },

    featuresTitle: {
      fontSize: '1.1rem',
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
      gap: '12px',
      marginBottom: '12px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.9rem'
    },

    featureIcon: {
      color: '#22c55e',
      fontSize: '1rem'
    },

    // Contact card
    contactCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '1.5rem'
    },

    contactTitle: {
      fontSize: '1.1rem',
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
      marginBottom: '0.25rem'
    },

    contactValue: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.95rem'
    },

    // Loading and error states
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
                borderRadius: '8px',
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
                borderRadius: '8px',
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
      {/* Enhanced CSS */}
      <style>
        {`
          .back-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            color: white !important;
            transform: translateX(-4px) !important;
          }
          
          .carousel-control-prev, .carousel-control-next {
            background: rgba(0, 0, 0, 0.5) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 50% !important;
            width: 50px !important;
            height: 50px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
          }
          
          .carousel-indicators {
            bottom: 30px !important;
          }
          
          .carousel-indicators [data-bs-target] {
            background-color: rgba(255, 255, 255, 0.5) !important;
            border-radius: 50% !important;
            width: 12px !important;
            height: 12px !important;
            border: 2px solid rgba(255, 255, 255, 0.3) !important;
          }
          
          .carousel-indicators .active {
            background-color: #3b82f6 !important;
            border-color: #3b82f6 !important;
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
          }
        `}
      </style>

      <div style={styles.pageContainer}>
        <Container>
          {/* Back Button */}
          <Link
            to="/find-property"
            style={styles.backButton}
            className="back-btn"
          >
            <span>←</span>
            <span>Back to Properties</span>
          </Link>

          {/* Image Carousel */}
          <div style={styles.carouselContainer}>
            {property.images && property.images.length > 0 ? (
              <>
                <div style={styles.imageCounter}>
                  {activeImageIndex + 1} / {property.images.length}
                </div>
                <Carousel
                  activeIndex={activeImageIndex}
                  onSelect={(selectedIndex) => setActiveImageIndex(selectedIndex)}
                  interval={null}
                >
                  {property.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img 
                        src={getImageUrl(image)} 
                        alt={`${property.title} - Image ${index + 1}`}
                        style={styles.carouselImage}
                      />
                      <Carousel.Caption style={styles.carouselCaption}>
                        <p style={{ margin: 0, fontWeight: '600' }}>
                          {property.title} - Gallery Image {index + 1}
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
                fontSize: '1.1rem'
              }}>
                📷 No images available
              </div>
            )}
          </div>

          {/* Main Content */}
          <div style={styles.contentLayout} className="content-layout">
            {/* Property Details */}
            <div style={styles.detailsCard}>
              {/* Badges */}
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

              {/* Title */}
              <h1 style={styles.propertyTitle}>
                {property.title}
              </h1>

              {/* Price */}
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

              {/* Details Grid */}
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

              {/* Description */}
              <div style={styles.descriptionSection}>
                <h5 style={styles.sectionTitle}>
                  <span>📝</span>
                  <span>Description</span>
                </h5>
                <p style={styles.descriptionText}>
                  {property.description}
                </p>
              </div>

              {/* Owner Information */}
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
                    <div style={styles.ownerDetails}>
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

            {/* Booking Sidebar */}
            <div style={styles.bookingSidebar} className="booking-sidebar">
              {/* Booking Card */}
              <div style={styles.bookingCard}>
                <div style={styles.bookingHeader}>
                  <h5 style={styles.bookingHeaderTitle}>
                    <span>📋</span>
                    <span>Book This Property</span>
                  </h5>
                </div>

                <div style={styles.bookingBody}>
                  {/* Price Display */}
                  <div style={styles.bookingPrice}>
                    <h3 style={styles.bookingPriceAmount}>
                      {formatPrice(property.price, property.rentType[0])}
                    </h3>
                    <p style={styles.bookingPriceNote}>
                      Available for {property.rentType.join(', ')} rental
                    </p>
                  </div>

                  {/* Booking Button */}
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

                  {/* Features */}
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

                  <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    ⚠️ Complete your profile before booking
                  </div>
                </div>
              </div>

              {/* Contact Card */}
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
