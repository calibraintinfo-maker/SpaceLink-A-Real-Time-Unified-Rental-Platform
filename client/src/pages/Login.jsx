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

  // Mouse tracking for subtle interactive effects
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
        {/* ✅ LIGHT: Subtle Background Elements */}
        <div className="background-decoration">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div 
            className="mouse-glow"
            style={{
              transform: `translate(${mousePosition.x}%, ${mousePosition.y}%)`
            }}
          ></div>
        </div>

        <Container>
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col xs={12} sm={8} md={6} lg={5} xl={4}>
              
              {/* ✅ COMPACT: Login Card */}
              <Card className="login-card">
                <Card.Body className="card-body">
                  
                  {/* ✅ COMPACT: Header */}
                  <div className="header-section">
                    <div className="brand-section">
                      <span className="brand-icon">🏠</span>
                      <h1 className="brand-title">SpaceLink</h1>
                    </div>
                    <h2 className="welcome-title">Welcome Back</h2>
                    <p className="welcome-subtitle">Sign in to continue</p>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <Alert variant="danger" className="error-alert">
                      <strong>Error:</strong> {error}
                    </Alert>
                  )}

                  {/* ✅ COMPACT: Login Form */}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                      <Form.Label className="form-label">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="form-input"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label className="form-label">Password</Form.Label>
                      <div className="password-container">
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                          className="form-input"
                          required
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
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" animation="border" className="me-2" />
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </Form>

                  {/* ✅ COMPACT: Footer */}
                  <div className="login-footer">
                    <p className="signup-text">
                      Don't have an account?{' '}
                      <Link to="/register" className="signup-link">
                        Create one
                      </Link>
                    </p>
                  </div>

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ✅ LIGHT: Professional Light Theme Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 2rem 0;
        }
        
        /* ✅ LIGHT: Subtle Background Decoration */
        .background-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(20px);
          opacity: 0.6;
        }
        
        .shape-1 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%);
          top: 10%;
          left: 10%;
          animation: float1 8s ease-in-out infinite;
        }
        
        .shape-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%);
          top: 60%;
          right: 15%;
          animation: float2 10s ease-in-out infinite;
        }
        
        .shape-3 {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%);
          bottom: 20%;
          left: 20%;
          animation: float3 12s ease-in-out infinite;
        }
        
        .mouse-glow {
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          transition: transform 0.3s ease-out;
          pointer-events: none;
        }
        
        /* ✅ COMPACT: Login Card */
        .login-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 16px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 4px 16px rgba(0, 0, 0, 0.04);
          position: relative;
          z-index: 10;
          max-width: 400px;
          margin: 0 auto;
          transition: all 0.3s ease;
        }
        
        .login-card:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.12),
            0 8px 20px rgba(0, 0, 0, 0.06);
        }
        
        .card-body {
          padding: 2rem 2rem 1.5rem 2rem;
        }
        
        /* ✅ COMPACT: Header */
        .header-section {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .brand-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 1rem;
        }
        
        .brand-icon {
          font-size: 1.5rem;
        }
        
        .brand-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #7c3aed;
          margin: 0;
          letter-spacing: -0.02em;
        }
        
        .welcome-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        
        .welcome-subtitle {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
          margin: 0;
        }
        
        /* ✅ COMPACT: Form Styling */
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          color: #374151;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .form-input {
          background: rgba(255, 255, 255, 0.8) !important;
          border: 1.5px solid #e2e8f0 !important;
          border-radius: 8px !important;
          padding: 12px 16px !important;
          color: #111827 !important;
          font-size: 0.95rem !important;
          transition: all 0.2s ease !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        .form-input::placeholder {
          color: #9ca3af !important;
        }
        
        .form-input:focus {
          background: rgba(255, 255, 255, 1) !important;
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
          outline: none;
        }
        
        /* Password Field */
        .password-container {
          position: relative;
        }
        
        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 1rem;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .password-toggle:hover {
          color: #374151;
          background: rgba(107, 114, 128, 0.1);
        }
        
        /* ✅ COMPACT: Submit Button */
        .submit-button {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 12px 20px !important;
          color: white !important;
          font-size: 0.95rem !important;
          font-weight: 600 !important;
          width: 100% !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2) !important;
          margin-bottom: 1.5rem !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #6b21a8 0%, #7e22ce 100%) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 16px rgba(124, 58, 237, 0.3) !important;
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }
        
        /* Error Alert */
        .error-alert {
          background-color: #fee2e2 !important;
          border: 1px solid #fca5a5 !important;
          color: #dc2626 !important;
          border-radius: 8px !important;
          padding: 12px !important;
          margin-bottom: 1.5rem !important;
          font-size: 0.85rem !important;
        }
        
        /* ✅ COMPACT: Footer */
        .login-footer {
          text-align: center;
        }
        
        .signup-text {
          color: #64748b;
          font-size: 0.85rem;
          margin: 0;
        }
        
        .signup-link {
          color: #7c3aed !important;
          text-decoration: none !important;
          font-weight: 600 !important;
          transition: color 0.2s ease !important;
        }
        
        .signup-link:hover {
          color: #6b21a8 !important;
        }
        
        /* Subtle Animations */
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -15px) rotate(180deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, -10px) rotate(-180deg); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, -8px) scale(1.05); }
        }
        
        /* ✅ RESPONSIVE: Mobile Optimizations */
        @media (max-width: 768px) {
          .login-container {
            padding: 1rem 0;
          }
          
          .card-body {
            padding: 1.5rem;
          }
          
          .welcome-title {
            font-size: 1.3rem;
          }
          
          .brand-title {
            font-size: 1.3rem;
          }
          
          .shape-1 { width: 150px; height: 150px; }
          .shape-2 { width: 120px; height: 120px; }
          .shape-3 { width: 100px; height: 100px; }
        }
        
        @media (max-width: 576px) {
          .card-body {
            padding: 1.2rem;
          }
          
          .welcome-title {
            font-size: 1.2rem;
          }
          
          .brand-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
};

export default Login;
