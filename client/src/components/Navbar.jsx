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
        background: '#2563eb', // Exact blue color from your image
        borderBottom: 'none',
        padding: '12px 0',
        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' // Blue shadow to match
      }}
    >
      <Container>
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          style={{ 
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          🏠 SpaceLink
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.3)',
            color: 'white'
          }}
        />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/find-property"
              style={{ 
                color: isActive('/find-property') ? '#fbbf24' : 'rgba(255, 255, 255, 0.9)',
                fontWeight: '500',
                textDecoration: 'none'
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
                    color: isActive('/my-bookings') ? '#fbbf24' : 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}
                >
                  My Bookings
                </Nav.Link>
                
                <NavDropdown 
                  title="Property Management" 
                  id="property-dropdown"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
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
          
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={`👤 ${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
                style={{ color: 'white' }}
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
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to="/login"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500'
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
