import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Professional SafePark-Style Design
  const styles = {
    // Professional App Container
    appContainer: {
      background: '#0a0e1a',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },

    // Professional Hero Section - SafePark Style
    heroSection: {
      padding: '60px 0',
      background: '#0a0e1a',
      position: 'relative',
      overflow: 'hidden'
    },

    // Split Layout Container
    heroContainer: {
      display: 'flex',
      alignItems: 'center',
      minHeight: '80vh',
      position: 'relative'
    },

    // Left Content Section
    heroLeft: {
      flex: 1,
      paddingRight: '3rem',
      zIndex: 10
    },

    // Premium Badge - SafePark Style
    premiumBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      background: 'rgba(59, 130, 246, 0.15)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '20px',
      color: '#60a5fa',
      fontSize: '0.85rem',
      fontWeight: 600,
      marginBottom: '2rem',
      backdropFilter: 'blur(8px)'
    },

    badgeIcon: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#10b981',
      animation: 'pulse 2s infinite'
    },

    // Professional Large Headline
    heroTitle: {
      fontSize: 'clamp(3rem, 6vw, 4.5rem)',
      fontWeight: 900,
      lineHeight: 1.1,
      marginBottom: '1.5rem',
      color: 'white',
      letterSpacing: '-0.02em'
    },

    // First Line - White
    titleLine1: {
      display: 'block',
      color: 'white'
    },

    // Second Line - Blue Accent
    titleLine2: {
      display: 'block',
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    // Professional Description
    heroDescription: {
      fontSize: '1.2rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '2rem',
      maxWidth: '500px'
    },

    highlightText: {
      color: '#10b981',
      fontWeight: 600
    },

    // Professional Button Container
    buttonContainer: {
      display: 'flex',
      gap: '16px',
      marginBottom: '3rem',
      flexWrap: 'wrap'
    },

    // Primary CTA Button - SafePark Style
    primaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 32px',
      background: '#3b82f6',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
      userSelect: 'none'
    },

    // Secondary Button - SafePark Style
    secondaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 32px',
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      userSelect: 'none'
    },

    // Trust Indicators - SafePark Style
    trustContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      flexWrap: 'wrap'
    },

    // Stars Rating
    starsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    stars: {
      color: '#fbbf24',
      fontSize: '1.2rem'
    },

    trustText: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.95rem',
      fontWeight: 600
    },

    // Warranty Badge
    warrantyBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#10b981',
      fontSize: '0.95rem',
      fontWeight: 600
    },

    // Right Image Section
    heroRight: {
      flex: 1,
      position: 'relative',
      height: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    // Property Image Container
    propertyImageContainer: {
      position: 'relative',
      width: '100%',
      height: '500px',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
    },

    propertyImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '16px'
    },

    // Premium Property Badge
    propertyBadge: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '8px 16px',
      background: 'rgba(16, 185, 129, 0.9)',
      color: 'white',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: 600,
      backdropFilter: 'blur(8px)'
    },

    // Categories Section - Compact
    categoriesSection: {
      padding: '60px 0',
      background: 'rgba(255, 255, 255, 0.02)'
    },

    // Compact Section Header
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '40px',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '700px',
      margin: '0 auto 40px auto'
    },

    sectionBadge: {
      display: 'inline-block',
      padding: '6px 16px',
      background: 'rgba(59, 130, 246, 0.15)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '20px',
      color: '#60a5fa',
      fontSize: '0.8rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '16px'
    },

    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 800,
      marginBottom: '16px',
      color: 'white',
      lineHeight: 1.2
    },

    gradientText: {
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    sectionDescription: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.7)',
      maxWidth: '500px',
      margin: '0 auto'
    },

    // Glass Category Cards
    categoryCard: {
      background: 'rgba(255, 255, 255, 0.06)',
      backdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      height: '100%',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },

    categoryGradientTop: (gradient) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: gradient
    }),

    categoryBody: {
      padding: '24px'
    },

    categoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },

    categoryIcon: {
      fontSize: '2rem',
      transition: 'transform 0.3s ease'
    },

    categoryCount: {
      background: 'rgba(59, 130, 246, 0.15)',
      color: '#60a5fa',
      padding: '4px 8px',
      borderRadius: '8px',
      fontSize: '0.7rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },

    categoryTitle: {
      fontSize: '1.1rem',
      fontWeight: 700,
      marginBottom: '8px',
      color: 'white'
    },

    categoryDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: 1.4,
      fontSize: '0.9rem',
      marginBottom: '16px'
    },

    categoryArrow: {
      color: 'rgba(255, 255, 255, 0.5)',
      transition: 'all 0.3s ease'
    },

    // Featured Properties
    featuredSection: {
      padding: '60px 0',
      background: 'rgba(255, 255, 255, 0.01)'
    },

    // Loading Container
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      margin: '0 20px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },

    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255, 255, 255, 0.2)',
      borderTop: '3px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    },

    loadingText: {
      color: 'white',
      fontSize: '1rem',
      fontWeight: 500
    },

    // Explore Button
    exploreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 32px',
      background: 'rgba(59, 130, 246, 0.15)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '8px',
      color: '#60a5fa',
      fontSize: '1rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      userSelect: 'none'
    }
  };

  // Animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Fix text selection */
      button, a {
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => document.head.removeChild(styleSheet);
  }, []);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await api.properties.getFeatured();
      setFeaturedProperties(response.data);
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // Professional Hover Effects
  const handleButtonHover = (e, isEntering, type = 'primary') => {
    if (isEntering) {
      if (type === 'primary') {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.background = '#2563eb';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
      } else {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      if (type === 'primary') {
        e.currentTarget.style.background = '#3b82f6';
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(59, 130, 246, 0.3)';
      } else {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      }
    }
  };

  const handleCategoryHover = (e, isEntering) => {
    const icon = e.currentTarget.querySelector('[data-icon]');
    const arrow = e.currentTarget.querySelector('[data-arrow]');
    
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.15)';
      if (icon) icon.style.transform = 'scale(1.05)';
      if (arrow) {
        arrow.style.color = '#60a5fa';
        arrow.style.transform = 'translateX(4px)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
      if (icon) icon.style.transform = 'scale(1)';
      if (arrow) {
        arrow.style.color = 'rgba(255, 255, 255, 0.5)';
        arrow.style.transform = 'translateX(0)';
      }
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Professional SafePark-Style Hero */}
      <section style={styles.heroSection}>
        <Container>
          <div style={styles.heroContainer}>
            {/* Left Content */}
            <div style={styles.heroLeft}>
              {/* Premium Badge */}
              <div style={styles.premiumBadge}>
                <div style={styles.badgeIcon}></div>
                <span>Made in India • Premium Quality</span>
              </div>

              {/* Professional Headline */}
              <h1 style={styles.heroTitle}>
                <span style={styles.titleLine1}>Property Risks.</span>
                <span style={styles.titleLine2}>Perfect Solutions.</span>
              </h1>

              {/* Professional Description */}
              <p style={styles.heroDescription}>
                Your property search faces <strong>hidden challenges every day</strong>. From market fluctuations to finding the right match, give yourself <span style={styles.highlightText}>complete peace of mind</span>.
              </p>

              {/* Professional Buttons */}
              <div style={styles.buttonContainer}>
                <Button
                  as={Link}
                  to="/find-property"
                  style={styles.primaryButton}
                  onMouseEnter={(e) => handleButtonHover(e, true, 'primary')}
                  onMouseLeave={(e) => handleButtonHover(e, false, 'primary')}
                >
                  <span>🏠</span>
                  <span>Find My Property Now</span>
                </Button>
                
                <Button
                  as={Link}
                  to="/gallery"
                  style={styles.secondaryButton}
                  onMouseEnter={(e) => handleButtonHover(e, true, 'secondary')}
                  onMouseLeave={(e) => handleButtonHover(e, false, 'secondary')}
                >
                  <span>▶</span>
                  <span>View Gallery</span>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div style={styles.trustContainer}>
                <div style={styles.starsContainer}>
                  <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
                  <span style={styles.trustText}>10,000+ Satisfied Clients</span>
                </div>
                <div style={styles.warrantyBadge}>
                  <span>✓</span>
                  <span>Lifetime Support</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div style={styles.heroRight}>
              <div style={styles.propertyImageContainer}>
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Luxury Property" 
                  style={styles.propertyImage}
                />
                <div style={styles.propertyBadge}>
                  Premium Protection
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section style={styles.categoriesSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Property Categories</div>
            <h2 style={styles.sectionTitle}>
              Find Your <span style={styles.gradientText}>Ideal Property</span>
            </h2>
            <p style={styles.sectionDescription}>
              Explore premium properties across all categories
            </p>
          </div>

          <Row className="g-4">
            {[
              {
                category: 'Property Rentals',
                icon: '🏠',
                title: 'Residential',
                desc: 'Premium apartments, luxury flats, family homes',
                count: '2.5K+',
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
              },
              {
                category: 'Commercial',
                icon: '🏢',
                title: 'Commercial',
                desc: 'Modern offices, retail spaces, warehouses',
                count: '1.8K+',
                gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)'
              },
              {
                category: 'Land',
                icon: '🌾',
                title: 'Land & Plots',
                desc: 'Agricultural land, development plots',
                count: '950+',
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              },
              {
                category: 'Parking',
                icon: '🚗',
                title: 'Parking',
                desc: 'Secure parking spaces, covered garages',
                count: '3.2K+',
                gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
              },
              {
                category: 'Event',
                icon: '🎉',
                title: 'Event Venues',
                desc: 'Banquet halls, event gardens, conference halls',
                count: '420+',
                gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
              },
              {
                category: 'manage-properties',
                icon: '⚙️',
                title: 'Property Management',
                desc: 'Professional management tools and services',
                count: 'Tools',
                gradient: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                isManage: true
              }
            ].map((item, index) => (
              <Col lg={4} md={6} key={index}>
                <Card
                  style={styles.categoryCard}
                  as={Link}
                  to={item.isManage ? '/manage-properties' : `/find-property?category=${item.category}`}
                  onMouseEnter={(e) => handleCategoryHover(e, true)}
                  onMouseLeave={(e) => handleCategoryHover(e, false)}
                >
                  <div style={styles.categoryGradientTop(item.gradient)}></div>
                  <Card.Body style={styles.categoryBody}>
                    <div style={styles.categoryHeader}>
                      <span style={styles.categoryIcon} data-icon>{item.icon}</span>
                      <div style={styles.categoryCount}>{item.count}</div>
                    </div>
                    <h4 style={styles.categoryTitle}>{item.title}</h4>
                    <p style={styles.categoryDescription}>{item.desc}</p>
                    <div style={styles.categoryArrow} data-arrow>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                      </svg>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Properties */}
      <section style={styles.featuredSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Featured Properties</div>
            <h2 style={styles.sectionTitle}>
              Premium <span style={styles.gradientText}>Property Collection</span>
            </h2>
            <p style={styles.sectionDescription}>
              Handpicked exceptional properties curated by our expert team
            </p>
          </div>

          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingText}>Loading premium properties...</p>
            </div>
          ) : error ? (
            <div style={{...styles.loadingContainer, background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)'}}>
              <h4 style={{color: 'white', marginBottom: '12px'}}>Unable to Load Properties</h4>
              <p style={{color: 'rgba(255, 255, 255, 0.7)', margin: 0}}>{error}</p>
            </div>
          ) : (
            <>
              <Row className="g-4 mb-4">
                {featuredProperties.slice(0, 6).map((property, index) => (
                  <Col key={property._id} lg={4} md={6}>
                    <PropertyCard property={property} showOwner={true} />
                  </Col>
                ))}
              </Row>

              <div style={{ textAlign: 'center' }}>
                <Button
                  as={Link}
                  to="/find-property"
                  style={styles.exploreButton}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.background = 'rgba(59, 130, 246, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.background = 'rgba(59, 130, 246, 0.15)';
                  }}
                >
                  <span>View All Properties</span>
                  <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>({featuredProperties.length}+ available)</span>
                </Button>
              </div>
            </>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Home;
