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
        {/* ✅ PROFESSIONAL: Light Theme Animated Background */}
        <div className="background-animation">
          {/* Grid pattern overlay */}
          <div className="grid-overlay"></div>
          
          {/* Floating orbs with light colors */}
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
            {[...Array(15)].map((_, index) => (
              <div
                key={index}
                className={`particle particle-${index % 3 + 1}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${index * 1.2}s`
                }}
              />
            ))}
          </div>
        </div>

        <Container>
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col xs={12} sm={8} md={6} lg={5} xl={4}>
              
              {/* ✅ PROFESSIONAL: Light Glass Morphism Login Card */}
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
                        <span><strong>Error:</strong> {error}</span>
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

                    <Form.Group className="form-group">
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
                      Don&apos;t have an account?{' '}
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

      {/* ✅ PROFESSIONAL: Light Theme Styles with Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 20%, #cbd5e1 40%, #94a3b8 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        /* ✅ LIGHT: Interactive Background Animation */
        .background-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        
        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(124, 58, 237, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.08) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridMove 25s linear infinite;
        }
        
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(30px);
          opacity: 0.6;
        }
        
        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 40%, transparent 70%);
          top: 8%;
          left: 10%;
          animation: float1 12s ease-in-out infinite;
        }
        
        .orb-2 {
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%);
          top: 60%;
          right: 12%;
          animation: float2 15s ease-in-out infinite;
        }
        
        .orb-3 {
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.04) 40%, transparent 70%);
          bottom: 18%;
          left: 18%;
          animation: float3 18s ease-in-out infinite;
        }
        
        .mouse-follower {
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(15px);
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
          width: 4px;
          height: 4px;
          background: rgba(124, 58, 237, 0.4);
          border-radius: 50%;
        }
        
        .particle-1 { animation: particle1 20s linear infinite; }
        .particle-2 { animation: particle2 25s linear infinite; }
        .particle-3 { animation: particle3 22s linear infinite; }
        
        /* ✅ LIGHT: Professional Glass Morphism Login Card */
        .login-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 24px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.1),
            0 8px 25px rgba(124, 58, 237, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          position: relative;
          z-index: 10;
          animation: cardAppear 0.8s ease-out;
          transition: all 0.3s ease;
          max-width: 420px;
          margin: 0 auto;
        }
        
        .login-card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 30px 80px rgba(0, 0, 0, 0.15),
            0 12px 35px rgba(124, 58, 237, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        
        .card-body {
          padding: 2.5rem 2rem;
          color: #1f2937;
        }
        
        /* Header Section */
        .header-section {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .brand-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        
        .logo-icon {
          font-size: 2rem;
          filter: drop-shadow(0 2px 8px rgba(124, 58, 237, 0.3));
        }
        
        .brand-name {
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        
        .welcome-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: #111827;
          letter-spacing: -0.02em;
        }
        
        .welcome-subtitle {
          color: #6b7280;
          font-size: 0.95rem;
          font-weight: 400;
          line-height: 1.5;
          margin: 0;
        }
        
        /* Form Styling */
        .login-form {
          margin-bottom: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          color: #374151;
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
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(5px);
          border: 2px solid rgba(124, 58, 237, 0.1) !important;
          border-radius: 12px !important;
          padding: 14px 18px !important;
          color: #111827 !important;
          font-size: 0.95rem !important;
          transition: all 0.3s ease !important;
          font-family: 'Inter', sans-serif !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
        }
        
        .form-input::placeholder {
          color: #9ca3af !important;
        }
        
        .form-input:focus {
          background: rgba(255, 255, 255, 0.95) !important;
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
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
          color: #6b7280;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .password-toggle:hover {
          color: #374151;
          background: rgba(124, 58, 237, 0.1);
          transform: translateY(-50%) scale(1.1);
        }
        
        /* Submit Button */
        .submit-button {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          border: none !important;
          border-radius: 12px !important;
          padding: 14px 24px !important;
          color: white !important;
          font-size: 0.95rem !important;
          font-weight: 700 !important;
          width: 100% !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.25) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          font-family: 'Inter', sans-serif !important;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          margin-bottom: 1.5rem !important;
        }
        
        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #6b21a8 0%, #7e22ce 100%) !important;
          transform: translateY(-3px) scale(1.02) !important;
          box-shadow: 0 16px 40px rgba(124, 58, 237, 0.35) !important;
        }
        
        .submit-button:active {
          transform: translateY(-1px) scale(1) !important;
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
          background: rgba(254, 242, 242, 0.9) !important;
          border: 2px solid rgba(248, 113, 113, 0.3) !important;
          border-radius: 12px !important;
          padding: 12px 16px !important;
          margin-bottom: 1.5rem !important;
          color: #dc2626 !important;
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
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0;
        }
        
        .signup-link {
          color: #7c3aed !important;
          text-decoration: none !important;
          font-weight: 600 !important;
          transition: all 0.2s ease !important;
        }
        
        .signup-link:hover {
          color: #6b21a8 !important;
          text-shadow: 0 0 8px rgba(124, 58, 237, 0.3) !important;
        }
        
        /* ✅ SMOOTH: Enhanced Keyframe Animations */
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(20px, -20px) rotate(90deg) scale(1.05); }
          50% { transform: translate(-15px, -30px) rotate(180deg) scale(0.95); }
          75% { transform: translate(-25px, 15px) rotate(270deg) scale(1.02); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          30% { transform: translate(-30px, -15px) rotate(108deg) scale(1.08); }
          70% { transform: translate(15px, -25px) rotate(252deg) scale(0.92); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          20% { transform: translate(18px, -12px) scale(1.06) rotate(72deg); }
          40% { transform: translate(-12px, -20px) scale(0.94) rotate(144deg); }
          60% { transform: translate(-22px, 8px) scale(1.03) rotate(216deg); }
          80% { transform: translate(12px, 16px) scale(0.97) rotate(288deg); }
        }
        
        @keyframes particle1 {
          0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-10vh) translateX(120px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes particle2 {
          0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-10vh) translateX(-80px) rotate(-360deg); opacity: 0; }
        }
        
        @keyframes particle3 {
          0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-10vh) translateX(60px) rotate(180deg); opacity: 0; }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes cardAppear {
          from { 
            opacity: 0; 
            transform: translateY(40px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        /* ✅ RESPONSIVE: Mobile Optimizations */
        @media (max-width: 768px) {
          .card-body {
            padding: 2rem 1.5rem;
          }
          
          .welcome-title {
            font-size: 1.5rem;
          }
          
          .brand-name {
            font-size: 1.5rem;
          }
          
          .orb-1 { width: 220px; height: 220px; }
          .orb-2 { width: 180px; height: 180px; }
          .orb-3 { width: 140px; height: 140px; }
        }
        
        @media (max-width: 576px) {
          .card-body {
            padding: 1.5rem 1.2rem;
          }
          
          .welcome-title {
            font-size: 1.3rem;
          }
          
          .brand-name {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </>
  );
};

export default Login;
