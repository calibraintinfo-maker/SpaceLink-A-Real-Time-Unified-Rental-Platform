import React, { useState } from 'react';
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
  const { login } = useAuth();
  const navigate = useNavigate();

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
    // Background with gradient
    loginContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    },

    // Background effects
    backgroundGlow: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
      animation: 'rotate 20s linear infinite',
      pointerEvents: 'none'
    },

    // Glass card
    loginCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
      padding: '0',
      maxWidth: '420px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    },

    cardBody: {
      padding: '48px 40px',
      color: 'white'
    },

    // Brand section
    brandSection: {
      textAlign: 'center',
      marginBottom: '40px'
    },

    brandLogo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '16px',
      textDecoration: 'none',
      color: 'white'
    },

    brandIcon: {
      fontSize: '2rem',
      background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    brandName: {
      fontSize: '1.8rem',
      fontWeight: '800',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    },

    welcomeTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '8px',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    },

    welcomeSubtitle: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '1rem',
      fontWeight: '400'
    },

    // Form styling
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
      background: 'rgba(255, 255, 255, 0.1)',
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

    // Submit button
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

    // Error alert
    errorAlert: {
      background: 'rgba(239, 68, 68, 0.15)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      color: '#fca5a5',
      padding: '12px 16px',
      marginBottom: '24px',
      fontSize: '0.9rem'
    },

    // Footer
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
      {/* Global styles for animations */}
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .login-card {
            animation: fadeIn 0.6s ease-out;
          }
          
          .form-input:focus {
            border-color: rgba(96, 165, 250, 0.5) !important;
            box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1) !important;
            background: rgba(255, 255, 255, 0.15) !important;
          }
          
          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
          
          .submit-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4) !important;
          }
          
          .submit-btn:active {
            transform: translateY(0) !important;
          }
          
          .password-toggle:hover {
            color: rgba(255, 255, 255, 0.9) !important;
          }
          
          .signup-link:hover {
            color: #93c5fd !important;
          }
        `}
      </style>

      <div style={styles.loginContainer}>
        {/* Background glow effect */}
        <div style={styles.backgroundGlow}></div>

        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <Card style={styles.loginCard} className="login-card">
                <Card.Body style={styles.cardBody}>
                  {/* Brand section */}
                  <div style={styles.brandSection}>
                    <Link to="/" style={styles.brandLogo}>
                      
                      <span style={styles.brandName}>SpaceLink</span>
                    </Link>
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
