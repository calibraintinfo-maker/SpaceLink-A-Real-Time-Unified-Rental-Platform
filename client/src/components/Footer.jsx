import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      color: 'white',
      padding: '80px 0 40px 0',
      marginTop: '0'
    }}>
      <Container>
        <Row>
          <Col lg={4} className="mb-5">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                padding: '8px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🏠</span>
              </div>
              <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>SpaceLink</span>
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem',
              lineHeight: '1.7',
              maxWidth: '320px',
              marginBottom: '32px'
            }}>
              Your trusted global rental platform. Helping clients find exceptional rentals and empowering seamless transactions worldwide.
            </p>
            
            {/* Newsletter Signup */}
            <div>
              <h5 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '16px',
                color: 'white'
              }}>Stay Updated</h5>
              <div style={{ 
                display: 'flex', 
                gap: '12px',
                maxWidth: '320px'
              }}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 20px',
                  color: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h5 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              marginBottom: '24px',
              color: 'white'
            }}>Quick Links</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Find Property', path: '/find-property' },
                { name: 'List Property', path: '/add-property' },
                { name: 'My Bookings', path: '/my-bookings' },
                { name: 'Profile', path: '/profile' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '14px' }}>
                  <Link 
                    to={item.path}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
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
          
          <Col lg={2} md={6} className="mb-4">
            <h5 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              marginBottom: '24px',
              color: 'white'
            }}>Categories</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Properties', 'Event Venues', 'Vehicles', 'Parking & Turfs'].map((item, index) => (
                <li key={index} style={{ marginBottom: '14px' }}>
                  <Link 
                    to="/find-property"
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
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
          
          <Col lg={2} md={6} className="mb-4">
            <h5 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              marginBottom: '24px',
              color: 'white'
            }}>Support</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Help Center', path: '/help' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'About Us', path: '/about' },
                { name: 'Blog', path: '/blog' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '14px' }}>
                  <Link 
                    to={item.path}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
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
          
          <Col lg={2} md={6} className="mb-4">
            <h5 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              marginBottom: '24px',
              color: 'white'
            }}>Legal</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Cookie Policy', path: '/cookies' },
                { name: 'Disclaimer', path: '/disclaimer' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '14px' }}>
                  <Link 
                    to={item.path}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
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
          margin: '50px 0 30px 0'
        }} />
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.95rem'
          }}>
            Made with ❤️ by SpaceLink Team
          </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, index) => (
              <a 
                key={index}
                href="#" 
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#667eea'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
