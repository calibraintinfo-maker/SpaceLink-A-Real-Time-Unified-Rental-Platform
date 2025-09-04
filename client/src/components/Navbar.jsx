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
      {/* Add custom CSS to override Bootstrap */}
      <style>
        {`
          .glass-navbar {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
          }
          
          .glass-brand {
            color: white !important;
            font-weight: 700 !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
            text-decoration: none !important;
          }
          
          .glass-nav-link {
            color: rgba(255, 255, 255, 0.9) !important;
            font-weight: 500 !important;
            padding: 8px 16px !important;
            border-radius: 8px !important;
            transition: all 0.3s ease !important;
            margin: 0 4px !important;
          }
          
          .glass-nav-link:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            color: #60a5fa !important;
            transform: translateY(-1px) !important;
          }
          
          .glass-nav-link.active {
            background: rgba(96, 165, 250, 0.2) !important;
            color: #60a5fa !important;
            border: 1px solid rgba(96, 165, 250, 0.3) !important;
          }
          
          .glass-btn {
            padding: 8px 20px !important;
            border-radius: 8px !important;
            font-weight: 500 !important;
            transition: all 0.3s ease !important;
            text-decoration: none !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
          }
          
          .glass-btn-login {
            background: rgba(255, 255, 255, 0.1) !important;
            color: rgba(255, 255, 255, 0.9) !important;
          }
          
          .glass-btn-login:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            color: white !important;
            transform: translateY(-1px) !important;
          }
          
          .glass-btn-register {
            background: rgba(59, 130, 246, 0.7) !important;
            color: white !important;
            border: 1px solid rgba(59, 130, 246, 0.5) !important;
          }
          
          .glass-btn-register:hover {
            background: rgba(59, 130, 246, 0.9) !important;
            color: white !important;
            transform: translateY(-1px) !important;
          }
          
          .navbar-toggler {
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            border-radius: 6px !important;
          }
          
          .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
          }
          
          .dropdown-menu {
            background: rgba(15, 23, 42, 0.9) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            border-radius: 8px !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
          }
          
          .dropdown-item {
            color: rgba(255, 255, 255, 0.9) !important;
            padding: 8px 16px !important;
            border-radius: 6px !important;
            margin: 2px !important;
          }
          
          .dropdown-item:hover {
            background: rgba(96, 165, 250, 0.15) !important;
            color: #60a5fa !important;
          }
        `}
      </style>

      <BootstrapNavbar 
        expand="lg" 
        sticky="top"
        className="glass-navbar"
        style={{ padding: '12px 0' }}
      >
        <Container>
          {/* Glass Logo */}
          <BootstrapNavbar.Brand 
            as={Link} 
            to="/" 
            className="glass-brand d-flex align-items-center"
            style={{ gap: '8px' }}
          >
            <span style={{ fontSize: '1.5rem' }}>🏠</span>
            SpaceLink
          </BootstrapNavbar.Brand>
          
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated && (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/my-bookings"
                    className={`glass-nav-link ${isActive('/my-bookings') ? 'active' : ''}`}
                  >
                    My Bookings
                  </Nav.Link>
                  
                  <NavDropdown 
                    title="Properties" 
                    id="property-dropdown"
                    className="glass-nav-link"
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
                  title={`${user?.name || 'User'}`} 
                  id="user-dropdown" 
                  align="end"
                  className="glass-nav-link"
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
                <div className="d-flex" style={{ gap: '10px' }}>
                  <Link to="/login" className="glass-btn glass-btn-login">
                    Login
                  </Link>
                  <Link to="/register" className="glass-btn glass-btn-register">
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
