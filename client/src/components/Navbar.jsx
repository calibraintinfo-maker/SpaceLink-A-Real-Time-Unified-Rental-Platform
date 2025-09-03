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
        background: 'rgba(10, 14, 26, 0.8)',
        backdropFilter: 'blur(15px) saturate(180%)',
        WebkitBackdropFilter: 'blur(15px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 50px rgba(0, 0, 0, 0.3)',
        padding: '12px 0',
        transition: 'all 0.3s ease'
      }}
    >
      <Container>
        {/* Glass Brand */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          style={{ 
            color: 'white', 
            fontWeight: 'bold',
            fontSize: '1.3rem',
            textDecoration: 'none'
          }}
        >
          🏠 SpaceLink
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Glass Navigation */}
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/find-property"
              style={{ 
                color: isActive('/find-property') ? '#60a5fa' : 'rgba(255, 255, 255, 0.9)',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '8px',
                background: isActive('/find-property') ? 'rgba(96, 165, 250, 0.15)' : 'transparent',
                border: isActive('/find-property') ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent',
                margin: '0 4px'
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
                    color: isActive('/my-bookings') ? '#60a5fa' : 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: isActive('/my-bookings') ? 'rgba(96, 165, 250, 0.15)' : 'transparent',
                    border: isActive('/my-bookings') ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent',
                    margin: '0 4px'
                  }}
                >
                  My Bookings
                </Nav.Link>
                
                <NavDropdown 
                  title="Property Management" 
                  id="property-dropdown"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}
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
          
          {/* Glass Auth Buttons */}
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={`👤 ${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  color: 'white'
                }}
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
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    background: 'rgba(59, 130, 246, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.5)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
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
