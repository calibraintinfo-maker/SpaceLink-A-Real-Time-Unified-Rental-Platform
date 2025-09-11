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
    <footer className="compact-footer">
      <Container>
        <Row className="align-items-center">
          {/* Brand & Description */}
          <Col lg={4} md={6} className="mb-3 mb-lg-0">
            <div className="footer-brand">
              <div className="brand-logo">
                <span className="logo-icon">🏠</span>
                <span className="brand-name">SpaceLink</span>
              </div>
              <p className="brand-description">
                Your trusted global rental platform. Helping clients find exceptional rentals worldwide.
              </p>
            </div>
          </Col>
          
          {/* Quick Links */}
          <Col lg={2} md={3} sm={6} className="mb-3 mb-lg-0">
            <h6 className="footer-title">Quick Links</h6>
            <div className="footer-links">
              <Link to="/find-property">Find Property</Link>
              <Link to="/list-property">List Property</Link>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/profile">Profile</Link>
            </div>
          </Col>
          
          {/* Categories */}
          <Col lg={2} md={3} sm={6} className="mb-3 mb-lg-0">
            <h6 className="footer-title">Categories</h6>
            <div className="footer-links">
              <Link to="/find-property?type=properties">Properties</Link>
              <Link to="/find-property?type=events">Event Venues</Link>
              <Link to="/find-property?type=vehicles">Vehicles</Link>
              <Link to="/find-property?type=parking">Parking</Link>
            </div>
          </Col>
          
          {/* Newsletter */}
          <Col lg={4} className="mb-3 mb-lg-0">
            <h6 className="footer-title">Stay Updated</h6>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </div>
            </form>
          </Col>
        </Row>
        
        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
          <div className="footer-copyright">
            © 2025 SpaceLink. All rights reserved.
          </div>
        </div>
      </Container>

      <style>{`
        .compact-footer {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-top: 1px solid rgba(124, 58, 237, 0.08);
          padding: 1.5rem 0 0.75rem 0;
          margin-top: 2rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        /* Brand Section */
        .footer-brand {
          max-width: 280px;
        }
        
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.75rem;
        }
        
        .logo-icon {
          font-size: 1.25rem;
          filter: drop-shadow(0 1px 3px rgba(124, 58, 237, 0.2));
        }
        
        .brand-name {
          font-size: 1.2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        
        .brand-description {
          color: #6b7280;
          font-size: 0.8rem;
          line-height: 1.4;
          margin: 0;
        }
        
        /* Footer Sections */
        .footer-title {
          color: #374151;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .footer-links a {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 500;
          transition: color 0.2s ease;
          padding: 0.125rem 0;
        }
        
        .footer-links a:hover {
          color: #7c3aed;
        }
        
        /* Newsletter */
        .newsletter-form {
          max-width: 240px;
        }
        
        .newsletter-input-group {
          display: flex;
          gap: 6px;
          margin-bottom: 0.5rem;
        }
        
        .newsletter-input {
          flex: 1;
          padding: 6px 10px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: white;
          color: #374151;
          font-size: 0.75rem;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.2s ease;
        }
        
        .newsletter-input:focus {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.1);
        }
        
        .newsletter-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          color: white;
          font-weight: 600;
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .newsletter-btn:hover {
          background: linear-gradient(135deg, #6b21a8 0%, #7e22ce 100%);
          transform: translateY(-1px);
        }
        
        /* Footer Bottom */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          margin-top: 1rem;
          border-top: 1px solid rgba(124, 58, 237, 0.08);
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .footer-legal {
          display: flex;
          gap: 1rem;
        }
        
        .footer-legal a {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .footer-legal a:hover {
          color: #7c3aed;
        }
        
        .footer-copyright {
          color: #9ca3af;
          font-size: 0.7rem;
          font-weight: 500;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .compact-footer {
            padding: 1.25rem 0 0.75rem 0;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
        }
        
        @media (max-width: 768px) {
          .compact-footer {
            padding: 1rem 0 0.75rem 0;
            margin-top: 1.5rem;
          }
          
          .footer-brand {
            max-width: 100%;
            text-align: center;
            margin-bottom: 1rem;
          }
          
          .newsletter-form {
            max-width: 100%;
          }
          
          .newsletter-input-group {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .newsletter-btn {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
