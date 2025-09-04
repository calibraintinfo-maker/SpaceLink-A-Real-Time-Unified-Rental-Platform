import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register } = useAuth();
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

  // Password strength calculator
  useEffect(() => {
    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 6) strength += 20;
      if (password.length >= 8) strength += 20;
      if (/[A-Z]/.test(password)) strength += 20;
      if (/[0-9]/.test(password)) strength += 20;
      if (/[^A-Za-z0-9]/.test(password)) strength += 20;
      return strength;
    };
    setPasswordStrength(calculateStrength(formData.password));
  }, [formData.password]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      
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

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 20) return '#ef4444';
    if (passwordStrength <= 40) return '#f97316';
    if (passwordStrength <= 60) return '#eab308';
    if (passwordStrength <= 80) return '#22c55e';
    return '#10b981';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 20) return 'Very Weak';
    if (passwordStrength <= 40) return 'Weak';
    if (passwordStrength <= 60) return 'Fair';
    if (passwordStrength <= 80) return 'Good';
    return 'Strong';
  };

  const styles = {
    // Interactive animated container
    registerContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '2rem',
      paddingBottom: '2rem'
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
      width: '350px',
      height: '350px',
      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 40%, transparent 70%)',
      borderRadius: '50%',
      top: '5%',
      left: '5%',
      animation: 'float1 10s ease-in-out infinite',
      filter: 'blur(50px)'
    },

    floatingOrb2: {
      position: 'absolute',
      width: '250px',
      height: '250px',
      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.1) 40%, transparent 70%)',
      borderRadius: '50%',
      top: '50%',
      right: '10%',
      animation: 'float2 12s ease-in-out infinite',
      filter: 'blur(35px)'
    },

    floatingOrb3: {
      position: 'absolute',
      width: '180px',
      height: '180px',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
      borderRadius: '50%',
      bottom: '15%',
      left: '15%',
      animation: 'float3 14s ease-in-out infinite',
      filter: 'blur(30px)'
    },

    // Interactive mouse follower
    mouseFollower: {
      position: 'absolute',
      width: '120px',
      height: '120px',
      background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(25px)',
      transform: `translate(${mousePosition.x}%, ${mousePosition.y}%)`,
      transition: 'transform 0.4s ease-out',
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
      width: '3px',
      height: '3px',
      background: 'rgba(34, 197, 94, 0.6)',
      borderRadius: '50%',
      animation: `particle${index % 3 + 1} ${18 + index * 2}s linear infinite`,
      animationDelay: `${index * 0.8}s`
    }),

    // Grid pattern overlay
    gridOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `
        linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
      animation: 'gridMove 25s linear infinite'
    },

    // Glass card with enhanced effects
    registerCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      boxShadow: '0 32px 80px rgba(0, 0, 0, 0.4)',
      padding: '0',
      maxWidth: '460px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10,
      transform: 'translateY(0)',
      transition: 'all 0.3s ease'
    },

    cardBody: {
      padding: '40px 36px',
      color: 'white'
    },

    // Header section
    headerSection: {
      textAlign: 'center',
      marginBottom: '32px'
    },

    welcomeTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #ffffff 0%, #22c55e 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: 'none'
    },

    welcomeSubtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1rem',
      fontWeight: '400'
    },

    // Form styling
    formGroup: {
      marginBottom: '20px',
      position: 'relative'
    },

    formLabel: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.85rem',
      fontWeight: '600',
      marginBottom: '6px',
      display: 'block'
    },

    formInput: {
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '14px 18px',
      color: 'white',
      fontSize: '0.95rem',
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

    // Password strength indicator
    passwordStrengthContainer: {
      marginTop: '8px'
    },

    passwordStrengthBar: {
      width: '100%',
      height: '4px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '2px',
      overflow: 'hidden',
      marginBottom: '4px'
    },

    passwordStrengthFill: {
      height: '100%',
      width: `${passwordStrength}%`,
      background: getPasswordStrengthColor(),
      transition: 'all 0.3s ease',
      borderRadius: '2px'
    },

    passwordStrengthText: {
      fontSize: '0.75rem',
      color: getPasswordStrengthColor(),
      fontWeight: '600',
      textAlign: 'right'
    },

    // Submit button
    submitButton: {
      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      border: 'none',
      borderRadius: '12px',
      padding: '16px 24px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '600',
      width: '100%',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '20px',
      marginTop: '8px'
    },

    // Error alert
    errorAlert: {
      background: 'rgba(239, 68, 68, 0.15)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      color: '#fca5a5',
      padding: '12px 16px',
      marginBottom: '20px',
      fontSize: '0.85rem'
    },

    // Footer
    registerFooter: {
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9rem'
    },

    loginLink: {
      color: '#22c55e',
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
            33% { transform: translate(40px, -30px) rotate(120deg); }
            66% { transform: translate(-30px, 25px) rotate(240deg); }
          }
          
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-50px, -25px) rotate(180deg); }
          }
          
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(25px, -20px) scale(1.1); }
            75% { transform: translate(-20px, 15px) scale(0.9); }
          }
          
          @keyframes particle1 {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10vh) translateX(120px); opacity: 0; }
          }
          
          @keyframes particle2 {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10vh) translateX(-60px); opacity: 0; }
          }
          
          @keyframes particle3 {
            0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10vh) translateX(90px); opacity: 0; }
          }
          
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          .register-card {
            animation: fadeIn 0.8s ease-out;
          }
          
          .register-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5) !important;
          }
          
          .form-input:focus {
            border-color: rgba(34, 197, 94, 0.6) !important;
            box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2) !important;
            background: rgba(255, 255, 255, 0.18) !important;
            transform: scale(1.02) !important;
          }
          
          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
          
          .submit-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%) !important;
            transform: translateY(-2px) scale(1.02) !important;
            box-shadow: 0 16px 40px rgba(34, 197, 94, 0.5) !important;
          }
          
          .submit-btn:active {
            transform: translateY(0) scale(1) !important;
          }
          
          .password-toggle:hover {
            color: rgba(255, 255, 255, 0.9) !important;
            transform: scale(1.1) !important;
          }
          
          .login-link:hover {
            color: #4ade80 !important;
            text-shadow: 0 0 8px rgba(74, 222, 128, 0.5) !important;
          }
        `}
      </style>

      <div 
        ref={containerRef}
        style={styles.registerContainer}
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
            {[...Array(18)].map((_, index) => (
              <div
                key={index}
                style={{
                  ...styles.particle(index),
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${index * 1.5}s`
                }}
              />
            ))}
          </div>
        </div>

        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <Card style={styles.registerCard} className="register-card">
                <Card.Body style={styles.cardBody}>
                  {/* Header section */}
                  <div style={styles.headerSection}>
                    <h2 style={styles.welcomeTitle}>Create Account</h2>
                    <p style={styles.welcomeSubtitle}>
                      Join SpaceLink and start your journey
                    </p>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div style={styles.errorAlert}>
                      <strong>Error:</strong> {error}
                    </div>
                  )}

                  {/* Registration form */}
                  <Form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        style={styles.formInput}
                        className="form-input"
                        required
                      />
                    </div>

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
                          placeholder="Create a password"
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
                      {formData.password && (
                        <div style={styles.passwordStrengthContainer}>
                          <div style={styles.passwordStrengthBar}>
                            <div style={styles.passwordStrengthFill}></div>
                          </div>
                          <div style={styles.passwordStrengthText}>
                            {getPasswordStrengthText()}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Confirm Password</label>
                      <div style={styles.passwordContainer}>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm your password"
                          style={{ ...styles.formInput, paddingRight: '50px' }}
                          className="form-input"
                          required
                        />
                        <button
                          type="button"
                          style={styles.passwordToggle}
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
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
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <span>🚀</span>
                          Create Account
                        </>
                      )}
                    </button>
                  </Form>

                  {/* Footer */}
                  <div style={styles.registerFooter}>
                    <p style={{ margin: 0 }}>
                      Already have an account?{' '}
                      <Link 
                        to="/login" 
                        style={styles.loginLink}
                        className="login-link"
                      >
                        Sign in here
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

export default Register;
