import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* ULTRA CREATIVE HERO SECTION - FIXED OVERLAP */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, rgba(245, 87, 108, 0.1) 0%, rgba(79, 172, 254, 0.1) 100%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite reverse'
        }}></div>

        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            alignItems: 'center',
            gap: '6rem',
            minHeight: '90vh'
          }}>
            {/* Left Content - FIXED SPACING */}
            <div style={{
              color: 'white',
              paddingRight: '2rem' // Added padding to prevent overlap
            }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '1px',
                marginBottom: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textTransform: 'uppercase'
              }}>
                LEADING PROPERTY PLATFORM
              </div>
              
              <h1 style={{
                fontSize: '4.5rem',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '2rem',
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
                fontSize: '1.3rem',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6,
                marginBottom: '3rem',
                maxWidth: '520px'
              }}>
                SpaceLink is a <strong>global property platform</strong>. Helping 
                clients find exceptional properties and empower seamless transactions.
              </p>
              
              {/* FIXED BUTTON POSITIONING */}
              <div style={{ 
                marginBottom: '4rem',
                position: 'relative' // Added to control positioning
              }}>
                <Link 
                  to="/find-property" 
                  style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    padding: '16px 40px',
                    borderRadius: '50px',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 10px 30px rgba(241, 87, 108, 0.4)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 3 // Ensure button stays on top
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 15px 40px rgba(241, 87, 108, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 30px rgba(241, 87, 108, 0.4)';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>🏠</span>
                  Find Properties
                </Link>
              </div>
              
              {/* Stats - REPOSITIONED TO AVOID OVERLAP */}
              <div style={{
                display: 'flex',
                gap: '3rem',
                marginTop: '2rem'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: 'white',
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>10K+</div>
                  <div style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginTop: '4px',
                    fontWeight: 600
                  }}>Properties</div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: 'white',
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>500+</div>
                  <div style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginTop: '4px',
                    fontWeight: 600
                  }}>Cities</div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: 'white',
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>99%</div>
                  <div style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginTop: '4px',
                    fontWeight: 600
                  }}>Satisfaction</div>
                </div>
              </div>
            </div>
            
            {/* Right Image - CLEAN, CREATIVE FRAME */}
            <div style={{
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                position: 'relative',
                borderRadius: '30px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
                transform: 'rotate(2deg)'
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
                
                {/* Creative Frame Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '-15px',
                  right: '-15px',
                  bottom: '-15px',
                  border: '3px solid rgba(240, 147, 251, 0.3)',
                  borderRadius: '35px',
                  pointerEvents: 'none'
                }}></div>
              </div>
            </div>
          </div>
        </Container>
        
        {/* REPOSITIONED FLOATING CARDS - NO OVERLAP */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '16px 24px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          animation: 'float 6s ease-in-out infinite',
          zIndex: 3
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              fontSize: '24px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '12px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>📍</div>
            <div>
              <div style={{
                fontWeight: 700,
                color: '#1f2937',
                fontSize: '0.95rem',
                marginBottom: '2px'
              }}>Premium Locations</div>
              <div style={{
                fontSize: '0.8rem',
                color: '#6b7280'
              }}>Worldwide Coverage</div>
            </div>
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '8%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '16px 24px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          animation: 'float 6s ease-in-out infinite 3s',
          zIndex: 3
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              fontSize: '24px',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              borderRadius: '12px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>⚡</div>
            <div>
              <div style={{
                fontWeight: 700,
                color: '#1f2937',
                fontSize: '0.95rem',
                marginBottom: '2px'
              }}>Instant Booking</div>
              <div style={{
                fontSize: '0.8rem',
                color: '#6b7280'
              }}>Book in Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED FEATURED PROPERTIES */}
      <section style={{
        padding: '8rem 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <Container>
          <div style={{
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '25px',
              padding: '6px 20px',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '1px',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              FEATURED COLLECTION
            </div>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}>Featured Properties</h2>
            <p style={{
              fontSize: '1.3rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover our handpicked selection of exceptional properties curated by our expert team
            </p>
          </div>
          
          <Row>
            {/* Enhanced Property Cards */}
            <Col lg={6} className="mb-4">
              <div style={{
                background: 'white',
                borderRadius: '25px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.4s ease',
                height: '100%'
              }}>
                <div style={{
                  position: 'relative',
                  height: '300px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Modern Villa"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    PREMIUM
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>📍</span>
                    namakkal, Tamil nadu
                  </div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>Modern Villa</h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '1.5rem',
                    lineHeight: 1.6
                  }}>Spacious luxury villa with premium amenities and stunning architecture</p>
                  <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>🏠</span>
                      4 BHK
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>📐</span>
                      2500 sq ft
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>₹1,234/monthly</div>
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <button style={{
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        color: '#6b7280',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}>View Details</button>
                      <button style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(241, 87, 108, 0.3)'
                      }}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6} className="mb-4">
              <div style={{
                background: 'white',
                borderRadius: '25px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.4s ease',
                height: '100%'
              }}>
                <div style={{
                  position: 'relative',
                  height: '300px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Agricultural Land"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    INVESTMENT
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>📍</span>
                    namakkal, Tamil nadu
                  </div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>Premium Land</h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '1.5rem',
                    lineHeight: 1.6
                  }}>Perfect location for agriculture with excellent connectivity and growth potential</p>
                  <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>🌾</span>
                      Agricultural
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>📐</span>
                      10000 sq ft
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>₹1,22,345/yearly</div>
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <button style={{
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        color: '#6b7280',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}>View Details</button>
                      <button style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
                      }}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ULTRA CREATIVE CTA SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '8rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Animation */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
          borderRadius: '50%',
          animation: 'float 12s ease-in-out infinite'
        }}></div>
        
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '25px',
            padding: '6px 20px',
            color: 'white',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '1px',
            marginBottom: '2rem',
            textTransform: 'uppercase'
          }}>
            START YOUR JOURNEY
          </div>
          
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            color: 'white',
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>Ready to find your perfect property?</h2>
          <p style={{
            fontSize: '1.3rem',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>Join thousands of satisfied clients worldwide and discover your dream space today</p>
          
          <Link 
            to="/find-property" 
            style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              padding: '20px 50px',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '1.3rem',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 15px 40px rgba(241, 87, 108, 0.4)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 20px 50px rgba(241, 87, 108, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 15px 40px rgba(241, 87, 108, 0.4)';
            }}
          >
            Start Your Search
          </Link>
        </Container>
      </section>

      {/* Add CSS for all animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.5rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
