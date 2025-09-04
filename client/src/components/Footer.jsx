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
      padding: '30px 0'
    }}>
      <Container>
        <Row className="align-items-center">
          {/* Brand & Newsletter */}
          <Col md={4} className="mb-2">
            <Link to="/" style={{
              color: '#0f172a',
              fontSize: '1.3rem',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px'
            }}>
              <span>🏠</span>
              <span>SpaceLink</span>
            </Link>
            
            <p style={{
              color: '#64748b',
              fontSize: '0.85rem',
              marginBottom: '12px',
              maxWidth: '280px'
            }}>
              Your trusted global property platform. Helping clients find exceptional properties and empowering seamless transactions.
            </p>

            {/* Newsletter */}
            <div>
              <h6 style={{
                color: '#0f172a',
                fontSize: '0.9rem',
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
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '0.8rem',
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
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Subscribe
                </button>
              </form>
              
              {isSubscribed && (
                <p style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: '600', marginTop: '4px' }}>
                  ✓ Successfully subscribed!
                </p>
              )}
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={2}>
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '8px'
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
                <li key={i} style={{ marginBottom: '6px' }}>
                  <Link to={link.to} style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Categories */}
          <Col md={2}>
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '8px'
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
                <li key={i} style={{ marginBottom: '6px' }}>
                  <Link to={link.to} style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Support */}
          <Col md={2}>
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '8px'
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
                <li key={i} style={{ marginBottom: '6px' }}>
                  <Link to={link.to} style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Legal & Copyright - NO SOCIAL ICONS */}
          <Col md={2}>
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Legal
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { to: '/privacy', text: 'Privacy Policy' },
                { to: '/terms', text: 'Terms of Service' },
                { to: '/cookies', text: 'Cookie Policy' }
              ].map((link, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>
                  <Link to={link.to} style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Simple Copyright - NO SOCIAL ICONS */}
            <p style={{
              color: '#64748b',
              fontSize: '0.75rem',
              margin: '10px 0 0 0'
            }}>
              © 2025 SpaceLink. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
