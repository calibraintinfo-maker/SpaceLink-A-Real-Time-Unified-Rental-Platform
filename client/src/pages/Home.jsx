import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // World-Class Professional Styles - Final Version
  const styles = {
    // Professional App Container
    appContainer: {
      background: 'linear-gradient(180deg, #0a0e27 0%, #1a1d35 50%, #2d3748 100%)',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: 'relative'
    },

    // Subtle Professional Background
    backgroundOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)
      `,
      zIndex: -1
    },

    // Professional Hero Section
    heroSection: {
      padding: '120px 0 80px 0',
      position: 'relative',
      zIndex: 10
    },

    // World-Class Hero Container
    heroContainer: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(32px) saturate(180%)',
      WebkitBackdropFilter: 'blur(32px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '32px',
      padding: '80px 60px',
      margin: '0 auto',
      maxWidth: '1000px',
      boxShadow: `
        0 40px 100px rgba(0, 0, 0, 0.3),
        0 20px 50px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `,
      textAlign: 'center',
      position: 'relative'
    },

    // Premium Badge - Refined
    premiumBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 24px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '50px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.9rem',
      fontWeight: 600,
      marginBottom: '48px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
    },

    // World-Class Typography
    heroTitle: {
      fontSize: 'clamp(3rem, 6vw, 4.5rem)',
      fontWeight: 900,
      lineHeight: 1.1,
      marginBottom: '32px',
      color: 'white',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      letterSpacing: '-0.03em'
    },

    // Professional Gradient Text
    gradientText: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'gradientFlow 6s ease-in-out infinite'
    },

    // Perfect Description
    heroDescription: {
      fontSize: '1.25rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.75)',
      marginBottom: '56px',
      maxWidth: '700px',
      margin: '0 auto 56px auto',
      fontWeight: 400
    },

    // Professional Button Container
    buttonContainer: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '64px'
    },

    // World-Class Primary Button
    primaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '18px 36px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
      backdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '50px',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 700,
      textDecoration: 'none',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      cursor: 'pointer',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    },

    // Professional Secondary Button
    secondaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '18px 36px',
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '50px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1.1rem',
      fontWeight: 700,
      textDecoration: 'none',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)'
    },

    // Professional Trust Metrics
    trustMetrics: {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      flexWrap: 'wrap'
    },

    trustItem: {
      background: 'rgba(255, 255, 255, 0.04)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      padding: '32px 24px',
      textAlign: 'center',
      color: 'white',
      minWidth: '140px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
    },

    trustNumber: {
      fontSize: '2.25rem',
      fontWeight: 900,
      display: 'block',
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    trustLabel: {
      fontSize: '0.85rem',
      opacity: 0.8,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: 600
    },

    // Professional Categories Section
    categoriesSection: {
      padding: '100px 0',
      position: 'relative'
    },

    // World-Class Section Header
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '80px',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '24px',
      padding: '60px 40px',
      maxWidth: '800px',
      margin: '0 auto 80px auto',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
    },

    sectionBadge: {
      display: 'inline-block',
      padding: '8px 20px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(12px)',
      borderRadius: '25px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.85rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '24px',
      border: '1px solid rgba(255, 255, 255, 0.12)'
    },

    sectionTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: 900,
      marginBottom: '24px',
      color: 'white',
      lineHeight: 1.2,
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },

    sectionDescription: {
      fontSize: '1.2rem',
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.7)',
      maxWidth: '600px',
      margin: '0 auto'
    },

    // World-Class Category Cards
    categoryCard: {
      background: 'rgba(255, 255, 255, 0.04)',
      backdropFilter: 'blur(24px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      overflow: 'hidden',
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      height: '100%',
      boxShadow: '0 16px 50px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },

    categoryGradientTop: (gradient) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: gradient
    }),

    categoryBody: {
      padding: '32px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    },

    categoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },

    categoryIcon: {
      fontSize: '2.5rem',
      transition: 'transform 0.4s ease',
      filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))'
    },

    categoryCount: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      border: '1px solid rgba(255, 255, 255, 0.15)'
    },

    categoryTitle: {
      fontSize: '1.4rem',
      fontWeight: 800,
      marginBottom: '12px',
      color: 'white',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
    },

    categoryDescription: {
      color: 'rgba(255, 255, 255, 0.65)',
      lineHeight: 1.5,
      fontSize: '1rem',
      flexGrow: 1,
      marginBottom: '20px'
    },

    categoryArrow: {
      color: 'rgba(255, 255, 255, 0.4)',
      transition: 'all 0.4s ease',
      alignSelf: 'flex-start'
    },

    // Featured Properties Section
    featuredSection: {
      padding: '100px 0',
      background: 'rgba(255, 255, 255, 0.01)'
    },

    // Loading & Error States - Professional
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 40px',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(24px)',
      borderRadius: '24px',
      margin: '0 24px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
    },

    loadingSpinner: {
      width: '50px',
      height: '50px',
      border: '3px solid rgba(255, 255, 255, 0.1)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '24px'
    },

    loadingText: {
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 600
    },

    // World-Class Explore Button
    exploreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '20px 40px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(24px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '50px',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 700,
      textDecoration: 'none',
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
    }
  };

  // Professional Animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      
      @keyframes gradientFlow {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
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

  // World-Class Hover Effects
  const handleButtonHover = (e, isEntering, type = 'primary') => {
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
      if (type === 'primary') {
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)';
        e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.3)';
      } else {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.2)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      if (type === 'primary') {
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.2)';
      } else {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.boxShadow = 'none';
      }
    }
  };

  const handleCategoryHover = (e, isEntering) => {
    const icon = e.currentTarget.querySelector('[data-icon]');
    const arrow = e.currentTarget.querySelector('[data-arrow]');
    
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
      e.currentTarget.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.2)';
      if (icon) icon.style.transform = 'scale(1.1) rotate(3deg)';
      if (arrow) {
        arrow.style.color = 'white';
        arrow.style.transform = 'translateX(8px)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
      e.currentTarget.style.boxShadow = '0 16px 50px rgba(0, 0, 0, 0.1)';
      if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
      if (arrow) {
        arrow.style.color = 'rgba(255, 255, 255, 0.4)';
        arrow.style.transform = 'translateX(0)';
      }
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Professional Background */}
      <div style={styles.backgroundOverlay}></div>

      {/* World-Class Hero Section */}
      <section style={styles.heroSection}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div style={styles.heroContainer}>
                {/* Premium Badge */}
                <div style={styles.premiumBadge}>
                  <span>✨</span>
                  <span>Premium Property Platform</span>
                </div>

                {/* World-Class Title */}
                <h1 style={styles.heroTitle}>
                  Discover Your <span style={styles.gradientText}>Perfect Space</span><br />With SpaceLink
                </h1>

                {/* Professional Description */}
                <p style={styles.heroDescription}>
                  The most advanced property discovery platform. Find premium properties 
                  with intelligent matching, seamless experiences, and unparalleled service.
                </p>

                {/* World-Class Buttons */}
                <div style={styles.buttonContainer}>
                  <Button
                    as={Link}
                    to="/find-property"
                    style={styles.primaryButton}
                    onMouseEnter={(e) => handleButtonHover(e, true, 'primary')}
                    onMouseLeave={(e) => handleButtonHover(e, false, 'primary')}
                  >
                    <span>Explore Properties</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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

                {/* Professional Trust Metrics */}
                <div style={styles.trustMetrics}>
                  <div style={styles.trustItem}>
                    <span style={styles.trustNumber}>10K+</span>
                    <span style={styles.trustLabel}>Properties</span>
                  </div>
                  <div style={styles.trustItem}>
                    <span style={styles.trustNumber}>50K+</span>
                    <span style={styles.trustLabel}>Happy Clients</span>
                  </div>
                  <div style={styles.trustItem}>
                    <span style={styles.trustNumber}>99.8%</span>
                    <span style={styles.trustLabel}>Success Rate</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* World-Class Categories Section */}
      <section style={styles.categoriesSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Property Categories</div>
            <h2 style={styles.sectionTitle}>
              Find Your <span style={styles.gradientText}>Ideal Property</span>
            </h2>
            <p style={styles.sectionDescription}>
              Explore our curated collection of premium properties across all categories
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
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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

      {/* Featured Properties Section */}
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
              <h4 style={{color: 'white', marginBottom: '16px', fontSize: '1.2rem'}}>Unable to Load Properties</h4>
              <p style={{color: 'rgba(255, 255, 255, 0.7)', margin: 0}}>{error}</p>
            </div>
          ) : (
            <>
              <Row className="g-4 mb-5">
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
                    e.target.style.transform = 'translateY(-4px) scale(1.02)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.target.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                  }}
                >
                  <span>View All Properties</span>
                  <span style={{ fontSize: '0.95rem', opacity: 0.8 }}>({featuredProperties.length}+ available)</span>
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
