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
    <footer className="footer" style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      paddingTop: '60px',
      paddingBottom: '40px'
    }}>
      <Container>
        {/* Main Footer Content */}
        <Row>
          {/* Brand & Newsletter */}
          <Col lg={4} md={6} className="mb-4">
            <div style={{ marginBottom: '40px' }}>
              <Link to="/" style={{
                color: '#0f172a',
                fontSize: '1.5rem',
                fontWeight: '800',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <span>🏠</span>
                <span>SpaceLink</span>
              </Link>
              <p style={{
                color: '#64748b',
                fontSize: '1rem',
                lineHeight: '1.6',
                maxWidth: '320px',
                marginBottom: '24px'
              }}>
                Your trusted global property platform. Helping clients find exceptional properties and empowering seamless transactions.
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h6 style={{
                color: '#0f172a',
                fontSize: '1.1rem',
                fontWeight: '700',
                marginBottom: '12px'
              }}>
                Stay Updated
              </h6>
              <p style={{
                color: '#64748b',
                fontSize: '0.9rem',
                marginBottom: '16px',
                maxWidth: '300px'
              }}>
                Get the latest property listings and market updates delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                gap: '8px',
                maxWidth: '320px'
              }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    flex: 1,
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    background: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
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
                  marginTop: '8px'
                }}>
                  ✓ Successfully subscribed!
                </p>
              )}
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4">
            <div style={{ marginBottom: '32px' }}>
              <h6 style={{
                color: '#0f172a',
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '16px'
              }}>
                Quick Links
              </h6>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/find-property" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Find Property
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/add-property" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    List Property
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/my-bookings" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    My Bookings
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/profile" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          {/* Categories */}
          <Col lg={2} md={6} className="mb-4">
            <div style={{ marginBottom: '32px' }}>
              <h6 style={{
                color: '#0f172a',
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '16px'
              }}>
                Categories
              </h6>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/find-property?category=Property Rentals" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Residential
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/find-property?category=Commercial" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Commercial
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/find-property?category=Land" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Land & Plots
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/find-property?category=Event" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Event Venues
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          {/* Support */}
          <Col lg={2} md={6} className="mb-4">
            <div style={{ marginBottom: '32px' }}>
              <h6 style={{
                color: '#0f172a',
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '16px'
              }}>
                Support
              </h6>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/help" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Help Center
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/contact" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Contact Us
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/about" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    About Us
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/blog" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          {/* Legal */}
          <Col lg={2} md={6} className="mb-4">
            <div style={{ marginBottom: '32px' }}>
              <h6 style={{
                color: '#0f172a',
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '16px'
              }}>
                Legal
              </h6>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/privacy" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Privacy Policy
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/terms" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Terms of Service
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/cookies" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Cookie Policy
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link to="/disclaimer" style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}>
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{
            color: '#64748b',
            fontSize: '0.9rem',
            margin: 0
          }}>
            © 2025 SpaceLink. All rights reserved.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center'
          }}>
            <a href="#" style={{
              color: '#64748b',
              fontSize: '1.2rem',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0'
            }} aria-label="Twitter">
              <span>𝕏</span>
            </a>
            <a href="#" style={{
              color: '#64748b',
              fontSize: '1.2rem',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0'
            }} aria-label="LinkedIn">
              <span>in</span>
            </a>
            <a href="#" style={{
              color: '#64748b',
              fontSize: '1.2rem',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0'
            }} aria-label="Instagram">
              <span>📷</span>
            </a>
            <a href="#" style={{
              color: '#64748b',
              fontSize: '1.2rem',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0'
            }} aria-label="Facebook">
              <span>f</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
