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
    <div style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '25px 0',  // Reduced from 50px
      marginTop: '30px',  // Reduced from 50px
      boxShadow: '0 -1px 4px rgba(0, 0, 0, 0.05)'
    }}>
      <Container>
        {/* Compact Footer Content */}
        <Row className="align-items-center">
          {/* Brand & Newsletter - More Compact */}
          <Col md={4} className="mb-3">
            <Link to="/" style={{
              color: '#0f172a',
              fontSize: '1.2rem',  // Smaller
              fontWeight: '700',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '8px'   // Reduced spacing
            }}>
              🏠 SpaceLink
            </Link>
            
            <p style={{
              color: '#64748b',
              fontSize: '0.8rem',   // Smaller
              lineHeight: '1.4',
              marginBottom: '12px',  // Reduced spacing
              maxWidth: '250px'
            }}>
              Your trusted property platform.
            </p>

            {/* Compact Newsletter */}
            <div>
              <h6 style={{
                color: '#0f172a',
                fontSize: '0.85rem',  // Smaller
                fontWeight: '600',
                marginBottom: '6px'
              }}>
                Stay Updated
              </h6>
              
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                gap: '6px',
                maxWidth: '250px',
                marginBottom: '8px'
              }}>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    padding: '6px 10px',  // Smaller padding
                    fontSize: '0.8rem',   // Smaller font
                    color: '#0f172a',
                    flex: 1,
                    outline: 'none'
                  }}
                  required
                />
                <button type="submit" style={{
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',  // Smaller padding
                  fontSize: '0.8rem',   // Smaller font
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}>
                  Subscribe
                </button>
              </form>
              
              {isSubscribed && (
                <p style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: '600', margin: 0 }}>
                  ✓ Subscribed!
                </p>
              )}
            </div>
          </Col>

          {/* Quick Links - Compact */}
          <Col md={2} className="mb-2">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.85rem',  // Smaller
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Quick Links
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { to: '/find-property', text: 'Find Property' },
                { to: '/add-property', text: 'List Property' },
                { to: '/my-bookings', text: 'My Bookings' },
                { to: '/profile', text: 'Profile' }
              ].map((link, i) => (
                <Link key={i} to={link.to} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.75rem',  // Smaller
                  fontWeight: '500'
                }}>
                  {link.text}
                </Link>
              ))}
            </div>
          </Col>

          {/* Categories - Compact */}
          <Col md={2} className="mb-2">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.85rem',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Categories
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { to: '/find-property?category=Property Rentals', text: 'Residential' },
                { to: '/find-property?category=Commercial', text: 'Commercial' },
                { to: '/find-property?category=Land', text: 'Land & Plots' },
                { to: '/find-property?category=Event', text: 'Event Venues' }
              ].map((link, i) => (
                <Link key={i} to={link.to} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  {link.text}
                </Link>
              ))}
            </div>
          </Col>

          {/* Support - Compact */}
          <Col md={2} className="mb-2">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.85rem',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Support
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { to: '/help', text: 'Help Center' },
                { to: '/contact', text: 'Contact Us' },
                { to: '/about', text: 'About Us' },
                { to: '/blog', text: 'Blog' }
              ].map((link, i) => (
                <Link key={i} to={link.to} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  {link.text}
                </Link>
              ))}
            </div>
          </Col>

          {/* Legal & Copyright - Compact */}
          <Col md={2} className="mb-2">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.85rem',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Legal
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
              {[
                { to: '/privacy', text: 'Privacy Policy' },
                { to: '/terms', text: 'Terms of Service' },
                { to: '/cookies', text: 'Cookie Policy' }
              ].map((link, i) => (
                <Link key={i} to={link.to} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  {link.text}
                </Link>
              ))}
            </div>
            
            {/* Copyright - No Social Icons */}
            <p style={{
              color: '#64748b',
              fontSize: '0.7rem',   // Smaller
              margin: 0,
              fontWeight: '500'
            }}>
              © 2025 SpaceLink. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
