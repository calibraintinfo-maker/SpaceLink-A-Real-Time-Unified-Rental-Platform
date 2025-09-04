import React, { useState, useEffect } from 'react';
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
      // CRITICAL: Natural positioning - NO FIXED
      position: 'relative',
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      paddingTop: '30px',          // Reduced size
      paddingBottom: '20px',       // Reduced size
      marginTop: 'auto'           // Push to bottom naturally
    }}>
      <Container>
        <Row>
          {/* Compact Brand & Newsletter */}
          <Col md={6} className="mb-3">
            <Link to="/" style={{
              color: '#0f172a',
              fontSize: '1.2rem',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '10px'
            }}>
              <span>🏠</span>
              <span>SpaceLink</span>
            </Link>
            
            <p style={{
              color: '#64748b',
              fontSize: '0.85rem',
              lineHeight: '1.4',
              marginBottom: '15px',
              maxWidth: '300px'
            }}>
              Your trusted global property platform. Find exceptional properties.
            </p>

            {/* Compact Newsletter */}
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
                maxWidth: '280px',
                marginBottom: '10px'
              }}>
                <input
                  type="email"
                  placeholder="Enter email"
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
                <p style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: '600' }}>
                  ✓ Subscribed!
                </p>
              )}
            </div>
          </Col>

          {/* Compact Links */}
          <Col md={6}>
            <Row>
              <Col sm={3}>
                <h6 style={{ color: '#0f172a', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>
                  Quick Links
                </h6>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Find Property', 'List Property', 'My Bookings', 'Profile'].map((text, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>
                      <Link to={`/${text.toLowerCase().replace(' ', '-')}`} style={{
                        color: '#64748b',
                        textDecoration: 'none',
                        fontSize: '0.75rem'
                      }}>
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>

              <Col sm={3}>
                <h6 style={{ color: '#0f172a', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>
                  Categories
                </h6>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Residential', 'Commercial', 'Land & Plots', 'Events'].map((text, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>
                      <Link to={`/find-property?category=${text}`} style={{
                        color: '#64748b',
                        textDecoration: 'none',
                        fontSize: '0.75rem'
                      }}>
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>

              <Col sm={3}>
                <h6 style={{ color: '#0f172a', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>
                  Support
                </h6>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Help Center', 'Contact Us', 'About Us', 'Blog'].map((text, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>
                      <Link to={`/${text.toLowerCase().replace(' ', '-')}`} style={{
                        color: '#64748b',
                        textDecoration: 'none',
                        fontSize: '0.75rem'
                      }}>
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>

              <Col sm={3}>
                <h6 style={{ color: '#0f172a', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>
                  Legal
                </h6>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((text, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>
                      <Link to={`/${text.toLowerCase().replace(' ', '-')}`} style={{
                        color: '#64748b',
                        textDecoration: 'none',
                        fontSize: '0.75rem'
                      }}>
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Compact Bottom */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>
            © 2025 SpaceLink. All rights reserved.
          </p>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {['𝕏', 'in', '📷', 'f'].map((icon, i) => (
              <a key={i} href="#" style={{
                color: '#64748b',
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
