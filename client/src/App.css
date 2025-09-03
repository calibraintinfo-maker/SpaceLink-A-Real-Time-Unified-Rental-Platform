import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    fetchFeaturedProperties();
    
    // Scroll parallax effect
    const handleScroll = () => setScrollY(window.scrollY);
    
    // Mouse tracking for interactive elements
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await api.properties.getFeatured();
      setFeaturedProperties(response.data);
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="spacelink-home">
      {/* Ultra Premium Hero Section */}
      <section className="hero-ultra-premium" ref={heroRef}>
        {/* Dynamic Background System */}
        <div className="hero-background-system">
          {/* Animated Gradient Mesh */}
          <div className="gradient-mesh-container">
            <div className="gradient-orb orb-1" 
                 style={{transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.01}px)`}}></div>
            <div className="gradient-orb orb-2" 
                 style={{transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * 0.025}px)`}}></div>
            <div className="gradient-orb orb-3" 
                 style={{transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.02}px)`}}></div>
          </div>
          
          {/* Particle System */}
          <div className="particle-system">
            {[...Array(50)].map((_, i) => (
              <div key={i} className={`particle particle-${i % 5}`} 
                   style={{
                     animationDelay: `${i * 0.1}s`,
                     left: `${Math.random() * 100}%`,
                     animationDuration: `${3 + Math.random() * 4}s`
                   }}></div>
            ))}
          </div>
          
          {/* Grid Pattern Overlay */}
          <div className="grid-overlay"></div>
          
          {/* Noise Texture */}
          <div className="noise-texture"></div>
        </div>

        <Container className="hero-container-ultra">
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col lg={10} className="text-center">
              <div className="hero-content-ultra">
                {/* Premium Badge */}
                <div className="premium-badge" data-aos="fade-down" data-aos-delay="200">
                  <div className="badge-glow"></div>
                  <span className="badge-icon">✨</span>
                  <span className="badge-text">Premium Property Platform</span>
                  <div className="badge-pulse"></div>
                </div>

                {/* Ultra Premium Typography */}
                <h1 className="hero-title-ultra" data-aos="fade-up" data-aos-delay="400">
                  <span className="title-word title-word-1">Discover</span>
                  <span className="title-word title-word-2">Your</span>
                  <br />
                  <span className="title-word title-word-3 gradient-text-animated">Perfect</span>
                  <span className="title-word title-word-4 gradient-text-animated">Space</span>
                  <br />
                  <span className="title-word title-word-5">With</span>
                  <span className="title-word title-word-6 brand-text">SpaceLink</span>
                </h1>

                {/* Premium Description */}
                <p className="hero-description-ultra" data-aos="fade-up" data-aos-delay="600">
                  Experience the future of property discovery with our intelligent matching system,
                  <br className="d-none d-lg-block" />
                  premium listings, and seamless experiences that redefine luxury living.
                </p>

                {/* Ultra Premium CTAs */}
                <div className="hero-cta-ultra" data-aos="fade-up" data-aos-delay="800">
                  <Button 
                    as={Link} 
                    to="/find-property" 
                    className="btn-ultra-primary"
                  >
                    <span className="btn-bg-gradient"></span>
                    <span className="btn-content">
                      <span className="btn-text">Explore Properties</span>
                      <span className="btn-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                        </svg>
                      </span>
                    </span>
                    <span className="btn-shine"></span>
                  </Button>
                  
                  <Button 
                    as={Link} 
                    to="/add-property" 
                    className="btn-ultra-secondary"
                  >
                    <span className="btn-border-gradient"></span>
                    <span className="btn-content">
                      <span className="btn-text">List Property</span>
                    </span>
                  </Button>
                </div>

                {/* Trust Metrics with Animation */}
                <div className="trust-metrics-ultra" data-aos="fade-up" data-aos-delay="1000">
                  <div className="trust-item-ultra">
                    <div className="trust-number-animated" data-target="10000">0</div>
                    <div className="trust-label">Properties</div>
                  </div>
                  <div className="trust-divider"></div>
                  <div className="trust-item-ultra">
                    <div className="trust-number-animated" data-target="50000">0</div>
                    <div className="trust-label">Happy Clients</div>
                  </div>
                  <div className="trust-divider"></div>
                  <div className="trust-item-ultra">
                    <div className="trust-number-animated" data-target="99.8">0</div>
                    <div className="trust-label">Success Rate</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Scroll Indicator Ultra */}
        <div className="scroll-indicator-ultra" data-aos="fade-up" data-aos-delay="1200">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <div className="scroll-text">Scroll to explore premium properties</div>
        </div>
      </section>

      {/* Ultra Premium Features Bento Grid */}
      <section className="features-bento-ultra" data-aos="fade-up">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="bento-grid-ultra">
                {/* Large Feature Card */}
                <div className="bento-card bento-large" data-aos="zoom-in" data-aos-delay="200">
                  <div className="bento-bg-gradient bg-gradient-1"></div>
                  <div className="bento-content">
                    <div className="bento-icon">
                      <div className="icon-3d">🎯</div>
                    </div>
                    <h3 className="bento-title">AI-Powered Smart Matching</h3>
                    <p className="bento-description">
                      Our advanced machine learning algorithms analyze your preferences, 
                      behavior, and requirements to recommend properties that perfectly 
                      match your lifestyle and budget.
                    </p>
                    <div className="bento-metrics">
                      <div className="metric">
                        <span className="metric-value">98%</span>
                        <span className="metric-label">Match Accuracy</span>
                      </div>
                      <div className="metric">
                        <span className="metric-value">2.3x</span>
                        <span className="metric-label">Faster Search</span>
                      </div>
                    </div>
                  </div>
                  <div className="bento-glow"></div>
                </div>

                {/* Medium Feature Cards */}
                <div className="bento-card bento-medium" data-aos="zoom-in" data-aos-delay="400">
                  <div className="bento-bg-gradient bg-gradient-2"></div>
                  <div className="bento-content">
                    <div className="bento-icon">
                      <div className="icon-3d">⚡</div>
                    </div>
                    <h3 className="bento-title">Lightning Fast Search</h3>
                    <p className="bento-description">
                      Real-time filtering with instant results across our entire database.
                    </p>
                  </div>
                </div>

                <div className="bento-card bento-medium" data-aos="zoom-in" data-aos-delay="600">
                  <div className="bento-bg-gradient bg-gradient-3"></div>
                  <div className="bento-content">
                    <div className="bento-icon">
                      <div className="icon-3d">🛡️</div>
                    </div>
                    <h3 className="bento-title">Bank-Level Security</h3>
                    <p className="bento-description">
                      Military-grade encryption protects all your data and transactions.
                    </p>
                  </div>
                </div>

                {/* Small Feature Cards */}
                <div className="bento-card bento-small" data-aos="zoom-in" data-aos-delay="800">
                  <div className="bento-bg-gradient bg-gradient-4"></div>
                  <div className="bento-content">
                    <div className="bento-icon">
                      <div className="icon-3d">📊</div>
                    </div>
                    <h3 className="bento-title">Analytics</h3>
                  </div>
                </div>

                <div className="bento-card bento-small" data-aos="zoom-in" data-aos-delay="1000">
                  <div className="bento-bg-gradient bg-gradient-5"></div>
                  <div className="bento-content">
                    <div className="bento-icon">
                      <div className="icon-3d">🌟</div>
                    </div>
                    <h3 className="bento-title">Premium</h3>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Ultra Premium Categories */}
      <section className="categories-ultra" data-aos="fade-up">
        <Container>
          <div className="section-header-ultra text-center mb-5">
            <div className="section-badge-ultra" data-aos="fade-down">Property Categories</div>
            <h2 className="section-title-ultra" data-aos="fade-up" data-aos-delay="200">
              Find Your <span className="gradient-text-animated">Perfect Space</span>
            </h2>
            <p className="section-description-ultra" data-aos="fade-up" data-aos-delay="400">
              Explore our curated collection of premium properties across all categories
            </p>
          </div>

          <Row className="g-4">
            {[
              { 
                category: 'Property Rentals', 
                icon: '🏠', 
                title: 'Residential', 
                desc: 'Luxury apartments, modern flats, family homes',
                count: '2.5K+',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                delay: 200
              },
              { 
                category: 'Commercial', 
                icon: '🏢', 
                title: 'Commercial', 
                desc: 'Premium offices, retail spaces, warehouses',
                count: '1.8K+',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                delay: 300
              },
              { 
                category: 'Land', 
                icon: '🌾', 
                title: 'Land & Plots', 
                desc: 'Agricultural land, commercial plots',
                count: '950+',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                delay: 400
              },
              { 
                category: 'Parking', 
                icon: '🚗', 
                title: 'Parking', 
                desc: 'Secure parking spaces and garages',
                count: '3.2K+',
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                delay: 500
              },
              { 
                category: 'Event', 
                icon: '🎉', 
                title: 'Events', 
                desc: 'Banquet halls, gardens, venues',
                count: '420+',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                delay: 600
              },
              { 
                category: 'manage-properties', 
                icon: '⚙️', 
                title: 'Management', 
                desc: 'Property management tools',
                count: 'Tools',
                gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                delay: 700,
                isManage: true
              }
            ].map((item, index) => (
              <Col lg={4} md={6} key={index}>
                <Card 
                  className="category-card-ultra h-100"
                  as={Link}
                  to={item.isManage ? '/manage-properties' : `/find-property?category=${item.category}`}
                  style={{ '--category-gradient': item.gradient }}
                  data-aos="zoom-in" 
                  data-aos-delay={item.delay}
                >
                  <div className="category-bg-ultra"></div>
                  <div className="category-gradient-line"></div>
                  <Card.Body className="category-body-ultra">
                    <div className="category-header-ultra">
                      <div className="category-icon-ultra">
                        <span className="icon-3d-category">{item.icon}</span>
                      </div>
                      <div className="category-count-ultra">{item.count}</div>
                    </div>
                    <h4 className="category-title-ultra">{item.title}</h4>
                    <p className="category-desc-ultra">{item.desc}</p>
                    <div className="category-arrow-ultra">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                      </svg>
                    </div>
                  </Card.Body>
                  <div className="category-hover-effect"></div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Ultra Premium Featured Properties */}
      <section className="featured-ultra" data-aos="fade-up">
        <Container>
          <div className="section-header-ultra text-center mb-5">
            <div className="section-badge-ultra" data-aos="fade-down">Featured Properties</div>
            <h2 className="section-title-ultra" data-aos="fade-up" data-aos-delay="200">
              Handpicked <span className="gradient-text-animated">Premium Listings</span>
            </h2>
            <p className="section-description-ultra" data-aos="fade-up" data-aos-delay="400">
              Discover exceptional properties curated by our expert team
            </p>
          </div>

          {loading ? (
            <div className="loading-ultra" data-aos="fade-up">
              <div className="loading-animation">
                <div className="loading-orb orb-1"></div>
                <div className="loading-orb orb-2"></div>
                <div className="loading-orb orb-3"></div>
              </div>
              <p className="loading-text-ultra">Loading premium properties...</p>
            </div>
          ) : error ? (
            <div className="error-ultra text-center" data-aos="fade-up">
              <div className="error-icon-ultra">⚠️</div>
              <div className="error-message-ultra">{error}</div>
            </div>
          ) : (
            <>
              <Row className="g-4 mb-5">
                {featuredProperties.slice(0, 6).map((property, index) => (
                  <Col key={property._id} lg={4} md={6}>
                    <div 
                      className="property-wrapper-ultra" 
                      data-aos="zoom-in"
                      data-aos-delay={index * 100}
                    >
                      <PropertyCard property={property} showOwner={true} />
                    </div>
                  </Col>
                ))}
              </Row>
              
              <div className="text-center" data-aos="fade-up">
                <Button 
                  as={Link} 
                  to="/find-property" 
                  className="btn-explore-ultra"
                >
                  <span className="btn-bg-gradient"></span>
                  <span className="btn-content">
                    <span className="btn-text">View All Properties</span>
                    <span className="btn-count">({featuredProperties.length}+ available)</span>
                  </span>
                </Button>
              </div>
            </>
          )}
        </Container>
      </section>

      {/* Ultra Premium CTA */}
      <section className="cta-ultra">
        <div className="cta-background-ultra">
          <div className="cta-gradient-orbs">
            <div className="cta-orb cta-orb-1"></div>
            <div className="cta-orb cta-orb-2"></div>
            <div className="cta-orb cta-orb-3"></div>
          </div>
          <div className="cta-grid-pattern"></div>
        </div>
        
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <div className="cta-content-ultra" data-aos="fade-up">
                <h2 className="cta-title-ultra">
                  Ready to Find Your <span className="gradient-text-animated">Dream Space?</span>
                </h2>
                <p className="cta-description-ultra" data-aos="fade-up" data-aos-delay="200">
                  Join over 50,000 satisfied customers who discovered their perfect properties 
                  through our premium platform
                </p>
                
                <div className="cta-buttons-ultra" data-aos="fade-up" data-aos-delay="400">
                  <Button 
                    as={Link} 
                    to="/find-property" 
                    className="btn-cta-primary-ultra"
                  >
                    <span className="btn-bg-gradient"></span>
                    <span className="btn-content">Start Your Journey</span>
                    <span className="btn-shine"></span>
                  </Button>
                  <Button 
                    as={Link} 
                    to="/add-property" 
                    className="btn-cta-secondary-ultra"
                  >
                    <span className="btn-border-gradient"></span>
                    <span className="btn-content">List Your Property</span>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
