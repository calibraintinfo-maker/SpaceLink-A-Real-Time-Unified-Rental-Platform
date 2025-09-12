import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      borderTop: '1px solid rgba(124, 58, 237, 0.1)',
      color: '#374151',
      padding: '28px 0 16px 0',
      marginTop: 'auto'
    }}>
      <Container>
        <Row className="gx-4"> {/* Add Bootstrap gutter spacing */}
          <Col lg={4} className="mb-4">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                borderRadius: '8px',
                padding: '6px'
              }}>
                <span style={{ fontSize: '1.1rem' }}>🏠</span>
              </div>
              <span style={{ 
                fontSize: '1.3rem', 
                fontWeight: 800, 
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>SpaceLink</span>
            </div>
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: '1.6',
              maxWidth: '280px',
              marginBottom: '20px'
            }}>
              Your trusted global rental platform. Helping clients find exceptional rentals and empowering seamless transactions worldwide.
            </p>
            
            {/* Newsletter Signup */}
            <div>
              <h6 style={{
                fontSize: '13px',
                fontWeight: 700,
                marginBottom: '12px',
                color: '#374151',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Stay Updated</h6>
              <form onSubmit={handleSubscribe}>
                <div style={{ 
                  display: 'flex', 
                  gap: '8px',
                  maxWidth: '280px'
                }}>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      background: 'white',
                      color: '#374151',
                      fontSize: '13px'
                    }}
                    required
                  />
                  <button 
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 14px',
                      color: 'white',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4" style={{ paddingLeft: '24px' }}>
            <h6 style={{
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Quick Links</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Find Property', path: '/find-property' },
                { name: 'List Property', path: '/add-property' },
                { name: 'My Bookings', path: '/my-bookings' },
                { name: 'Profile', path: '/profile' }
              ].map((item, index) => (
                <Link 
                  key={index}
                  to={item.path}
                  style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                    padding: '4px 0',
                    lineHeight: '1.5'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4" style={{ paddingLeft: '24px' }}>
            <h6 style={{
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Categories</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Properties', 'Event Venues', 'Vehicles', 'Parking'].map((item, index) => (
                <Link 
                  key={index}
                  to="/find-property"
                  style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                    padding: '4px 0',
                    lineHeight: '1.5'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  {item}
                </Link>
              ))}
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4" style={{ paddingLeft: '24px' }}>
            <h6 style={{
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Support</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Help Center', path: '/help' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'About Us', path: '/about' },
                { name: 'Blog', path: '/blog' }
              ].map((item, index) => (
                <Link 
                  key={index}
                  to={item.path}
                  style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                    padding: '4px 0',
                    lineHeight: '1.5'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4" style={{ paddingLeft: '24px' }}>
            <h6 style={{
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Legal</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Privacy', path: '/privacy' },
                { name: 'Terms', path: '/terms' },
                { name: 'Cookies', path: '/cookies' },
                { name: 'Disclaimer', path: '/disclaimer' }
              ].map((item, index) => (
                <Link 
                  key={index}
                  to={item.path}
                  style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                    padding: '4px 0',
                    lineHeight: '1.5'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Col>
        </Row>
        
        {/* Copyright Row */}
        <div style={{ 
          borderTop: '1px solid rgba(124, 58, 237, 0.1)', 
          paddingTop: '12px', 
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: '#9ca3af', 
            fontSize: '12px', 
            margin: 0,
            fontWeight: 500
          }}>
            © 2025 SpaceLink. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
