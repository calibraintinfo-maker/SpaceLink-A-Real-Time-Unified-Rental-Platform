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

  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      paddingTop: '40px',        // Reduced from 60px
      paddingBottom: '20px',     // Reduced from 40px
      position: 'relative'       // Ensures natural scrolling
    }}>
      <Container>
        {/* Compact Footer Content */}
        <Row>
          {/* Brand & Newsletter - More Compact */}
          <Col lg={4} md={6} className="mb-3">
            <Link to="/" style={{
              color: '#0f172a',
              fontSize: '1.3rem',        // Slightly smaller
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '12px'       // Reduced spacing
            }}>
              <span>🏠</span>
              <span>SpaceLink</span>
            </Link>
            
            <p style={{
              color: '#64748b',
              fontSize: '0.9rem',        // Smaller text
              lineHeight: '1.5',
              maxWidth: '280px',
              marginBottom: '16px'       // Reduced spacing
            }}>
              Your trusted global property platform. Find exceptional properties.
            </p>

            {/* Compact Newsletter */}
            <div style={{ marginBottom: '20px' }}>
              <h6 style={{
                color: '#0f172a',
                fontSize: '0.95rem',      // Smaller
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Stay Updated
              </h6>
              
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                gap: '6px',
                maxWidth: '280px'
              }}>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '8px 12px',    // Smaller padding
                    fontSize: '0.85rem',    // Smaller font
                    color: '#0f172a',
                    flex: 1,
                    outline: 'none'
                  }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    background: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 14px',    // Smaller padding
                    fontSize: '0.85rem',    // Smaller font
                    fontWeight: '600',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Subscribe
                </button>
              </form>
              
              {isSubscribed && (
                <p style={{
                  color: '#10b981',
                  fontSize: '0.8rem',     // Smaller
                  fontWeight: '600',
                  marginTop: '6px'
                }}>
                  ✓ Subscribed!
                </p>
              )}
            </div>
          </Col>

          {/* Quick Links - Compact */}
          <Col lg={2} md={3} className="mb-3">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.9rem',        // Smaller
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Quick Links
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { to: '/find-property', text: 'Find Property' },
                { to: '/add-property', text: 'List Property' },
                { to: '/my-bookings', text: 'My Bookings' },
                { to: '/profile', text: 'Profile' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <Link to={link.to} style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.85rem',   // Smaller
                    fontWeight: '500'
                  }}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Categories - Compact */}
          <Col lg={2} md={3} className="mb-3">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Categories
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { to: '/find-property?category=Property Rentals', text: 'Residential' },
                { to: '/find-property?category=Commercial', text: 'Commercial' },
                { to: '/find-property?category=Land', text: 'Land & Plots' },
                { to: '/find-property?category=Event', text: 'Event Venues' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <Link to={link.to} style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Support - Compact */}
          <Col lg={2} md={3} className="mb-3">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Support
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { to: '/help', text: 'Help Center' },
                { to: '/contact', text: 'Contact Us' },
                { to: '/about', text: 'About Us' },
                { to: '/blog', text: 'Blog' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <Link to={link.to} style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Legal - Compact */}
          <Col lg={2} md={3} className="mb-3">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Legal
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { to: '/privacy', text: 'Privacy Policy' },
                { to: '/terms', text: 'Terms of Service' },
                { to: '/cookies', text: 'Cookie Policy' },
                { to: '/disclaimer', text: 'Disclaimer' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <Link to={link.to} style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>

        {/* Compact Bottom Section */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '16px',           // Reduced from 32px
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{
            color: '#64748b',
            fontSize: '0.8rem',          // Smaller
            margin: 0
          }}>
            © 2025 SpaceLink. All rights reserved.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '12px',                 // Reduced gap
            alignItems: 'center'
          }}>
            {['𝕏', 'in', '📷', 'f'].map((icon, index) => (
              <a key={index} href="#" style={{
                color: '#64748b',
                fontSize: '1rem',         // Smaller icons
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',             // Smaller size
                height: '32px',
                borderRadius: '6px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}>
                <span>{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
