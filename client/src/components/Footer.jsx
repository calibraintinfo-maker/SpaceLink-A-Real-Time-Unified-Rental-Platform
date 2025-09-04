import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Hide/Show footer on scroll
  useEffect(() => {
    const controlFooter = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide footer
        setIsVisible(false);
      } else {
        // Scrolling up - show footer
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlFooter);
    return () => window.removeEventListener('scroll', controlFooter);
  }, [lastScrollY]);

  return (
    <footer 
      className={`fixed-footer ${!isVisible ? 'hidden' : ''}`}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        transition: 'transform 0.3s ease-in-out',
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        padding: '20px 0'
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Brand & Newsletter - Compact */}
          <Col md={4} className="mb-2">
            <Link to="/" style={{
              color: '#0f172a',
              fontSize: '1.1rem',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '8px'
            }}>
              <span>🏠</span>
              <span>SpaceLink</span>
            </Link>
            
            <p style={{
              color: '#64748b',
              fontSize: '0.8rem',
              marginBottom: '10px',
              maxWidth: '250px'
            }}>
              Your trusted property platform.
            </p>

            {/* Compact Newsletter */}
            <form onSubmit={handleSubscribe} style={{
              display: 'flex',
              gap: '4px',
              maxWidth: '250px'
            }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  padding: '6px 8px',
                  fontSize: '0.75rem',
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
                  borderRadius: '4px',
                  padding: '6px 10px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Subscribe
              </button>
            </form>
            
            {isSubscribed && (
              <p style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: '600', marginTop: '4px' }}>
                ✓ Subscribed!
              </p>
            )}
          </Col>

          {/* Quick Links - Compact */}
          <Col md={2}>
            <h6 style={{ color: '#0f172a', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>
              Links
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { to: '/find-property', text: 'Find Property' },
                { to: '/add-property', text: 'List Property' }
              ].map((link, i) => (
                <Link key={i} to={link.to} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.7rem'
                }}>
                  {link.text}
                </Link>
              ))}
            </div>
          </Col>

          {/* Categories - Compact */}
          <Col md={2}>
            <h6 style={{ color: '#0f172a', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>
              Categories
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {['Residential', 'Commercial'].map((text, i) => (
                <Link key={i} to={`/find-property?category=${text}`} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.7rem'
                }}>
                  {text}
                </Link>
              ))}
            </div>
          </Col>

          {/* Support - Compact */}
          <Col md={2}>
            <h6 style={{ color: '#0f172a', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>
              Support
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {['Help Center', 'Contact Us'].map((text, i) => (
                <Link key={i} to={`/${text.toLowerCase().replace(' ', '-')}`} style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.7rem'
                }}>
                  {text}
                </Link>
              ))}
            </div>
          </Col>

          {/* Copyright & Social - Compact */}
          <Col md={2} className="text-end">
            <p style={{ color: '#64748b', fontSize: '0.7rem', margin: '0 0 6px 0' }}>
              © 2025 SpaceLink
            </p>
            
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
              {['𝕏', 'in', '📷', 'f'].map((icon, i) => (
                <a key={i} href="#" style={{
                  color: '#64748b',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}>
                  {icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
