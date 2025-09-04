import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const styles = {
    // Much smaller footer container
    footerContainer: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '2rem', // Reduced from 4rem
      paddingBottom: '1rem', // Much smaller
      marginTop: '3rem'
    },

    // Compact brand section
    brandSection: {
      marginBottom: '1.5rem' // Reduced spacing
    },

    brandLogo: {
      color: 'white',
      fontSize: '1.2rem', // Smaller logo
      fontWeight: '700',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      marginBottom: '0.5rem' // Less margin
    },

    brandDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.85rem', // Smaller text
      lineHeight: '1.4',
      maxWidth: '280px'
    },

    // Compact newsletter
    newsletterSection: {
      marginBottom: '1.5rem'
    },

    newsletterTitle: {
      color: 'white',
      fontSize: '1rem', // Smaller title
      fontWeight: '600',
      marginBottom: '0.75rem'
    },

    newsletterForm: {
      display: 'flex',
      gap: '8px',
      maxWidth: '300px' // Constrained width
    },

    newsletterInput: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '6px',
      padding: '8px 12px', // Smaller padding
      color: 'white',
      fontSize: '0.85rem', // Smaller font
      flex: 1,
      outline: 'none'
    },

    newsletterButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      border: 'none',
      borderRadius: '6px',
      padding: '8px 16px', // Smaller padding
      color: 'white',
      fontSize: '0.85rem',
      fontWeight: '600',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    },

    // Compact link sections
    linkSection: {
      marginBottom: '1.5rem'
    },

    sectionTitle: {
      color: 'white',
      fontSize: '0.9rem', // Much smaller
      fontWeight: '600',
      marginBottom: '0.75rem', // Less spacing
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    linkList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },

    linkItem: {
      marginBottom: '0.4rem' // Tighter spacing
    },

    footerLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      fontSize: '0.8rem', // Smaller links
      transition: 'color 0.3s ease'
    },

    // Compact bottom section
    bottomSection: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '1rem', // Less padding
      marginTop: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },

    copyright: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.75rem', // Very small text
      margin: 0
    }
  };

  return (
    <>
      <style>
        {`
          .newsletter-input:focus {
            border-color: rgba(59, 130, 246, 0.5) !important;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
          }
          
          .newsletter-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
          
          .newsletter-btn:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
          }
          
          .footer-link:hover {
            color: #60a5fa !important;
          }
          
          @media (max-width: 768px) {
            .newsletter-form {
              flex-direction: column !important;
              gap: 8px !important;
            }
            
            .newsletter-btn {
              width: 100% !important;
            }
            
            .bottom-section {
              flex-direction: column !important;
              gap: 0.5rem !important;
            }
          }
        `}
      </style>

      <footer style={styles.footerContainer}>
        <Container>
          {/* Compact Main Footer Content */}
          <Row>
            {/* Brand & Newsletter - Combined */}
            <Col lg={4} md={6} className="mb-3">
              {/* Compact Brand */}
              <div style={styles.brandSection}>
                <Link to="/" style={styles.brandLogo}>
                  <span>🏠</span>
                  <span>SpaceLink</span>
                </Link>
                <p style={styles.brandDescription}>
                  Your trusted platform for property rentals. Find the perfect space for your needs.
                </p>
              </div>

              {/* Compact Newsletter */}
              <div style={styles.newsletterSection}>
                <h6 style={styles.newsletterTitle}>Stay Updated</h6>
                <div style={styles.newsletterForm} className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter email"
                    style={styles.newsletterInput}
                    className="newsletter-input"
                  />
                  <button
                    style={styles.newsletterButton}
                    className="newsletter-btn"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </Col>

            {/* Quick Links - Compact */}
            <Col lg={2} md={6} className="mb-3">
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
                      Add Property
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/my-bookings" style={styles.footerLink} className="footer-link">
                      My Bookings
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/favorites" style={styles.footerLink} className="footer-link">
                      Favorites
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Categories - Compact */}
            <Col lg={2} md={6} className="mb-3">
              <div style={styles.linkSection}>
                <h6 style={styles.sectionTitle}>Categories</h6>
                <ul style={styles.linkList}>
                  <li style={styles.linkItem}>
                    <Link to="/category/residential" style={styles.footerLink} className="footer-link">
                      Residential
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/category/commercial" style={styles.footerLink} className="footer-link">
                      Commercial
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/category/land" style={styles.footerLink} className="footer-link">
                      Land & Plots
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/category/parking" style={styles.footerLink} className="footer-link">
                      Parking
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Support - Compact */}
            <Col lg={2} md={6} className="mb-3">
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
                    <Link to="/terms" style={styles.footerLink} className="footer-link">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/privacy" style={styles.footerLink} className="footer-link">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Legal - Compact */}
            <Col lg={2} md={6} className="mb-3">
              <div style={styles.linkSection}>
                <h6 style={styles.sectionTitle}>Legal</h6>
                <ul style={styles.linkList}>
                  <li style={styles.linkItem}>
                    <Link to="/privacy-policy" style={styles.footerLink} className="footer-link">
                      Privacy Policy
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/terms-of-service" style={styles.footerLink} className="footer-link">
                      Terms of Service
                    </Link>
                  </li>
                  <li style={styles.linkItem}>
                    <Link to="/cookie-policy" style={styles.footerLink} className="footer-link">
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

          {/* Compact Bottom Section */}
          <div style={styles.bottomSection} className="bottom-section">
            <p style={styles.copyright}>
              © 2025 SpaceLink. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
