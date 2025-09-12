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
      padding: '20px 0 12px 0', // Much smaller padding
      marginTop: 'auto',
      fontSize: '13px' // Smaller base font
    }}>
      <Container>
        <Row>
          <Col lg={4} className="mb-3">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px' // Reduced margin
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                borderRadius: '6px',
                padding: '4px'
              }}>
                <span style={{ fontSize: '1rem' }}>🏠</span>
              </div>
              <span style={{ 
                fontSize: '1.2rem', 
                fontWeight: 800, 
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>SpaceLink</span>
            </div>
            <p style={{
              color: '#6b7280',
              fontSize: '12px',
              lineHeight: '1.4',
              maxWidth: '260px',
              marginBottom: '12px' // Reduced margin
            }}>
              Your trusted global rental platform. Helping clients find exceptional rentals worldwide.
            </p>
            
            {/* Newsletter Signup */}
            <div>
              <h6 style={{
                fontSize: '11px',
                fontWeight: 700,
                marginBottom: '6px', // Much smaller margin
                color: '#374151',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Stay Updated</h6>
              <form onSubmit={handleSubscribe}>
                <div style={{ 
                  display: 'flex', 
                  gap: '4px',
                  maxWidth: '260px'
                }}>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    style={{
                      flex: 1,
                      padding: '6px 8px', // Smaller padding
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      background: 'white',
                      color: '#374151',
                      fontSize: '11px'
                    }}
                    required
                  />
                  <button 
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 10px', // Smaller padding
                      color: 'white',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px'
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-3">
            <h6 style={{
              fontSize: '11px',
              fontWeight: 700,
              marginBottom: '8px', // Smaller margin
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Quick Links</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Find Property', path: '/find-property' },
                { name: 'List Property', path: '/add-property' },
                { name: 'My Bookings', path: '/my-bookings' },
                { name: 'Profile', path: '/profile' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '4px' }}> {/* Much smaller margin */}
                  <Link 
                    to={item.path}
                    style={{
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                      display: 'block',
                      padding: '2px 0', // Smaller padding
                      lineHeight: '1.4'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                    onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-3">
            <h6 style={{
              fontSize: '11px',
              fontWeight: 700,
              marginBottom: '8px',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Categories</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Properties', 'Event Venues', 'Vehicles', 'Parking'].map((item, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  <Link 
                    to="/find-property"
                    style={{
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                      display: 'block',
                      padding: '2px 0',
                      lineHeight: '1.4'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                    onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-3">
            <h6 style={{
              fontSize: '11px',
              fontWeight: 700,
              marginBottom: '8px',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Support</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Help Center', path: '/help' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'About Us', path: '/about' },
                { name: 'Blog', path: '/blog' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  <Link 
                    to={item.path}
                    style={{
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                      display: 'block',
                      padding: '2px 0',
                      lineHeight: '1.4'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                    onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-3">
            <h6 style={{
              fontSize: '11px',
              fontWeight: 700,
              marginBottom: '8px',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Legal</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Privacy', path: '/privacy' },
                { name: 'Terms', path: '/terms' },
                { name: 'Cookies', path: '/cookies' },
                { name: 'Disclaimer', path: '/disclaimer' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  <Link 
                    to={item.path}
                    style={{
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                      display: 'block',
                      padding: '2px 0',
                      lineHeight: '1.4'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                    onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        
        {/* Copyright Row - Super Compact */}
        <div style={{ 
          borderTop: '1px solid rgba(124, 58, 237, 0.1)', 
          paddingTop: '8px', // Much smaller padding
          marginTop: '12px', // Smaller margin
          textAlign: 'center'
        }}>
          <p style={{ 
            color: '#9ca3af', 
            fontSize: '11px', // Smaller font
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
