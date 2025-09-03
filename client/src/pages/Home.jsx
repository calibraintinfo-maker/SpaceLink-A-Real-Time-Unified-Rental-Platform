import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Top 1% Agency Design - Perfect Alignment
  const styles = {
    // Professional App Container
    appContainer: {
      background: '#0a0e1a',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },

    // Perfect Hero Section - Compact & Aligned
    heroSection: {
      padding: '80px 0 60px 0', // Much tighter
      background: '#0a0e1a',
      position: 'relative'
    },

    // Perfect Grid Container
    heroGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },

    // Left Content - Perfectly Aligned
    heroLeft: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },

    // Compact Professional Badge
    premiumBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px', // Much smaller
      background: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '16px',
      color: '#60a5fa',
      fontSize: '0.75rem', // Smaller
      fontWeight: 600,
      marginBottom: '20px', // Much smaller
      width: 'fit-content'
    },

    badgeIcon: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#10b981',
      animation: 'pulse 2s infinite'
    },

    // Perfect Typography - Company Grade
    heroTitle: {
      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', // Much smaller
      fontWeight: 900,
      lineHeight: 1.1,
      marginBottom: '16px', // Tight spacing
      letterSpacing: '-0.02em'
    },

    titleLine1: {
      display: 'block',
      color: 'white'
    },

    titleLine2: {
      display: 'block',
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    // Compact Description
    heroDescription: {
      fontSize: '1rem', // Smaller
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '24px', // Tight spacing
      maxWidth: '480px'
    },

    highlightText: {
      color: '#10b981',
      fontWeight: 600
    },

    // Compact Button Container
    buttonContainer: {
      display: 'flex',
      gap: '12px', // Tight spacing
      marginBottom: '24px', // Much smaller
      flexWrap: 'wrap'
    },

    // Company-Grade Buttons - Compact
    primaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px', // Much smaller
      background: '#3b82f6',
      border: 'none',
      borderRadius: '6px', // Smaller radius
      color: 'white',
      fontSize: '0.9rem', // Smaller
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      userSelect: 'none'
    },

    secondaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '6px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.9rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      userSelect: 'none'
    },

    // Compact Trust Indicators
    trustContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px', // Tight spacing
      flexWrap: 'wrap'
    },

    starsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },

    stars: {
      color: '#fbbf24',
      fontSize: '1rem' // Smaller
    },

    trustText: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.85rem', // Smaller
      fontWeight: 600
    },

    warrantyBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#10b981',
      fontSize: '0.85rem',
      fontWeight: 600
    },

    // Right Image - Perfect Alignment
    heroRight: {
      position: 'relative',
      height: '400px', // Fixed compact height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    // Perfect Property Container
    propertyContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '12px', // Smaller radius
      overflow: 'hidden',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)'
    },

    propertyImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },

    // Compact Property Badge
    propertyBadge: {
      position: 'absolute',
      top: '16px',
      left: '16px',
      padding: '4px 12px', // Smaller
      background: 'rgba(16, 185, 129, 0.9)',
      color: 'white',
      borderRadius: '16px',
      fontSize: '0.75rem', // Smaller
      fontWeight: 600,
      backdropFilter: 'blur(8px)'
    },

    // Compact Categories Section
    categoriesSection: {
      padding: '60px 0', // Much tighter
      background: 'rgba(255, 255, 255, 0.02)'
    },

    // Perfect Section Header - Compact
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '40px', // Much smaller
      maxWidth: '600px',
      margin: '0 auto 40px auto',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '12px',
      padding: '24px' // Much smaller
    },

    sectionBadge: {
      display: 'inline-block',
      padding: '4px 12px', // Smaller
      background: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '16px',
      color: '#60a5fa',
      fontSize: '0.7rem', // Smaller
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '12px' // Smaller
    },

    sectionTitle: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)', // Much smaller
      fontWeight: 800,
      marginBottom: '12px', // Smaller
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
      fontSize: '0.9rem', // Smaller
      lineHeight: 1.4,
      color: 'rgba(255, 255, 255, 0.7)',
      maxWidth: '400px',
      margin: '0 auto'
    },

    // Perfect Category Cards - Compact
    categoryCard: {
      background: 'rgba(255, 255, 255, 0.06)',
      backdropFilter: 'blur(12px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '10px',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      height: '100%',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },

    categoryGradientTop: (gradient) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px', // Thinner
      background: gradient
    }),

    categoryBody: {
      padding: '20px', // Smaller padding
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },

    categoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px' // Smaller
    },

    categoryIcon: {
      fontSize: '1.8rem', // Smaller
      transition: 'transform 0.2s ease'
    },

    categoryCount: {
      background: 'rgba(59, 130, 246, 0.1)',
      color: '#60a5fa',
      padding: '2px 6px', // Smaller
      borderRadius: '6px',
      fontSize: '0.65rem', // Smaller
      fontWeight: 700,
      textTransform: 'uppercase',
      border: '1px solid rgba(59, 130, 246, 0.2)'
    },

    categoryTitle: {
      fontSize: '1rem', // Smaller
      fontWeight: 700,
      marginBottom: '6px', // Smaller
      color: 'white'
    },

    categoryDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: 1.3,
      fontSize: '0.8rem', // Smaller
      marginBottom: '12px', // Smaller
      flexGrow: 1
    },

    categoryArrow: {
      color: 'rgba(255, 255, 255, 0.5)',
      transition: 'all 0.2s ease'
    },

    // Featured Properties - Compact
    featuredSection: {
      padding: '60px 0',
      background: 'rgba(255, 255, 255, 0.01)'
    },

    // Compact Loading
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px', // Smaller
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      borderRadius: '12px',
      margin: '0 20px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },

    loadingSpinner: {
      width: '32px', // Smaller
      height: '32px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderTop: '2px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '16px'
    },

    loadingText: {
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: 500
    },

    // Compact Explore Button
    exploreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      background: 'rgba(59, 130, 246, 0.1)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '6px',
      color: '#60a5fa',
      fontSize: '0.9rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      userSelect: 'none'
    }
  };

  // Professional Animations
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
      
      /* Perfect text selection fix */
      button, a {
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }
      
      /* Responsive Grid */
      @media (max-width: 768px) {
        .hero-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
          text-align: center;
        }
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

  // Perfect Hover Effects - Subtle
  const handleButtonHover = (e, isEntering, type = 'primary') => {
    if (isEntering) {
      if (type === 'primary') {
        e.currentTarget.style.background = '#2563eb';
        e.currentTarget.style.transform = 'translateY(-1px)';
      } else {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }
    } else {
      if (type === 'primary') {
        e.currentTarget.style.background = '#3b82f6';
      } else {
        e.currentTarget.style.background = 'transparent';
      }
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };

  const handleCategoryHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Perfect Hero Section - Company Grade */}
      <section style={styles.heroSection}>
        <div style={styles.heroGrid} className="hero-grid">
          {/* Left Content - Perfect Alignment */}
          <div style={styles.heroLeft}>
            {/* Compact Badge */}
            <div style={styles.premiumBadge}>
              <div style={styles.badgeIcon}></div>
              <span>Made in India • Premium Quality</span>
            </div>

            {/* Perfect Typography */}
            <h1 style={styles.heroTitle}>
              <span style={styles.titleLine1}>Property Risks.</span>
              <span style={styles.titleLine2}>Perfect Solutions.</span>
            </h1>

            {/* Compact Description */}
            <p style={styles.heroDescription}>
              Your property search faces <strong>hidden challenges every day</strong>. From market fluctuations to finding the right match, give yourself <span style={styles.highlightText}>complete peace of mind</span>.
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

            {/* Compact Trust Indicators */}
            <div style={styles.trustContainer}>
              <div style={styles.starsContainer}>
                <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
                <span style={styles.trustText}>10K+ Satisfied Clients</span>
              </div>
              <div style={styles.warrantyBadge}>
                <span>✓</span>
                <span>Lifetime Support</span>
              </div>
            </div>
          </div>

          {/* Right Image - Perfect Alignment */}
          <div style={styles.heroRight}>
            <div style={styles.propertyContainer}>
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Property" 
                style={styles.propertyImage}
              />
              <div style={styles.propertyBadge}>
                Premium Protection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Categories Section */}
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
                desc: 'Premium apartments, luxury flats',
                count: '2.5K+',
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
              },
              {
                category: 'Commercial',
                icon: '🏢',
                title: 'Commercial',
                desc: 'Modern offices, retail spaces',
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
                desc: 'Secure parking spaces',
                count: '3.2K+',
                gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
              },
              {
                category: 'Event',
                icon: '🎉',
                title: 'Event Venues',
                desc: 'Banquet halls, event gardens',
                count: '420+',
                gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
              },
              {
                category: 'manage-properties',
                icon: '⚙️',
                title: 'Management',
                desc: 'Professional management tools',
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
                      <span style={styles.categoryIcon}>{item.icon}</span>
                      <div style={styles.categoryCount}>{item.count}</div>
                    </div>
                    <h4 style={styles.categoryTitle}>{item.title}</h4>
                    <p style={styles.categoryDescription}>{item.desc}</p>
                    <div style={styles.categoryArrow}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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

      {/* Compact Featured Properties */}
      <section style={styles.featuredSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Featured Properties</div>
            <h2 style={styles.sectionTitle}>
              Premium <span style={styles.gradientText}>Collection</span>
            </h2>
            <p style={styles.sectionDescription}>
              Handpicked exceptional properties
            </p>
          </div>

          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingText}>Loading properties...</p>
            </div>
          ) : error ? (
            <div style={{...styles.loadingContainer, background: 'rgba(239, 68, 68, 0.05)'}}>
              <h4 style={{color: 'white', marginBottom: '8px', fontSize: '1rem'}}>Unable to Load</h4>
              <p style={{color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.85rem'}}>{error}</p>
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
                    e.target.style.background = 'rgba(59, 130, 246, 0.15)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <span>View All Properties</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>({featuredProperties.length}+ available)</span>
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
