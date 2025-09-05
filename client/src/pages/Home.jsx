import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* EXACT MUSEMIND HERO - NO LEFT SPACE */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0', // NO PADDING
        margin: '0'   // NO MARGIN
      }}>
        {/* Musemind Background Orbs */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 10s ease-in-out infinite'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        {/* LEFT CONTENT - FULL WIDTH */}
        <div style={{
          paddingLeft: '8vw',  // Musemind exact spacing
          paddingRight: '2rem',
          color: 'white'
        }}>
          {/* Musemind Badge */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(236, 72, 153, 0.15)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            borderRadius: '50px',
            padding: '10px 24px',
            marginBottom: '32px'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              Leading Rental Platform
            </span>
          </div>
          
          {/* Musemind Typography - Exact Style */}
          <h1 style={{
            fontSize: '5rem',
            fontWeight: 900,
            lineHeight: '0.95',
            marginBottom: '32px',
            letterSpacing: '-0.05em'
          }}>
            Rent Anything,
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Anywhere
            </span>
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6',
            marginBottom: '48px',
            maxWidth: '480px'
          }}>
            From properties to equipment, venues to vehicles - SpaceLink connects you with 
            <strong style={{ color: 'rgba(255, 255, 255, 0.95)' }}> exceptional rentals worldwide</strong>. 
            Professional service, trusted transactions.
          </p>
          
          {/* Musemind CTA - Exact Style */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '24px',
            marginBottom: '64px'
          }}>
            <Link 
              to="/find-property" 
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                color: 'white',
                padding: '18px 36px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1.1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 12px 40px rgba(236, 72, 153, 0.4)',
                transition: 'all 0.3s ease',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 20px 60px rgba(236, 72, 153, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 12px 40px rgba(236, 72, 153, 0.4)';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🔍</span>
              Explore Rentals
            </Link>
            
            <Link 
              to="/about" 
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ec4899';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
              }}
            >
              How it works
              <span style={{ fontSize: '1.2rem' }}>→</span>
            </Link>
          </div>
          
          {/* Musemind Stats - Exact Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '48px',
            paddingTop: '48px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>10K+</div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>Items Listed</div>
            </div>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>500+</div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>Cities</div>
            </div>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>99%</div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>Satisfaction</div>
            </div>
          </div>
        </div>
        
        {/* RIGHT IMAGE - FULL WIDTH */}
        <div style={{
          position: 'relative',
          height: '100vh',
          width: '100%'
        }}>
          {/* Musemind Image Container */}
          <div style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            padding: '40px'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Premium rental properties" 
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                objectFit: 'cover',
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.4)'
              }}
            />
          </div>
          
          {/* Musemind Floating Cards - Exact Positioning */}
          <div style={{
            position: 'absolute',
            top: '120px',
            right: '60px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '20px 24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            animation: 'float 6s ease-in-out infinite',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '20px', color: 'white' }}>🏆</span>
              </div>
              <div>
                <div style={{
                  fontWeight: 700,
                  color: '#1e293b',
                  fontSize: '1rem',
                  marginBottom: '4px'
                }}>Premium Quality</div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#64748b'
                }}>Verified & Trusted</div>
              </div>
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '120px',
            left: '60px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '20px 24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            animation: 'float 6s ease-in-out infinite 3s',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '20px', color: 'white' }}>⚡</span>
              </div>
              <div>
                <div style={{
                  fontWeight: 700,
                  color: '#1e293b',
                  fontSize: '1rem',
                  marginBottom: '4px'
                }}>Instant Booking</div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#64748b'
                }}>Book in Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES - CONSISTENT THEME */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <Container>
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
              borderRadius: '25px',
              padding: '8px 20px',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '1px',
              marginBottom: '24px',
              textTransform: 'uppercase'
            }}>
              FEATURED LISTINGS
            </div>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '20px'
            }}>Featured Properties</h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Handpicked premium properties from our expert team
            </p>
          </div>
          
          <Row>
            {/* Property Card 1 */}
            <Col lg={6} className="mb-4">
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f1f5f9',
                transition: 'all 0.3s ease',
                height: '100%'
              }}>
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
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
                    top: '20px',
                    left: '20px',
                    background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    For Rent
                  </div>
                </div>
                
                <div style={{ padding: '32px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748b',
                    fontSize: '0.9rem',
                    marginBottom: '12px'
                  }}>
                    <span>📍</span>
                    Namakkal, Tamil Nadu
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '12px'
                  }}>Modern Villa</h3>
                  
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>Spacious luxury villa with premium amenities and modern design</p>
                  
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '24px',
                    fontSize: '0.9rem',
                    color: '#64748b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🛏️</span>4 BHK
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>📐</span>2,500 sq ft
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
                    }}>₹1,234/month</div>
                    
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button style={{
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        color: '#64748b',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>View Details</button>
                      
                      <button style={{
                        background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)'
                      }}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Property Card 2 */}
            <Col lg={6} className="mb-4">
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f1f5f9',
                transition: 'all 0.3s ease',
                height: '100%'
              }}>
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
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
                    top: '20px',
                    left: '20px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    For Sale
                  </div>
                </div>
                
                <div style={{ padding: '32px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748b',
                    fontSize: '0.9rem',
                    marginBottom: '12px'
                  }}>
                    <span>📍</span>
                    Namakkal, Tamil Nadu
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '12px'
                  }}>Premium Land</h3>
                  
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>Perfect agricultural land with excellent connectivity and growth potential</p>
                  
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '24px',
                    fontSize: '0.9rem',
                    color: '#64748b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🌾</span>Agricultural
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>📐</span>10,000 sq ft
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
                    }}>₹1,22,345/year</div>
                    
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button style={{
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        color: '#64748b',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>View Details</button>
                      
                      <button style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                      }}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA SECTION - CONSISTENT THEME */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>
        
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              color: 'white',
              marginBottom: '20px'
            }}>Ready to Start Renting?</h2>
            
            <p style={{
              fontSize: '1.3rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>Join thousands of renters and owners making seamless transactions worldwide</p>
            
            <Link 
              to="/find-property" 
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                color: 'white',
                padding: '20px 48px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1.2rem',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 12px 40px rgba(236, 72, 153, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 20px 60px rgba(236, 72, 153, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 12px 40px rgba(236, 72, 153, 0.4)';
              }}
            >
              Start Your Search
            </Link>
          </div>
        </Container>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(1deg); }
        }
        
        @media (max-width: 768px) {
          section:first-child {
            grid-template-columns: 1fr !important;
            height: auto !important;
            padding: 40px 20px !important;
          }
          
          .hero-title {
            font-size: 3rem !important;
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.5rem !important;
          }
          
          .hero-stats {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
