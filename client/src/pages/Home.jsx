import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Professional Clean Styles - Perfect Proportions
  const styles = {
    // Global Container
    appContainer: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: 'hidden'
    },

    // Subtle Background Effects
    backgroundSystem: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)'
    },

    // Hero Section - Compact & Professional
    heroSection: {
      padding: '60px 0 40px 0',
      position: 'relative',
      zIndex: 10
    },

    // Main Glass Container - Refined
    glassContainer: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '40px',
      margin: '0 auto',
      maxWidth: '900px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    },

    // Compact Premium Badge
    premiumBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '25px',
      color: 'white',
      fontSize: '0.85rem',
      fontWeight: 600,
      marginBottom: '24px'
    },

    // Professional Typography - Perfect Size
    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      marginBottom: '16px',
      color: 'white',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
    },

    // Clean Gradient Text
    gradientText: {
      background: 'linear-gradient(45deg, #ffd93d, #ff6b6b, #4ecdc4)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'gradientShift 3s ease-in-out infinite'
    },

    // Refined Description
    heroDescription: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '32px',
      maxWidth: '600px',
      margin: '0 auto 32px auto'
    },

    // Professional Buttons - Compact
    buttonContainer: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '32px'
    },

    primaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '25px',
      color: 'white',
      fontSize: '0.95rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },

    secondaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      borderRadius: '25px',
      color: 'white',
      fontSize: '0.95rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },

    // Compact Trust Metrics
    trustMetrics: {
      display: 'flex',
      justifyContent: 'center',
      gap: '32px',
      flexWrap: 'wrap'
    },

    trustItem: {
      textAlign: 'center',
      color: 'white'
    },

    trustNumber: {
      fontSize: '1.5rem',
      fontWeight: 700,
      display: 'block',
      marginBottom: '4px',
      background: 'linear-gradient(135deg, #ffd700, #ffb347)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    trustLabel: {
      fontSize: '0.8rem',
      opacity: 0.85,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    // Features Section - Clean & Compact
    featuresSection: {
      padding: '60px 0',
      background: 'rgba(255, 255, 255, 0.02)'
    },

    // Professional Bento Grid
    bentoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },

    // Clean Feature Card
    featureCard: (isLarge = false) => ({
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      padding: isLarge ? '32px' : '24px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      gridColumn: isLarge ? 'span 2' : 'span 1',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
    }),

    featureIcon: {
      fontSize: '2rem',
      marginBottom: '16px',
      display: 'block'
    },

    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: 700,
      marginBottom: '12px',
      color: 'white'
    },

    featureDescription: {
      fontSize: '0.95rem',
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '16px'
    },

    // Compact Metrics
    featureMetrics: {
      display: 'flex',
      gap: '24px'
    },

    metricItem: {
      textAlign: 'center'
    },

    metricValue: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: 'white',
      display: 'block'
    },

    metricLabel: {
      fontSize: '0.8rem',
      color: 'rgba(255, 255, 255, 0.7)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    // Categories Section - Professional
    categoriesSection: {
      padding: '60px 0'
    },

    // Clean Section Header
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '40px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '800px',
      margin: '0 auto 40px auto'
    },

    sectionBadge: {
      display: 'inline-block',
      padding: '6px 16px',
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: '20px',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '16px'
    },

    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 700,
      marginBottom: '12px',
      color: 'white',
      lineHeight: 1.2
    },

    sectionDescription: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.85)',
      maxWidth: '500px',
      margin: '0 auto'
    },

    // Professional Category Cards
    categoryCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(15px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      height: '100%',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
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
      padding: '20px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
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
      background: 'rgba(255, 255, 255, 0.15)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '8px',
      fontSize: '0.7rem',
      fontWeight: 600,
      textTransform: 'uppercase'
    },

    categoryTitle: {
      fontSize: '1.1rem',
      fontWeight: 700,
      marginBottom: '8px',
      color: 'white'
    },

    categoryDescription: {
      color: 'rgba(255, 255, 255, 0.75)',
      lineHeight: 1.4,
      fontSize: '0.9rem',
      flexGrow: 1,
      marginBottom: '12px'
    },

    categoryArrow: {
      color: 'rgba(255, 255, 255, 0.5)',
      transition: 'all 0.3s ease',
      alignSelf: 'flex-start'
    },

    // Loading States - Clean
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 20px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      margin: '0 20px'
    },

    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '16px'
    },

    loadingText: {
      color: 'white',
      fontSize: '1rem',
      fontWeight: 500
    },

    // Error States - Clean
    errorContainer: {
      background: 'rgba(220, 38, 38, 0.1)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(220, 38, 38, 0.3)',
      borderRadius: '12px',
      padding: '24px',
      textAlign: 'center',
      margin: '0 20px',
      color: 'white'
    },

    // Explore Button - Professional
    exploreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '14px 28px',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '25px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
    }
  };

  // Clean Animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => document.head.removeChild(styleSheet);
  }, []);

  useEffect(() => {
    fetchFeaturedProperties();
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
  const handleButtonHover = (e, isEntering, isPrimary = true) => {
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
      e.currentTarget.style.background = isPrimary 
        ? 'rgba(255, 255, 255, 0.25)' 
        : 'rgba(255, 255, 255, 0.1)';
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.background = isPrimary 
        ? 'rgba(255, 255, 255, 0.2)' 
        : 'transparent';
    }
  };

  const handleCardHover = (e, isEntering) => {
    const icon = e.currentTarget.querySelector('[data-icon]');
    const arrow = e.currentTarget.querySelector('[data-arrow]');
    
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
      if (icon) icon.style.transform = 'scale(1.05)';
      if (arrow) {
        arrow.style.color = 'white';
        arrow.style.transform = 'translateX(4px)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      if (icon) icon.style.transform = 'scale(1)';
      if (arrow) {
        arrow.style.color = 'rgba(255, 255, 255, 0.5)';
        arrow.style.transform = 'translateX(0)';
      }
    }
  };

  const handleFeatureHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Subtle Background */}
      <div style={styles.backgroundSystem}></div>

      {/* Professional Hero Section */}
      <section style={styles.heroSection}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div style={styles.glassContainer}>
                {/* Compact Premium Badge */}
                <div style={styles.premiumBadge}>
                  <span>✨</span>
                  <span>Premium Property Platform</span>
                </div>

                {/* Professional Title */}
                <h1 style={styles.heroTitle}>
                  Discover Your <span style={styles.gradientText}>Perfect Space</span> With SpaceLink
                </h1>

                {/* Clean Description */}
                <p style={styles.heroDescription}>
                  Experience the future of property discovery with intelligent matching, 
                  premium listings, and seamless experiences that redefine luxury living.
                </p>

                {/* Professional Buttons */}
                <div style={styles.buttonContainer}>
                  <Button
                    as={Link}
                    to="/find-property"
                    style={styles.primaryButton}
                    onMouseEnter={(e) => handleButtonHover(e, true, true)}
                    onMouseLeave={(e) => handleButtonHover(e, false, true)}
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
                    onMouseEnter={(e) => handleButtonHover(e, true, false)}
                    onMouseLeave={(e) => handleButtonHover(e, false, false)}
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

      {/* Clean Features Section */}
      <section style={styles.featuresSection}>
        <Container>
          <div style={styles.bentoGrid}>
            {/* Large Feature Card */}
            <div
              style={styles.featureCard(true)}
              onMouseEnter={(e) => handleFeatureHover(e, true)}
              onMouseLeave={(e) => handleFeatureHover(e, false)}
            >
              <span style={styles.featureIcon}>🎯</span>
              <h3 style={styles.featureTitle}>AI-Powered Smart Matching</h3>
              <p style={styles.featureDescription}>
                Advanced algorithms analyze preferences and requirements to recommend 
                properties that perfectly match your lifestyle and budget.
              </p>
              <div style={styles.featureMetrics}>
                <div style={styles.metricItem}>
                  <span style={styles.metricValue}>98%</span>
                  <span style={styles.metricLabel}>Match Accuracy</span>
                </div>
                <div style={styles.metricItem}>
                  <span style={styles.metricValue}>2.3x</span>
                  <span style={styles.metricLabel}>Faster Search</span>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div
              style={styles.featureCard()}
              onMouseEnter={(e) => handleFeatureHover(e, true)}
              onMouseLeave={(e) => handleFeatureHover(e, false)}
            >
              <span style={styles.featureIcon}>⚡</span>
              <h3 style={styles.featureTitle}>Lightning Fast</h3>
              <p style={styles.featureDescription}>
                Real-time filtering with instant results across our entire database.
              </p>
            </div>

            <div
              style={styles.featureCard()}
              onMouseEnter={(e) => handleFeatureHover(e, true)}
              onMouseLeave={(e) => handleFeatureHover(e, false)}
            >
              <span style={styles.featureIcon}>🛡️</span>
              <h3 style={styles.featureTitle}>Secure Platform</h3>
              <p style={styles.featureDescription}>
                Bank-level security protects all your data and transactions.
              </p>
            </div>

            <div
              style={styles.featureCard()}
              onMouseEnter={(e) => handleFeatureHover(e, true)}
              onMouseLeave={(e) => handleFeatureHover(e, false)}
            >
              <span style={styles.featureIcon}>📊</span>
              <h3 style={styles.featureTitle}>Analytics</h3>
              <p style={styles.featureDescription}>
                Comprehensive insights for smarter property decisions.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Professional Categories */}
      <section style={styles.categoriesSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Property Categories</div>
            <h2 style={styles.sectionTitle}>
              Find Your <span style={styles.gradientText}>Perfect Space</span>
            </h2>
            <p style={styles.sectionDescription}>
              Explore curated properties across all categories for every need
            </p>
          </div>

          <Row className="g-3">
            {[
              {
                category: 'Property Rentals',
                icon: '🏠',
                title: 'Residential',
                desc: 'Luxury apartments, modern flats, family homes',
                count: '2.5K+',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              {
                category: 'Commercial',
                icon: '🏢',
                title: 'Commercial',
                desc: 'Premium offices, retail spaces, warehouses',
                count: '1.8K+',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              },
              {
                category: 'Land',
                icon: '🌾',
                title: 'Land & Plots',
                desc: 'Agricultural land, commercial plots',
                count: '950+',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              },
              {
                category: 'Parking',
                icon: '🚗',
                title: 'Parking',
                desc: 'Secure parking spaces and garages',
                count: '3.2K+',
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
              },
              {
                category: 'Event',
                icon: '🎉',
                title: 'Events',
                desc: 'Banquet halls, gardens, venues',
                count: '420+',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              },
              {
                category: 'manage-properties',
                icon: '⚙️',
                title: 'Management',
                desc: 'Property management tools',
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
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
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
      <section style={styles.featuresSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Featured Properties</div>
            <h2 style={styles.sectionTitle}>
              Handpicked <span style={styles.gradientText}>Premium Listings</span>
            </h2>
            <p style={styles.sectionDescription}>
              Discover exceptional properties curated by our expert team
            </p>
          </div>

          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingText}>Loading premium properties...</p>
            </div>
          ) : error ? (
            <div style={styles.errorContainer}>
              <h4>⚠️ Error Loading Properties</h4>
              <p>{error}</p>
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
                    e.target.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
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
