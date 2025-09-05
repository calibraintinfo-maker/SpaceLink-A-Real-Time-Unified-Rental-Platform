import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* PERFECT HERO SECTION - REDUCED LEFT SPACE */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '70px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 10s ease-in-out infinite'
        }}></div>

        <Container>
          <Row className="align-items-center" style={{ minHeight: '75vh' }}>
            <Col lg={6} className="mb-5 mb-lg-0">
              <div style={{ maxWidth: '550px', paddingLeft: '0' }}>
                {/* Professional Badge */}
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '30px',
                  padding: '8px 20px',
                  marginBottom: '24px'
                }}>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    Leading Rental Platform
                  </span>
                </div>
                
                {/* Perfect Typography */}
                <h1 style={{
                  fontSize: '3.8rem',
                  fontWeight: 900,
                  lineHeight: '1.1',
                  marginBottom: '24px',
                  letterSpacing: '-0.02em',
                  color: 'white'
                }}>
                  Rent Anything,
                  <br />
                  <span style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Anywhere
                  </span>
                </h1>
                
                <p style={{
                  fontSize: '1.2rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: '1.6',
                  marginBottom: '32px',
                  maxWidth: '480px'
                }}>
                  From properties to vehicles, venues to parking spaces - SpaceLink connects you with 
                  <strong style={{ color: 'white' }}> exceptional rentals worldwide</strong>. 
                  Professional service, trusted transactions.
                </p>
                
                {/* Perfect CTA Button */}
                <div style={{ marginBottom: '48px' }}>
                  <Link 
                    to="/find-property" 
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#667eea',
                      padding: '16px 32px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>🔍</span>
                    Explore Rentals
                  </Link>
                </div>
                
                {/* Perfect Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '32px',
                  paddingTop: '32px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  {[
                    { number: '10K+', label: 'Items Listed' },
                    { number: '500+', label: 'Cities' },
                    { number: '99%', label: 'Satisfaction' }
                  ].map((stat, index) => (
                    <div key={index}>
                      <div style={{
                        fontSize: '2.2rem',
                        fontWeight: 900,
                        color: 'white',
                        marginBottom: '8px',
                        lineHeight: '1'
                      }}>{stat.number}</div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            
            <Col lg={6}>
              <div style={{
                position: 'relative',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {/* GENERAL RENTAL PLATFORM IMAGE */}
                <div style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="General rental platform - cars, events, properties" 
                    style={{
                      width: '100%',
                      height: '500px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
                
                {/* Perfect Floating Cards */}
                <div style={{
                  position: 'absolute',
                  top: '30px',
                  right: '30px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                  animation: 'float 6s ease-in-out infinite'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '10px',
                      padding: '8px'
                    }}>
                      <span style={{ fontSize: '16px', color: 'white' }}>🏆</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>Premium Quality</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Verified & Trusted</div>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '30px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                  animation: 'float 6s ease-in-out infinite 3s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '10px',
                      padding: '8px'
                    }}>
                      <span style={{ fontSize: '16px', color: 'white' }}>⚡</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>Instant Booking</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Book in Seconds</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ENHANCED CATEGORIES SECTION */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '6px 16px',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}>
              RENTAL CATEGORIES
            </div>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 900,
              color: '#1e293b',
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>What Would You Like to Rent?</h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              From real estate to parking spaces, venues to vehicles - find everything you need
            </p>
          </div>
          
          <Row>
            {[
              { 
                icon: '🏠', 
                title: 'Properties', 
                desc: 'Houses, apartments, commercial spaces', 
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              { 
                icon: '🎪', 
                title: 'Event Venues', 
                desc: 'Wedding halls, conference rooms, studios', 
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              },
              { 
                icon: '🚗', 
                title: 'Vehicles', 
                desc: 'Cars, bikes, trucks, luxury vehicles', 
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              },
              { 
                icon: '🅿️', 
                title: 'Parking & Turfs', 
                desc: 'Parking spots, sports turfs, playgrounds', 
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
              }
            ].map((category, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '40px 28px',
                  textAlign: 'center',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  height: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
                }}>
                  {/* Top border accent */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: category.gradient
                  }}></div>
                  
                  <div>
                    <div style={{ 
                      fontSize: '4rem', 
                      marginBottom: '24px',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                    }}>{category.icon}</div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: '#1e293b',
                      marginBottom: '16px'
                    }}>{category.title}</h3>
                    <p style={{
                      color: '#64748b',
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      marginBottom: '0'
                    }}>{category.desc}</p>
                  </div>
                  
                  {/* EXPLORE BUTTON LINKS TO FIND-PROPERTY */}
                  <Link 
                    to="/find-property"
                    style={{
                      background: category.gradient,
                      color: 'white',
                      padding: '12px 28px',
                      borderRadius: '25px',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.3s ease',
                      alignSelf: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                    }}
                  >
                    Explore
                    <span style={{ fontSize: '1.1rem' }}>→</span>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>

        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '16px'
            }}>How It Works</h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Simple steps to find and rent anything you need, anywhere in the world
            </p>
          </div>
          
          <Row>
            {[
              { 
                step: '01', 
                title: 'Search & Discover', 
                desc: 'Browse through thousands of verified listings in your area with advanced filters', 
                icon: '🔍'
              },
              { 
                step: '02', 
                title: 'Compare & Choose', 
                desc: 'Compare prices, features, and reviews to find the perfect match for your needs', 
                icon: '⚖️'
              },
              { 
                step: '03', 
                title: 'Book & Enjoy', 
                desc: 'Secure booking with instant confirmation and 24/7 customer support', 
                icon: '✨'
              }
            ].map((item, index) => (
              <Col lg={4} key={index} className="mb-4">
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '40px 28px',
                  textAlign: 'center',
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 24px 64px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.15)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '28px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 900
                  }}>{item.step}</div>
                  
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px auto',
                    fontSize: '2.5rem'
                  }}>{item.icon}</div>
                  
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#1e293b',
                    marginBottom: '16px'
                  }}>{item.title}</h3>
                  
                  <p style={{
                    color: '#64748b',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FEATURED PROPERTIES */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '6px 16px',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}>
              FEATURED LISTINGS
            </div>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 900,
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
            {[
              {
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Modern Villa',
                location: 'Namakkal, Tamil Nadu',
                price: '₹1,234/month',
                features: ['4 BHK', '2,500 sq ft'],
                type: 'For Rent',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              {
                image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Premium Land',
                location: 'Namakkal, Tamil Nadu',
                price: '₹1,22,345/year',
                features: ['Agricultural', '10,000 sq ft'],
                type: 'For Sale',
                gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              }
            ].map((property, index) => (
              <Col lg={6} className="mb-4" key={index}>
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.3s ease',
                  height: '420px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.06)';
                }}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={property.image}
                      alt={property.title}
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
                      background: property.gradient,
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>
                      {property.type}
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
                      {property.location}
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: '#1e293b',
                      marginBottom: '8px'
                    }}>{property.title}</h3>
                    
                    <p style={{
                      color: '#64748b',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      marginBottom: '16px'
                    }}>Spacious luxury {property.title.toLowerCase()} with premium amenities</p>
                    
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      marginBottom: '20px',
                      fontSize: '0.85rem',
                      color: '#64748b'
                    }}>
                      {property.features.map((feature, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>{idx === 0 ? '🛏️' : '📐'}</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        fontSize: '1.6rem',
                        fontWeight: 900,
                        color: '#10b981'
                      }}>{property.price}</div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{
                          background: 'transparent',
                          border: '1px solid #e5e7eb',
                          color: '#64748b',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}>View Details</button>
                        
                        <button style={{
                          background: property.gradient,
                          border: 'none',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}>Book Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* PERFECT CTA SECTION WITH SPACING */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textAlign: 'center'
      }}>
        <Container>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '20px'
            }}>Ready to Start Renting?</h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>Join thousands of renters and owners making seamless transactions worldwide</p>
            
            <Link 
              to="/find-property" 
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#667eea',
                padding: '16px 40px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '1.1rem',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
              }}
            >
              Start Your Search
            </Link>
          </div>
        </Container>
      </section>

      {/* PERFECT FOOTER - PROPER SIZE & SPACING */}
      <footer style={{
        background: '#1e293b',
        color: 'white',
        padding: '60px 0 40px 0'
      }}>
        <Container>
          <Row>
            <Col lg={4} className="mb-4">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '10px',
                  padding: '6px'
                }}>
                  <span style={{ fontSize: '1.3rem' }}>🏠</span>
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>SpaceLink</span>
              </div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                maxWidth: '280px'
              }}>
                Your trusted global rental platform. Helping clients find exceptional rentals and empowering seamless transactions.
              </p>
            </Col>
            
            <Col lg={2} md={6} className="mb-4">
              <h5 style={{
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '20px',
                color: 'white'
              }}>Quick Links</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Find Property', 'List Property', 'My Bookings', 'Profile'].map((item, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <Link 
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#667eea'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            
            <Col lg={2} md={6} className="mb-4">
              <h5 style={{
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '20px',
                color: 'white'
              }}>Categories</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Residential', 'Commercial', 'Event Venues', 'Parking & Turfs'].map((item, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <Link 
                      to="/find-property"
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#667eea'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            
            <Col lg={2} md={6} className="mb-4">
              <h5 style={{
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '20px',
                color: 'white'
              }}>Support</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Help Center', 'Contact Us', 'About Us', 'Blog'].map((item, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <Link 
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#667eea'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            
            <Col lg={2} md={6} className="mb-4">
              <h5 style={{
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '20px',
                color: 'white'
              }}>Legal</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((item, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <Link 
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#667eea'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          
          <hr style={{
            border: 'none',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            margin: '40px 0 20px 0'
          }} />
          
          <div style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.9rem'
          }}>
            Made with ❤️ by SpaceLink Team
          </div>
        </Container>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @media (max-width: 768px) {
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          
          h1 {
            font-size: 2.8rem !important;
          }
          
          h2 {
            font-size: 2.2rem !important;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 2.2rem !important;
          }
          
          h2 {
            font-size: 1.8rem !important;
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
