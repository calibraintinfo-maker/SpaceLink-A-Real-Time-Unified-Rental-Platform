import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      color: 'white',
      padding: '50px 0 30px 0'
    }}>
      <Container>
        <Row>
          <Col lg={4} className="mb-4">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '10px',
                padding: '6px'
              }}>
                <span style={{ fontSize: '1.3rem' }}>🏠</span>
              </div>
              <span style={{ fontSize: '1.6rem', fontWeight: 800 }}>SpaceLink</span>
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              maxWidth: '300px',
              marginBottom: '24px'
            }}>
              Your trusted global rental platform. Helping clients find exceptional rentals and empowering seamless transactions worldwide.
            </p>
            
            {/* Newsletter Signup */}
            <div>
              <h5 style={{
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'white'
              }}>Stay Updated</h5>
              <div style={{ 
                display: 'flex', 
                gap: '8px',
                maxWidth: '300px'
              }}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '0.85rem'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  color: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-3">
            <h5 style={{
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '16px',
              color: 'white'
            }}>Quick Links</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Find Property', path: '/find-property' },
                { name: 'List Property', path: '/add-property' },
                { name: 'My Bookings', path: '/my-bookings' },
                { name: 'Profile', path: '/profile' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <Link 
                    to={item.path}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#667eea'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-3">
            <h5 style={{
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '16px',
              color: 'white'
            }}>Categories</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Properties', 'Event Venues', 'Vehicles', 'Parking & Turfs'].map((item, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <Link 
                    to="/find-property"
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#667eea'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-3">
            <h5 style={{
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '16px',
              color: 'white'
            }}>Support</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Help Center', path: '/help' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'About Us', path: '/about' },
                { name: 'Blog', path: '/blog' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <Link 
                    to={item.path}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#667eea'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-3">
            <h5 style={{
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '16px',
              color: 'white'
            }}>Legal</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Cookie Policy', path: '/cookies' },
                { name: 'Disclaimer', path: '/disclaimer' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <Link 
                    to={item.path}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#667eea'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        
        <hr style={{
          border: 'none',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          margin: '30px 0 20px 0'
        }} />
        
        <div style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.9rem'
        }}>
          Made with ❤️ by SpaceLink Team
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
