import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="modern-footer">
      <Container>
        {/* Main Footer Content */}
        <Row className="footer-main">
          <Col lg={5} md={6} className="mb-4">
            {/* Brand Section */}
            <div className="brand-section">
              <div className="brand-logo">
                <span className="logo-icon">🏠</span>
                <span className="brand-name">SpaceLink</span>
              </div>
              <p className="brand-description">
                Your trusted global rental platform. Helping clients find exceptional rentals and empowering seamless transactions worldwide.
              </p>
              
              {/* Newsletter Compact */}
              <div className="newsletter-section">
                <h6>Stay Updated</h6>
                <form onSubmit={handleSubscribe} className="newsletter-form">
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
                </form>
              </div>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <div className="footer-section">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li><Link to="/find-property">Find Property</Link></li>
                <li><Link to="/list-property">List Property</Link></li>
                <li><Link to="/my-bookings">My Bookings</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </ul>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <div className="footer-section">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li><Link to="/find-property?type=properties">Properties</Link></li>
                <li><Link to="/find-property?type=events">Event Venues</Link></li>
                <li><Link to="/find-property?type=vehicles">Vehicles</Link></li>
                <li><Link to="/find-property?type=parking">Parking</Link></li>
              </ul>
            </div>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <div className="footer-section">
              <h6>Support</h6>
              <ul className="footer-links">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
          </Col>
        </Row>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <Row className="align-items-center">
            <Col md={8}>
              <div className="footer-legal">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/cookies">Cookie Policy</Link>
                <Link to="/disclaimer">Disclaimer</Link>
              </div>
            </Col>
            <Col md={4} className="text-md-end text-start mt-2 mt-md-0">
              <div className="footer-copyright">
                © 2025 SpaceLink. All rights reserved.
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <style>{`
        .modern-footer {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-top: 1px solid rgba(124, 58, 237, 0.1);
          padding: 2rem 0 1rem 0;
          margin-top: 3rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .footer-main {
          margin-bottom: 1.5rem;
        }
        
        /* Brand Section */
        .brand-section {
          max-width: 350px;
        }
        
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
        }
        
        .logo-icon {
          font-size: 1.5rem;
          filter: drop-shadow(0 2px 4px rgba(124, 58, 237, 0.2));
        }
        
        .brand-name {
          font-size: 1.4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        
        .brand-description {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
        
        /* Newsletter Section */
        .newsletter-section h6 {
          color: #374151;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        
        .newsletter-form {
          display: flex;
          gap: 8px;
          max-width: 280px;
        }
        
        .newsletter-input {
          flex: 1;
          padding: 8px 12px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #374151;
          font-size: 0.8rem;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        
        .newsletter-input:focus {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }
        
        .newsletter-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          color: white;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        
        .newsletter-btn:hover {
          background: linear-gradient(135deg, #6b21a8 0%, #7e22ce 100%);
          transform: translateY(-1px);
        }
        
        /* Footer Sections */
        .footer-section h6 {
          color: #374151;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }
        
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li {
          margin-bottom: 0.5rem;
        }
        
        .footer-links a {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          font-weight: 400;
        }
        
        .footer-links a:hover {
          color: #7c3aed;
          text-decoration: none;
        }
        
        /* Footer Bottom */
        .footer-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(124, 58, 237, 0.1);
        }
        
        .footer-legal {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        
        .footer-legal a {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .footer-legal a:hover {
          color: #7c3aed;
        }
        
        .footer-copyright {
          color: #9ca3af;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .modern-footer {
            padding: 1.5rem 0 1rem 0;
            margin-top: 2rem;
          }
          
          .footer-main {
            margin-bottom: 1rem;
          }
          
          .newsletter-form {
            max-width: 100%;
          }
          
          .footer-legal {
            gap: 1rem;
            margin-bottom: 1rem;
          }
          
          .footer-legal a {
            font-size: 0.75rem;
          }
          
          .footer-copyright {
            font-size: 0.75rem;
          }
        }
        
        @media (max-width: 576px) {
          .newsletter-form {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .newsletter-btn {
            width: 100%;
          }
          
          .footer-legal {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
