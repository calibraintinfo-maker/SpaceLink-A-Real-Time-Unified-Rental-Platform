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
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      padding: '40px 0'
    }}>
      <Container>
        <Row>
          {/* Brand & Newsletter */}
          <Col lg={4} md={6} className="mb-3">
            <Link to="/" style={{
              color: '#0f172a',
              fontSize: '1.4rem',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}>
              <span>🏠</span>
              <span>SpaceLink</span>
            </Link>
            
            <p style={{
              color: '#64748b',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              marginBottom: '16px',
              maxWidth: '300px'
            }}>
              Your trusted global property platform. Helping clients find exceptional properties and empowering seamless transactions.
            </p>

            {/* Newsletter */}
            <div>
              <h6 style={{
                color: '#0f172a',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Stay Updated
              </h6>
              
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                gap: '8px',
                maxWidth: '300px'
              }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '0.9rem',
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
                    padding: '8px 16px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Subscribe
                </button>
              </form>
              
              {isSubscribed && (
                <p style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: '600', marginTop: '6px' }}>
                  ✓ Successfully subscribed!
                </p>
              )}
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={3} className="mb-3">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.95rem',
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
              ].map((link, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
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

          {/* Categories */}
          <Col lg={2} md={3} className="mb-3">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.95rem',
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
              ].map((link, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
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

          {/* Support */}
          <Col lg={2} md={3} className="mb-3">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.95rem',
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
              ].map((link, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
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

          {/* Legal */}
          <Col lg={2} md={3} className="mb-3">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.95rem',
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
              ].map((link, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
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

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '20px',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{
            color: '#64748b',
            fontSize: '0.85rem',
            margin: 0
          }}>
            © 2025 SpaceLink. All rights reserved.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            {['𝕏', 'in', '📷', 'f'].map((icon, i) => (
              <a key={i} href="#" style={{
                color: '#64748b',
                fontSize: '1.1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease'
              }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
