import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* STUNNING HERO SECTION - CONSISTENT GRADIENT THEME */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '80vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Beautiful Floating Elements */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>

        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'float 6s ease-in-out infinite reverse'
        }}></div>

        {/* LEFT CONTENT */}
        <div style={{
          paddingLeft: '8vw',
          paddingRight: '2rem',
          color: 'white'
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            padding: '8px 20px',
            marginBottom: '24px'
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              Leading Rental Platform
            </span>
          </div>
          
          <h1 style={{
            fontSize: '3.8rem',
            fontWeight: 900,
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
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
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: '1.6',
            marginBottom: '32px',
            maxWidth: '450px'
          }}>
            From properties to equipment, venues to vehicles - SpaceLink connects you with 
            <strong style={{ color: 'rgba(255, 255, 255, 0.95)' }}> exceptional rentals worldwide</strong>. 
            Professional service, trusted transactions.
          </p>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            marginBottom: '40px'
          }}>
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
                gap: '10px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🔍</span>
              Explore Rentals
            </Link>
          </div>
          
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
                  marginBottom: '6px'
                }}>{stat.number}</div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* RIGHT IMAGE */}
        <div style={{
          position: 'relative',
          height: '80vh',
          width: '100%'
        }}>
          <div style={{
            position: 'relative',
            height: '100%',
            width: '100%',
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
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
          
          {/* Floating Cards */}
          <div style={{
            position: 'absolute',
            top: '100px',
            right: '60px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '20px 24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            animation: 'float 6s ease-in-out infinite'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                padding: '12px'
              }}>
                <span style={{ fontSize: '20px', color: 'white' }}>🏆</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>Premium Quality</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Verified & Trusted</div>
              </div>
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '100px',
            left: '60px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '20px 24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            animation: 'float 6s ease-in-out infinite 3s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '12px',
                padding: '12px'
              }}>
                <span style={{ fontSize: '20px', color: 'white' }}>⚡</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>Instant Booking</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Book in Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUNNING CATEGORIES SECTION - IMPROVED CARDS */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '25px',
              padding: '8px 20px',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '1px',
              marginBottom: '24px',
              textTransform: 'uppercase'
            }}>
              RENTAL CATEGORIES
            </div>
            <h2 style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #1e293b 0%, #64748b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px'
            }}>What Would You Like to Rent?</h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
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
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                shadow: 'rgba(102, 126, 234, 0.3)'
              },
              { 
                icon: '🎪', 
                title: 'Event Venues', 
                desc: 'Wedding halls, conference rooms, studios', 
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                shadow: 'rgba(240, 147, 251, 0.3)'
              },
              { 
                icon: '🚗', 
                title: 'Vehicles', 
                desc: 'Cars, bikes, trucks, luxury vehicles', 
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                shadow: 'rgba(79, 172, 254, 0.3)'
              },
              { 
                icon: '🅿️', 
                title: 'Parking & Turfs', 
                desc: 'Parking spots, sports turfs, playgrounds', 
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                shadow: 'rgba(67, 233, 123, 0.3)'
              }
            ].map((category, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <div style={{
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '20px',
                  padding: '48px 32px',
                  textAlign: 'center',
                  boxShadow: `0 10px 40px ${category.shadow}`,
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 25px 60px ${category.shadow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = `0 10px 40px ${category.shadow}`;
                }}>
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: category.gradient
                  }}></div>
                  
                  <div style={{
                    fontSize: '4rem',
                    marginBottom: '24px',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}>{category.icon}</div>
                  
                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#1e293b',
                    marginBottom: '16px'
                  }}>{category.title}</h3>
                  
                  <p style={{
                    color: '#64748b',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    marginBottom: '28px'
                  }}>{category.desc}</p>
                  
                  <div style={{
                    background: category.gradient,
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: `0 6px 20px ${category.shadow}`,
                    transition: 'all 0.3s ease'
                  }}>
                    Explore
                    <span style={{ fontSize: '1.1rem' }}>→</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ENHANCED HOW IT WORKS SECTION */}
      <section style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorations */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>

        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '20px'
            }}>How It Works</h2>
            <p style={{
              fontSize: '1.3rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
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
                desc: 'Browse through thousands of verified listings in your area with advanced filters and smart recommendations', 
                icon: '🔍',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              },
              { 
                step: '02', 
                title: 'Compare & Choose', 
                desc: 'Compare prices, features, and reviews to find the perfect match with our intelligent comparison tools', 
                icon: '⚖️',
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
              },
              { 
                step: '03', 
                title: 'Book & Enjoy', 
                desc: 'Secure booking with instant confirmation, flexible payment options and 24/7 customer support', 
                icon: '✨',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              }
            ].map((item, index) => (
              <Col lg={4} key={index} className="mb-5">
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '48px 32px',
                  textAlign: 'center',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.4s ease',
                  height: '100%',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                }}>
                  {/* Step number */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '32px',
                    background: item.gradient,
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 900,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}>{item.step}</div>
                  
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: item.gradient,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 32px auto',
                    fontSize: '3rem',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)'
                  }}>{item.icon}</div>
                  
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#1e293b',
                    marginBottom: '20px'
                  }}>{item.title}</h3>
                  
                  <p style={{
                    color: '#64748b',
                    fontSize: '1.1rem',
                    lineHeight: '1.7',
                    marginBottom: '24px'
                  }}>{item.desc}</p>
                  
                  <div style={{
                    width: '60px',
                    height: '4px',
                    background: item.gradient,
                    borderRadius: '2px',
                    margin: '0 auto'
                  }}></div>
                </div>
              </Col>
            ))}
          </Row>
          
          {/* Connection lines */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '15%',
            right: '15%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.3) 75%, transparent 100%)',
            zIndex: 1
          }}></div>
        </Container>
      </section>

      {/* FEATURED PROPERTIES */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
              fontSize: '3.2rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #1e293b 0%, #64748b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
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
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.4s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.08)';
                }}>
                  <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                    <img 
                      src={property.image}
                      alt={property.title}
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
                      background: property.gradient,
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                    }}>
                      {property.type}
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
                      {property.location}
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: '#1e293b',
                      marginBottom: '12px'
                    }}>{property.title}</h3>
                    
                    <p style={{
                      color: '#64748b',
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>Spacious luxury {property.title.toLowerCase()} with premium amenities and modern design</p>
                    
                    <div style={{
                      display: 'flex',
                      gap: '20px',
                      marginBottom: '24px',
                      fontSize: '0.9rem',
                      color: '#64748b'
                    }}>
                      {property.features.map((feature, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                        fontSize: '1.8rem',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>{property.price}</div>
                      
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{
                          background: 'transparent',
                          border: '2px solid #e5e7eb',
                          color: '#64748b',
                          padding: '10px 20px',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}>View Details</button>
                        
                        <button style={{
                          background: property.gradient,
                          border: 'none',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s ease'
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

      {/* STUNNING CTA SECTION */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }}></div>
        
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>Ready to Start Renting?</h2>
            
            <p style={{
              fontSize: '1.3rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>Join thousands of renters and owners making seamless transactions worldwide with our trusted platform</p>
            
            <Link 
              to="/find-property" 
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#667eea',
                padding: '20px 48px',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '1.2rem',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
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
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        @media (max-width: 768px) {
          section:first-child {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            padding: 40px 20px !important;
          }
          
          h1 {
            font-size: 2.8rem !important;
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 2.2rem !important;
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
