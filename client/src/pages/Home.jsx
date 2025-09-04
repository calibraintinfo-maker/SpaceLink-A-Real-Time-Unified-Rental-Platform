import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const styles = {
    // World-class app container
    appContainer: {
      background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      lineHeight: 1.6
    },

    // Professional hero section inspired by Musemind
    heroSection: {
      padding: '100px 0 80px 0',
      background: '#ffffff',
      borderRadius: '24px',
      margin: '20px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      position: 'relative'
    },

    // Subtle background pattern like top agencies
    heroBackground: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '40%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
      clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)'
    },

    // Hero grid layout
    heroGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 40px',
      position: 'relative',
      zIndex: 2
    },

    // Left content styling
    heroLeft: {
      display: 'flex',
      flexDirection: 'column'
    },

    // Professional badge like top agencies
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 12px',
      background: 'rgba(99, 102, 241, 0.1)',
      color: '#6366f1',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '24px',
      width: 'fit-content',
      border: '1px solid rgba(99, 102, 241, 0.2)'
    },

    // World-class typography
    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '800',
      lineHeight: '1.1',
      color: '#0f172a',
      marginBottom: '24px',
      letterSpacing: '-0.02em'
    },

    // Gradient text accent
    gradientText: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    // Professional description
    heroDescription: {
      fontSize: '1.25rem',
      color: '#64748b',
      lineHeight: '1.7',
      marginBottom: '32px',
      maxWidth: '500px'
    },

    // Emphasis text
    emphasisText: {
      color: '#0f172a',
      fontWeight: '600'
    },

    // Professional button container
    buttonContainer: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      marginBottom: '40px'
    },

    // Primary CTA button
    primaryButton: {
      background: '#6366f1',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '14px 28px',
      fontSize: '1rem',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
      cursor: 'pointer'
    },

    // Secondary button
    secondaryButton: {
      background: 'transparent',
      color: '#6366f1',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '14px 28px',
      fontSize: '1rem',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer'
    },

    // Trust indicators
    trustIndicators: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      opacity: 0.8
    },

    trustItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#64748b',
      fontSize: '0.9rem',
      fontWeight: '500'
    },

    // Hero right side
    heroRight: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    // Professional image container
    imageContainer: {
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      maxWidth: '480px',
      width: '100%'
    },

    heroImage: {
      width: '100%',
      height: 'auto',
      display: 'block'
    },

    // Floating elements like top agencies
    floatingCard: {
      position: 'absolute',
      background: 'white',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      fontSize: '0.85rem',
      fontWeight: '600',
      color: '#0f172a'
    },

    floatingCard1: {
      top: '20px',
      left: '-20px',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white'
    },

    floatingCard2: {
      bottom: '20px',
      right: '-20px',
      background: 'white'
    },

    // Professional stats section
    statsSection: {
      padding: '80px 20px',
      background: 'white',
      margin: '40px 20px',
      borderRadius: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    },

    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px',
      maxWidth: '1000px',
      margin: '0 auto'
    },

    statCard: {
      textAlign: 'center'
    },

    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#6366f1',
      display: 'block',
      marginBottom: '8px'
    },

    statLabel: {
      color: '#64748b',
      fontSize: '0.9rem',
      fontWeight: '500'
    },

    // Featured properties section
    featuredSection: {
      padding: '80px 20px',
      maxWidth: '1400px',
      margin: '0 auto'
    },

    sectionHeader: {
      textAlign: 'center',
      marginBottom: '60px',
      maxWidth: '600px',
      margin: '0 auto 60px auto'
    },

    sectionBadge: {
      display: 'inline-block',
      padding: '6px 12px',
      background: 'rgba(99, 102, 241, 0.1)',
      color: '#6366f1',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '16px',
      border: '1px solid rgba(99, 102, 241, 0.2)'
    },

    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: '800',
      color: '#0f172a',
      marginBottom: '16px',
      lineHeight: '1.2'
    },

    sectionDescription: {
      fontSize: '1.1rem',
      color: '#64748b',
      lineHeight: '1.6'
    },

    // Loading state
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px',
      background: 'white',
      borderRadius: '16px',
      margin: '0 20px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    },

    loadingSpinner: {
      width: '32px',
      height: '32px',
      border: '3px solid #f1f5f9',
      borderTop: '3px solid #6366f1',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '16px'
    },

    loadingText: {
      color: '#64748b',
      fontSize: '1rem',
      fontWeight: '500'
    },

    // Properties grid
    propertiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
      marginBottom: '40px'
    },

    // View more button
    viewMoreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      background: 'transparent',
      color: '#6366f1',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '0.95rem',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      margin: '0 auto'
    }
  };

  return (
    <>
      {/* World-class CSS animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .primary-btn:hover {
            background: #4f46e5 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4) !important;
          }
          
          .secondary-btn:hover {
            background: rgba(99, 102, 241, 0.05) !important;
            border-color: #6366f1 !important;
            transform: translateY(-1px) !important;
          }
          
          .view-more-btn:hover {
            background: rgba(99, 102, 241, 0.05) !important;
            border-color: #6366f1 !important;
            transform: translateY(-1px) !important;
          }
          
          /* Responsive design */
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
              text-align: center !important;
              padding: 0 20px !important;
            }
            
            .button-container {
              justify-content: center !important;
            }
            
            .trust-indicators {
              justify-content: center !important;
            }
            
            .floating-card-1, .floating-card-2 {
              display: none !important;
            }
          }
          
          @media (max-width: 480px) {
            .stats-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: 20px !important;
            }
            
            .properties-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      <div style={styles.appContainer}>
        {/* World-Class Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroBackground}></div>
          
          <div style={styles.heroGrid} className="hero-grid">
            {/* Left Content */}
            <div style={styles.heroLeft}>
              <div style={styles.heroBadge}>
                Leading Property Platform
              </div>
              
              <h1 style={styles.heroTitle}>
                Leading Global Property{' '}
                <span style={styles.gradientText}>Rental Agency</span>
              </h1>
              
              <p style={styles.heroDescription}>
                SpaceLink is a <span style={styles.emphasisText}>global property platform</span>. 
                Helping clients find exceptional properties and empower seamless transactions.
              </p>
              
              <div style={styles.buttonContainer} className="button-container">
                <Link
                  to="/find-property"
                  style={styles.primaryButton}
                  className="primary-btn"
                >
                  <span>🏠</span>
                  Find Properties
                </Link>
                
                <Link
                  to="/about"
                  style={styles.secondaryButton}
                  className="secondary-btn"
                >
                  Learn More
                </Link>
              </div>
              
              <div style={styles.trustIndicators} className="trust-indicators">
                <div style={styles.trustItem}>
                  <span>⭐</span>
                  <span>5.0 Based on 28 reviews</span>
                </div>
                <div style={styles.trustItem}>
                  <span>✓</span>
                  <span>10K+ Properties</span>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div style={styles.heroRight}>
              <div style={styles.imageContainer}>
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Premium Property"
                  style={styles.heroImage}
                />
                
                {/* Floating cards like top agencies */}
                <div style={{...styles.floatingCard, ...styles.floatingCard1}} className="floating-card-1">
                  ✓ Verified
                </div>
                <div style={{...styles.floatingCard, ...styles.floatingCard2}} className="floating-card-2">
                  💰 Best Price
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Stats Section */}
        <section style={styles.statsSection}>
          <div style={styles.statsGrid} className="stats-grid">
            <div style={styles.statCard}>
              <span style={styles.statNumber}>10K+</span>
              <span style={styles.statLabel}>Satisfied Clients</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>50K+</span>
              <span style={styles.statLabel}>Properties Listed</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>99.5%</span>
              <span style={styles.statLabel}>Success Rate</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>24/7</span>
              <span style={styles.statLabel}>Support</span>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section style={styles.featuredSection}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Premium Collection</div>
            <h2 style={styles.sectionTitle}>Featured Properties</h2>
            <p style={styles.sectionDescription}>
              Discover our handpicked selection of exceptional properties curated by our expert team
            </p>
          </div>

          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingText}>Loading featured properties...</p>
            </div>
          ) : error ? (
            <div style={{...styles.loadingContainer, border: '1px solid #fecaca', background: '#fef2f2'}}>
              <h4 style={{color: '#dc2626', marginBottom: '8px'}}>Unable to load properties</h4>
              <p style={{color: '#991b1b', margin: 0}}>{error}</p>
            </div>
          ) : (
            <>
              <div style={styles.propertiesGrid} className="properties-grid">
                {featuredProperties.slice(0, 6).map((property) => (
                  <PropertyCard key={property._id} property={property} showOwner={true} />
                ))}
              </div>
              
              {featuredProperties.length > 6 && (
                <div style={{ textAlign: 'center' }}>
                  <Link
                    to="/find-property"
                    style={styles.viewMoreButton}
                    className="view-more-btn"
                  >
                    <span>View All Properties</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                      ({featuredProperties.length}+ available)
                    </span>
                  </Link>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
