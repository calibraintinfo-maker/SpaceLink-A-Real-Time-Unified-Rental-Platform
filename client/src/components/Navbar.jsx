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
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '12px 0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container>
        {/* Glass Logo */}
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
            gap: '8px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>🏠</span>
          SpaceLink
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '6px',
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
                    color: isActive('/my-bookings') ? '#60a5fa' : 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: isActive('/my-bookings') ? 'rgba(96, 165, 250, 0.2)' : 'transparent',
                    border: isActive('/my-bookings') ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/my-bookings')) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.color = '#60a5fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/my-bookings')) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                    }
                  }}
                >
                  My Bookings
                </Nav.Link>
                
                <NavDropdown 
                  title="Properties" 
                  id="property-dropdown"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  menuVariant="dark"
                >
                  <NavDropdown.Item 
                    as={Link} 
                    to="/add-property"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
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
                      backdropFilter: 'blur(10px)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      margin: '2px'
                    }}
                  >
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
                title={`${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
                style={{ 
                  color: 'white',
                  fontWeight: '500',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                menuVariant="dark"
              >
                <NavDropdown.Item 
                  as={Link} 
                  to="/profile"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '6px',
                    margin: '2px'
                  }}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                <NavDropdown.Item 
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '6px',
                    margin: '2px'
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to="/login"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    padding: '8px 20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
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
                    background: 'rgba(59, 130, 246, 0.7)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.5)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.9)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.7)';
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
