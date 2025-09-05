import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <BootstrapNavbar 
      expand="lg" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1050,
        height: '70px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: scrolled 
          ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
          : '0 2px 10px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        padding: '0'
      }}
    >
      <Container style={{ 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Perfect Logo Alignment */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          style={{
            color: '#1e293b',
            fontSize: '1.6rem',
            fontWeight: 800,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            height: '70px'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.25)'
          }}>
            <span style={{ fontSize: '1.3rem' }}>🏠</span>
          </div>
          SpaceLink
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginLeft: 'auto',
            height: '70px'
          }}>
            {/* Perfectly Aligned Navigation */}
            <Nav style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem',
              height: '70px'
            }}>
              <Nav.Link 
                as={Link} 
                to="/find-property"
                style={{
                  color: isActive('/find-property') ? '#667eea' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  height: '70px'
                }}
                onMouseEnter={(e) => e.target.style.color = '#667eea'}
                onMouseLeave={(e) => e.target.style.color = isActive('/find-property') ? '#667eea' : '#64748b'}
              >
                Find Property
              </Nav.Link>
              
              {isAuthenticated && (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/my-bookings"
                    style={{
                      color: isActive('/my-bookings') ? '#667eea' : '#64748b',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      padding: '0',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      height: '70px'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#667eea'}
                    onMouseLeave={(e) => e.target.style.color = isActive('/my-bookings') ? '#667eea' : '#64748b'}
                  >
                    My Bookings
                  </Nav.Link>
                  
                  <NavDropdown 
                    title="Properties" 
                    id="property-dropdown"
                    style={{ 
                      color: '#64748b', 
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      height: '70px'
                    }}
                  >
                    <NavDropdown.Item as={Link} to="/add-property">Add Property</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/manage-properties">Manage Properties</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
            
            {/* Perfect Auth Section */}
            {isAuthenticated ? (
              <NavDropdown 
                title={`Hello, ${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  height: '70px'
                }}
              >
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                height: '70px'
              }}>
                <Link 
                  to="/login" 
                  style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.background = 'rgba(102, 126, 234, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#64748b';
                    e.target.style.background = 'transparent';
                  }}
                >
                  Login
                </Link>
                
                <Link 
                  to="/register" 
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.25)';
                  }}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
