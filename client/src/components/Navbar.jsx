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
    <>
      {/* Perfect Compact CSS */}
      <style>
        {`
          .perfect-navbar {
            background: rgba(15, 23, 42, 0.95) !important;
            backdrop-filter: blur(10px) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
            padding: 8px 0 !important;
            min-height: 56px !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
          }
          
          .perfect-brand {
            color: white !important;
            font-weight: 700 !important;
            font-size: 1.3rem !important;
            text-decoration: none !important;
            margin-right: auto !important;
            padding: 4px 0 !important;
          }
          
          .perfect-nav {
            margin-left: 0 !important;
          }
          
          .perfect-nav-link {
            color: rgba(255, 255, 255, 0.9) !important;
            font-weight: 500 !important;
            font-size: 0.9rem !important;
            padding: 6px 12px !important;
            margin: 0 2px !important;
            border-radius: 4px !important;
            transition: all 0.2s ease !important;
          }
          
          .perfect-nav-link:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            color: #60a5fa !important;
          }
          
          .perfect-nav-link.active {
            background: rgba(59, 130, 246, 0.2) !important;
            color: #60a5fa !important;
          }
          
          .perfect-btn {
            padding: 6px 16px !important;
            border-radius: 4px !important;
            font-weight: 500 !important;
            font-size: 0.85rem !important;
            text-decoration: none !important;
            transition: all 0.2s ease !important;
          }
          
          .login-btn {
            background: transparent !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            color: rgba(255, 255, 255, 0.9) !important;
          }
          
          .login-btn:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            color: white !important;
          }
          
          .register-btn {
            background: #3b82f6 !important;
            border: 1px solid #3b82f6 !important;
            color: white !important;
          }
          
          .register-btn:hover {
            background: #2563eb !important;
          }
          
          .navbar-toggler {
            padding: 4px 8px !important;
            font-size: 0.9rem !important;
          }
          
          .dropdown-menu {
            background: rgba(15, 23, 42, 0.95) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 4px !important;
            font-size: 0.9rem !important;
          }
          
          .dropdown-item {
            color: rgba(255, 255, 255, 0.9) !important;
            padding: 6px 12px !important;
          }
          
          .dropdown-item:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            color: #60a5fa !important;
          }
          
          /* Force brand to far left */
          .navbar-brand {
            margin-right: auto !important;
            padding-left: 0 !important;
          }
          
          /* Ensure perfect container alignment */
          .navbar .container {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        `}
      </style>

      <BootstrapNavbar 
        expand="lg" 
        sticky="top"
        className="perfect-navbar"
      >
        <Container>
          {/* Brand on Far Left */}
          <BootstrapNavbar.Brand 
            as={Link} 
            to="/" 
            className="perfect-brand d-flex align-items-center"
            style={{ gap: '6px' }}
          >
            <span style={{ fontSize: '1.4rem' }}>🏠</span>
            <span>SpaceLink</span>
          </BootstrapNavbar.Brand>
          
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            {/* Navigation Links */}
            <Nav className="perfect-nav me-auto">
              {isAuthenticated && (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/my-bookings"
                    className={`perfect-nav-link ${isActive('/my-bookings') ? 'active' : ''}`}
                  >
                    My Bookings
                  </Nav.Link>
                  
                  <NavDropdown 
                    title="Properties" 
                    id="property-dropdown"
                    className="perfect-nav-link"
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
            
            {/* Auth Buttons on Right */}
            <Nav>
              {isAuthenticated ? (
                <NavDropdown 
                  title={user?.name || 'User'} 
                  id="user-dropdown" 
                  align="end"
                  className="perfect-nav-link"
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
                <div className="d-flex align-items-center" style={{ gap: '8px' }}>
                  <Link to="/login" className="perfect-btn login-btn">
                    Login
                  </Link>
                  <Link to="/register" className="perfect-btn register-btn">
                    Register
                  </Link>
                </div>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;
