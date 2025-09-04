import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* CLEAN PROFESSIONAL HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div style={{ maxWidth: '500px' }}>
                {/* Clean Badge */}
                <div style={{
                  display: 'inline-block',
                  background: '#e0f2fe',
                  color: '#0369a1',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '24px',
                  border: '1px solid #bae6fd'
                }}>
                  Leading Property Platform
                </div>
                
                {/* Clean Typography */}
                <h1 style={{
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  lineHeight: '1.1',
                  color: '#1e293b',
                  marginBottom: '24px',
                  letterSpacing: '-0.025em'
                }}>
                  Find Your Perfect 
                  <span style={{ color: '#0ea5e9' }}> Property</span> Today
                </h1>
                
                <p style={{
                  fontSize: '1.125rem',
                  color: '#64748b',
                  lineHeight: '1.75',
                  marginBottom: '32px'
                }}>
                  SpaceLink connects you with exceptional properties worldwide. 
                  Professional service, trusted expertise, seamless transactions.
                </p>
                
                {/* Clean CTA */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <Link 
                    to="/find-property" 
                    style={{
                      background: '#0ea5e9',
                      color: 'white',
                      padding: '14px 32px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      display: 'inline-block',
                      boxShadow: '0 4px 6px rgba(14, 165, 233, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#0284c7';
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 6px 12px rgba(14, 165, 233, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#0ea5e9';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 6px rgba(14, 165, 233, 0.25)';
                    }}
                  >
                    Browse Properties
                  </Link>
                  
                  <Link 
                    to="/about" 
                    style={{
                      color: '#475569',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Learn More →
                  </Link>
                </div>
                
                {/* Clean Stats */}
                <div style={{
                  display: 'flex',
                  gap: '32px',
                  marginTop: '48px',
                  paddingTop: '32px',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  <div>
                    <div style={{
                      fontSize: '1.875rem',
                      fontWeight: 700,
                      color: '#1e293b'
                    }}>10K+</div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      fontWeight: 500
                    }}>Properties</div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1.875rem',
                      fontWeight: 700,
                      color: '#1e293b'
                    }}>500+</div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      fontWeight: 500
                    }}>Cities</div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1.875rem',
                      fontWeight: 700,
                      color: '#1e293b'
                    }}>99%</div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      fontWeight: 500
                    }}>Satisfaction</div>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={6}>
              <div style={{
                position: 'relative',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {/* Clean Image */}
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Modern luxury property" 
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
                    display: 'block'
                  }}
                />
                
                {/* Clean Feature Card */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      background: '#dcfce7',
                      borderRadius: '8px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '16px' }}>✓</span>
                    </div>
                    <div>
                      <div style={{
                        fontWeight: 600,
                        color: '#1e293b',
                        fontSize: '0.875rem'
                      }}>Verified Properties</div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#64748b'
                      }}>100% Authentic Listings</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CLEAN FEATURED PROPERTIES */}
      <section style={{
        padding: '80px 0',
        background: '#ffffff'
      }}>
        <Container>
          {/* Clean Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '64px',
            maxWidth: '600px',
            margin: '0 auto 64px auto'
          }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '16px'
            }}>Featured Properties</h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              lineHeight: '1.75'
            }}>
              Handpicked premium properties from our expert team
            </p>
          </div>
          
          <Row>
            {/* Clean Property Cards */}
            <Col lg={6} className="mb-4">
              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #f1f5f9',
                transition: 'all 0.2s ease',
                height: '100%'
              }}>
                {/* Clean Image */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Modern Villa"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: '#0ea5e9',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    For Rent
                  </div>
                </div>
                
                {/* Clean Content */}
                <div style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748b',
                    fontSize: '0.875rem',
                    marginBottom: '8px'
                  }}>
                    <span>📍</span>
                    Namakkal, Tamil Nadu
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#1e293b',
                    marginBottom: '8px'
                  }}>Modern Villa</h3>
                  
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }}>Spacious luxury villa with premium amenities and modern design</p>
                  
                  {/* Clean Features */}
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '20px',
                    fontSize: '0.875rem',
                    color: '#64748b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>🛏️</span>4 BHK
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>📐</span>2,500 sq ft
                    </div>
                  </div>
                  
                  {/* Clean Footer */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#0ea5e9'
                    }}>₹1,234/month</div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        background: 'transparent',
                        border: '1px solid #e2e8f0',
                        color: '#64748b',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}>View Details</button>
                      
                      <button style={{
                        background: '#0ea5e9',
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6} className="mb-4">
              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #f1f5f9',
                transition: 'all 0.2s ease',
                height: '100%'
              }}>
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Agricultural Land"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: '#10b981',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    For Sale
                  </div>
                </div>
                
                <div style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748b',
                    fontSize: '0.875rem',
                    marginBottom: '8px'
                  }}>
                    <span>📍</span>
                    Namakkal, Tamil Nadu
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#1e293b',
                    marginBottom: '8px'
                  }}>Premium Land</h3>
                  
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }}>Perfect agricultural land with excellent connectivity and growth potential</p>
                  
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '20px',
                    fontSize: '0.875rem',
                    color: '#64748b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>🌾</span>Agricultural
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>📐</span>10,000 sq ft
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#10b981'
                    }}>₹1,22,345/year</div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        background: 'transparent',
                        border: '1px solid #e2e8f0',
                        color: '#64748b',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}>View Details</button>
                      
                      <button style={{
                        background: '#10b981',
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CLEAN CTA SECTION */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        textAlign: 'center'
      }}>
        <Container>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 700,
              color: 'white',
              marginBottom: '16px'
            }}>Ready to Find Your Perfect Property?</h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '32px',
              lineHeight: '1.75'
            }}>Join thousands of satisfied clients worldwide</p>
            
            <Link 
              to="/find-property" 
              style={{
                background: '#0ea5e9',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 4px 6px rgba(14, 165, 233, 0.25)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#0284c7';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#0ea5e9';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Start Your Search
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
