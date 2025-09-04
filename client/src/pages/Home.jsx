import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* PROFESSIONAL HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Background Elements */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>

        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            alignItems: 'center',
            gap: '5rem',
            minHeight: '85vh'
          }}>
            {/* Left Content - Professional */}
            <div style={{
              color: 'white',
              paddingRight: '1rem'
            }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(59, 130, 246, 0.15)',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                marginBottom: '1.5rem',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                textTransform: 'uppercase',
                color: '#93c5fd'
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
                  background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
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
              
              <div style={{ 
                marginBottom: '3rem',
                position: 'relative'
              }}>
                <Link 
                  to="/find-property" 
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    color: 'white',
                    padding: '14px 32px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 3
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>🏠</span>
                  Find Properties
                </Link>
              </div>
              
              {/* Professional Stats */}
              <div style={{
                display: 'flex',
                gap: '2.5rem',
                marginTop: '2rem'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: 'white',
                    lineHeight: 1
                  }}>10K+</div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginTop: '4px',
                    fontWeight: 500
                  }}>Properties</div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: 'white',
                    lineHeight: 1
                  }}>500+</div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginTop: '4px',
                    fontWeight: 500
                  }}>Cities</div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: 'white',
                    lineHeight: 1
                  }}>99%</div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginTop: '4px',
                    fontWeight: 500
                  }}>Satisfaction</div>
                </div>
              </div>
            </div>
            
            {/* Right Image - Professional Frame */}
            <div style={{
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Modern luxury property" 
                  style={{
                    width: '100%',
                    height: '550px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
        
        {/* Professional Floating Cards - Repositioned */}
        <div style={{
          position: 'absolute',
          top: '18%',
          right: '8%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          borderRadius: '16px',
          padding: '12px 20px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          animation: 'float 6s ease-in-out infinite',
          zIndex: 3
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              fontSize: '18px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              borderRadius: '8px',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>📍</div>
            <div>
              <div style={{
                fontWeight: 600,
                color: '#1f2937',
                fontSize: '0.85rem'
              }}>Premium Locations</div>
              <div style={{
                fontSize: '0.7rem',
                color: '#6b7280'
              }}>Worldwide Coverage</div>
            </div>
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '22%',
          left: '6%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          borderRadius: '16px',
          padding: '12px 20px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          animation: 'float 6s ease-in-out infinite 3s',
          zIndex: 3
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              fontSize: '18px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '8px',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>⚡</div>
            <div>
              <div style={{
                fontWeight: 600,
                color: '#1f2937',
                fontSize: '0.85rem'
              }}>Instant Booking</div>
              <div style={{
                fontSize: '0.7rem',
                color: '#6b7280'
              }}>Book in Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPACT FEATURED PROPERTIES */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <Container>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              borderRadius: '20px',
              padding: '6px 16px',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              FEATURED COLLECTION
            </div>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              color: '#1f2937',
              marginBottom: '1rem'
            }}>Featured Properties</h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Discover our handpicked selection of exceptional properties curated by our expert team
            </p>
          </div>
          
          <Row className="justify-content-center">
            {/* COMPACT Property Cards */}
            <Col lg={5} md={6} className="mb-4">
              <div style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                height: '420px',
                maxWidth: '450px',
                margin: '0 auto'
              }}>
                <div style={{
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Modern Villa"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}>
                    PREMIUM
                  </div>
                </div>
                <div style={{ padding: '1.2rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#6b7280',
                    fontSize: '0.8rem',
                    marginBottom: '6px'
                  }}>
                    <span>📍</span>
                    namakkal, Tamil nadu
                  </div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#1f2937',
                    marginBottom: '6px'
                  }}>Modern Villa</h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    lineHeight: 1.4
                  }}>Spacious luxury villa with premium amenities</p>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1.2rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>
                      <span>🏠</span>
                      4 BHK
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
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
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#10b981'
                    }}>₹1,234/monthly</div>
                    <div style={{
                      display: 'flex',
                      gap: '6px'
                    }}>
                      <button style={{
                        background: 'transparent',
                        border: '1px solid #d1d5db',
                        color: '#6b7280',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontWeight: 500,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}>View Details</button>
                      <button style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={5} md={6} className="mb-4">
              <div style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                height: '420px',
                maxWidth: '450px',
                margin: '0 auto'
              }}>
                <div style={{
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Agricultural Land"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}>
                    INVESTMENT
                  </div>
                </div>
                <div style={{ padding: '1.2rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#6b7280',
                    fontSize: '0.8rem',
                    marginBottom: '6px'
                  }}>
                    <span>📍</span>
                    namakkal, Tamil nadu
                  </div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#1f2937',
                    marginBottom: '6px'
                  }}>Premium Land</h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    lineHeight: 1.4
                  }}>Perfect location for agriculture with excellent connectivity</p>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1.2rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>
                      <span>🌾</span>
                      Agricultural
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
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
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#10b981'
                    }}>₹1,22,345/yearly</div>
                    <div style={{
                      display: 'flex',
                      gap: '6px'
                    }}>
                      <button style={{
                        background: 'transparent',
                        border: '1px solid #d1d5db',
                        color: '#6b7280',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontWeight: 500,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}>View Details</button>
                      <button style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.8rem',
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

      {/* PROFESSIONAL CTA SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        padding: '6rem 0',
        textAlign: 'center'
      }}>
        <Container>
          <h2 style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            color: 'white',
            marginBottom: '1rem'
          }}>Ready to find your perfect property?</h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '2.5rem'
          }}>Join thousands of satisfied clients worldwide</p>
          
          <Link 
            to="/find-property" 
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              color: 'white',
              padding: '16px 40px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '1.1rem',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
            }}
          >
            Start Your Search
          </Link>
        </Container>
      </section>

      {/* Animation CSS */}
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
