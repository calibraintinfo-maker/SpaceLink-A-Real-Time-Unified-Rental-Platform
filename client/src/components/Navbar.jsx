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
    // Glassmorphism Navbar
    navbar: {
      background: 'rgba(10, 14, 26, 0.7)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '0px', // Keep it flat for navbar
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      padding: '16px 0',
      transition: 'all 0.3s ease'
    },

    // Brand with Glass Effect
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '8px',
      transition: 'all 0.2s ease'
    },

    brandIcon: {
      fontSize: '1.4rem'
    },

    brandText: {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: 'white'
    },

    // Glass Navigation Links
    navLink: {
      color: 'rgba(255, 255, 255, 0.9)',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: 500,
      padding: '8px 16px',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid transparent',
      margin: '0 4px'
    },

    // Active Link Glass Effect
    activeNavLink: {
      background: 'rgba(96, 165, 250, 0.15)',
      border: '1px solid rgba(96, 165, 250, 0.3)',
      color: '#60a5fa'
    },

    // Glass Auth Buttons
    loginBtn: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      padding: '8px 20px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s ease'
    },

    registerBtn: {
      background: 'rgba(59, 130, 246, 0.8)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(59, 130, 246, 0.5)',
      color: 'white',
      padding: '8px 20px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s ease'
    },

    // Glass User Dropdown
    userBtn: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: 500
    },

    // Glass Dropdown Menu
    dropdownMenu: {
      background: 'rgba(10, 14, 26, 0.9)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <BootstrapNavbar expand="lg" style={styles.navbar} sticky="top">
      <Container>
        {/* Glass Brand */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          style={styles.brand}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span style={styles.brandIcon}>🏠</span>
          <span style={styles.brandText}>SpaceLink</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px'
          }}
        />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Glass Navigation */}
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/find-property"
              style={{
                ...styles.navLink,
                ...(isActive('/find-property') ? styles.activeNavLink : {})
              }}
              onMouseEnter={(e) => {
                if (!isActive('/find-property')) {
                  e.target.style.background = 'rgba(96, 165, 250, 0.1)';
                  e.target.style.color = '#60a5fa';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/find-property')) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                }
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
                    ...styles.navLink,
                    ...(isActive('/my-bookings') ? styles.activeNavLink : {})
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/my-bookings')) {
                      e.target.style.background = 'rgba(96, 165, 250, 0.1)';
                      e.target.style.color = '#60a5fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/my-bookings')) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                    }
                  }}
                >
                  My Bookings
                </Nav.Link>
                
                <NavDropdown 
                  title="Property Management" 
                  id="property-dropdown"
                  style={styles.navLink}
                  menuVariant="dark"
                >
                  <NavDropdown.Item 
                    as={Link} 
                    to="/add-property"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '4px',
                      margin: '2px'
                    }}
                  >
                    Add Property
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    as={Link} 
                    to="/manage-properties"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '4px',
                      margin: '2px'
                    }}
                  >
                    Manage Properties
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          
          {/* Glass Auth Section */}
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={`${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
                style={styles.userBtn}
                menuVariant="dark"
              >
                <NavDropdown.Item 
                  as={Link} 
                  to="/profile"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '4px',
                    margin: '2px'
                  }}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                <NavDropdown.Item 
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '4px',
                    margin: '2px'
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Link
                  to="/login"
                  style={styles.loginBtn}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={styles.registerBtn}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 1)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.8)';
                    e.target.style.transform = 'translateY(0)';
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
