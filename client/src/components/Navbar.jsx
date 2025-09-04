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
      {/* Clean CSS Override */}
      <style>
        {`
          .clean-navbar {
            background: rgba(15, 23, 42, 0.95) !important;
            backdrop-filter: blur(10px) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
          }
          
          .navbar-brand {
            margin-right: auto !important;
            padding-left: 0 !important;
          }
          
          .clean-brand {
            color: white !important;
            font-weight: 700 !important;
            font-size: 1.4rem !important;
            text-decoration: none !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
          }
          
          .clean-nav-link {
            color: rgba(255, 255, 255, 0.9) !important;
            font-weight: 500 !important;
            padding: 8px 16px !important;
            margin: 0 4px !important;
            border-radius: 6px !important;
            transition: all 0.2s ease !important;
          }
          
          .clean-nav-link:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            color: #60a5fa !important;
          }
          
          .clean-nav-link.active {
            background: rgba(59, 130, 246, 0.2) !important;
            color: #60a5fa !important;
          }
          
          .clean-btn {
            padding: 8px 20px !important;
            border-radius: 6px !important;
            font-weight: 500 !important;
            font-size: 0.9rem !important;
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
          
          .dropdown-menu {
            background: rgba(15, 23, 42, 0.95) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 6px !important;
          }
          
          .dropdown-item {
            color: rgba(255, 255, 255, 0.9) !important;
            padding: 8px 16px !important;
          }
          
          .dropdown-item:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            color: #60a5fa !important;
          }
        `}
      </style>

      <BootstrapNavbar 
        expand="lg" 
        sticky="top"
        className="clean-navbar"
        style={{ padding: '16px 0' }}
      >
        <Container>
          {/* Logo on Far Left */}
          <BootstrapNavbar.Brand as={Link} to="/" className="clean-brand">
            <span style={{ fontSize: '1.5rem' }}>🏠</span>
            <span>SpaceLink</span>
          </BootstrapNavbar.Brand>
          
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated && (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/my-bookings"
                    className={`clean-nav-link ${isActive('/my-bookings') ? 'active' : ''}`}
                  >
                    My Bookings
                  </Nav.Link>
                  
                  <NavDropdown 
                    title="Properties" 
                    id="property-dropdown"
                    className="clean-nav-link"
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
                  className="clean-nav-link"
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
                <div className="d-flex" style={{ gap: '12px' }}>
                  <Link to="/login" className="clean-btn login-btn">
                    Login
                  </Link>
                  <Link to="/register" className="clean-btn register-btn">
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
