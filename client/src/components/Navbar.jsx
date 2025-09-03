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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = {
    // Main Navbar Container - Ultra Professional
    navbar: {
      background: isScrolled 
        ? 'rgba(10, 14, 26, 0.95)' 
        : 'rgba(10, 14, 26, 0.8)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '12px 0',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isScrolled 
        ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
        : '0 4px 16px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1030
    },

    // Brand Logo - Enhanced
    brandContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
      padding: '8px 12px',
      borderRadius: '10px',
      transition: 'all 0.3s ease'
    },

    brandIcon: {
      fontSize: '1.6rem',
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    brandText: {
      fontSize: '1.4rem',
      fontWeight: 800,
      color: 'white',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    },

    // Navigation Links - Professional
    navLink: {
      color: 'rgba(255, 255, 255, 0.8)',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: 600,
      padding: '10px 16px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      position: 'relative',
      userSelect: 'none'
    },

    activeNavLink: {
      color: '#60a5fa',
      background: 'rgba(96, 165, 250, 0.1)',
      border: '1px solid rgba(96, 165, 250, 0.2)'
    },

    // Dropdown Styling - Enhanced
    dropdown: {
      background: 'rgba(10, 14, 26, 0.95)',
      backdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '12px',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
      padding: '8px',
      marginTop: '8px'
    },

    dropdownItem: {
      color: 'rgba(255, 255, 255, 0.8)',
      padding: '10px 16px',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      border: 'none',
      background: 'transparent'
    },

    dropdownDivider: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      margin: '8px 0'
    },

    // User Menu - Professional
    userDropdown: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '10px',
      padding: '6px 12px',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: 600,
      transition: 'all 0.3s ease'
    },

    // Auth Buttons - Clean
    authButton: {
      padding: '8px 20px',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      userSelect: 'none'
    },

    loginButton: {
      background: 'transparent',
      color: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },

    registerButton: {
      background: '#3b82f6',
      color: 'white',
      border: '1px solid #3b82f6'
    },

    // Mobile Menu Toggle
    mobileToggle: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      padding: '8px',
      color: 'white'
    }
  };

  // Check if current path matches link
  const isActive = (path) => location.pathname === path;

  // Hover effects
  const handleNavLinkHover = (e, isEntering) => {
    if (isEntering && !isActive(e.target.getAttribute('href'))) {
      e.target.style.color = '#60a5fa';
      e.target.style.background = 'rgba(96, 165, 250, 0.1)';
    } else if (!isActive(e.target.getAttribute('href'))) {
      e.target.style.color = 'rgba(255, 255, 255, 0.8)';
      e.target.style.background = 'transparent';
    }
  };

  const handleDropdownItemHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.background = 'rgba(96, 165, 250, 0.15)';
      e.target.style.color = '#60a5fa';
    } else {
      e.target.style.background = 'transparent';
      e.target.style.color = 'rgba(255, 255, 255, 0.8)';
    }
  };

  const handleAuthButtonHover = (e, isEntering, type) => {
    if (isEntering) {
      if (type === 'login') {
        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
        e.target.style.color = 'white';
      } else {
        e.target.style.background = '#2563eb';
        e.target.style.transform = 'translateY(-1px)';
      }
    } else {
      if (type === 'login') {
        e.target.style.background = 'transparent';
        e.target.style.color = 'rgba(255, 255, 255, 0.8)';
      } else {
        e.target.style.background = '#3b82f6';
        e.target.style.transform = 'translateY(0)';
      }
    }
  };

  return (
    <BootstrapNavbar expand="lg" style={styles.navbar} fixed="top">
      <Container>
        {/* Brand Logo */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          style={styles.brandContainer}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span style={styles.brandIcon}>🏠</span>
          <span style={styles.brandText}>SpaceLink</span>
        </BootstrapNavbar.Brand>
        
        {/* Mobile Toggle */}
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav" 
          style={styles.mobileToggle}
        />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Main Navigation */}
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/find-property"
              style={{
                ...styles.navLink,
                ...(isActive('/find-property') ? styles.activeNavLink : {})
              }}
              onMouseEnter={(e) => handleNavLinkHover(e, true)}
              onMouseLeave={(e) => handleNavLinkHover(e, false)}
            >
              🔍 Find Property
            </Nav.Link>
            
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
                  title="⚙️ Property Management" 
                  id="property-dropdown"
                  style={styles.navLink}
                  menuVariant="dark"
                >
                  <NavDropdown.Item 
                    as={Link} 
                    to="/add-property"
                    style={styles.dropdownItem}
                    onMouseEnter={(e) => handleDropdownItemHover(e, true)}
                    onMouseLeave={(e) => handleDropdownItemHover(e, false)}
                  >
                    ➕ Add Property
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    as={Link} 
                    to="/manage-properties"
                    style={styles.dropdownItem}
                    onMouseEnter={(e) => handleDropdownItemHover(e, true)}
                    onMouseLeave={(e) => handleDropdownItemHover(e, false)}
                  >
                    📊 Manage Properties
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          
          {/* User Menu */}
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={`👤 ${user?.name || 'User'}`} 
                id="user-dropdown" 
                align="end"
                style={styles.userDropdown}
                menuVariant="dark"
              >
                <NavDropdown.Item 
                  as={Link} 
                  to="/profile"
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => handleDropdownItemHover(e, true)}
                  onMouseLeave={(e) => handleDropdownItemHover(e, false)}
                >
                  👤 Profile
                </NavDropdown.Item>
                <NavDropdown.Item 
                  as={Link} 
                  to="/favorites"
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => handleDropdownItemHover(e, true)}
                  onMouseLeave={(e) => handleDropdownItemHover(e, false)}
                >
                  ❤️ Favorites
                </NavDropdown.Item>
                <NavDropdown.Divider style={styles.dropdownDivider} />
                <NavDropdown.Item 
                  onClick={handleLogout}
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => handleDropdownItemHover(e, true)}
                  onMouseLeave={(e) => handleDropdownItemHover(e, false)}
                >
                  🚪 Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Link
                  to="/login"
                  style={{...styles.authButton, ...styles.loginButton}}
                  onMouseEnter={(e) => handleAuthButtonHover(e, true, 'login')}
                  onMouseLeave={(e) => handleAuthButtonHover(e, false, 'login')}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{...styles.authButton, ...styles.registerButton}}
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
