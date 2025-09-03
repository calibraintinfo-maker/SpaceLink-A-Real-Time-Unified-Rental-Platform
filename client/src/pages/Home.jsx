import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Inline Styles Object
  const styles = {
    // Global Variables (simulated with CSS custom properties)
    root: {
      '--primary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      '--secondary-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      '--accent-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      '--success-gradient': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      '--warning-gradient': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      '--premium-gold': 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)'
    },
    
    // Hero Section
    heroSection: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },

    backgroundSystem: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    },

    gradientOrb1: {
      position: 'absolute',
      width: '600px',
      height: '600px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
      filter: 'blur(80px)',
      top: '-200px',
      left: '-200px',
      animation: 'float 8s ease-in-out infinite',
      transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
    },

    gradientOrb2: {
      position: 'absolute',
      width: '800px',
      height: '800px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(240, 147, 251, 0.3) 0%, transparent 70%)',
      filter: 'blur(80px)',
      bottom: '-300px',
      right: '-300px',
      animation: 'float 8s ease-in-out infinite 2s',
      transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * 0.025}px)`
    },

    gradientOrb3: {
      position: 'absolute',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(67, 233, 123, 0.25) 0%, transparent 70%)',
      filter: 'blur(80px)',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.02}px)`,
      animation: 'float 8s ease-in-out infinite 4s'
    },

    gridOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
      opacity: 0.5
    },

    noiseTexture: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
      opacity: 0.3
    },

    heroContainer: {
      position: 'relative',
      zIndex: 10
    },

    premiumBadge: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1.5rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '50px',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: 500,
      marginBottom: '3rem',
      overflow: 'hidden'
    },

    badgeIcon: {
      fontSize: '1.2rem',
      animation: 'sparkle 2s ease-in-out infinite'
    },

    heroTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: 'clamp(3rem, 8vw, 7rem)',
      fontWeight: 800,
      lineHeight: 0.95,
      marginBottom: '3rem',
      color: 'white',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },

    titleWord: {
      display: 'inline-block',
      marginRight: '0.3em'
    },

    gradientTextAnimated: {
      background: 'linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4, #45b7d1, #f093fb, #ffd700)',
      backgroundSize: '400% 400%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'gradientFlow 5s ease-in-out infinite'
    },

    brandText: {
      background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      position: 'relative'
    },

    heroDescription: {
      fontSize: '1.375rem',
      fontWeight: 400,
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.85)',
      marginBottom: '4rem',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },

    heroCTA: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '6rem'
    },

    btnPrimary: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 3rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      color: '#0f172a',
      border: 'none',
      borderRadius: '50px',
      fontSize: '1.125rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
      boxShadow: '0 16px 64px rgba(0, 0, 0, 0.12), 0 8px 32px rgba(0, 0, 0, 0.16)',
      overflow: 'hidden',
      minWidth: '200px',
      cursor: 'pointer'
    },

    btnSecondary: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 3rem',
      background: 'transparent',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50px',
      fontSize: '1.125rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.4s ease',
      backdropFilter: 'blur(10px)',
      minWidth: '200px'
    },

    trustMetrics: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap'
    },

    trustItem: {
      textAlign: 'center',
      color: 'white'
    },

    trustNumber: {
      display: 'block',
      fontSize: '2rem',
      fontWeight: 700,
      fontFamily: "'Playfair Display', Georgia, serif",
      marginBottom: '0.25rem',
      background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    trustLabel: {
      fontSize: '0.875rem',
      opacity: 0.8,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: 500
    },

    trustDivider: {
      width: '1px',
      height: '40px',
      background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent)'
    },

    scrollIndicator: {
      position: 'absolute',
      bottom: '3rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      color: 'rgba(255, 255, 255, 0.7)'
    },

    scrollMouse: {
      width: '24px',
      height: '40px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      position: 'relative'
    },

    scrollWheel: {
      width: '4px',
      height: '8px',
      background: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '2px',
      position: 'absolute',
      top: '8px',
      left: '50%',
      transform: 'translateX(-50%)',
      animation: 'scrollWheel 2s ease-in-out infinite'
    },

    scrollText: {
      fontSize: '0.875rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: 500
    },

    // Features Section
    featuresSection: {
      padding: '8rem 0',
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
    },

    bentoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },

    bentoCard: {
      position: 'relative',
      background: 'white',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
      cursor: 'pointer',
      padding: '3rem'
    },

    bentoCardLarge: {
      gridColumn: 'span 2'
    },

    bentoIcon: {
      fontSize: '3rem',
      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))',
      display: 'inline-block',
      marginBottom: '1.5rem'
    },

    bentoTitle: {
      fontSize: '1.75rem',
      fontWeight: 700,
      marginBottom: '1rem',
      color: '#0f172a',
      fontFamily: "'Playfair Display', Georgia, serif"
    },

    bentoDescription: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#64748b',
      marginBottom: '1.5rem'
    },

    bentoMetrics: {
      display: 'flex',
      gap: '2rem',
      marginTop: '2rem'
    },

    metric: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },

    metricValue: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#0f172a',
      fontFamily: "'Playfair Display', Georgia, serif"
    },

    metricLabel: {
      fontSize: '0.875rem',
      color: '#64748b',
      marginTop: '0.25rem'
    },

    // Categories Section
    categoriesSection: {
      padding: '8rem 0',
      background: 'white'
    },

    sectionHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },

    sectionBadge: {
      display: 'inline-block',
      padding: '0.5rem 1.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '50px',
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '1.5rem'
    },

    sectionTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      fontWeight: 700,
      marginBottom: '1.5rem',
      color: '#0f172a'
    },

    sectionDescription: {
      fontSize: '1.25rem',
      lineHeight: 1.6,
      color: '#64748b',
      maxWidth: '700px',
      margin: '0 auto'
    },

    categoryCard: {
      position: 'relative',
      background: 'white',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
      height: '100%',
      cursor: 'pointer'
    },

    categoryGradientLine: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px'
    },

    categoryBody: {
      position: 'relative',
      zIndex: 2,
      padding: '3rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },

    categoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },

    categoryIcon: {
      fontSize: '2.5rem',
      filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
      display: 'inline-block',
      transition: 'transform 0.5s'
    },

    categoryCount: {
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      color: '#475569',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.5rem',
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    categoryTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      marginBottom: '0.5rem',
      color: '#0f172a',
      fontFamily: "'Playfair Display', Georgia, serif"
    },

    categoryDesc: {
      color: '#64748b',
      lineHeight: 1.5,
      flexGrow: 1,
      marginBottom: '1.5rem'
    },

    categoryArrow: {
      color: '#94a3b8',
      transition: 'all 0.5s',
      alignSelf: 'flex-start'
    },

    // Featured Section
    featuredSection: {
      padding: '8rem 0',
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
    },

    propertyWrapper: {
      transition: 'transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)'
    },

    btnExplore: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 4rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      fontSize: '1.125rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.12)'
    },

    btnCount: {
      fontSize: '0.875rem',
      opacity: 0.9,
      fontWeight: 400,
      marginLeft: '0.5rem'
    },

    // Loading States
    loadingSection: {
      textAlign: 'center',
      padding: '6rem'
    },

    loadingAnimation: {
      position: 'relative',
      width: '80px',
      height: '80px',
      margin: '0 auto 1.5rem'
    },

    loadingOrb: {
      position: 'absolute',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      animation: 'loadingOrb 1.5s ease-in-out infinite'
    },

    loadingText: {
      color: '#64748b',
      fontSize: '1.125rem',
      fontWeight: 500
    },

    // Error States
    errorSection: {
      textAlign: 'center',
      padding: '6rem'
    },

    errorIcon: {
      fontSize: '4rem',
      marginBottom: '1.5rem',
      filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))'
    },

    errorMessage: {
      background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
      color: '#dc2626',
      padding: '1.5rem 3rem',
      borderRadius: '1rem',
      border: '1px solid #fca5a5',
      fontWeight: 500,
      display: 'inline-block'
    },

    // CTA Section
    ctaSection: {
      padding: '8rem 0',
      position: 'relative',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      overflow: 'hidden'
    },

    ctaBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    },

    ctaOrb1: {
      position: 'absolute',
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(100px)',
      top: '-250px',
      left: '-250px',
      animation: 'float 10s ease-in-out infinite'
    },

    ctaOrb2: {
      position: 'absolute',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(240, 147, 251, 0.25) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(100px)',
      bottom: '-200px',
      right: '-200px',
      animation: 'float 8s ease-in-out infinite reverse'
    },

    ctaGrid: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '30px 30px'
    },

    ctaContent: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      color: 'white'
    },

    ctaTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      fontWeight: 700,
      marginBottom: '1.5rem'
    },

    ctaDescription: {
      fontSize: '1.25rem',
      lineHeight: 1.6,
      opacity: 0.9,
      marginBottom: '4rem',
      maxWidth: '700px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },

    ctaButtons: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  };

  // CSS Animations (injected into head)
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(1deg); }
        66% { transform: translateY(10px) rotate(-1deg); }
      }
      
      @keyframes gradientFlow {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes sparkle {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(90deg); }
        50% { transform: scale(1) rotate(180deg); }
        75% { transform: scale(1.1) rotate(270deg); }
      }
      
      @keyframes scrollWheel {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(10px); }
      }
      
      @keyframes loadingOrb {
        0%, 100% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1); opacity: 1; }
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

  // Hover handlers for interactive elements
  const handleButtonHover = (e, isHovering) => {
    if (isHovering) {
      e.target.style.transform = 'translateY(-4px)';
      e.target.style.boxShadow = '0 32px 128px rgba(0, 0, 0, 0.16), 0 16px 64px rgba(0, 0, 0, 0.20)';
    } else {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 16px 64px rgba(0, 0, 0, 0.12), 0 8px 32px rgba(0, 0, 0, 0.16)';
    }
  };

  const handleCategoryHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-12px)';
      e.currentTarget.style.boxShadow = '0 32px 128px rgba(0, 0, 0, 0.16), 0 16px 64px rgba(0, 0, 0, 0.20)';
      // Find icon and arrow elements
      const icon = e.currentTarget.querySelector('[data-category-icon]');
      const arrow = e.currentTarget.querySelector('[data-category-arrow]');
      if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
      if (arrow) {
        arrow.style.color = '#0f172a';
        arrow.style.transform = 'translateX(8px)';
      }
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.08)';
      const icon = e.currentTarget.querySelector('[data-category-icon]');
      const arrow = e.currentTarget.querySelector('[data-category-arrow]');
      if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
      if (arrow) {
        arrow.style.color = '#94a3b8';
        arrow.style.transform = 'translateX(0)';
      }
    }
  };

  const handleBentoHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 32px 128px rgba(0, 0, 0, 0.16), 0 16px 64px rgba(0, 0, 0, 0.20)';
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.08)';
    }
  };

  return (
    <div style={styles.root}>
      {/* Ultra Premium Hero Section */}
      <section style={styles.heroSection} ref={heroRef}>
        {/* Background System */}
        <div style={styles.backgroundSystem}>
          <div style={styles.gradientOrb1}></div>
          <div style={styles.gradientOrb2}></div>
          <div style={styles.gradientOrb3}></div>
          <div style={styles.gridOverlay}></div>
          <div style={styles.noiseTexture}></div>
        </div>

        <Container style={styles.heroContainer}>
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col lg={10} className="text-center">
              {/* Premium Badge */}
              <div style={styles.premiumBadge}>
                <span style={styles.badgeIcon}>✨</span>
                <span>Premium Property Platform</span>
              </div>

              {/* Ultra Premium Typography */}
              <h1 style={styles.heroTitle}>
                <span style={styles.titleWord}>Discover</span>
                <span style={styles.titleWord}>Your</span>
                <br />
                <span style={{...styles.titleWord, ...styles.gradientTextAnimated}}>Perfect</span>
                <span style={{...styles.titleWord, ...styles.gradientTextAnimated}}>Space</span>
                <br />
                <span style={styles.titleWord}>With</span>
                <span style={{...styles.titleWord, ...styles.brandText}}>SpaceLink</span>
              </h1>

              {/* Premium Description */}
              <p style={styles.heroDescription}>
                Experience the future of property discovery with our intelligent matching system,
                premium listings, and seamless experiences that redefine luxury living.
              </p>

              {/* Ultra Premium CTAs */}
              <div style={styles.heroCTA}>
                <Button 
                  as={Link} 
                  to="/find-property" 
                  style={styles.btnPrimary}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                  <span>Explore Properties</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '0.5rem'}}>
                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                  </svg>
                </Button>
                
                <Button 
                  as={Link} 
                  to="/add-property" 
                  style={styles.btnSecondary}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  List Property
                </Button>
              </div>

              {/* Trust Metrics */}
              <div style={styles.trustMetrics}>
                <div style={styles.trustItem}>
                  <div style={styles.trustNumber}>10K+</div>
                  <div style={styles.trustLabel}>Properties</div>
                </div>
                <div style={styles.trustDivider}></div>
                <div style={styles.trustItem}>
                  <div style={styles.trustNumber}>50K+</div>
                  <div style={styles.trustLabel}>Happy Clients</div>
                </div>
                <div style={styles.trustDivider}></div>
                <div style={styles.trustItem}>
                  <div style={styles.trustNumber}>99.8%</div>
                  <div style={styles.trustLabel}>Success Rate</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Scroll Indicator */}
        <div style={styles.scrollIndicator}>
          <div style={styles.scrollMouse}>
            <div style={styles.scrollWheel}></div>
          </div>
          <div style={styles.scrollText}>Scroll to explore</div>
        </div>
      </section>

      {/* Premium Features Bento Grid */}
      <section style={styles.featuresSection}>
        <Container>
          <div style={styles.bentoGrid}>
            {/* Large Feature Card */}
            <div 
              style={{...styles.bentoCard, ...styles.bentoCardLarge}}
              onMouseEnter={(e) => handleBentoHover(e, true)}
              onMouseLeave={(e) => handleBentoHover(e, false)}
            >
              <div style={styles.bentoIcon}>🎯</div>
              <h3 style={styles.bentoTitle}>AI-Powered Smart Matching</h3>
              <p style={styles.bentoDescription}>
                Our advanced machine learning algorithms analyze your preferences, 
                behavior, and requirements to recommend properties that perfectly 
                match your lifestyle and budget.
              </p>
              <div style={styles.bentoMetrics}>
                <div style={styles.metric}>
                  <span style={styles.metricValue}>98%</span>
                  <span style={styles.metricLabel}>Match Accuracy</span>
                </div>
                <div style={styles.metric}>
                  <span style={styles.metricValue}>2.3x</span>
                  <span style={styles.metricLabel}>Faster Search</span>
                </div>
              </div>
            </div>

            {/* Medium Feature Cards */}
            <div 
              style={styles.bentoCard}
              onMouseEnter={(e) => handleBentoHover(e, true)}
              onMouseLeave={(e) => handleBentoHover(e, false)}
            >
              <div style={styles.bentoIcon}>⚡</div>
              <h3 style={styles.bentoTitle}>Lightning Fast Search</h3>
              <p style={styles.bentoDescription}>
                Real-time filtering with instant results across our entire database.
              </p>
            </div>

            <div 
              style={styles.bentoCard}
              onMouseEnter={(e) => handleBentoHover(e, true)}
              onMouseLeave={(e) => handleBentoHover(e, false)}
            >
              <div style={styles.bentoIcon}>🛡️</div>
              <h3 style={styles.bentoTitle}>Bank-Level Security</h3>
              <p style={styles.bentoDescription}>
                Military-grade encryption protects all your data and transactions.
              </p>
            </div>

            <div 
              style={styles.bentoCard}
              onMouseEnter={(e) => handleBentoHover(e, true)}
              onMouseLeave={(e) => handleBentoHover(e, false)}
            >
              <div style={styles.bentoIcon}>📊</div>
              <h3 style={styles.bentoTitle}>Advanced Analytics</h3>
              <p style={styles.bentoDescription}>
                Comprehensive insights and analytics for property owners and seekers.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Ultra Premium Categories */}
      <section style={styles.categoriesSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Property Categories</div>
            <h2 style={styles.sectionTitle}>
              Find Your <span style={styles.gradientTextAnimated}>Perfect Space</span>
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
                  style={styles.categoryCard}
                  as={Link}
                  to={item.isManage ? '/manage-properties' : `/find-property?category=${item.category}`}
                  onMouseEnter={(e) => handleCategoryHover(e, true)}
                  onMouseLeave={(e) => handleCategoryHover(e, false)}
                >
                  <div style={{...styles.categoryGradientLine, background: item.gradient}}></div>
                  <Card.Body style={styles.categoryBody}>
                    <div style={styles.categoryHeader}>
                      <div style={styles.categoryIcon} data-category-icon>
                        {item.icon}
                      </div>
                      <div style={styles.categoryCount}>{item.count}</div>
                    </div>
                    <h4 style={styles.categoryTitle}>{item.title}</h4>
                    <p style={styles.categoryDesc}>{item.desc}</p>
                    <div style={styles.categoryArrow} data-category-arrow>
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

      {/* Ultra Premium Featured Properties */}
      <section style={styles.featuredSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Featured Properties</div>
            <h2 style={styles.sectionTitle}>
              Handpicked <span style={styles.gradientTextAnimated}>Premium Listings</span>
            </h2>
            <p style={styles.sectionDescription}>
              Discover exceptional properties curated by our expert team
            </p>
          </div>

          {loading ? (
            <div style={styles.loadingSection}>
              <div style={styles.loadingAnimation}>
                <div style={{...styles.loadingOrb, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', top: 0, left: '50%', transform: 'translateX(-50%)', animationDelay: '0s'}}></div>
                <div style={{...styles.loadingOrb, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', bottom: 0, left: 0, animationDelay: '0.5s'}}></div>
                <div style={{...styles.loadingOrb, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', bottom: 0, right: 0, animationDelay: '1s'}}></div>
              </div>
              <p style={styles.loadingText}>Loading premium properties...</p>
            </div>
          ) : error ? (
            <div style={styles.errorSection}>
              <div style={styles.errorIcon}>⚠️</div>
              <div style={styles.errorMessage}>{error}</div>
            </div>
          ) : (
            <>
              <Row className="g-4 mb-5">
                {featuredProperties.slice(0, 6).map((property, index) => (
                  <Col key={property._id} lg={4} md={6}>
                    <div 
                      style={styles.propertyWrapper}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <PropertyCard property={property} showOwner={true} />
                    </div>
                  </Col>
                ))}
              </Row>
              
              <div className="text-center">
                <Button 
                  as={Link} 
                  to="/find-property" 
                  style={styles.btnExplore}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 32px 128px rgba(0, 0, 0, 0.16), 0 16px 64px rgba(0, 0, 0, 0.20)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.12)';
                  }}
                >
                  <span>View All Properties</span>
                  <span style={styles.btnCount}>({featuredProperties.length}+ available)</span>
                </Button>
              </div>
            </>
          )}
        </Container>
      </section>

      {/* Ultra Premium CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaBackground}>
          <div style={styles.ctaOrb1}></div>
          <div style={styles.ctaOrb2}></div>
          <div style={styles.ctaGrid}></div>
        </div>
        
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <div style={styles.ctaContent}>
                <h2 style={styles.ctaTitle}>
                  Ready to Find Your <span style={styles.gradientTextAnimated}>Dream Space?</span>
                </h2>
                <p style={styles.ctaDescription}>
                  Join over 50,000 satisfied customers who discovered their perfect properties 
                  through our premium platform
                </p>
                
                <div style={styles.ctaButtons}>
                  <Button 
                    as={Link} 
                    to="/find-property" 
                    style={styles.btnPrimary}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(-4px)';
                      e.target.style.boxShadow = '0 32px 128px rgba(0, 0, 0, 0.16), 0 16px 64px rgba(0, 0, 0, 0.20)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
                      e.target.style.color = '#0f172a';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 16px 64px rgba(0, 0, 0, 0.12), 0 8px 32px rgba(0, 0, 0, 0.16)';
                    }}
                  >
                    Start Your Journey
                  </Button>
                  <Button 
                    as={Link} 
                    to="/add-property" 
                    style={styles.btnSecondary}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    List Your Property
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
