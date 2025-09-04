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
      padding: '50px 0',
      marginTop: '50px',
      boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <Container>
        <Row>
          {/* Brand & Newsletter */}
          <Col lg={4} md={6} className="mb-4">
            <Link 
              to="/" 
              style={{
                color: '#0f172a',
                fontSize: '1.5rem',
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
              fontSize: '0.95rem',
              lineHeight: '1.6',
              marginBottom: '25px',
              maxWidth: '320px'
            }}>
              Your trusted global property platform. Helping clients find exceptional properties and empowering seamless transactions.
            </p>

            <div>
              <h6 style={{
                color: '#0f172a',
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                Stay Updated
              </h6>
              
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                gap: '10px',
                maxWidth: '320px',
                marginBottom: '15px'
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
                    padding: '10px 14px',
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
                    padding: '10px 18px',
                    fontSize: '0.9rem',
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
          <Col lg={2} md={3} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              Quick Links
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/find-property" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Find Property
              </Link>
              <Link to="/add-property" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                List Property
              </Link>
              <Link to="/my-bookings" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                My Bookings
              </Link>
              <Link to="/profile" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Profile
              </Link>
            </div>
          </Col>

          {/* Categories */}
          <Col lg={2} md={3} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              Categories
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/find-property?category=Property Rentals" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Residential
              </Link>
              <Link to="/find-property?category=Commercial" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Commercial
              </Link>
              <Link to="/find-property?category=Land" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Land & Plots
              </Link>
              <Link to="/find-property?category=Event" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Event Venues
              </Link>
            </div>
          </Col>

          {/* Support */}
          <Col lg={2} md={3} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              Support
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/help" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Help Center
              </Link>
              <Link to="/contact" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Contact Us
              </Link>
              <Link to="/about" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                About Us
              </Link>
              <Link to="/blog" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Blog
              </Link>
            </div>
          </Col>

          {/* Legal */}
          <Col lg={2} md={3} className="mb-4">
            <h6 style={{
              color: '#0f172a',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              Legal
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/privacy" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Privacy Policy
              </Link>
              <Link to="/terms" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Terms of Service
              </Link>
              <Link to="/cookies" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Cookie Policy
              </Link>
              <Link to="/disclaimer" style={{ 
                color: '#64748b', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Disclaimer
              </Link>
            </div>
          </Col>
        </Row>

        {/* Copyright Section - NO SOCIAL ICONS */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '30px',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#64748b',
            fontSize: '0.9rem',
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
