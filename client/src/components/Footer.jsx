import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
    // Light theme footer - NO positioning issues
    footerContainer: {
      background: '#ffffff', // Light theme
      borderTop: '1px solid #e2e8f0',
      paddingTop: '60px',
      paddingBottom: '40px',
      position: 'relative', // CRITICAL: Not fixed
      zIndex: 1 // Lower than navbar
    },

    // Brand section
    brandSection: {
      marginBottom: '40px'
    },

    brandLogo: {
      color: '#0f172a',
      fontSize: '1.5rem',
      fontWeight: '800',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px'
    },

    brandDescription: {
      color: '#64748b',
      fontSize: '1rem',
      lineHeight: '1.6',
      maxWidth: '320px',
      marginBottom: '24px'
    },

    // Newsletter section
    newsletterSection: {
      marginBottom: '40px'
    },

    newsletterTitle: {
      color: '#0f172a',
      fontSize: '1.1rem',
      fontWeight: '700',
      marginBottom: '12px'
    },

    newsletterDescription: {
      color: '#64748b',
      fontSize: '0.9rem',
      marginBottom: '16px',
      maxWidth: '300px'
    },

    newsletterForm: {
      display: 'flex',
      gap: '8px',
      maxWidth: '320px'
    },

    newsletterInput: {
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '0.9rem',
      color: '#0f172a',
      flex: 1,
      outline: 'none',
      transition: 'all 0.2s ease'
    },

    newsletterButton: {
      background: '#6366f1',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 16px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap'
    },

    successMessage: {
      color: '#10b981',
      fontSize: '0.85rem',
      fontWeight: '600',
      marginTop: '8px'
    },

    // Links sections
    linkSection: {
      marginBottom: '32px'
    },

    sectionTitle: {
      color: '#0f172a',
      fontSize: '1rem',
      fontWeight: '700',
      marginBottom: '16px'
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
      color: '#64748b',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'color 0.2s ease'
    },

    // Bottom section
    bottomSection: {
      borderTop: '1px solid #e2e8f0',
      paddingTop: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px'
    },

    copyright: {
      color: '#64748b',
      fontSize: '0.9rem',
      margin: 0
    },

    socialLinks: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    },

    socialLink: {
      color: '#64748b',
      fontSize: '1.2rem',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      background: '#f8fafc',
      border: '1px solid #e2e8f0'
    }
  };

  return (
    <>
      <style>
        {`
          .newsletter-input:focus {
            border-color: #6366f1 !important;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
          }
          
          .newsletter-input::placeholder {
            color: #94a3b8;
          }
          
          .newsletter-btn:hover {
            background: #4f46e5 !important;
            transform: translateY(-1px) !important;
          }
          
          .footer-link:hover {
            color: #6366f1 !important;
          }
          
          .brand-logo:hover {
            color: #6366f1 !important;
          }
          
          .social-link:hover {
            color: #6366f1 !important;
            background: #f1f5f9 !important;
            border-color: #cbd5e1 !important;
            transform: translateY(-1px) !important;
          }
          
          @media (max-width: 768px) {
            .newsletter-form {
              flex-direction: column !important;
            }
            
            .newsletter-btn {
              width: 100% !important;
            }
            
            .bottom-section {
              flex-direction: column !important;
              text-align: center !important;
            }
            
            .social-links {
              justify-content: center !important;
            }
          }
        `}
      </style>

      <footer style={styles.footerContainer}>
        <Container>
          {/* Main Footer Content */}
          <Row>
            {/* Brand & Newsletter */}
            <Col lg={4} md={6} className="mb-4">
              {/* Brand */}
              <div style={styles.brandSection}>
                <Link to="/" style={styles.brandLogo} className="brand-logo">
                  <span>🏠</span>
                  <span>SpaceLink</span>
                </Link>
                <p style={styles.brandDescription}>
                  Your trusted global property platform. Helping clients find exceptional properties and empowering seamless transactions.
                </p>
              </div>

              {/* Newsletter */}
              <div style={styles.newsletterSection}>
                <h6 style={styles.newsletterTitle}>Stay Updated</h6>
                <p style={styles.newsletterDescription}>
                  Get the latest property listings and updates delivered to your inbox.
                </p>
                <form onSubmit={handleSubscribe} style={styles.newsletterForm} className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.newsletterInput}
                    className="newsletter-input"
                    required
                  />
                  <button
                    type="submit"
                    style={styles.newsletterButton}
                    className="newsletter-btn"
                  >
                    Subscribe
                  </button>
                </form>
                {isSubscribed && (
                  <p style={styles.successMessage}>✓ Successfully subscribed!</p>
                )}
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6} className="mb-4">
              <div style={styles.linkSection}>
                <h6 style={styles.sectionTitle}>Quick Links</h6>
                <ul style={styles.linkList}>
                  <li style={styles.linkItem}>
                    <Link to="/find-property" style={styles.footerLink} className="footer-link">
                      Find Property
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/add-property" style={styles.footerLink} className="footer-link">
                      List Property
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/my-bookings" style={styles.footerLink} className="footer-link">
                      My Bookings
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/profile" style={styles.footerLink} className="footer-link">
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Categories */}
            <Col lg={2} md={6} className="mb-4">
              <div style={styles.linkSection}>
                <h6 style={styles.sectionTitle}>Categories</h6>
                <ul style={styles.linkList}>
                  <li style={styles.linkItem}>
                    <Link to="/find-property?category=Property Rentals" style={styles.footerLink} className="footer-link">
                      Residential
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/find-property?category=Commercial" style={styles.footerLink} className="footer-link">
                      Commercial
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/find-property?category=Land" style={styles.footerLink} className="footer-link">
                      Land & Plots
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/find-property?category=Event" style={styles.footerLink} className="footer-link">
                      Event Venues
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Support */}
            <Col lg={2} md={6} className="mb-4">
              <div style={styles.linkSection}>
                <h6 style={styles.sectionTitle}>Support</h6>
                <ul style={styles.linkList}>
                  <li style={styles.linkItem}>
                    <Link to="/help" style={styles.footerLink} className="footer-link">
                      Help Center
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/contact" style={styles.footerLink} className="footer-link">
                      Contact Us
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/about" style={styles.footerLink} className="footer-link">
                      About Us
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/blog" style={styles.footerLink} className="footer-link">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Legal */}
            <Col lg={2} md={6} className="mb-4">
              <div style={styles.linkSection}>
                <h6 style={styles.sectionTitle}>Legal</h6>
                <ul style={styles.linkList}>
                  <li style={styles.linkItem}>
                    <Link to="/privacy" style={styles.footerLink} className="footer-link">
                      Privacy Policy
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/terms" style={styles.footerLink} className="footer-link">
                      Terms of Service
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/cookies" style={styles.footerLink} className="footer-link">
                      Cookie Policy
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/disclaimer" style={styles.footerLink} className="footer-link">
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          {/* Bottom Section */}
          <div style={styles.bottomSection} className="bottom-section">
            <p style={styles.copyright}>
              © 2025 SpaceLink. All rights reserved.
            </p>
            
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialLink} className="social-link" aria-label="Twitter">
                <span>𝕏</span>
              </a>
              <a href="#" style={styles.socialLink} className="social-link" aria-label="LinkedIn">
                <span>in</span>
              </a>
              <a href="#" style={styles.socialLink} className="social-link" aria-label="Instagram">
                <span>📷</span>
              </a>
              <a href="#" style={styles.socialLink} className="social-link" aria-label="Facebook">
                <span>f</span>
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
