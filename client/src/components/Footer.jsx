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
    <footer className="professional-footer">
      <Container>
        <Row>
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
        .professional-footer {
          background: #f1f5f9;
          border-top: 1px solid rgba(124, 58, 237, 0.08);
          padding: 20px 0 12px 0;
          margin-top: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #64748b;
          font-size: 13px;
          line-height: 1.4;
        }
        
        /* Brand Section */
        .footer-brand {
          max-width: 280px;
        }
        
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }
        
        .logo-icon {
          font-size: 1.1rem;
          filter: drop-shadow(0 1px 2px rgba(124, 58, 237, 0.2));
        }
        
        .brand-name {
          font-size: 1.1rem;
          font-weight: 700;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.01em;
        }
        
        .brand-description {
          color: #64748b;
          font-size: 12px;
          line-height: 1.4;
          margin: 0;
        }
        
        /* Footer Sections */
        .footer-title {
          color: #374151;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .footer-links a {
          color: #64748b;
          text-decoration: none;
          font-size: 12px;
          font-weight: 400;
          transition: color 0.2s ease;
          padding: 2px 0;
        }
        
        .footer-links a:hover {
          color: #7c3aed;
          text-decoration: none;
        }
        
        /* Newsletter */
        .newsletter-form {
          max-width: 240px;
        }
        
        .newsletter-input-group {
          display: flex;
          gap: 4px;
          margin-bottom: 8px;
        }
        
        .newsletter-input {
          flex: 1;
          padding: 6px 8px;
          border: 1px solid #e2e8f0;
          border-radius: 5px;
          background: white;
          color: #374151;
          font-size: 12px;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.2s ease;
        }
        
        .newsletter-input:focus {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.1);
        }
        
        .newsletter-input::placeholder {
          color: #9ca3af;
          font-size: 11px;
        }
        
        .newsletter-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          border-radius: 5px;
          padding: 6px 10px;
          color: white;
          font-weight: 600;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.3px;
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
          padding-top: 12px;
          margin-top: 16px;
          border-top: 1px solid rgba(124, 58, 237, 0.08);
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .footer-legal {
          display: flex;
          gap: 12px;
        }
        
        .footer-legal a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 11px;
          font-weight: 400;
          transition: color 0.2s ease;
        }
        
        .footer-legal a:hover {
          color: #7c3aed;
        }
        
        .footer-copyright {
          color: #94a3b8;
          font-size: 11px;
          font-weight: 400;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .professional-footer {
            padding: 16px 0 10px 0;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }
        }
        
        @media (max-width: 768px) {
          .professional-footer {
            padding: 14px 0 10px 0;
          }
          
          .footer-brand {
            max-width: 100%;
            text-align: center;
            margin-bottom: 16px;
          }
          
          .newsletter-form {
            max-width: 100%;
          }
          
          .newsletter-input-group {
            flex-direction: column;
            gap: 6px;
          }
          
          .newsletter-btn {
            width: 100%;
          }
          
          .footer-title {
            margin-bottom: 6px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
