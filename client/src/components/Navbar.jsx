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

  const isActive = (path) => location.pathname === path;

  return (
    <BootstrapNavbar 
      expand="lg" 
      sticky="top"
      style={{
        background: '#1e293b',
        padding: '16px 0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Container>
        {/* Simple Logo */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          style={{ 
            color: 'white',
            fontWeight: '700',
            fontSize: '1.4rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>🏠</span>
          SpaceLink
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/my-bookings"
                  style={{ 
                    color: isActive('/my-bookings') ? '#3b82f6' : 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                  onMouseLeave={(e) => e.target.style.color = isActive('/my-bookings') ? '#3b82f6' : 'rgba(255, 255, 255, 0.9)'}
                >
                  My Bookings
                </Nav.Link>
                
                <NavDropdown 
                  title="Properties" 
                  id="property-dropdown"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500'
                  }}
                  menuVariant="dark"
                >
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
          
          {/* Simple Auth Buttons */}
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={`${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
                style={{ 
                  color: 'white',
                  fontWeight: '500'
                }}
                menuVariant="dark"
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
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link
                  to="/login"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    padding: '8px 20px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '8px 20px',
                    background: '#3b82f6',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                  onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
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
