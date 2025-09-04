import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <BootstrapNavbar 
      expand="lg" 
      className="navbar"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1050,
        height: '80px',
        padding: '8px 0'
      }}
    >
      <Container>
        {/* Brand Logo */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          style={{
            color: '#0f172a',
            fontSize: '1.5rem',
            fontWeight: '800',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🏠</span>
          <span>SpaceLink</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/find-property"
              style={{
                color: isActive('/find-property') ? '#6366f1' : '#64748b',
                fontWeight: '500',
                fontSize: '0.95rem',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              Find Property
            </Nav.Link>
            
            {isAuthenticated && (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/my-bookings"
                  style={{
                    color: isActive('/my-bookings') ? '#6366f1' : '#64748b',
                    fontWeight: '500',
                    fontSize: '0.95rem',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  My Bookings
                </Nav.Link>
                
                <NavDropdown 
                  title="Properties" 
                  id="property-dropdown"
                  style={{
                    color: '#64748b',
                    fontWeight: '500',
                    fontSize: '0.95rem'
                  }}
                >
                  <NavDropdown.Item 
                    as={Link} 
                    to="/add-property"
                    style={{
                      color: '#64748b',
                      fontSize: '0.9rem',
                      padding: '8px 16px'
                    }}
                  >
                    Add Property
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    as={Link} 
                    to="/manage-properties"
                    style={{
                      color: '#64748b',
                      fontSize: '0.9rem',
                      padding: '8px 16px'
                    }}
                  >
                    Manage Properties
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          
          {/* Auth Section */}
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={user?.name || 'User'} 
                id="user-dropdown" 
                align="end"
                style={{
                  color: '#64748b',
                  fontWeight: '500',
                  fontSize: '0.95rem'
                }}
              >
                <NavDropdown.Item 
                  as={Link} 
                  to="/profile"
                  style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    padding: '8px 16px'
                  }}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item 
                  onClick={handleLogout}
                  style={{
                    color: '#dc2626',
                    fontSize: '0.9rem',
                    padding: '8px 16px'
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link 
                  to="/login" 
                  style={{
                    background: 'transparent',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    color: '#64748b',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  style={{
                    background: '#6366f1',
                    border: '1px solid #6366f1',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Register
                </Link>
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
