import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    // Interactive animated container
    loginContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    },

    // Animated background elements
    backgroundAnimation: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1
    },

    // Floating orbs with different animations
    floatingOrb1: {
      position: 'absolute',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
      borderRadius: '50%',
      top: '10%',
      left: '10%',
      animation: 'float1 8s ease-in-out infinite',
      filter: 'blur(40px)'
    },

    floatingOrb2: {
      position: 'absolute',
      width: '200px',
      height: '200px',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
      borderRadius: '50%',
      top: '60%',
      right: '15%',
      animation: 'float2 10s ease-in-out infinite',
      filter: 'blur(30px)'
    },

    floatingOrb3: {
      position: 'absolute',
      width: '150px',
      height: '150px',
      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 40%, transparent 70%)',
      borderRadius: '50%',
      bottom: '20%',
      left: '20%',
      animation: 'float3 12s ease-in-out infinite',
      filter: 'blur(25px)'
    },

    // Interactive mouse follower
    mouseFollower: {
      position: 'absolute',
      width: '100px',
      height: '100px',
      background: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(20px)',
      transform: `translate(${mousePosition.x}%, ${mousePosition.y}%)`,
      transition: 'transform 0.3s ease-out',
      pointerEvents: 'none'
    },

    // Animated particles
    particles: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },

    particle: (index) => ({
      position: 'absolute',
      width: '4px',
      height: '4px',
      background: 'rgba(96, 165, 250, 0.6)',
      borderRadius: '50%',
      animation: `particle${index % 3 + 1} ${15 + index * 2}s linear infinite`,
      animationDelay: `${index * 0.5}s`
    }),

    // Grid pattern overlay
    gridOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `
        linear-gradient(rgba(96, 165, 250, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(96, 165, 250, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
      animation: 'gridMove 20s linear infinite'
    },

    // Glass card with enhanced effects
    loginCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      boxShadow: '0 32px 80px rgba(0, 0, 0, 0.4)',
      padding: '0',
      maxWidth: '420px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10,
      transform: 'translateY(0)',
      transition: 'all 0.3s ease'
    },

    cardBody: {
      padding: '48px 40px',
      color: 'white'
    },

    // Header section
    headerSection: {
      textAlign: 'center',
      marginBottom: '40px'
    },

    welcomeTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '8px',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    welcomeSubtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1rem',
      fontWeight: '400'
    },

    // Form styling (same as before)
    formGroup: {
      marginBottom: '24px',
      position: 'relative'
    },

    formLabel: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.9rem',
      fontWeight: '600',
      marginBottom: '8px',
      display: 'block'
    },

    formInput: {
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '16px 20px',
      color: 'white',
      fontSize: '1rem',
      width: '100%',
      transition: 'all 0.3s ease',
      outline: 'none'
    },

    passwordContainer: {
      position: 'relative'
    },

    passwordToggle: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.6)',
      cursor: 'pointer',
      fontSize: '1.1rem',
      padding: '4px',
      transition: 'color 0.2s ease'
    },

    submitButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      border: 'none',
      borderRadius: '12px',
      padding: '16px 24px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '600',
      width: '100%',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '24px'
    },

    errorAlert: {
      background: 'rgba(239, 68, 68, 0.15)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      color: '#fca5a5',
      padding: '12px 16px',
      marginBottom: '24px',
      fontSize: '0.9rem'
    },

    loginFooter: {
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9rem'
    },

    signupLink: {
      color: '#60a5fa',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.2s ease'
    }
  };

  return (
    <>
      {/* Enhanced animations and styles */}
      <style>
        {`
          @keyframes float1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -30px) rotate(120deg); }
            66% { transform: translate(-20px, 20px) rotate(240deg); }
          }
          
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-40px, -20px) rotate(180deg); }
          }
          
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -15px) scale(1.1); }
            75% { transform: translate(-15px, 10px) scale(0.9); }
          }
          
          @keyframes particle1 {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10vh) translateX(100px); opacity: 0; }
          }
          
          @keyframes particle2 {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10vh) translateX(-50px); opacity: 0; }
          }
          
          @keyframes particle3 {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10vh) translateX(75px); opacity: 0; }
          }
          
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          .login-card {
            animation: fadeIn 0.8s ease-out;
          }
          
          .login-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5) !important;
          }
          
          .form-input:focus {
            border-color: rgba(96, 165, 250, 0.6) !important;
            box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2) !important;
            background: rgba(255, 255, 255, 0.18) !important;
            transform: scale(1.02) !important;
          }
          
          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
          
          .submit-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
            transform: translateY(-2px) scale(1.02) !important;
            box-shadow: 0 16px 40px rgba(59, 130, 246, 0.5) !important;
          }
          
          .submit-btn:active {
            transform: translateY(0) scale(1) !important;
          }
          
          .password-toggle:hover {
            color: rgba(255, 255, 255, 0.9) !important;
            transform: scale(1.1) !important;
          }
          
          .signup-link:hover {
            color: #93c5fd !important;
            text-shadow: 0 0 8px rgba(147, 197, 253, 0.5) !important;
          }
        `}
      </style>

      <div 
        ref={containerRef}
        style={styles.loginContainer}
      >
        {/* Interactive Background Animation */}
        <div style={styles.backgroundAnimation}>
          {/* Grid overlay */}
          <div style={styles.gridOverlay}></div>
          
          {/* Floating orbs */}
          <div style={styles.floatingOrb1}></div>
          <div style={styles.floatingOrb2}></div>
          <div style={styles.floatingOrb3}></div>
          
          {/* Mouse follower */}
          <div style={styles.mouseFollower}></div>
          
          {/* Animated particles */}
          <div style={styles.particles}>
            {[...Array(15)].map((_, index) => (
              <div
                key={index}
                style={{
                  ...styles.particle(index),
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${index * 1.2}s`
                }}
              />
            ))}
          </div>
        </div>

        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <Card style={styles.loginCard} className="login-card">
                <Card.Body style={styles.cardBody}>
                  {/* Header section */}
                  <div style={styles.headerSection}>
                    <h2 style={styles.welcomeTitle}>Welcome Back</h2>
                    <p style={styles.welcomeSubtitle}>
                      Sign in to your account to continue
                    </p>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div style={styles.errorAlert}>
                      <strong>Error:</strong> {error}
                    </div>
                  )}

                  {/* Login form */}
                  <Form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        style={styles.formInput}
                        className="form-input"
                        required
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Password</label>
                      <div style={styles.passwordContainer}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                          style={{ ...styles.formInput, paddingRight: '50px' }}
                          className="form-input"
                          required
                        />
                        <button
                          type="button"
                          style={styles.passwordToggle}
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={styles.submitButton}
                      className="submit-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" animation="border" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <span>🔐</span>
                          Sign In to SpaceLink
                        </>
                      )}
                    </button>
                  </Form>

                  {/* Footer */}
                  <div style={styles.loginFooter}>
                    <p style={{ margin: 0 }}>
                      Don't have an account?{' '}
                      <Link 
                        to="/register" 
                        style={styles.signupLink}
                        className="signup-link"
                      >
                        Create one here
                      </Link>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
