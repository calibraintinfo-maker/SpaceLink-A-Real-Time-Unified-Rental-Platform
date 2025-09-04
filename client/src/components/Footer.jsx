import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <div style={{
      background: '#ffffff',
      borderTop: '1px solid #ddd',
      padding: '40px 0',
      marginTop: '50px'
    }}>
      <Container>
        <Row>
          <Col md={3}>
            <h5>🏠 SpaceLink</h5>
            <p style={{ color: '#666' }}>Your trusted property platform.</p>
            <div style={{ marginTop: '15px' }}>
              <input 
                type="email" 
                placeholder="Enter email" 
                style={{ 
                  padding: '8px', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px',
                  marginRight: '8px'
                }}
              />
              <button style={{
                padding: '8px 16px',
                background: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Subscribe
              </button>
            </div>
          </Col>
          
          <Col md={2}>
            <h6>Quick Links</h6>
            <div><Link to="/find-property">Find Property</Link></div>
            <div><Link to="/add-property">List Property</Link></div>
            <div><Link to="/my-bookings">My Bookings</Link></div>
          </Col>
          
          <Col md={2}>
            <h6>Categories</h6>
            <div><Link to="/find-property">Residential</Link></div>
            <div><Link to="/find-property">Commercial</Link></div>
            <div><Link to="/find-property">Land</Link></div>
          </Col>
          
          <Col md={2}>
            <h6>Support</h6>
            <div><Link to="/help">Help Center</Link></div>
            <div><Link to="/contact">Contact</Link></div>
            <div><Link to="/about">About</Link></div>
          </Col>
          
          <Col md={3}>
            <h6>Legal</h6>
            <div><Link to="/privacy">Privacy Policy</Link></div>
            <div><Link to="/terms">Terms</Link></div>
            <div style={{ marginTop: '20px', color: '#666' }}>
              © 2025 SpaceLink. All rights reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
