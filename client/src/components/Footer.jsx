import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const styles = {
    // Main Footer Container - Ultra Premium Glass
    footerContainer: {
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      marginTop: 'auto'
    },

    // Background Glow Effect
    backgroundGlow: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      height: '200px',
      background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
      pointerEvents: 'none'
    },

    // Main Footer Content
    footerContent: {
      position: 'relative',
      zIndex: 10,
      padding: '80px 0 40px 0'
    },

    // Brand Section
    brandSection: {
      marginBottom: '2rem'
    },

    brandLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
      textDecoration: 'none'
    },

    brandIcon: {
      fontSize: '2rem',
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    brandName: {
      fontSize: '1.8rem',
      fontWeight: 900,
      color: 'white',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
    },

    brandDescription: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1rem',
      lineHeight: 1.6,
      maxWidth: '300px',
      marginBottom: '24px'
    },

    // Newsletter Section - Premium Glass
    newsletterSection: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '32px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)'
    },

    newsletterTitle: {
      fontSize: '1.1rem',
      fontWeight: 700,
      color: 'white',
      marginBottom: '8px'
    },

    newsletterDesc: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9rem',
      marginBottom: '16px'
    },

    // Newsletter Form
    newsletterForm: {
      display: 'flex',
      gap: '8px'
    },

    emailInput: {
      flex: 1,
      padding: '12px 16px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '0.9rem',
      outline: 'none',
      transition: 'all 0.3s ease'
    },

    subscribeButton: {
      padding: '12px 20px',
      background: 'rgba(59, 130, 246, 0.8)',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap'
    },

    successMessage: {
      color: '#10b981',
      fontSize: '0.85rem',
      marginTop: '8px',
      fontWeight: 500
    },

    // Social Media Icons
    socialContainer: {
      display: 'flex',
      gap: '12px'
    },

    socialIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      color: 'rgba(255, 255, 255, 0.8)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontSize: '1.1rem'
    },

    // Column Sections
    footerColumn: {
      marginBottom: '2rem'
    },

    columnTitle: {
      fontSize: '1rem',
      fontWeight: 700,
      color: 'white',
      marginBottom: '20px',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      position: 'relative'
    },

    columnTitleUnderline: {
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      width: '30px',
      height: '2px',
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      borderRadius: '2px'
    },

    linkList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },

    linkItem: {
      marginBottom: '12px'
    },

    footerLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '4px 0'
    },

    // Bottom Section - Enhanced Glass
    bottomSection: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '24px 0',
      position: 'relative'
    },

    copyrightContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    },

    copyrightText: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.85rem',
      margin: 0
    },

    bottomLinks: {
      display: 'flex',
      gap: '24px',
      flexWrap: 'wrap'
    },

    bottomLink: {
      color: 'rgba(255, 255, 255, 0.6)',
      textDecoration: 'none',
      fontSize: '0.85rem',
      transition: 'all 0.3s ease'
    },

    // Made with Love Badge
    madeWithLove: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.85rem'
    },

    heartIcon: {
      color: '#ef4444',
      fontSize: '0.9rem',
      animation: 'heartbeat 2s infinite'
    }
  };

  // Hover Effects
  const handleLinkHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.color = '#60a5fa';
      e.target.style.transform = 'translateX(4px)';
    } else {
      e.target.style.color = 'rgba(255, 255, 255, 0.7)';
      e.target.style.transform = 'translateX(0)';
    }
  };

  const handleSocialHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.background = 'rgba(59, 130, 246, 0.2)';
      e.target.style.color = '#60a5fa';
      e.target.style.transform = 'translateY(-2px) scale(1.05)';
    } else {
      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
      e.target.style.color = 'rgba(255, 255, 255, 0.8)';
      e.target.style.transform = 'translateY(0) scale(1)';
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
  };

  // Add CSS animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
      
      @media (max-width: 768px) {
        .footer-responsive {
          text-align: center;
        }
        .footer-responsive .social-container {
          justify-content: center;
        }
        .footer-responsive .copyright-container {
          flex-direction: column;
          text-align: center;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <footer style={styles.footerContainer}>
      <div style={styles.backgroundGlow}></div>
      
      <div style={styles.footerContent}>
        <Container className="footer-responsive">
          <Row>
            {/* Brand & Newsletter Section */}
            <Col lg={4} md={6} style={styles.footerColumn}>
              <div style={styles.brandSection}>
                <Link to="/" style={styles.brandLogo}>
                  <span style={styles.brandIcon}>🏠</span>
                  <span style={styles.brandName}>SpaceLink</span>
                </Link>
                <p style={styles.brandDescription}>
                  Your trusted platform for property rentals. Find the perfect space for your needs with our intelligent matching system.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div style={styles.newsletterSection}>
                <h6 style={styles.newsletterTitle}>Stay Updated</h6>
                <p style={styles.newsletterDesc}>
                  Get the latest properties and exclusive offers
                </p>
                <Form onSubmit={handleSubscribe} style={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.emailInput}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                  />
                  <button
                    type="submit"
                    style={styles.subscribeButton}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(59, 130, 246, 1)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(59, 130, 246, 0.8)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Subscribe
                  </button>
                </Form>
                {isSubscribed && (
                  <p style={styles.successMessage}>
                    ✓ Successfully subscribed to our newsletter!
                  </p>
                )}
              </div>

              {/* Social Media */}
              <div style={styles.socialContainer} className="social-container">
                {['📘', '🐦', '📷', '💼', '📺'].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    style={styles.socialIcon}
                    onMouseEnter={(e) => handleSocialHover(e, true)}
                    onMouseLeave={(e) => handleSocialHover(e, false)}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6} style={styles.footerColumn}>
              <h6 style={styles.columnTitle}>
                Quick Links
                <div style={styles.columnTitleUnderline}></div>
              </h6>
              <ul style={styles.linkList}>
                {[
                  { text: 'Find Property', icon: '🔍' },
                  { text: 'Add Property', icon: '➕' },
                  { text: 'My Bookings', icon: '📋' },
                  { text: 'Favorites', icon: '❤️' },
                  { text: 'Dashboard', icon: '📊' }
                ].map((link, index) => (
                  <li key={index} style={styles.linkItem}>
                    <Link
                      to={`/${link.text.toLowerCase().replace(' ', '-')}`}
                      style={styles.footerLink}
                      onMouseEnter={(e) => handleLinkHover(e, true)}
                      onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                      <span>{link.icon}</span>
                      <span>{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Categories */}
            <Col lg={2} md={6} style={styles.footerColumn}>
              <h6 style={styles.columnTitle}>
                Categories
                <div style={styles.columnTitleUnderline}></div>
              </h6>
              <ul style={styles.linkList}>
                {[
                  { text: 'Residential', icon: '🏠' },
                  { text: 'Commercial', icon: '🏢' },
                  { text: 'Land & Plots', icon: '🌾' },
                  { text: 'Parking', icon: '🚗' },
                  { text: 'Event Venues', icon: '🎉' }
                ].map((link, index) => (
                  <li key={index} style={styles.linkItem}>
                    <Link
                      to={`/find-property?category=${link.text}`}
                      style={styles.footerLink}
                      onMouseEnter={(e) => handleLinkHover(e, true)}
                      onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                      <span>{link.icon}</span>
                      <span>{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Support */}
            <Col lg={2} md={6} style={styles.footerColumn}>
              <h6 style={styles.columnTitle}>
                Support
                <div style={styles.columnTitleUnderline}></div>
              </h6>
              <ul style={styles.linkList}>
                {[
                  { text: 'Help Center', icon: '❓' },
                  { text: 'Contact Us', icon: '📞' },
                  { text: 'Live Chat', icon: '💬' },
                  { text: 'Community', icon: '👥' },
                  { text: 'Blog', icon: '📝' }
                ].map((link, index) => (
                  <li key={index} style={styles.linkItem}>
                    <a
                      href="#"
                      style={styles.footerLink}
                      onMouseEnter={(e) => handleLinkHover(e, true)}
                      onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                      <span>{link.icon}</span>
                      <span>{link.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Legal */}
            <Col lg={2} md={6} style={styles.footerColumn}>
              <h6 style={styles.columnTitle}>
                Legal
                <div style={styles.columnTitleUnderline}></div>
              </h6>
              <ul style={styles.linkList}>
                {[
                  { text: 'Privacy Policy', icon: '🔒' },
                  { text: 'Terms of Service', icon: '📄' },
                  { text: 'Cookie Policy', icon: '🍪' },
                  { text: 'Disclaimer', icon: '⚠️' },
                  { text: 'Sitemap', icon: '🗺️' }
                ].map((link, index) => (
                  <li key={index} style={styles.linkItem}>
                    <a
                      href="#"
                      style={styles.footerLink}
                      onMouseEnter={(e) => handleLinkHover(e, true)}
                      onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                      <span>{link.icon}</span>
                      <span>{link.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottomSection}>
        <Container>
          <div style={styles.copyrightContainer} className="copyright-container">
            <p style={styles.copyrightText}>
              © 2025 SpaceLink. All rights reserved.
            </p>
            
            <div style={styles.bottomLinks}>
              <a href="#" style={styles.bottomLink}
                 onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                 onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>
                Security
              </a>
              <a href="#" style={styles.bottomLink}
                 onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                 onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>
                Status
              </a>
              <a href="#" style={styles.bottomLink}
                 onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                 onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}>
                API
              </a>
            </div>
            
            <div style={styles.madeWithLove}>
              <span>Made with</span>
              <span style={styles.heartIcon}>❤️</span>
              <span>in India</span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
