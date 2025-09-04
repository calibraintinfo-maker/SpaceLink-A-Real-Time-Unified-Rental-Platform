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
        background: '#0f172a', // Clean dark background
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '16px 0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container>
        {/* Logo on Left */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: '700',
            fontSize: '1.4rem',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <span style={{ fontSize: '1.6rem' }}>🏠</span>
          <span>SpaceLink</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Empty space - no Find Property link */}
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/my-bookings"
                  style={{ 
                    color: isActive('/my-bookings') ? '#3b82f6' : 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '500',
                    textDecoration: 'none',
                    padding: '8px 16px'
                  }}
                >
                  My Bookings
                </Nav.Link>
                
                <NavDropdown 
                  title="Properties" 
                  id="property-dropdown"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '500'
                  }}
                  menuVariant="dark"
                >
                  <NavDropdown.Item 
                    as={Link} 
                    to="/add-property"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    Add Property
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    as={Link} 
                    to="/manage-properties"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    Manage Properties
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          
          {/* Auth buttons on the right */}
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={`👤 ${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
                style={{ 
                  color: 'white',
                  fontWeight: '500'
                }}
                menuVariant="dark"
              >
                <NavDropdown.Item 
                  as={Link} 
                  to="/profile"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item 
                  onClick={handleLogout}
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Link
                  to="/login"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    padding: '8px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
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
                    background: '#3b82f6',
                    border: '1px solid #3b82f6',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
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
