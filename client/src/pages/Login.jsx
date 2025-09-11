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
        navigate('/find-property');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="login-container"
      >
        {/* ✅ ENHANCED: Interactive Background Animation */}
        <div className="background-animation">
          {/* Floating orbs with enhanced animations */}
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
          
          {/* Interactive mouse follower */}
          <div 
            className="mouse-follower"
            style={{
              transform: `translate(${mousePosition.x}%, ${mousePosition.y}%)`
            }}
          ></div>
          
          {/* Animated particles */}
          <div className="particles">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className={`particle particle-${index % 3 + 1}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${index * 1.5}s`
                }}
              />
            ))}
          </div>
          
          {/* Grid pattern overlay */}
          <div className="grid-overlay"></div>
        </div>

        <Container>
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              
              {/* ✅ PROFESSIONAL: Login Card */}
              <Card className="login-card">
                <Card.Body className="card-body">
                  
                  {/* Header Section */}
                  <div className="header-section">
                    <div className="brand-logo">
                      <span className="logo-icon">🏠</span>
                      <span className="brand-name">SpaceLink</span>
                    </div>
                    <h2 className="welcome-title">Welcome Back</h2>
                    <p className="welcome-subtitle">
                      Sign in to your account to continue exploring properties
                    </p>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <Alert variant="danger" className="error-alert">
                      <div className="error-content">
                        <span className="error-icon">⚠️</span>
                        <span>{error}</span>
                      </div>
                    </Alert>
                  )}

                  {/* Login Form */}
                  <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Group className="form-group">
                      <Form.Label className="form-label">
                        <span className="label-icon">✉️</span>
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="form-input"
                        required
                        autoComplete="email"
                      />
                    </Form.Group>

                    <Form.Group className="form-group password-group">
                      <Form.Label className="form-label">
                        <span className="label-icon">🔒</span>
                        Password
                      </Form.Label>
                      <div className="password-container">
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                          className="form-input password-input"
                          required
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </Form.Group>

                    <Button
                      type="submit"
                      className="submit-button"
                      disabled={loading}
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" animation="border" className="me-2" />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span className="button-icon">🚀</span>
                          <span>Sign In to SpaceLink</span>
                        </>
                      )}
                    </Button>
                  </Form>

                  {/* Footer */}
                  <div className="login-footer">
                    <p className="signup-text">
                      Don't have an account?{' '}
                      <Link to="/register" className="signup-link">
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

      {/* ✅ PROFESSIONAL: Enhanced Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #374151 70%, #4b5563 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        /* ✅ ENHANCED: Background Animations */
        .background-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.7;
        }
        
        .orb-1 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(124, 58, 237, 0.1) 40%, transparent 70%);
          top: 5%;
          left: 8%;
          animation: float1 10s ease-in-out infinite;
        }
        
        .orb-2 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%);
          top: 55%;
          right: 10%;
          animation: float2 12s ease-in-out infinite;
        }
        
        .orb-3 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 40%, transparent 70%);
          bottom: 15%;
          left: 15%;
          animation: float3 14s ease-in-out infinite;
        }
        
        .mouse-follower {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
          borderRadius: 50%;
          filter: blur(20px);
          transition: transform 0.3s ease-out;
          pointer-events: none;
        }
        
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(168, 85, 247, 0.6);
          border-radius: 50%;
        }
        
        .particle-1 { animation: particle1 18s linear infinite; }
        .particle-2 { animation: particle2 22s linear infinite; }
        .particle-3 { animation: particle3 20s linear infinite; }
        
        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridMove 25s linear infinite;
        }
        
        /* ✅ PROFESSIONAL: Login Card */
        .login-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          box-shadow: 
            0 32px 80px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 10;
          animation: cardAppear 0.8s ease-out;
          transition: all 0.3s ease;
        }
        
        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 40px 100px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }
        
        .card-body {
          padding: 48px 40px;
          color: white;
        }
        
        /* Header Section */
        .header-section {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .brand-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        
        .logo-icon {
          font-size: 2rem;
          filter: drop-shadow(0 0 10px rgba(124, 58, 237, 0.5));
        }
        
        .brand-name {
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        
        .welcome-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.02em;
        }
        
        .welcome-subtitle {
          color: rgba(255, 255, 255, 0.85);
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          margin: 0;
        }
        
        /* Form Styling */
        .login-form {
          margin-bottom: 32px;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-label {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .label-icon {
          font-size: 1rem;
          opacity: 0.8;
        }
        
        .form-input {
          background: rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 12px !important;
          padding: 16px 20px !important;
          color: white !important;
          font-size: 1rem !important;
          transition: all 0.3s ease !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        
        .form-input:focus {
          background: rgba(255, 255, 255, 0.18) !important;
          border-color: rgba(168, 85, 247, 0.6) !important;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2) !important;
          transform: scale(1.02);
        }
        
        /* Password Field */
        .password-container {
          position: relative;
        }
        
        .password-input {
          padding-right: 50px !important;
        }
        
        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 1.1rem;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .password-toggle:hover {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-50%) scale(1.1);
        }
        
        /* Submit Button */
        .submit-button {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          border: none !important;
          border-radius: 12px !important;
          padding: 16px 24px !important;
          color: white !important;
          font-size: 1rem !important;
          font-weight: 700 !important;
          width: 100% !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.3) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          font-family: 'Inter', sans-serif !important;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
        
        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #6b21a8 0%, #7e22ce 100%) !important;
          transform: translateY(-2px) scale(1.02) !important;
          box-shadow: 0 16px 40px rgba(124, 58, 237, 0.4) !important;
        }
        
        .submit-button:active {
          transform: translateY(0) scale(1) !important;
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }
        
        .button-icon {
          font-size: 1.1rem;
        }
        
        /* Error Alert */
        .error-alert {
          background: rgba(239, 68, 68, 0.15) !important;
          border: 1px solid rgba(239, 68, 68, 0.3) !important;
          border-radius: 12px !important;
          padding: 12px 16px !important;
          margin-bottom: 24px !important;
          color: #fca5a5 !important;
        }
        
        .error-content {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .error-icon {
          font-size: 1rem;
        }
        
        /* Footer */
        .login-footer {
          text-align: center;
        }
        
        .signup-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          margin: 0;
        }
        
        .signup-link {
          color: #a855f7 !important;
          text-decoration: none !important;
          font-weight: 600 !important;
          transition: all 0.2s ease !important;
        }
        
        .signup-link:hover {
          color: #c084fc !important;
          text-shadow: 0 0 8px rgba(168, 85, 247, 0.5) !important;
        }
        
        /* Keyframe Animations */
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-20px, -40px) rotate(180deg); }
          75% { transform: translate(-40px, 20px) rotate(270deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(-40px, -20px) rotate(120deg) scale(1.1); }
          66% { transform: translate(20px, -30px) rotate(240deg) scale(0.9); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(25px, -15px) scale(1.1); }
          40% { transform: translate(-15px, -25px) scale(0.9); }
          60% { transform: translate(-30px, 10px) scale(1.05); }
          80% { transform: translate(15px, 20px) scale(0.95); }
        }
        
        @keyframes particle1 {
          0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) translateX(150px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes particle2 {
          0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) translateX(-100px) rotate(-360deg); opacity: 0; }
        }
        
        @keyframes particle3 {
          0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) translateX(75px) rotate(180deg); opacity: 0; }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes cardAppear {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .card-body {
            padding: 32px 24px;
          }
          
          .welcome-title {
            font-size: 1.75rem;
          }
          
          .welcome-subtitle {
            font-size: 0.9rem;
          }
          
          .orb-1 { width: 250px; height: 250px; }
          .orb-2 { width: 200px; height: 200px; }
          .orb-3 { width: 150px; height: 150px; }
        }
        
        @media (max-width: 576px) {
          .card-body {
            padding: 28px 20px;
          }
          
          .brand-name {
            font-size: 1.5rem;
          }
          
          .welcome-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Login;
