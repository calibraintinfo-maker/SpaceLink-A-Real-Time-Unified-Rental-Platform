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
    <footer className="static-footer">
      <Container>
        <Row>
          <Col md={3}>
            <Link to="/" className="footer-brand">
              🏠 SpaceLink
            </Link>
            <p className="footer-description">
              Your trusted global property platform. Helping clients find exceptional properties and empowering seamless transactions.
            </p>
            <div className="newsletter-section">
              <h6>Stay Updated</h6>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
              {isSubscribed && <p className="success-msg">✓ Subscribed!</p>}
            </div>
          </Col>

          <Col md={2}>
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li><Link to="/find-property">Find Property</Link></li>
              <li><Link to="/add-property">List Property</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </Col>

          <Col md={2}>
            <h6 className="footer-title">Categories</h6>
            <ul className="footer-links">
              <li><Link to="/find-property?category=Property Rentals">Residential</Link></li>
              <li><Link to="/find-property?category=Commercial">Commercial</Link></li>
              <li><Link to="/find-property?category=Land">Land & Plots</Link></li>
              <li><Link to="/find-property?category=Event">Event Venues</Link></li>
            </ul>
          </Col>

          <Col md={2}>
            <h6 className="footer-title">Support</h6>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="footer-title">Legal</h6>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
            <div className="copyright">
              <p>© 2025 SpaceLink. All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
