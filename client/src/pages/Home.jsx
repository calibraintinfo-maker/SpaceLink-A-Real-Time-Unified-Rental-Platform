import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');

  return (
    <>
      {/* WORLD-CLASS HERO SECTION - INLINE STYLES */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '4rem',
          maxWidth: '1400px',
          margin: '0 auto',
          minHeight: '90vh',
          width: '100%'
        }}>
          {/* Left Content */}
          <div style={{
            color: 'white',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textTransform: 'uppercase'
            }}>
              LEADING PROPERTY PLATFORM
            </div>
            
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Leading Global
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Property Rental
              </span>
              <br />
              Agency
            </h1>
            
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '500px'
            }}>
              SpaceLink is a <strong>global property platform</strong>. Helping 
              clients find exceptional properties and empower seamless transactions.
            </p>
            
            <div style={{ marginBottom: '3rem' }}>
              <Link 
                to="/find-property" 
                style={{
                  background: '#6366f1',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#4f46e5';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#6366f1';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
                }}
              >
                🏠 Find Properties
              </Link>
            </div>
            
            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '2rem'
            }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1
                }}>10K+</div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '0.25rem'
                }}>Properties</div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1
                }}>500+</div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '0.25rem'
                }}>Cities</div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1
                }}>99%</div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '0.25rem'
                }}>Satisfaction</div>
              </div>
            </div>
          </div>
          
          {/* Right Image - Clean, No Overlays */}
          <div style={{
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern luxury property" 
                style={{
                  width: '100%',
                  height: '600px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Decorative Floating Cards */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '1rem 1.5rem',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '0s'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{ fontSize: '1.5rem' }}>📍</div>
            <div style={{
              fontWeight: 600,
              color: '#1f2937',
              fontSize: '0.9rem'
            }}>Premium Locations</div>
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '10%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '1rem 1.5rem',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '3s'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{ fontSize: '1.5rem' }}>⚡</div>
            <div style={{
              fontWeight: 600,
              color: '#1f2937',
              fontSize: '0.9rem'
            }}>Instant Booking</div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES SECTION */}
      <section style={{
        padding: '6rem 0',
        background: '#f8fafc'
      }}>
        <Container>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: '#1f2937',
              marginBottom: '1rem'
            }}>Featured Properties</h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover our handpicked selection of exceptional properties curated by our expert team
            </p>
          </div>
          
          <Row>
            {/* Property Card 1 */}
            <Col lg={6} className="mb-4">
              <div style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                height: '100%'
              }}>
                <div style={{
                  position: 'relative',
                  height: '250px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Modern Villa"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span>📍</span>
                    namakkal, Tamil nadu
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>Modern Villa</h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '1rem'
                  }}>Spacious luxury villa with premium amenities</p>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      <span>🏠</span>
                      4 BHK
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      <span>📐</span>
                      2500 sq ft
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
                    }}>₹1,234/monthly</div>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <button style={{
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        color: '#6b7280',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}>View Details</button>
                      <button style={{
                        background: '#6366f1',
                        border: 'none',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Property Card 2 */}
            <Col lg={6} className="mb-4">
              <div style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                height: '100%'
              }}>
                <div style={{
                  position: 'relative',
                  height: '250px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Agricultural Land"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span>📍</span>
                    namakkal, Tamil nadu
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>Premium Land</h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '1rem'
                  }}>Perfect location for agriculture with excellent connectivity</p>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      <span>🌾</span>
                      Agricultural
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      <span>📐</span>
                      10000 sq ft
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
                    }}>₹1,22,345/yearly</div>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <button style={{
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        color: '#6b7280',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}>View Details</button>
                      <button style={{
                        background: '#6366f1',
                        border: 'none',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
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

      {/* CTA SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        padding: '6rem 0',
        textAlign: 'center'
      }}>
        <Container>
          <div>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: 'white',
              marginBottom: '1rem'
            }}>Ready to find your perfect property?</h2>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '2.5rem'
            }}>Join thousands of satisfied clients worldwide</p>
            <Link 
              to="/find-property" 
              style={{
                background: '#6366f1',
                color: 'white',
                padding: '1.25rem 3rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1.2rem',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#4f46e5';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#6366f1';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Start Your Search
            </Link>
          </div>
        </Container>
      </section>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center !important;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
