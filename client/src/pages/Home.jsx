import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* PROFESSIONAL HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        minHeight: '75vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Background Elements */}
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

        {/* LEFT CONTENT */}
        <div style={{
          paddingLeft: '8vw',
          paddingRight: '2rem',
          color: 'white'
        }}>
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
          
          <h1 style={{
            fontSize: '3.5rem',
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
            fontSize: '1.1rem',
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
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                color: 'white',
                padding: '14px 28px',
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
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {[
              { number: '10K+', label: 'Items Listed' },
              { number: '500+', label: 'Cities' },
              { number: '99%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div key={index}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'white',
                  marginBottom: '6px'
                }}>{stat.number}</div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.7)',
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
          height: '75vh',
          width: '100%'
        }}>
          <div style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            padding: '30px'
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
          
          {/* Floating Cards */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                borderRadius: '10px',
                padding: '10px'
              }}>
                <span style={{ fontSize: '16px', color: 'white' }}>🏆</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>Premium Quality</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Verified & Trusted</div>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '10px',
                padding: '10px'
              }}>
                <span style={{ fontSize: '16px', color: 'white' }}>⚡</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>Instant Booking</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Book in Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION - CONSISTENT BACKGROUND */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '16px'
            }}>What Would You Like to Rent?</h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              From real estate to equipment, venues to vehicles - find everything you need
            </p>
          </div>
          
          <Row>
            {[
              { icon: '🏠', title: 'Properties', desc: 'Houses, apartments, commercial spaces', color: '#3b82f6' },
              { icon: '🎪', title: 'Event Venues', desc: 'Wedding halls, conference rooms, studios', color: '#6366f1' },
              { icon: '🚗', title: 'Vehicles', desc: 'Cars, bikes, trucks, luxury vehicles', color: '#10b981' },
              { icon: '⚙️', title: 'Equipment', desc: 'Tools, machinery, electronics, furniture', color: '#f59e0b' }
            ].map((category, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '40px 24px',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{category.icon}</div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '12px'
                  }}>{category.title}</h3>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    marginBottom: '24px'
                  }}>{category.desc}</p>
                  <div style={{
                    background: category.color,
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    display: 'inline-block'
                  }}>
                    Explore →
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section style={{
        padding: '80px 0',
        background: '#ffffff'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '16px'
            }}>How It Works</h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Simple steps to find and rent anything you need
            </p>
          </div>
          
          <Row>
            {[
              { step: '01', title: 'Search & Discover', desc: 'Browse through thousands of verified listings in your area', icon: '🔍' },
              { step: '02', title: 'Compare & Choose', desc: 'Compare prices, features, and reviews to find the perfect match', icon: '⚖️' },
              { step: '03', title: 'Book & Enjoy', desc: 'Secure booking with instant confirmation and 24/7 support', icon: '✨' }
            ].map((item, index) => (
              <Col lg={4} key={index} className="mb-4">
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px auto',
                    fontSize: '2rem'
                  }}>{item.icon}</div>
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '12px'
                  }}>STEP {item.step}</div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '12px'
                  }}>{item.title}</h3>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.95rem',
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
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
            {[
              {
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Modern Villa',
                location: 'Namakkal, Tamil Nadu',
                price: '₹1,234/month',
                features: ['4 BHK', '2,500 sq ft'],
                type: 'For Rent'
              },
              {
                image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Premium Land',
                location: 'Namakkal, Tamil Nadu',
                price: '₹1,22,345/year',
                features: ['Agricultural', '10,000 sq ft'],
                type: 'For Sale'
              }
            ].map((property, index) => (
              <Col lg={6} className="mb-4" key={index}>
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
                      background: index === 0 
                        ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
                        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      padding: '6px 14px',
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      fontWeight: 600
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
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '8px'
                    }}>{property.title}</h3>
                    
                    <p style={{
                      color: '#64748b',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      marginBottom: '16px'
                    }}>Spacious luxury {property.title.toLowerCase()} with premium amenities and modern design</p>
                    
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
                        fontWeight: 700,
                        color: '#10b981'
                      }}>{property.price}</div>
                      
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
                          background: index === 0 
                            ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
                            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
            ))}
          </Row>
        </Container>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section style={{
        padding: '80px 0',
        background: '#ffffff'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '16px'
            }}>What Our Customers Say</h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Real reviews from satisfied customers worldwide
            </p>
          </div>
          
          <Row>
            {[
              { name: 'Sarah Johnson', role: 'Property Manager', review: 'SpaceLink made finding the perfect venue for our corporate event effortless. The platform is intuitive and the support team is exceptional.', rating: 5 },
              { name: 'Michael Chen', role: 'Event Coordinator', review: 'I\'ve used many rental platforms, but SpaceLink stands out for its quality listings and seamless booking process. Highly recommended!', rating: 5 },
              { name: 'Emily Davis', role: 'Business Owner', review: 'The variety of equipment available on SpaceLink saved our project. Fast delivery, great condition, and competitive pricing.', rating: 5 }
            ].map((testimonial, index) => (
              <Col lg={4} key={index} className="mb-4">
                <div style={{
                  background: 'white',
                  padding: '32px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f1f5f9',
                  height: '100%'
                }}>
                  <div style={{ marginBottom: '20px' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} style={{ color: '#f59e0b', fontSize: '1.2rem' }}>⭐</span>
                    ))}
                  </div>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    marginBottom: '24px',
                    fontStyle: 'italic'
                  }}>"{testimonial.review}"</p>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>{testimonial.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{testimonial.role}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA SECTION */}
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
