import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // PERFECT Balance - Enhanced Visibility & Proper Sizing
  const styles = {
    // Professional App Container
    appContainer: {
      background: '#0a0e1a',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },

    // Perfect Hero Section - Enhanced Size
    heroSection: {
      padding: '100px 0 80px 0', // Increased padding
      background: '#0a0e1a',
      position: 'relative'
    },

    // Enhanced Grid Container - Better Spacing
    heroGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '50px', // Reduced gap
      alignItems: 'center',
      maxWidth: '1300px', // Increased max width
      margin: '0 auto',
      padding: '0 40px' // Increased padding
    },

    // Left Content - Better Proportions
    heroLeft: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },

    // Enhanced Premium Badge - More Visible
    premiumBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px', // Increased size
      background: 'rgba(59, 130, 246, 0.15)', // More visible
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '25px',
      color: '#60a5fa',
      fontSize: '0.9rem', // Increased font
      fontWeight: 600,
      marginBottom: '32px', // Increased margin
      width: 'fit-content',
      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)'
    },

    badgeIcon: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#10b981',
      animation: 'pulse 2s infinite',
      boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)'
    },

    // Enhanced Typography - Perfect Size
    heroTitle: {
      fontSize: 'clamp(3rem, 5vw, 4rem)', // Increased size
      fontWeight: 900,
      lineHeight: 1.1,
      marginBottom: '24px', // Increased margin
      letterSpacing: '-0.02em'
    },

    titleLine1: {
      display: 'block',
      color: 'white',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },

    titleLine2: {
      display: 'block',
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: 'none'
    },

    // Enhanced Description
    heroDescription: {
      fontSize: '1.2rem', // Increased size
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.85)',
      marginBottom: '32px', // Increased margin
      maxWidth: '520px'
    },

    highlightText: {
      color: '#10b981',
      fontWeight: 600
    },

    // Enhanced Button Container
    buttonContainer: {
      display: 'flex',
      gap: '16px', // Increased gap
      marginBottom: '40px', // Increased margin
      flexWrap: 'wrap'
    },

    // Enhanced Buttons - Better Size
    primaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '16px 32px', // Increased padding
      background: '#3b82f6',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem', // Increased font
      fontWeight: 700,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      userSelect: 'none',
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
    },

    secondaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '16px 32px',
      background: 'rgba(255, 255, 255, 0.08)', // More visible
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: 'rgba(255, 255, 255, 0.95)',
      fontSize: '1rem',
      fontWeight: 700,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      userSelect: 'none',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
    },

    // Enhanced Trust Container
    trustContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px', // Increased gap
      flexWrap: 'wrap'
    },

    starsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    stars: {
      color: '#fbbf24',
      fontSize: '1.1rem', // Increased size
      filter: 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3))'
    },

    trustText: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.95rem', // Increased size
      fontWeight: 600
    },

    warrantyBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#10b981',
      fontSize: '0.95rem',
      fontWeight: 600
    },

    // Right Image - Enhanced
    heroRight: {
      position: 'relative',
      height: '450px', // Increased height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    // Enhanced Property Container
    propertyContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '16px', // Increased radius
      overflow: 'hidden',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)', // Enhanced shadow
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },

    propertyImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },

    // Enhanced Property Badge
    propertyBadge: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '8px 16px', // Increased padding
      background: 'rgba(16, 185, 129, 0.9)',
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      color: 'white',
      borderRadius: '20px',
      fontSize: '0.85rem', // Increased font
      fontWeight: 700,
      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },

    // Enhanced Categories Section
    categoriesSection: {
      padding: '80px 0', // Increased padding
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)'
    },

    // Enhanced Section Header
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '50px', // Increased margin
      maxWidth: '800px', // Increased width
      margin: '0 auto 50px auto',
      background: 'rgba(255, 255, 255, 0.06)', // More visible
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '16px',
      padding: '40px', // Increased padding
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)'
    },

    sectionBadge: {
      display: 'inline-block',
      padding: '8px 16px', // Increased padding
      background: 'rgba(59, 130, 246, 0.15)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(59, 130, 246, 0.25)',
      borderRadius: '20px',
      color: '#60a5fa',
      fontSize: '0.8rem', // Increased font
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '20px' // Increased margin
    },

    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 2.8rem)', // Increased size
      fontWeight: 800,
      marginBottom: '16px', // Increased margin
      color: 'white',
      lineHeight: 1.2,
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },

    gradientText: {
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    sectionDescription: {
      fontSize: '1.1rem', // Increased size
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: '500px',
      margin: '0 auto'
    },

    // Enhanced Category Cards
    categoryCard: {
      background: 'rgba(255, 255, 255, 0.08)', // More visible
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)', // More visible border
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      height: '100%',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)', // Enhanced shadow
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
      padding: '28px', // Increased padding
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
      fontSize: '2.2rem', // Increased size
      transition: 'transform 0.3s ease',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
    },

    categoryCount: {
      background: 'rgba(59, 130, 246, 0.15)',
      backdropFilter: 'blur(8px)',
      color: '#60a5fa',
      padding: '4px 10px', // Increased padding
      borderRadius: '8px',
      fontSize: '0.7rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      border: '1px solid rgba(59, 130, 246, 0.25)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
    },

    categoryTitle: {
      fontSize: '1.2rem', // Increased size
      fontWeight: 800,
      marginBottom: '8px',
      color: 'white',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    },

    categoryDescription: {
      color: 'rgba(255, 255, 255, 0.75)',
      lineHeight: 1.4,
      fontSize: '0.95rem', // Increased size
      marginBottom: '16px',
      flexGrow: 1
    },

    categoryArrow: {
      color: 'rgba(255, 255, 255, 0.5)',
      transition: 'all 0.3s ease'
    },

    // Enhanced Featured Properties
    featuredSection: {
      padding: '80px 0',
      background: 'rgba(255, 255, 255, 0.01)'
    },

    // Enhanced Loading Container
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px', // Increased padding
      background: 'rgba(255, 255, 255, 0.08)', // More visible
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: '16px',
      margin: '0 20px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
    },

    loadingSpinner: {
      width: '40px', // Increased size
      height: '40px',
      border: '3px solid rgba(255, 255, 255, 0.2)',
      borderTop: '3px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    },

    loadingText: {
      color: 'white',
      fontSize: '1rem', // Increased size
      fontWeight: 600
    },

    // Enhanced Explore Button
    exploreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 32px', // Increased padding
      background: 'rgba(59, 130, 246, 0.15)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '8px',
      color: '#60a5fa',
      fontSize: '1rem', // Increased size
      fontWeight: 700,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      userSelect: 'none',
      boxShadow: '0 12px 40px rgba(59, 130, 246, 0.2)'
    }
  };

  // Enhanced Animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.1); }
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
      
      /* Enhanced Responsive Grid */
      @media (max-width: 768px) {
        .hero-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
          text-align: center;
          padding: 0 20px !important;
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

  // Enhanced Hover Effects
  const handleButtonHover = (e, isEntering, type = 'primary') => {
    if (isEntering) {
      if (type === 'primary') {
        e.currentTarget.style.background = '#2563eb';
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(59, 130, 246, 0.4)';
      } else {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.3)';
      }
    } else {
      if (type === 'primary') {
        e.currentTarget.style.background = '#3b82f6';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
      } else {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
      }
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
    }
  };

  const handleCategoryHover = (e, isEntering) => {
    const icon = e.currentTarget.querySelector('[data-icon]');
    const arrow = e.currentTarget.querySelector('[data-arrow]');
    
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
      e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
      if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
      if (arrow) {
        arrow.style.color = '#60a5fa';
        arrow.style.transform = 'translateX(6px)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
      if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
      if (arrow) {
        arrow.style.color = 'rgba(255, 255, 255, 0.5)';
        arrow.style.transform = 'translateX(0)';
      }
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Enhanced Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroGrid} className="hero-grid">
          {/* Enhanced Left Content */}
          <div style={styles.heroLeft}>
            {/* Enhanced Badge */}
            

            {/* Enhanced Typography */}
            <h1 style={styles.heroTitle}>
              <span style={styles.titleLine1}>Property Risks.</span>
              <span style={styles.titleLine2}>Perfect Solutions.</span>
            </h1>

            {/* Enhanced Description */}
            <p style={styles.heroDescription}>
              Your property search faces <strong>hidden challenges every day</strong>. From market fluctuations to finding the right match, give yourself <span style={styles.highlightText}>complete peace of mind</span>.
            </p>

            {/* Enhanced Buttons */}
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
              
             
            </div>

            {/* Enhanced Trust Indicators */}
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

          {/* Enhanced Right Image */}
          <div style={styles.heroRight}>
            <div style={styles.propertyContainer}>
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Property" 
                style={styles.propertyImage}
              />
             
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
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
                title: 'Management',
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

      {/* Enhanced Featured Properties */}
      <section style={styles.featuredSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Featured Properties</div>
            <h2 style={styles.sectionTitle}>
              Premium <span style={styles.gradientText}>Collection</span>
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
            <div style={{...styles.loadingContainer, background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)'}}>
              <h4 style={{color: 'white', marginBottom: '12px', fontSize: '1.1rem'}}>Unable to Load Properties</h4>
              <p style={{color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '0.9rem'}}>{error}</p>
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
                    e.target.style.background = 'rgba(59, 130, 246, 0.25)';
                    e.target.style.transform = 'translateY(-2px) scale(1.02)';
                    e.target.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.15)';
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.2)';
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
