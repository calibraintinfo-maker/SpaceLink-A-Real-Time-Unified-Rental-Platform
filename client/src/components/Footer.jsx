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
      padding: '40px 0',  // Normal size - not too big, not too small
      marginTop: '40px',
      boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.08)'
    }}>
      <Container>
        <Row>
          {/* Brand & Newsletter - Perfect Size */}
          <Col lg={4} md={6} className="mb-4">
            <Link to="/" style={{
              color: '#0f172a',
              fontSize: '1.3rem',  // Normal size
              fontWeight: '700',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '12px'
            }}>
              🏠 SpaceLink
            </Link>
            
            <p style={{
              color: '#64748b',
              fontSize: '0.9rem',   // Normal size
              lineHeight: '1.5',
              marginBottom: '20px',
              maxWidth: '300px'
            }}>
              Your trusted global property platform. Helping clients find exceptional properties and empowering seamless transactions.
            </p>

            <div>
              <h6 style={{
                color: '#0f172a',
                fontSize: '1rem',    // Normal size
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                Stay Updated
              </h6>
              
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                gap: '8px',
                maxWidth: '300px',
                marginBottom: '12px'
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
                    padding: '8px 12px',  // Normal padding
                    fontSize: '0.9rem',   // Normal size
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
                  borderRadius: '6px',
                  padding: '8px 16px',  // Normal padding
                  fontSize: '0.9rem',   // Normal size
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}>
                  Subscribe
                </button>
              </form>
              
              {isSubscribed && (
                <p style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: '600', margin: 0 }}>
                  ✓ Successfully subscribed!
                </p>
              )}
            </div>
          </Col>

          {/* Quick Links - Normal Size */}
          <Col lg={2} md={3} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.95rem',  // Normal size
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Quick Links
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { to: '/find-property', text: 'Find Property' },
                { to: '/add-property', text: 'List Property' },
                { to: '/my-bookings', text: 'My Bookings' },
                { to: '/profile', text: 'Profile' }
              ].map((link, i) => (
                <Link key={i} to={link.to} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.85rem',  // Normal size
                  fontWeight: '500',
                  transition: 'color 0.2s ease'
                }}>
                  {link.text}
                </Link>
              ))}
            </div>
          </Col>

          {/* Categories - Normal Size */}
          <Col lg={2} md={3} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.95rem',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Categories
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { to: '/find-property?category=Property Rentals', text: 'Residential' },
                { to: '/find-property?category=Commercial', text: 'Commercial' },
                { to: '/find-property?category=Land', text: 'Land & Plots' },
                { to: '/find-property?category=Event', text: 'Event Venues' }
              ].map((link, i) => (
                <Link key={i} to={link.to} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  transition: 'color 0.2s ease'
                }}>
                  {link.text}
                </Link>
              ))}
            </div>
          </Col>

          {/* Support - Normal Size */}
          <Col lg={2} md={3} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.95rem',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Support
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { to: '/help', text: 'Help Center' },
                { to: '/contact', text: 'Contact Us' },
                { to: '/about', text: 'About Us' },
                { to: '/blog', text: 'Blog' }
              ].map((link, i) => (
                <Link key={i} to={link.to} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  transition: 'color 0.2s ease'
                }}>
                  {link.text}
                </Link>
              ))}
            </div>
          </Col>

          {/* Legal - Normal Size */}
          <Col lg={2} md={3} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '0.95rem',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Legal
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { to: '/privacy', text: 'Privacy Policy' },
                { to: '/terms', text: 'Terms of Service' },
                { to: '/cookies', text: 'Cookie Policy' },
                { to: '/disclaimer', text: 'Disclaimer' }
              ].map((link, i) => (
                <Link key={i} to={link.to} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  transition: 'color 0.2s ease'
                }}>
                  {link.text}
                </Link>
              ))}
            </div>
          </Col>
        </Row>

        {/* Copyright Section - Normal Size, No Social Icons */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '24px',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#64748b',
            fontSize: '0.9rem',    // Normal size
            margin: 0,
            fontWeight: '500'
          }}>
            © 2025 SpaceLink. All rights reserved.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
