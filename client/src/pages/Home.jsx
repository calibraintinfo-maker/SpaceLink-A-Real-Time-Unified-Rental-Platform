import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* PROFESSIONAL HERO - PERFECT HEIGHT */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        minHeight: '85vh', // Reduced from 100vh
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Professional Background */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>

        {/* LEFT CONTENT - CONSISTENT THEME */}
        <div style={{
          paddingLeft: '8vw',
          paddingRight: '2rem',
          color: 'white'
        }}>
          {/* Professional Badge */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '50px',
            padding: '8px 20px',
            marginBottom: '24px'
          }}>
            <span style={{
              color: '#60a5fa',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              Leading Rental Platform
            </span>
          </div>
          
          {/* Professional Typography */}
          <h1 style={{
            fontSize: '3.5rem', // Reduced from 5rem
            fontWeight: 800,
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}>
            Rent Anything,
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Anywhere
            </span>
          </h1>
          
          <p style={{
            fontSize: '1.1rem', // Reduced size
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: '1.6',
            marginBottom: '32px', // Reduced margin
            maxWidth: '450px'
          }}>
            From properties to equipment, venues to vehicles - SpaceLink connects you with 
            <strong style={{ color: 'rgba(255, 255, 255, 0.95)' }}> exceptional rentals worldwide</strong>. 
            Professional service, trusted transactions.
          </p>
          
          {/* Professional CTA */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            marginBottom: '40px' // Reduced margin
          }}>
            <Link 
              to="/find-property" 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                color: 'white',
                padding: '14px 28px', // Reduced padding
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
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
              <span style={{ fontSize: '1.1rem' }}>🔍</span>
              Explore Rentals
            </Link>
            
            <Link 
              to="/about" 
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#60a5fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
              }}
            >
              How it works →
            </Link>
          </div>
          
          {/* Professional Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px', // Reduced gap
            paddingTop: '32px', // Reduced padding
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <div style={{
                fontSize: '2rem', // Reduced size
                fontWeight: 800,
                color: 'white',
                marginBottom: '6px'
              }}>10K+</div>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Items Listed</div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'white',
                marginBottom: '6px'
              }}>500+</div>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Cities</div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'white',
                marginBottom: '6px'
              }}>99%</div>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Satisfaction</div>
            </div>
          </div>
        </div>
        
        {/* RIGHT IMAGE - PERFECT SIZE */}
        <div style={{
          position: 'relative',
          height: '85vh', // Matches section height
          width: '100%'
        }}>
          <div style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            padding: '30px' // Reduced padding
          }}>
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Premium rental properties" 
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                objectFit: 'cover',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
          
          {/* Professional Floating Cards - CONSISTENT COLORS */}
          <div style={{
            position: 'absolute',
            top: '80px',
            right: '50px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)',
            animation: 'float 6s ease-in-out infinite'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                borderRadius: '10px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '16px', color: 'white' }}>🏆</span>
              </div>
              <div>
                <div style={{
                  fontWeight: 600,
                  color: '#1e293b',
                  fontSize: '0.9rem'
                }}>Premium Quality</div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#64748b'
                }}>Verified & Trusted</div>
              </div>
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '80px',
            left: '50px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)',
            animation: 'float 6s ease-in-out infinite 3s'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '10px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '16px', color: 'white' }}>⚡</span>
              </div>
              <div>
                <div style={{
                  fontWeight: 600,
                  color: '#1e293b',
                  fontSize: '0.9rem'
                }}>Instant Booking</div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#64748b'
                }}>Book in Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES - CONSISTENT DESIGN */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <Container>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
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
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}>
              FEATURED LISTINGS
            </div>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '16px'
            }}>Featured Properties</h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Handpicked premium properties from our expert team
            </p>
          </div>
          
          <Row>
            {/* Property Card 1 - CONSISTENT COLORS */}
            <Col lg={6} className="mb-4">
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f1f5f9',
                transition: 'all 0.3s ease',
                height: '100%'
              }}>
                <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
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
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    color: 'white',
                    padding: '6px 14px',
                    borderRadius: '16px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    For Rent
                  </div>
                </div>
                
                <div style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#64748b',
                    fontSize: '0.85rem',
                    marginBottom: '8px'
                  }}>
                    <span>📍</span>
                    Namakkal, Tamil Nadu
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '8px'
                  }}>Modern Villa</h3>
                  
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }}>Spacious luxury villa with premium amenities and modern design</p>
                  
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '20px',
                    fontSize: '0.85rem',
                    color: '#64748b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>🛏️</span>4 BHK
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>📐</span>2,500 sq ft
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: '#10b981'
                    }}>₹1,234/month</div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        background: 'transparent',
                        border: '1px solid #e5e7eb',
                        color: '#64748b',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}>View Details</button>
                      
                      <button style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Property Card 2 - CONSISTENT COLORS */}
            <Col lg={6} className="mb-4">
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f1f5f9',
                transition: 'all 0.3s ease',
                height: '100%'
              }}>
                <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
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
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    padding: '6px 14px',
                    borderRadius: '16px',
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
                    gap: '6px',
                    color: '#64748b',
                    fontSize: '0.85rem',
                    marginBottom: '8px'
                  }}>
                    <span>📍</span>
                    Namakkal, Tamil Nadu
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '8px'
                  }}>Premium Land</h3>
                  
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }}>Perfect agricultural land with excellent connectivity and growth potential</p>
                  
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '20px',
                    fontSize: '0.85rem',
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
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: '#10b981'
                    }}>₹1,22,345/year</div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        background: 'transparent',
                        border: '1px solid #e5e7eb',
                        color: '#64748b',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}>View Details</button>
                      
                      <button style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
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

      {/* CTA SECTION - CONSISTENT DESIGN */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        textAlign: 'center'
      }}>
        <Container>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              color: 'white',
              marginBottom: '16px'
            }}>Ready to Start Renting?</h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>Join thousands of renters and owners making seamless transactions worldwide</p>
            
            <Link 
              to="/find-property" 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '10px',
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
          </div>
        </Container>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @media (max-width: 768px) {
          section:first-child {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            padding: 40px 20px !important;
          }
          
          h1 {
            font-size: 2.5rem !important;
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 2rem !important;
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
