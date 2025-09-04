import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = {
    // Modern Glassmorphism Navbar
    navbar: {
      background: isScrolled 
        ? 'rgba(15, 23, 42, 0.8)' 
        : 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '0px', // Keep flat for navbar
      boxShadow: isScrolled 
        ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
        : '0 4px 20px rgba(0, 0, 0, 0.2)',
      padding: '16px 0',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      position: 'sticky',
      top: 0,
      zIndex: 1030
    },

    // Glass Brand Logo
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
    },

    brandIcon: {
      fontSize: '1.5rem',
      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
    },

    brandText: {
      fontSize: '1.3rem',
      fontWeight: '800',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    },

    // Glass Navigation Links
    navLink: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'rgba(255, 255, 255, 0.9)',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: '600',
      padding: '8px 16px',
      margin: '0 4px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },

    activeNavLink: {
      background: 'rgba(59, 130, 246, 0.2)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      color: '#60a5fa',
      boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)'
    },

    // Glass Dropdown
    dropdown: {
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '12px',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
      padding: '8px'
    },

    dropdownItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '8px',
      margin: '2px 0',
      padding: '10px 16px',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },

    // Glass Auth Buttons
    loginBtn: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(10px) saturate(180%)',
      WebkitBackdropFilter: 'blur(10px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      color: 'white',
      padding: '10px 24px',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
    },

    registerBtn: {
      background: 'rgba(59, 130, 246, 0.2)',
      backdropFilter: 'blur(10px) saturate(180%)',
      WebkitBackdropFilter: 'blur(10px) saturate(180%)',
      border: '1px solid rgba(59, 130, 246, 0.4)',
      borderRadius: '10px',
      color: '#60a5fa',
      padding: '10px 24px',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)'
    },

    // Glass User Button
    userBtn: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      color: 'white',
      padding: '8px 16px',
      fontSize: '0.9rem',
      fontWeight: '600'
    },

    // Mobile Toggle Glass
    mobileToggle: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      padding: '8px',
      color: 'white'
    }
  };

  const isActive = (path) => location.pathname === path;

  // Hover Effects
  const handleBrandHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
    } else {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    }
  };

  const handleNavLinkHover = (e, isEntering) => {
    if (isEntering && !isActive(e.target.getAttribute('href'))) {
      e.target.style.background = 'rgba(59, 130, 246, 0.15)';
      e.target.style.color = '#60a5fa';
      e.target.style.transform = 'translateY(-1px)';
    } else if (!isActive(e.target.getAttribute('href'))) {
      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
      e.target.style.color = 'rgba(255, 255, 255, 0.9)';
      e.target.style.transform = 'translateY(0)';
    }
  };

  const handleAuthButtonHover = (e, isEntering, type) => {
    if (isEntering) {
      if (type === 'login') {
        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
      } else {
        e.target.style.background = 'rgba(59, 130, 246, 0.3)';
        e.target.style.color = 'white';
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.3)';
      }
    } else {
      if (type === 'login') {
        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
      } else {
        e.target.style.background = 'rgba(59, 130, 246, 0.2)';
        e.target.style.color = '#60a5fa';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.2)';
      }
    }
  };

  return (
    <BootstrapNavbar expand="lg" style={styles.navbar}>
      <Container>
        {/* Glass Brand Logo */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          style={styles.brand}
          onMouseEnter={(e) => handleBrandHover(e, true)}
          onMouseLeave={(e) => handleBrandHover(e, false)}
        >
          <span style={styles.brandIcon}>🏠</span>
          <span style={styles.brandText}>SpaceLink</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav"
          style={styles.mobileToggle}
        />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Glass Navigation */}
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/my-bookings"
                  style={{
                    ...styles.navLink,
                    ...(isActive('/my-bookings') ? styles.activeNavLink : {})
                  }}
                  onMouseEnter={(e) => handleNavLinkHover(e, true)}
                  onMouseLeave={(e) => handleNavLinkHover(e, false)}
                >
                  📋 My Bookings
                </Nav.Link>
                
                <NavDropdown 
                  title="⚙️ Properties" 
                  id="property-dropdown"
                  style={styles.navLink}
                  menuVariant="dark"
                >
                  <NavDropdown.Item 
                    as={Link} 
                    to="/add-property"
                    style={styles.dropdownItem}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(59, 130, 246, 0.15)';
                      e.target.style.color = '#60a5fa';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                  >
                    ➕ Add Property
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    as={Link} 
                    to="/manage-properties"
                    style={styles.dropdownItem}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(59, 130, 246, 0.15)';
                      e.target.style.color = '#60a5fa';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                  >
                    📊 Manage Properties
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          
          {/* Glass Auth Section */}
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={`👤 ${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
                style={styles.userBtn}
                menuVariant="dark"
              >
                <NavDropdown.Item 
                  as={Link} 
                  to="/profile"
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(59, 130, 246, 0.15)';
                    e.target.style.color = '#60a5fa';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  👤 Profile
                </NavDropdown.Item>
                <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '8px 0' }} />
                <NavDropdown.Item 
                  onClick={handleLogout}
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(239, 68, 68, 0.15)';
                    e.target.style.color = '#f87171';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  🚪 Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Link
                  to="/login"
                  style={styles.loginBtn}
                  onMouseEnter={(e) => handleAuthButtonHover(e, true, 'login')}
                  onMouseLeave={(e) => handleAuthButtonHover(e, false, 'login')}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={styles.registerBtn}
                  onMouseEnter={(e) => handleAuthButtonHover(e, true, 'register')}
                  onMouseLeave={(e) => handleAuthButtonHover(e, false, 'register')}
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
