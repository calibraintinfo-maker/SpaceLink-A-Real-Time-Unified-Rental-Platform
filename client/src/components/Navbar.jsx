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
        height: '80px',
        background: scrolled 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
        boxShadow: scrolled 
          ? '0 8px 32px rgba(0, 0, 0, 0.15)' 
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '0'
      }}
    >
      <Container style={{ height: '100%' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%'
        }}>
          {/* Stunning Logo */}
          <BootstrapNavbar.Brand 
            as={Link} 
            to="/" 
            style={{
              color: '#1e293b',
              fontSize: '1.75rem',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🏠</span>
            </div>
            <span>SpaceLink</span>
          </BootstrapNavbar.Brand>
          
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              marginLeft: 'auto'
            }}>
              <Nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Nav.Link 
                  as={Link} 
                  to="/find-property"
                  style={{
                    color: isActive('/find-property') ? '#667eea' : '#64748b',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = isActive('/find-property') ? '#667eea' : '#64748b';
                    e.target.style.background = 'transparent';
                  }}
                >
                  Find Property
                </Nav.Link>
                
                {isAuthenticated && (
                  <>
                    <Nav.Link as={Link} to="/my-bookings" style={{ color: '#64748b', fontWeight: 600 }}>
                      My Bookings
                    </Nav.Link>
                    <NavDropdown title="Properties" id="property-dropdown">
                      <NavDropdown.Item as={Link} to="/add-property">Add Property</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/manage-properties">Manage Properties</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
              </Nav>
              
              {isAuthenticated ? (
                <NavDropdown title={`Hello, ${user?.name || 'User'}`} id="user-dropdown" align="end">
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Link 
                    to="/login" 
                    style={{
                      color: '#64748b',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      padding: '10px 20px'
                    }}
                  >
                    Login
                  </Link>
                  
                  <Link 
                    to="/register" 
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      color: 'white',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </BootstrapNavbar.Collapse>
        </div>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
