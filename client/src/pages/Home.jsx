import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* HERO SECTION - COMPACT & PROFESSIONAL */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '80vh', // Reduced height
        display: 'flex',
        alignItems: 'center',
        paddingTop: '60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          animation: 'float 10s ease-in-out infinite'
        }}></div>

        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={6} className="mb-4 mb-lg-0">
              <div style={{ maxWidth: '100%', paddingLeft: '1rem', paddingRight: '2rem' }}>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '25px',
                  padding: '6px 20px',
                  marginBottom: '20px'
                }}>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase'
                  }}>
                    Leading Rental Platform
                  </span>
                </div>
                
                <h1 style={{
                  fontSize: '3.5rem', // Reduced size
                  fontWeight: 900,
                  lineHeight: '1.1',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                  color: 'white',
                  maxWidth: '90%'
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
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: '1.6',
                  marginBottom: '25px',
                  maxWidth: '85%'
                }}>
                  From properties to vehicles, venues to parking spaces - SpaceLink connects you with 
                  <strong style={{ color: 'white' }}> exceptional rentals worldwide</strong>.
                </p>
                
                <div style={{ marginBottom: '35px' }}>
                  <Link 
                    to="/find-property" 
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#667eea',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>🔍</span>
                    Explore Rentals
                  </Link>
                </div>
                
                {/* CENTERED STATS */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '50px',
                  paddingTop: '25px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center',
                  maxWidth: '450px',
                  margin: '0 auto'
                }}>
                  {[
                    { number: '10K+', label: 'Items Listed' },
                    { number: '500+', label: 'Cities' },
                    { number: '99%', label: 'Satisfaction' }
                  ].map((stat, index) => (
                    <div key={index}>
                      <div style={{
                        fontSize: '1.8rem',
                        fontWeight: 900,
                        color: 'white',
                        marginBottom: '6px',
                        lineHeight: '1'
                      }}>{stat.number}</div>
                      <div style={{
                        fontSize: '0.75rem',
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
            
            <Col lg={6} md={6}>
              <div style={{
                position: 'relative',
                maxWidth: '100%',
                margin: '0 auto',
                paddingLeft: '1rem'
              }}>
                <div style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Professional rental platform workspace" 
                    style={{
                      width: '100%',
                      height: '380px', // Reduced height
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
                
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  animation: 'float 6s ease-in-out infinite'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '8px',
                      padding: '6px'
                    }}>
                      <span style={{ fontSize: '12px', color: 'white' }}>🏆</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.8rem' }}>Premium Quality</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Verified & Trusted</div>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  animation: 'float 6s ease-in-out infinite 3s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '8px',
                      padding: '6px'
                    }}>
                      <span style={{ fontSize: '12px', color: 'white' }}>⚡</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.8rem' }}>Instant Booking</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Book in Seconds</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CATEGORIES SECTION - IMPROVED DESIGN WITH BACKGROUND ELEMENTS */}
      <section style={{
        padding: '50px 0', // Reduced padding
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative'
      }}>
        {/* Background decorative elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(116, 75, 162, 0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '5%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>

        <Container>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '6px 16px',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}>
              RENTAL CATEGORIES
            </div>
            <h2 style={{
              fontSize: '2.5rem', // Reduced size
              fontWeight: 900,
              color: '#1e293b',
              marginBottom: '14px',
              lineHeight: '1.2'
            }}>What Would You Like to Rent?</h2>
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              maxWidth: '450px',
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
                desc: 'Houses, apartments, commercial spaces and office buildings', 
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                bgColor: 'rgba(102, 126, 234, 0.1)'
              },
              { 
                icon: '🎪', 
                title: 'Event Venues', 
                desc: 'Wedding halls, conference rooms, studios and event spaces', 
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                bgColor: 'rgba(240, 147, 251, 0.1)'
              },
              { 
                icon: '🌱', 
                title: 'Turf', 
                desc: 'Sports turfs, football fields, cricket grounds and recreational areas', 
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                bgColor: 'rgba(79, 172, 254, 0.1)'
              },
              { 
                icon: '🚗', 
                title: 'Parking', 
                desc: 'Parking spots, garages, and secure parking spaces for convenience', 
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                bgColor: 'rgba(67, 233, 123, 0.1)'
              }
            ].map((category, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <div style={{
                  background: 'white',
                  borderRadius: '16px', // Less rounded for modern look
                  padding: '28px 20px', // Reduced padding
                  textAlign: 'center',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  minHeight: '280px', // Reduced height
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
                }}>
                  {/* Background color block */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '80px',
                    height: '80px',
                    background: category.bgColor,
                    borderRadius: '50%',
                    filter: 'blur(20px)'
                  }}></div>
                  
                  {/* Gradient Top Border */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: category.gradient
                  }}></div>
                  
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ 
                      fontSize: '3rem', // Slightly smaller icon
                      marginBottom: '16px',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                    }}>{category.icon}</div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      color: '#1e293b',
                      marginBottom: '10px'
                    }}>{category.title}</h3>
                    <p style={{
                      color: '#64748b',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      marginBottom: '0'
                    }}>{category.desc}</p>
                  </div>
                  
                  <div style={{
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <Link 
                      to="/find-property"
                      style={{
                        background: category.gradient,
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.3s ease',
                        minWidth: '130px',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                      }}
                    >
                      Explore
                      <span style={{ fontSize: '0.9rem' }}>→</span>
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* HOW IT WORKS - COMPACT */}
      <section style={{
        padding: '50px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '14px'
            }}>How It Works</h2>
            <p style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '450px',
              margin: '0 auto'
            }}>
              Simple steps to find and rent anything you need
            </p>
          </div>
          
          <Row>
            {[
              { 
                step: '01',
                title: 'Search & Discover', 
                desc: 'Browse thousands of verified listings with advanced filters', 
                icon: '🔍'
              },
              { 
                step: '02',
                title: 'Compare & Choose', 
                desc: 'Compare prices, features, and reviews to find perfect match', 
                icon: '⚖️'
              },
              { 
                step: '03',
                title: 'Book & Enjoy', 
                desc: 'Secure booking with instant confirmation and 24/7 support', 
                icon: '✨'
              }
            ].map((item, index) => (
              <Col lg={4} key={index} className="mb-4">
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  padding: '30px 24px',
                  textAlign: 'center',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  minHeight: '260px', // Reduced height
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 18px 45px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
                }}>
                  
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                  }}>{item.step}</div>
                  
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                    fontSize: '2.2rem',
                    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
                  }}>{item.icon}</div>
                  
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: '#1e293b',
                    marginBottom: '12px'
                  }}>{item.title}</h3>
                  
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FEATURED PROPERTIES - PERFECT BALANCED LAYOUT */}
      <section style={{
        padding: '50px 0',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '6px 16px',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}>
              FEATURED LISTINGS
            </div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              color: '#1e293b',
              marginBottom: '14px'
            }}>Featured Properties</h2>
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              maxWidth: '450px',
              margin: '0 auto'
            }}>
              Handpicked premium properties from our expert team
            </p>
          </div>
          
          {/* THREE PROPERTY CARDS FOR BETTER BALANCE */}
          <Row className="justify-content-center">
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
              },
              {
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Luxury Apartment',
                location: 'Chennai, Tamil Nadu',
                price: '₹2,500/month',
                features: ['3 BHK', '1,800 sq ft'],
                type: 'For Rent',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              }
            ].map((property, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.3s ease',
                  minHeight: '420px', // Consistent height
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
                }}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden', flexShrink: 0 }}>
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
                      top: '12px',
                      left: '12px',
                      background: property.gradient,
                      color: 'white',
                      padding: '5px 12px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                      {property.type}
                    </div>
                  </div>
                  
                  <div style={{ 
                    padding: '20px',
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: '#64748b',
                        fontSize: '0.8rem',
                        marginBottom: '8px'
                      }}>
                        <span>📍</span>
                        {property.location}
                      </div>
                      
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: '#1e293b',
                        marginBottom: '8px'
                      }}>{property.title}</h3>
                      
                      <p style={{
                        color: '#64748b',
                        fontSize: '0.85rem',
                        lineHeight: '1.4',
                        marginBottom: '12px'
                      }}>Spacious luxury {property.title.toLowerCase()} with premium amenities</p>
                      
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '16px',
                        fontSize: '0.75rem',
                        color: '#64748b'
                      }}>
                        {property.features.map((feature, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <span>{idx === 0 ? '🛏️' : '📐'}</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '12px',
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      <div style={{
                        fontSize: '1.3rem',
                        fontWeight: 900,
                        color: '#10b981'
                      }}>{property.price}</div>
                      
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{
                          background: 'transparent',
                          border: '1.5px solid #e5e7eb',
                          color: '#64748b',
                          padding: '7px 12px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.color = '#667eea';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.color = '#64748b';
                        }}>View Details</button>
                        
                        <button style={{
                          background: property.gradient,
                          border: 'none',
                          color: 'white',
                          padding: '7px 12px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
                          transition: 'all 0.3s ease',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 5px 12px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.15)';
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

      {/* CTA SECTION - COMPACT */}
      <section style={{
        padding: '50px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textAlign: 'center'
      }}>
        <Container>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '16px'
            }}>Ready to Start Renting?</h2>
            
            <p style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '25px',
              lineHeight: '1.6'
            }}>Join thousands making seamless transactions worldwide</p>
            
            <Link 
              to="/find-property" 
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#667eea',
                padding: '14px 35px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              Start Your Search
            </Link>
          </div>
        </Container>
      </section>

      {/* CSS ANIMATIONS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          
          h2 {
            font-size: 2rem !important;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 2rem !important;
          }
          
          h2 {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
