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
      padding: '40px 0',
      marginTop: '50px'
    }}>
      <Container>
        <Row>
          {/* Brand & Newsletter */}
          <Col md={4} className="mb-4">
            <Link 
              to="/" 
              style={{
                color: '#0f172a',
                fontSize: '1.4rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '15px'
              }}
            >
              🏠 SpaceLink
            </Link>
            
            <p style={{
              color: '#64748b',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              marginBottom: '20px',
              maxWidth: '300px'
            }}>
              Your trusted global property platform. Helping clients find exceptional properties and empowering seamless transactions.
            </p>

            <div>
              <h6 style={{
                color: '#0f172a',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                Stay Updated
              </h6>
              
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                gap: '8px',
                maxWidth: '300px',
                marginBottom: '10px'
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
                <p style={{ 
                  color: '#10b981', 
                  fontSize: '0.85rem', 
                  fontWeight: '600',
                  margin: 0 
                }}>
                  ✓ Successfully subscribed!
                </p>
              )}
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={2} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              Quick Links
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/find-property" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Find Property
              </Link>
              <Link to="/add-property" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                List Property
              </Link>
              <Link to="/my-bookings" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                My Bookings
              </Link>
              <Link to="/profile" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Profile
              </Link>
            </div>
          </Col>

          {/* Categories */}
          <Col md={2} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              Categories
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/find-property?category=Property Rentals" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Residential
              </Link>
              <Link to="/find-property?category=Commercial" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Commercial
              </Link>
              <Link to="/find-property?category=Land" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Land & Plots
              </Link>
              <Link to="/find-property?category=Event" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Event Venues
              </Link>
            </div>
          </Col>

          {/* Support */}
          <Col md={2} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              Support
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/help" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Help Center
              </Link>
              <Link to="/contact" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Contact Us
              </Link>
              <Link to="/about" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                About Us
              </Link>
              <Link to="/blog" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Blog
              </Link>
            </div>
          </Col>

          {/* Legal */}
          <Col md={2} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              Legal
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/privacy" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Privacy Policy
              </Link>
              <Link to="/terms" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Terms of Service
              </Link>
              <Link to="/cookies" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Cookie Policy
              </Link>
              <Link to="/disclaimer" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                Disclaimer
              </Link>
            </div>
          </Col>
        </Row>

        {/* Copyright - NO SOCIAL ICONS */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '25px',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#64748b',
            fontSize: '0.9rem',
            margin: 0
          }}>
            © 2025 SpaceLink. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
