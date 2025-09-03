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

  // Professional Glassmorphism Styles
  const styles = {
    // Professional Background System
    appContainer: {
      background: `
        linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%),
        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
      `,
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    },

    // Subtle Mesh Background
    backgroundMesh: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.04) 0%, transparent 40%)
      `,
      zIndex: -1
    },

    // Grid Overlay for Professional Look
    gridOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `
        linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      zIndex: -1
    },

    // Hero Section - Professional
    heroSection: {
      padding: '80px 0 60px 0',
      position: 'relative',
      zIndex: 10
    },

    // Ultra-Professional Glass Container
    glassHeroContainer: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '48px 40px',
      margin: '0 auto',
      maxWidth: '800px',
      boxShadow: `
        0 32px 64px rgba(0, 0, 0, 0.12),
        0 16px 32px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(255, 255, 255, 0.05)
      `,
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },

    // Glass Shimmer Effect
    glassShimmer: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      animation: 'shimmerMove 3s infinite'
    },

    // Professional Badge
    premiumBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 20px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '30px',
      color: 'rgba(255, 255, 255, 0.95)',
      fontSize: '0.875rem',
      fontWeight: 600,
      marginBottom: '32px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },

    // Perfect Typography
    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 3.25rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      marginBottom: '20px',
      color: 'white',
      textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      letterSpacing: '-0.025em'
    },

    // Professional Gradient Text
    gradientText: {
      background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'gradientShift 4s ease-in-out infinite'
    },

    // Clean Description
    heroDescription: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '40px',
      maxWidth: '600px',
      margin: '0 auto 40px auto',
      fontWeight: 400
    },

    // Professional Button Container
    buttonContainer: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '40px'
    },

    // Glass Button - Primary
    glassPrimaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '14px 28px',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '30px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    },

    // Glass Button - Secondary
    glassSecondaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '14px 28px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '30px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)'
    },

    // Trust Metrics Glass
    trustMetrics: {
      display: 'flex',
      justifyContent: 'center',
      gap: '32px',
      flexWrap: 'wrap'
    },

    trustItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '20px 16px',
      textAlign: 'center',
      color: 'white',
      minWidth: '100px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },

    trustNumber: {
      fontSize: '1.75rem',
      fontWeight: 800,
      display: 'block',
      marginBottom: '4px',
      background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    trustLabel: {
      fontSize: '0.8rem',
      opacity: 0.8,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontWeight: 500
    },

    // Features Section Glass
    featuresSection: {
      padding: '80px 0',
      position: 'relative'
    },

    // Professional Bento Grid
    bentoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },

    // Glass Feature Card
    glassFeatureCard: (isLarge = false) => ({
      background: 'rgba(255, 255, 255, 0.06)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '20px',
      padding: isLarge ? '32px' : '28px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      gridColumn: isLarge ? 'span 2' : 'span 1',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }),

    featureIcon: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      display: 'block',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
    },

    featureTitle: {
      fontSize: '1.375rem',
      fontWeight: 700,
      marginBottom: '12px',
      color: 'white',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
    },

    featureDescription: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.75)',
      marginBottom: '20px'
    },

    // Feature Metrics Glass
    featureMetrics: {
      display: 'flex',
      gap: '24px'
    },

    metricItem: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(8px)',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center',
      flex: 1,
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },

    metricValue: {
      fontSize: '1.5rem',
      fontWeight: 800,
      color: 'white',
      display: 'block',
      marginBottom: '4px'
    },

    metricLabel: {
      fontSize: '0.8rem',
      color: 'rgba(255, 255, 255, 0.7)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    // Categories Section
    categoriesSection: {
      padding: '80px 0',
      position: 'relative'
    },

    // Glass Section Header
    glassSectionHeader: {
      textAlign: 'center',
      marginBottom: '48px',
      background: 'rgba(255, 255, 255, 0.04)',
      backdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '700px',
      margin: '0 auto 48px auto',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)'
    },

    sectionBadge: {
      display: 'inline-block',
      padding: '6px 16px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      borderRadius: '20px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.8rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '16px',
      border: '1px solid rgba(255, 255, 255, 0.15)'
    },

    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 2.75rem)',
      fontWeight: 800,
      marginBottom: '16px',
      color: 'white',
      lineHeight: 1.2,
      textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    },

    sectionDescription: {
      fontSize: '1.125rem',
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: '500px',
      margin: '0 auto'
    },

    // Glass Category Cards
    glassCategoryCard: {
      background: 'rgba(255, 255, 255, 0.06)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      height: '100%',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
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
      padding: '24px',
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
      fontSize: '2.25rem',
      transition: 'transform 0.3s ease',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
    },

    categoryCount: {
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(8px)',
      color: 'rgba(255, 255, 255, 0.9)',
      padding: '4px 10px',
      borderRadius: '10px',
      fontSize: '0.7rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      border: '1px solid rgba(255, 255, 255, 0.15)'
    },

    categoryTitle: {
      fontSize: '1.25rem',
      fontWeight: 700,
      marginBottom: '8px',
      color: 'white',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
    },

    categoryDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: 1.4,
      fontSize: '0.95rem',
      flexGrow: 1,
      marginBottom: '16px'
    },

    categoryArrow: {
      color: 'rgba(255, 255, 255, 0.4)',
      transition: 'all 0.3s ease',
      alignSelf: 'flex-start'
    },

    // Loading & Error States - Glass
    glassLoadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 40px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: '20px',
      margin: '0 24px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)'
    },

    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderTop: '2px solid rgba(255, 255, 255, 0.8)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    },

    loadingText: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1rem',
      fontWeight: 500
    },

    // Glass Explore Button
    glassExploreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '16px 32px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '30px',
      color: 'white',
      fontSize: '1.05rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)'
    }
  };

  // Professional Animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      
      @keyframes shimmerMove {
        0% { left: -100%; }
        50%, 100% { left: 200%; }
      }
      
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(24px); }
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
  const handleGlassHover = (e, isEntering, type = 'primary') => {
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
      if (type === 'primary') {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      } else if (type === 'secondary') {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.12)';
      } else {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      if (type === 'primary') {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
      } else if (type === 'secondary') {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)';
      } else {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.1)';
      }
    }
  };

  const handleCategoryHover = (e, isEntering) => {
    const icon = e.currentTarget.querySelector('[data-icon]');
    const arrow = e.currentTarget.querySelector('[data-arrow]');
    
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
      if (icon) icon.style.transform = 'scale(1.05) rotate(2deg)';
      if (arrow) {
        arrow.style.color = 'rgba(255, 255, 255, 0.8)';
        arrow.style.transform = 'translateX(6px)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.1)';
      if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
      if (arrow) {
        arrow.style.color = 'rgba(255, 255, 255, 0.4)';
        arrow.style.transform = 'translateX(0)';
      }
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Professional Background System */}
      <div style={styles.backgroundMesh}></div>
      <div style={styles.gridOverlay}></div>

      {/* Ultra-Professional Hero */}
      <section style={styles.heroSection}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div style={styles.glassHeroContainer}>
                <div style={styles.glassShimmer}></div>
                
                {/* Premium Badge */}
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
                  premium listings, and seamless experiences that redefine modern living.
                </p>

                {/* Glass Buttons */}
                <div style={styles.buttonContainer}>
                  <Button
                    as={Link}
                    to="/find-property"
                    style={styles.glassPrimaryButton}
                    onMouseEnter={(e) => handleGlassHover(e, true, 'primary')}
                    onMouseLeave={(e) => handleGlassHover(e, false, 'primary')}
                  >
                    <span>Explore Properties</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                    </svg>
                  </Button>
                  
                  <Button
                    as={Link}
                    to="/add-property"
                    style={styles.glassSecondaryButton}
                    onMouseEnter={(e) => handleGlassHover(e, true, 'secondary')}
                    onMouseLeave={(e) => handleGlassHover(e, false, 'secondary')}
                  >
                    <span>List Property</span>
                  </Button>
                </div>

                {/* Glass Trust Metrics */}
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

      {/* Glass Features Section */}
      <section style={styles.featuresSection}>
        <Container>
          <div style={styles.bentoGrid}>
            {/* Large Glass Feature Card */}
            <div
              style={styles.glassFeatureCard(true)}
              onMouseEnter={(e) => handleGlassHover(e, true, 'card')}
              onMouseLeave={(e) => handleGlassHover(e, false, 'card')}
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

            {/* Glass Feature Cards */}
            <div
              style={styles.glassFeatureCard()}
              onMouseEnter={(e) => handleGlassHover(e, true, 'card')}
              onMouseLeave={(e) => handleGlassHover(e, false, 'card')}
            >
              <span style={styles.featureIcon}>⚡</span>
              <h3 style={styles.featureTitle}>Lightning Fast</h3>
              <p style={styles.featureDescription}>
                Real-time filtering with instant results across our entire database.
              </p>
            </div>

            <div
              style={styles.glassFeatureCard()}
              onMouseEnter={(e) => handleGlassHover(e, true, 'card')}
              onMouseLeave={(e) => handleGlassHover(e, false, 'card')}
            >
              <span style={styles.featureIcon}>🛡️</span>
              <h3 style={styles.featureTitle}>Secure Platform</h3>
              <p style={styles.featureDescription}>
                Bank-level security protects all your data and transactions.
              </p>
            </div>

            <div
              style={styles.glassFeatureCard()}
              onMouseEnter={(e) => handleGlassHover(e, true, 'card')}
              onMouseLeave={(e) => handleGlassHover(e, false, 'card')}
            >
              <span style={styles.featureIcon}>📊</span>
              <h3 style={styles.featureTitle}>Advanced Analytics</h3>
              <p style={styles.featureDescription}>
                Comprehensive insights for smarter property decisions.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Glass Categories Section */}
      <section style={styles.categoriesSection}>
        <Container>
          <div style={styles.glassSectionHeader}>
            <div style={styles.sectionBadge}>Property Categories</div>
            <h2 style={styles.sectionTitle}>
              Find Your <span style={styles.gradientText}>Perfect Space</span>
            </h2>
            <p style={styles.sectionDescription}>
              Explore curated properties across all categories for every need
            </p>
          </div>

          <Row className="g-4">
            {[
              {
                category: 'Property Rentals',
                icon: '🏠',
                title: 'Residential',
                desc: 'Luxury apartments, modern flats, family homes',
                count: '2.5K+',
                gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
              },
              {
                category: 'Commercial',
                icon: '🏢',
                title: 'Commercial',
                desc: 'Premium offices, retail spaces, warehouses',
                count: '1.8K+',
                gradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)'
              },
              {
                category: 'Land',
                icon: '🌾',
                title: 'Land & Plots',
                desc: 'Agricultural land, commercial plots',
                count: '950+',
                gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
              },
              {
                category: 'Parking',
                icon: '🚗',
                title: 'Parking',
                desc: 'Secure parking spaces and garages',
                count: '3.2K+',
                gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
              },
              {
                category: 'Event',
                icon: '🎉',
                title: 'Events',
                desc: 'Banquet halls, gardens, venues',
                count: '420+',
                gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)'
              },
              {
                category: 'manage-properties',
                icon: '⚙️',
                title: 'Management',
                desc: 'Property management tools',
                count: 'Tools',
                gradient: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                isManage: true
              }
            ].map((item, index) => (
              <Col lg={4} md={6} key={index}>
                <Card
                  style={styles.glassCategoryCard}
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
      <section style={styles.featuresSection}>
        <Container>
          <div style={styles.glassSectionHeader}>
            <div style={styles.sectionBadge}>Featured Properties</div>
            <h2 style={styles.sectionTitle}>
              Handpicked <span style={styles.gradientText}>Premium Listings</span>
            </h2>
            <p style={styles.sectionDescription}>
              Discover exceptional properties curated by our expert team
            </p>
          </div>

          {loading ? (
            <div style={styles.glassLoadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingText}>Loading premium properties...</p>
            </div>
          ) : error ? (
            <div style={{...styles.glassLoadingContainer, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)'}}>
              <h4 style={{color: 'white', marginBottom: '12px'}}>⚠️ Error Loading Properties</h4>
              <p style={{color: 'rgba(255, 255, 255, 0.8)', margin: 0}}>{error}</p>
            </div>
          ) : (
            <>
              <Row className="g-4 mb-5">
                {featuredProperties.slice(0, 6).map((property, index) => (
                  <Col key={property._id} lg={4} md={6}>
                    <div style={{ transition: 'transform 0.3s ease' }}>
                      <PropertyCard property={property} showOwner={true} />
                    </div>
                  </Col>
                ))}
              </Row>

              <div style={{ textAlign: 'center' }}>
                <Button
                  as={Link}
                  to="/find-property"
                  style={styles.glassExploreButton}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px) scale(1.02)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.boxShadow = '0 24px 50px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.1)';
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
