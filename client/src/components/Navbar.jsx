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
          ? 'rgba(30, 41, 59, 0.95)' 
          : 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrolled ? '1px solid rgba(59, 130, 246, 0.2)' : 'none',
        boxShadow: scrolled 
          ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
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
          {/* Professional Logo */}
          <BootstrapNavbar.Brand 
            as={Link} 
            to="/" 
            style={{
              color: 'white',
              fontSize: '1.75rem',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              position: 'relative'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              borderRadius: '12px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🏠</span>
            </div>
            <span style={{ color: 'white' }}>SpaceLink</span>
          </BootstrapNavbar.Brand>
          
          <BootstrapNavbar.Toggle 
            aria-controls="basic-navbar-nav"
            style={{
              border: 'none',
              padding: '4px 8px',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '8px'
            }}
          />
          
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              marginLeft: 'auto'
            }}>
              {/* Navigation Links */}
              <Nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Nav.Link 
                  as={Link} 
                  to="/find-property"
                  style={{
                    color: isActive('/find-property') ? '#60a5fa' : 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    background: isActive('/find-property') ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/find-property')) {
                      e.target.style.color = '#60a5fa';
                      e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/find-property')) {
                      e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                      e.target.style.background = 'transparent';
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
                        color: isActive('/my-bookings') ? '#60a5fa' : 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                        background: isActive('/my-bookings') ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                      }}
                    >
                      My Bookings
                    </Nav.Link>
                    
                    <NavDropdown 
                      title="Properties" 
                      id="property-dropdown"
                      style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    >
                      <NavDropdown.Item 
                        as={Link} 
                        to="/add-property"
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                          color: 'white',
                          borderRadius: '8px',
                          margin: '4px',
                          padding: '8px 16px'
                        }}
                      >
                        Add Property
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={Link} 
                        to="/manage-properties"
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                          color: 'white',
                          borderRadius: '8px',
                          margin: '4px',
                          padding: '8px 16px'
                        }}
                      >
                        Manage Properties
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
              </Nav>
              
              {/* Auth Section */}
              {isAuthenticated ? (
                <NavDropdown 
                  title={
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      color: 'white'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <span style={{ fontWeight: 600 }}>{user?.name || 'User'}</span>
                    </div>
                  } 
                  id="user-dropdown" 
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Link 
                    to="/login" 
                    style={{
                      background: 'transparent',
                      border: '2px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '12px',
                      padding: '10px 20px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                      e.target.style.color = '#60a5fa';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                      e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                  >
                    Login
                  </Link>
                  
                  <Link 
                    to="/register" 
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
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
