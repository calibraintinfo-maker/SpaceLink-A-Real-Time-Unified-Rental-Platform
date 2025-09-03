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
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // World-Class Glassmorphism Styles
  const styles = {
    // Global Container
    appContainer: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      minHeight: '100vh',
      position: 'relative',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: 'hidden'
    },

    // Animated Background System
    backgroundSystem: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden'
    },

    // Floating Orbs - Advanced
    floatingOrb: (size, color, delay, x, y) => ({
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, ${color}40 0%, ${color}20 50%, transparent 100%)`,
      filter: 'blur(40px)',
      animation: `floatAdvanced 20s ease-in-out infinite ${delay}s`,
      transform: `translate(${x + mousePosition.x * 0.02}px, ${y + mousePosition.y * 0.01}px)`
    }),

    // Glass Noise Texture
    glassNoise: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
      `,
      animation: 'shimmer 8s ease-in-out infinite'
    },

    // Hero Section - Ultra Premium Glass
    heroSection: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      zIndex: 10
    },

    // Glass Container
    glassContainer: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(40px) saturate(200%)',
      WebkitBackdropFilter: 'blur(40px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '32px',
      padding: '4rem',
      margin: '2rem',
      boxShadow: `
        0 32px 64px rgba(0, 0, 0, 0.1),
        0 16px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1)
      `,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
    },

    // Premium Badge - Glass Style
    premiumBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 24px',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50px',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: 600,
      marginBottom: '3rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    },

    // Badge Shimmer Effect
    badgeShimmer: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
      animation: 'shimmerSlide 3s infinite'
    },

    // Ultra Premium Typography
    heroTitle: {
      fontSize: 'clamp(3.5rem, 8vw, 8rem)',
      fontWeight: 900,
      lineHeight: 0.9,
      marginBottom: '2rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 30%, #ffffff 60%, #e2e8f0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
      letterSpacing: '-0.02em',
      textAlign: 'center'
    },

    // Animated Gradient Text
    gradientText: {
      background: 'linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4d79ff, #9c27b0, #ff6b6b)',
      backgroundSize: '300% 300%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'gradientFlow 4s ease-in-out infinite',
      fontWeight: 900
    },

    // Hero Description
    heroDescription: {
      fontSize: '1.4rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '3rem',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto 3rem auto',
      fontWeight: 400,
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
    },

    // Glass Buttons - Ultra Premium
    glassButton: (isPrimary = true) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '18px 36px',
      background: isPrimary 
        ? 'rgba(255, 255, 255, 0.25)' 
        : 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: isPrimary 
        ? '1px solid rgba(255, 255, 255, 0.4)' 
        : '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '50px',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      boxShadow: isPrimary 
        ? '0 16px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
        : '0 8px 20px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      minWidth: '200px',
      justifyContent: 'center'
    }),

    // Trust Metrics - Glass Cards
    trustMetrics: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginTop: '4rem',
      flexWrap: 'wrap'
    },

    trustCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '2rem 1.5rem',
      textAlign: 'center',
      color: 'white',
      minWidth: '140px',
      transition: 'all 0.4s ease',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },

    trustNumber: {
      fontSize: '2.5rem',
      fontWeight: 900,
      display: 'block',
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #ffd700, #ffb347)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    trustLabel: {
      fontSize: '0.85rem',
      opacity: 0.8,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: 500
    },

    // Features Section - Ultra Glass
    featuresSection: {
      padding: '6rem 0',
      position: 'relative',
      zIndex: 10
    },

    // Bento Grid - Advanced Glass
    bentoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
      padding: '2rem'
    },

    // Feature Card - Premium Glass
    featureCard: (isLarge = false) => ({
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(40px) saturate(200%)',
      WebkitBackdropFilter: 'blur(40px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '28px',
      padding: isLarge ? '3.5rem' : '2.5rem',
      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      gridColumn: isLarge ? 'span 2' : 'span 1',
      boxShadow: `
        0 20px 40px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1)
      `
    }),

    featureIcon: {
      fontSize: '3.5rem',
      marginBottom: '1.5rem',
      display: 'block',
      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
      animation: 'iconFloat 6s ease-in-out infinite'
    },

    featureTitle: {
      fontSize: '2rem',
      fontWeight: 800,
      marginBottom: '1rem',
      color: 'white',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
    },

    featureDescription: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.85)',
      marginBottom: '2rem'
    },

    // Metrics in Feature Card
    featureMetrics: {
      display: 'flex',
      gap: '2rem',
      marginTop: 'auto'
    },

    metricItem: {
      textAlign: 'center'
    },

    metricValue: {
      fontSize: '2rem',
      fontWeight: 900,
      color: 'white',
      display: 'block',
      marginBottom: '0.25rem',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
    },

    metricLabel: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.7)',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },

    // Categories Section
    categoriesSection: {
      padding: '6rem 0',
      position: 'relative',
      zIndex: 10
    },

    sectionHeader: {
      textAlign: 'center',
      marginBottom: '4rem',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(40px) saturate(200%)',
      WebkitBackdropFilter: 'blur(40px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '32px',
      padding: '3rem',
      margin: '0 2rem 4rem 2rem',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    },

    sectionBadge: {
      display: 'inline-block',
      padding: '8px 20px',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50px',
      color: 'white',
      fontSize: '0.85rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '1.5rem'
    },

    sectionTitle: {
      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
      fontWeight: 900,
      marginBottom: '1.5rem',
      color: 'white',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      lineHeight: 1.1
    },

    sectionDescription: {
      fontSize: '1.3rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.9)',
      maxWidth: '700px',
      margin: '0 auto'
    },

    // Category Cards - Ultra Glass
    categoryCard: (gradient) => ({
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(30px) saturate(200%)',
      WebkitBackdropFilter: 'blur(30px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      overflow: 'hidden',
      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      cursor: 'pointer',
      position: 'relative',
      height: '100%',
      textDecoration: 'none',
      color: 'inherit',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)'
    }),

    categoryGradientTop: (gradient) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '6px',
      background: gradient,
      borderRadius: '24px 24px 0 0'
    }),

    categoryBody: {
      padding: '2.5rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 2
    },

    categoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },

    categoryIcon: {
      fontSize: '3rem',
      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))',
      transition: 'transform 0.4s ease'
    },

    categoryCount: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },

    categoryTitle: {
      fontSize: '1.8rem',
      fontWeight: 800,
      marginBottom: '0.75rem',
      color: 'white',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
    },

    categoryDescription: {
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 1.5,
      flexGrow: 1,
      marginBottom: '1.5rem',
      fontSize: '1rem'
    },

    categoryArrow: {
      color: 'rgba(255, 255, 255, 0.6)',
      transition: 'all 0.4s ease',
      alignSelf: 'flex-start'
    },

    // Loading States - Glass
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(40px) saturate(200%)',
      borderRadius: '32px',
      margin: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },

    loadingSpinner: {
      width: '60px',
      height: '60px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '2rem'
    },

    loadingText: {
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 600
    },

    // Error States - Glass
    errorContainer: {
      background: 'rgba(220, 38, 38, 0.1)',
      backdropFilter: 'blur(20px) saturate(200%)',
      border: '1px solid rgba(220, 38, 38, 0.3)',
      borderRadius: '20px',
      padding: '2rem',
      textAlign: 'center',
      margin: '2rem',
      color: 'white'
    },

    // Explore Button - Ultra Glass
    exploreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '20px 40px',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(30px) saturate(200%)',
      WebkitBackdropFilter: 'blur(30px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50px',
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 700,
      textDecoration: 'none',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      cursor: 'pointer'
    }
  };

  // Advanced Animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@100;200;300;400;500;600;700;800;900&display=swap');
      
      @keyframes floatAdvanced {
        0%, 100% { 
          transform: translateY(0px) rotate(0deg) scale(1);
          opacity: 0.6;
        }
        25% { 
          transform: translateY(-30px) rotate(5deg) scale(1.05);
          opacity: 0.8;
        }
        50% { 
          transform: translateY(-10px) rotate(-3deg) scale(1.1);
          opacity: 1;
        }
        75% { 
          transform: translateY(-20px) rotate(3deg) scale(0.95);
          opacity: 0.7;
        }
      }
      
      @keyframes shimmer {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.7; }
      }
      
      @keyframes shimmerSlide {
        0% { left: -100%; }
        50%, 100% { left: 200%; }
      }
      
      @keyframes gradientFlow {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes iconFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-5px) rotate(1deg); }
        66% { transform: translateY(5px) rotate(-1deg); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => document.head.removeChild(styleSheet);
  }, []);

  useEffect(() => {
    fetchFeaturedProperties();
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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

  // Advanced Hover Effects
  const handleGlassHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
    }
  };

  const handleCategoryHover = (e, isEntering) => {
    const icon = e.currentTarget.querySelector('[data-icon]');
    const arrow = e.currentTarget.querySelector('[data-arrow]');
    
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
      if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
      if (arrow) {
        arrow.style.color = 'white';
        arrow.style.transform = 'translateX(8px)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
      if (arrow) {
        arrow.style.color = 'rgba(255, 255, 255, 0.6)';
        arrow.style.transform = 'translateX(0)';
      }
    }
  };

  const handleButtonHover = (e, isEntering, isPrimary = true) => {
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
      e.currentTarget.style.background = isPrimary 
        ? 'rgba(255, 255, 255, 0.35)' 
        : 'rgba(255, 255, 255, 0.2)';
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = isPrimary 
        ? '0 16px 40px rgba(0, 0, 0, 0.15)' 
        : '0 8px 20px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.background = isPrimary 
        ? 'rgba(255, 255, 255, 0.25)' 
        : 'rgba(255, 255, 255, 0.1)';
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Advanced Background System */}
      <div style={styles.backgroundSystem}>
        <div style={styles.floatingOrb(400, '#667eea', 0, -200, -150)}></div>
        <div style={styles.floatingOrb(300, '#f093fb', 2, window.innerWidth - 200, -100)}></div>
        <div style={styles.floatingOrb(500, '#4facfe', 4, window.innerWidth - 400, window.innerHeight - 200)}></div>
        <div style={styles.floatingOrb(250, '#43e97b', 6, -100, window.innerHeight - 300)}></div>
        <div style={styles.floatingOrb(350, '#fa709a', 1, window.innerWidth / 2, window.innerHeight / 2)}></div>
        <div style={styles.glassNoise}></div>
      </div>

      {/* Ultra Premium Hero Section */}
      <section style={styles.heroSection} ref={heroRef}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div style={styles.glassContainer}>
                {/* Premium Badge */}
                <div style={styles.premiumBadge}>
                  <div style={styles.badgeShimmer}></div>
                  <span>✨</span>
                  <span>Premium Property Platform</span>
                </div>

                {/* Ultra Premium Title */}
                <h1 style={styles.heroTitle}>
                  Discover Your<br />
                  <span style={styles.gradientText}>Perfect Space</span><br />
                  With SpaceLink
                </h1>

                {/* Description */}
                <p style={styles.heroDescription}>
                  Experience the future of property discovery with our intelligent matching system,
                  premium listings, and seamless experiences that redefine luxury living.
                </p>

                {/* Glass Buttons */}
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
                  <Button
                    as={Link}
                    to="/find-property"
                    style={styles.glassButton(true)}
                    onMouseEnter={(e) => handleButtonHover(e, true, true)}
                    onMouseLeave={(e) => handleButtonHover(e, false, true)}
                  >
                    <span>Explore Properties</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                    </svg>
                  </Button>
                  
                  <Button
                    as={Link}
                    to="/add-property"
                    style={styles.glassButton(false)}
                    onMouseEnter={(e) => handleButtonHover(e, true, false)}
                    onMouseLeave={(e) => handleButtonHover(e, false, false)}
                  >
                    <span>List Property</span>
                  </Button>
                </div>

                {/* Trust Metrics */}
                <div style={styles.trustMetrics}>
                  <div style={styles.trustCard}>
                    <span style={styles.trustNumber}>10K+</span>
                    <span style={styles.trustLabel}>Properties</span>
                  </div>
                  <div style={styles.trustCard}>
                    <span style={styles.trustNumber}>50K+</span>
                    <span style={styles.trustLabel}>Happy Clients</span>
                  </div>
                  <div style={styles.trustCard}>
                    <span style={styles.trustNumber}>99.8%</span>
                    <span style={styles.trustLabel}>Success Rate</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Ultra Glass Features */}
      <section style={styles.featuresSection}>
        <Container>
          <div style={styles.bentoGrid}>
            {/* Large Feature Card */}
            <div
              style={styles.featureCard(true)}
              onMouseEnter={(e) => handleGlassHover(e, true)}
              onMouseLeave={(e) => handleGlassHover(e, false)}
            >
              <span style={styles.featureIcon}>🎯</span>
              <h3 style={styles.featureTitle}>AI-Powered Smart Matching</h3>
              <p style={styles.featureDescription}>
                Our advanced machine learning algorithms analyze your preferences, behavior, 
                and requirements to recommend properties that perfectly match your lifestyle and budget.
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

            {/* Medium Feature Cards */}
            <div
              style={styles.featureCard()}
              onMouseEnter={(e) => handleGlassHover(e, true)}
              onMouseLeave={(e) => handleGlassHover(e, false)}
            >
              <span style={styles.featureIcon}>⚡</span>
              <h3 style={styles.featureTitle}>Lightning Fast</h3>
              <p style={styles.featureDescription}>
                Real-time filtering with instant results across our entire database.
              </p>
            </div>

            <div
              style={styles.featureCard()}
              onMouseEnter={(e) => handleGlassHover(e, true)}
              onMouseLeave={(e) => handleGlassHover(e, false)}
            >
              <span style={styles.featureIcon}>🛡️</span>
              <h3 style={styles.featureTitle}>Bank-Level Security</h3>
              <p style={styles.featureDescription}>
                Military-grade encryption protects all your data and transactions.
              </p>
            </div>

            <div
              style={styles.featureCard()}
              onMouseEnter={(e) => handleGlassHover(e, true)}
              onMouseLeave={(e) => handleGlassHover(e, false)}
            >
              <span style={styles.featureIcon}>📊</span>
              <h3 style={styles.featureTitle}>Advanced Analytics</h3>
              <p style={styles.featureDescription}>
                Comprehensive insights and analytics for smarter decisions.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Ultra Glass Categories */}
      <section style={styles.categoriesSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Property Categories</div>
            <h2 style={styles.sectionTitle}>
              Find Your <span style={styles.gradientText}>Perfect Space</span>
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
                  style={styles.categoryCard(item.gradient)}
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
              <h3>⚠️ Error Loading Properties</h3>
              <p>{error}</p>
            </div>
          ) : (
            <>
              <Row className="g-4 mb-5">
                {featuredProperties.slice(0, 6).map((property, index) => (
                  <Col key={property._id} lg={4} md={6}>
                    <div style={{ transition: 'transform 0.4s ease' }}>
                      <PropertyCard property={property} showOwner={true} />
                    </div>
                  </Col>
                ))}
              </Row>

              <div style={{ textAlign: 'center' }}>
                <Button
                  as={Link}
                  to="/find-property"
                  style={styles.exploreButton}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-5px) scale(1.02)';
                    e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.25)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
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
