import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Final Company-Grade Professional Styles
  const styles = {
    // Professional App Container
    appContainer: {
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },

    // Compact Hero Section - Company Style
    heroSection: {
      padding: '60px 0 40px 0', // Much more compact
      position: 'relative'
    },

    // Compact Professional Hero Container
    heroContainer: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px', // Smaller radius
      padding: '40px 32px', // Much more compact padding
      margin: '0 auto',
      maxWidth: '800px', // Smaller max width
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    },

    // Compact Premium Badge
    premiumBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 16px', // Much smaller
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '20px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.8rem', // Smaller font
      fontWeight: 600,
      marginBottom: '20px' // Much smaller margin
    },

    // Company-Grade Typography - Compact
    heroTitle: {
      fontSize: 'clamp(2rem, 4vw, 2.8rem)', // Much smaller
      fontWeight: 800,
      lineHeight: 1.2,
      marginBottom: '16px', // Smaller margin
      color: 'white',
      letterSpacing: '-0.02em'
    },

    // Professional Gradient Text
    gradientText: {
      background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #34d399 100%)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'gradientFlow 4s ease-in-out infinite'
    },

    // Compact Description
    heroDescription: {
      fontSize: '1rem', // Smaller
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '24px', // Smaller margin
      maxWidth: '600px',
      margin: '0 auto 24px auto'
    },

    // Compact Button Container
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '32px' // Smaller margin
    },

    // Company-Grade Buttons - Compact
    primaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px', // Much smaller
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px', // Smaller radius for modern look
      color: 'white',
      fontSize: '0.95rem', // Smaller font
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      userSelect: 'none', // Fix text selection
      WebkitUserSelect: 'none'
    },

    secondaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.95rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      userSelect: 'none', // Fix text selection
      WebkitUserSelect: 'none'
    },

    // Compact Trust Metrics
    trustMetrics: {
      display: 'flex',
      justifyContent: 'center',
      gap: '24px', // Smaller gap
      flexWrap: 'wrap'
    },

    trustItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '16px 12px', // Much smaller
      textAlign: 'center',
      color: 'white',
      minWidth: '90px' // Smaller width
    },

    trustNumber: {
      fontSize: '1.4rem', // Smaller
      fontWeight: 800,
      display: 'block',
      marginBottom: '4px',
      background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    trustLabel: {
      fontSize: '0.75rem', // Smaller
      opacity: 0.8,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontWeight: 500
    },

    // Categories Section - Professional Spacing
    categoriesSection: {
      padding: '50px 0', // Much smaller padding
      position: 'relative'
    },

    // Compact Section Header - Fix Gap Issues
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '32px', // MUCH smaller margin to fix gap
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '32px 24px', // Smaller padding
      maxWidth: '700px',
      margin: '0 auto 32px auto' // Fixed margin
    },

    sectionBadge: {
      display: 'inline-block',
      padding: '4px 12px', // Smaller
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(4px)',
      borderRadius: '16px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.75rem', // Smaller
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '16px', // Smaller
      border: '1px solid rgba(255, 255, 255, 0.15)'
    },

    sectionTitle: {
      fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', // Much smaller
      fontWeight: 800,
      marginBottom: '12px', // Smaller
      color: 'white',
      lineHeight: 1.2
    },

    sectionDescription: {
      fontSize: '1rem', // Smaller
      lineHeight: 1.4,
      color: 'rgba(255, 255, 255, 0.7)',
      maxWidth: '500px',
      margin: '0 auto'
    },

    // Glass Category Cards - Professional
    categoryCard: {
      background: 'rgba(255, 255, 255, 0.06)', // Glass theme
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
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
      padding: '24px', // Compact padding
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },

    categoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },

    categoryIcon: {
      fontSize: '2rem', // Smaller
      transition: 'transform 0.3s ease'
    },

    categoryCount: {
      background: 'rgba(255, 255, 255, 0.15)', // Glass theme
      backdropFilter: 'blur(4px)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '8px',
      fontSize: '0.7rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },

    categoryTitle: {
      fontSize: '1.1rem', // Smaller
      fontWeight: 700,
      marginBottom: '8px',
      color: 'white'
    },

    categoryDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: 1.4,
      fontSize: '0.9rem', // Smaller
      flexGrow: 1,
      marginBottom: '16px'
    },

    categoryArrow: {
      color: 'rgba(255, 255, 255, 0.5)',
      transition: 'all 0.3s ease'
    },

    // Featured Properties Section
    featuredSection: {
      padding: '50px 0', // Compact
      background: 'rgba(255, 255, 255, 0.01)'
    },

    // Glass Loading Container
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px', // Smaller
      background: 'rgba(255, 255, 255, 0.05)', // Glass theme
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      borderRadius: '16px',
      margin: '0 20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)'
    },

    loadingSpinner: {
      width: '32px', // Smaller
      height: '32px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '16px'
    },

    loadingText: {
      color: 'white',
      fontSize: '0.95rem', // Smaller
      fontWeight: 500
    },

    // Professional Explore Button - Fix Selection
    exploreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '14px 28px',
      background: 'rgba(255, 255, 255, 0.08)', // Glass theme
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '0.95rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      userSelect: 'none', // Fix text selection issue
      WebkitUserSelect: 'none',
      cursor: 'pointer'
    }
  };

  // Professional Animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      
      /* Fix text selection globally */
      * {
        -webkit-tap-highlight-color: transparent;
      }
      
      button, a {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      @keyframes gradientFlow {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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
      e.currentTarget.style.transform = 'translateY(-2px)';
      if (type === 'primary') {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
      } else {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      if (type === 'primary') {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
      } else {
        e.currentTarget.style.background = 'transparent';
      }
    }
  };

  const handleCategoryHover = (e, isEntering) => {
    const icon = e.currentTarget.querySelector('[data-icon]');
    const arrow = e.currentTarget.querySelector('[data-arrow]');
    
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; // Enhanced glass
      e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.15)';
      if (icon) icon.style.transform = 'scale(1.05)';
      if (arrow) {
        arrow.style.color = 'white';
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
      {/* Compact Professional Hero */}
      <section style={styles.heroSection}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div style={styles.heroContainer}>
                {/* Compact Badge */}
                <div style={styles.premiumBadge}>
                  <span>✨</span>
                  <span>Premium Property Platform</span>
                </div>

                {/* Compact Professional Title */}
                <h1 style={styles.heroTitle}>
                  Discover Your <span style={styles.gradientText}>Perfect Space</span><br />With SpaceLink
                </h1>

                {/* Compact Description */}
                <p style={styles.heroDescription}>
                  The most advanced property discovery platform. Find premium properties 
                  with intelligent matching and seamless experiences.
                </p>

                {/* Compact Buttons */}
                <div style={styles.buttonContainer}>
                  <Button
                    as={Link}
                    to="/find-property"
                    style={styles.primaryButton}
                    onMouseEnter={(e) => handleButtonHover(e, true, 'primary')}
                    onMouseLeave={(e) => handleButtonHover(e, false, 'primary')}
                  >
                    <span>Explore Properties</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                    </svg>
                  </Button>
                  
                  <Button
                    as={Link}
                    to="/add-property"
                    style={styles.secondaryButton}
                    onMouseEnter={(e) => handleButtonHover(e, true, 'secondary')}
                    onMouseLeave={(e) => handleButtonHover(e, false, 'secondary')}
                  >
                    <span>List Property</span>
                  </Button>
                </div>

                {/* Compact Trust Metrics */}
                <div style={styles.trustMetrics}>
                  <div style={styles.trustItem}>
                    <span style={styles.trustNumber}>10K+</span>
                    <span style={styles.trustLabel}>Properties</span>
                  </div>
                  <div style={styles.trustItem}>
                    <span style={styles.trustNumber}>50K+</span>
                    <span style={styles.trustLabel}>Clients</span>
                  </div>
                  <div style={styles.trustItem}>
                    <span style={styles.trustNumber}>99.8%</span>
                    <span style={styles.trustLabel}>Success</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Professional Categories - Fixed Gap */}
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

          <Row className="g-3">
            {[
              {
                category: 'Property Rentals',
                icon: '🏠',
                title: 'Residential',
                desc: 'Premium apartments, luxury flats, family homes',
                count: '2.5K+',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              {
                category: 'Commercial',
                icon: '🏢',
                title: 'Commercial',
                desc: 'Modern offices, retail spaces, warehouses',
                count: '1.8K+',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              },
              {
                category: 'Land',
                icon: '🌾',
                title: 'Land & Plots',
                desc: 'Agricultural land, development plots',
                count: '950+',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              },
              {
                category: 'Parking',
                icon: '🚗',
                title: 'Parking',
                desc: 'Secure parking spaces, covered garages',
                count: '3.2K+',
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
              },
              {
                category: 'Event',
                icon: '🎉',
                title: 'Event Venues',
                desc: 'Banquet halls, event gardens, conference halls',
                count: '420+',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              },
              {
                category: 'manage-properties',
                icon: '⚙️',
                title: 'Property Management',
                desc: 'Professional management tools and services',
                count: 'Tools',
                gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
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

      {/* Glass Featured Properties */}
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
              <h4 style={{color: 'white', marginBottom: '12px', fontSize: '1rem'}}>Unable to Load Properties</h4>
              <p style={{color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.9rem'}}>{error}</p>
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
                    e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <span>View All Properties</span>
                  <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>({featuredProperties.length}+ available)</span>
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
