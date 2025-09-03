import React from 'react';
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

  const styles = {
    // Simple Clean Navbar
    navbar: {
      background: '#0a0e1a',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '16px 0'
    },

    // Simple Brand
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
      color: 'white'
    },

    brandIcon: {
      fontSize: '1.4rem'
    },

    brandText: {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: 'white'
    },

    // Clean Navigation Links
    navLink: {
      color: 'rgba(255, 255, 255, 0.8)',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: 500,
      padding: '8px 16px',
      borderRadius: '6px',
      transition: 'all 0.2s ease'
    },

    // Simple Auth Buttons
    loginBtn: {
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: 'white',
      padding: '8px 20px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s ease'
    },

    registerBtn: {
      background: '#3b82f6',
      border: '1px solid #3b82f6',
      color: 'white',
      padding: '8px 20px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s ease'
    },

    // User Dropdown
    userBtn: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: 500
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <BootstrapNavbar expand="lg" style={styles.navbar} sticky="top">
      <Container>
        {/* Simple Brand */}
        <BootstrapNavbar.Brand as={Link} to="/" style={styles.brand}>
          <span style={styles.brandIcon}>🏠</span>
          <span style={styles.brandText}>SpaceLink</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Simple Navigation */}
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/find-property"
              style={{
                ...styles.navLink,
                ...(isActive('/find-property') ? { color: '#60a5fa' } : {})
              }}
              onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
              onMouseLeave={(e) => e.target.style.color = isActive('/find-property') ? '#60a5fa' : 'rgba(255, 255, 255, 0.8)'}
            >
              Find Property
            </Nav.Link>
            
            {isAuthenticated && (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/my-bookings"
                  style={{
                    ...styles.navLink,
                    ...(isActive('/my-bookings') ? { color: '#60a5fa' } : {})
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = isActive('/my-bookings') ? '#60a5fa' : 'rgba(255, 255, 255, 0.8)'}
                >
                  My Bookings
                </Nav.Link>
                
                <NavDropdown title="Property Management" id="property-dropdown">
                  <NavDropdown.Item as={Link} to="/add-property">
                    Add Property
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/manage-properties">
                    Manage Properties
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          
          {/* Simple Auth Section */}
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={`${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
                style={styles.userBtn}
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Link
                  to="/login"
                  style={styles.loginBtn}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={styles.registerBtn}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#3b82f6';
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
