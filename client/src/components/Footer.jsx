import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  const styles = {
    // Clean Footer Container
    footerContainer: {
      background: '#0a0e1a',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: 'auto',
      padding: '60px 0 30px 0'
    },

    // Main Content Row
    footerContent: {
      marginBottom: '40px'
    },

    // Brand Section - Clean
    brandSection: {
      marginBottom: '2rem'
    },

    brandLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '16px',
      textDecoration: 'none'
    },

    brandIcon: {
      fontSize: '1.8rem'
    },

    brandName: {
      fontSize: '1.5rem',
      fontWeight: 800,
      color: 'white',
      margin: 0
    },

    brandDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.95rem',
      lineHeight: 1.5,
      marginBottom: '24px',
      maxWidth: '300px'
    },

    // Newsletter - Simple & Clean
    newsletterContainer: {
      background: 'rgba(255, 255, 255, 0.05)',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },

    newsletterTitle: {
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      marginBottom: '8px'
    },

    newsletterForm: {
      display: 'flex',
      gap: '8px',
      marginTop: '12px'
    },

    emailInput: {
      flex: 1,
      padding: '10px 12px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '6px',
      color: 'white',
      fontSize: '0.9rem',
      outline: 'none'
    },

    subscribeBtn: {
      padding: '10px 20px',
      background: '#3b82f6',
      border: 'none',
      borderRadius: '6px',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    },

    // Column Headers - Clean
    columnTitle: {
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      marginBottom: '16px'
    },

    // Link Lists - Clean
    linkList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },

    linkItem: {
      marginBottom: '8px'
    },

    footerLink: {
      color: 'rgba(255, 255, 255, 0.6)',
      textDecoration: 'none',
      fontSize: '0.9rem',
      transition: 'color 0.2s ease',
      display: 'block',
      padding: '4px 0'
    },

    // Bottom Section - Clean
    bottomSection: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '20px',
      textAlign: 'center'
    },

    copyrightText: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '0.85rem',
      margin: 0
    }
  };

  return (
    <footer style={styles.footerContainer}>
      <Container>
        <Row style={styles.footerContent}>
          {/* Brand & Newsletter */}
          <Col lg={4} md={6} style={styles.brandSection}>
            <Link to="/" style={styles.brandLogo}>
              <span style={styles.brandIcon}>🏠</span>
              <span style={styles.brandName}>SpaceLink</span>
            </Link>
            
            <p style={styles.brandDescription}>
              Your trusted platform for property rentals. Find the perfect space for your needs.
            </p>

            <div style={styles.newsletterContainer}>
              <h6 style={styles.newsletterTitle}>Stay Updated</h6>
              <form onSubmit={handleSubscribe} style={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.emailInput}
                  required
                />
                <button
                  type="submit"
                  style={styles.subscribeBtn}
                  onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                  onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <h6 style={styles.columnTitle}>Quick Links</h6>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}>
                <Link
                  to="/find-property"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Find Property
                </Link>
              </li>
              <li style={styles.linkItem}>
                <Link
                  to="/add-property"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Add Property
                </Link>
              </li>
              <li style={styles.linkItem}>
                <Link
                  to="/my-bookings"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  My Bookings
                </Link>
              </li>
              <li style={styles.linkItem}>
                <Link
                  to="/favorites"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </Col>

          {/* Categories */}
          <Col lg={2} md={6}>
            <h6 style={styles.columnTitle}>Categories</h6>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}>
                <Link
                  to="/find-property?category=residential"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Residential
                </Link>
              </li>
              <li style={styles.linkItem}>
                <Link
                  to="/find-property?category=commercial"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Commercial
                </Link>
              </li>
              <li style={styles.linkItem}>
                <Link
                  to="/find-property?category=land"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Land & Plots
                </Link>
              </li>
              <li style={styles.linkItem}>
                <Link
                  to="/find-property?category=parking"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Parking
                </Link>
              </li>
            </ul>
          </Col>

          {/* Support */}
          <Col lg={2} md={6}>
            <h6 style={styles.columnTitle}>Support</h6>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}>
                <a
                  href="#"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Help Center
                </a>
              </li>
              <li style={styles.linkItem}>
                <a
                  href="#"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Contact Us
                </a>
              </li>
              <li style={styles.linkItem}>
                <a
                  href="#"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Terms & Conditions
                </a>
              </li>
              <li style={styles.linkItem}>
                <a
                  href="#"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Col>

          {/* Legal */}
          <Col lg={2} md={6}>
            <h6 style={styles.columnTitle}>Legal</h6>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}>
                <a
                  href="#"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Privacy Policy
                </a>
              </li>
              <li style={styles.linkItem}>
                <a
                  href="#"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Terms of Service
                </a>
              </li>
              <li style={styles.linkItem}>
                <a
                  href="#"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Cookie Policy
                </a>
              </li>
              <li style={styles.linkItem}>
                <a
                  href="#"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Bottom Section */}
        <div style={styles.bottomSection}>
          <p style={styles.copyrightText}>
            © 2025 SpaceLink. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
