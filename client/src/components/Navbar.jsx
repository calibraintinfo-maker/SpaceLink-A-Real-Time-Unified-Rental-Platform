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
      bg="dark" 
      variant="dark" 
      expand="lg" 
      sticky="top"
      style={{
        background: '#0a0e1a !important',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '12px 0'
      }}
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" style={{ fontWeight: 'bold' }}>
          🏠 SpaceLink
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/find-property"
              style={{ 
                color: isActive('/find-property') ? '#60a5fa' : 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
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
                    color: isActive('/my-bookings') ? '#60a5fa' : 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '500'
                  }}
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
          
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={`👤 ${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
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
                  className="btn btn-outline-light btn-sm"
                  style={{ borderRadius: '6px' }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: '6px' }}
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
