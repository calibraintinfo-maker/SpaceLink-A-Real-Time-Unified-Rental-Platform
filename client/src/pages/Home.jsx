import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    fetchFeaturedProperties();
    
    // Mouse tracking for parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <>
      {/* Premium Hero Section */}
      <section className="hero-premium" ref={heroRef}>
        {/* Animated Background */}
        <div className="hero-bg-container">
          <div className="hero-gradient-overlay"></div>
          <div className="hero-mesh-gradient"></div>
          <div className="hero-noise-overlay"></div>
          
          {/* Floating Geometric Elements */}
          <div className="geometric-elements">
            <div className="geo-element geo-1" 
                 style={{transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`}}></div>
            <div className="geo-element geo-2" 
                 style={{transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * 0.03}px)`}}></div>
            <div className="geo-element geo-3" 
                 style={{transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.02}px)`}}></div>
            <div className="geo-element geo-4" 
                 style={{transform: `translate(${mousePosition.x * -0.025}px, ${mousePosition.y * 0.01}px)`}}></div>
          </div>
        </div>

        <Container className="hero-content-container">
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col lg={10} xl={9} className="text-center">
              {/* Premium Typography */}
              <div className="hero-content-wrapper">
                <div className="hero-badge">
                  <span className="badge-icon">✨</span>
                  <span>Premium Property Platform</span>
                </div>
                
                <h1 className="hero-title-premium">
                  <span className="title-line-1">Discover Your</span>
                  <span className="title-line-2 gradient-text">Perfect Space</span>
                  <span className="title-line-3">With SpaceLink</span>
                </h1>

                <p className="hero-description-premium">
                  Revolutionizing property discovery with intelligent matching, 
                  premium listings, and seamless experiences. From luxury residences 
                  to commercial spaces — find exactly what you're looking for.
                </p>

                {/* Premium CTA Buttons */}
                <div className="hero-cta-container">
                  <Button 
                    as={Link} 
                    to="/find-property" 
                    className="btn-premium-primary"
                  >
                    <span className="btn-text">Explore Properties</span>
                    <span className="btn-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                      </svg>
                    </span>
                  </Button>
                  
                  <Button 
                    as={Link} 
                    to="/add-property" 
                    className="btn-premium-secondary"
                  >
                    <span className="btn-text">List Property</span>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="trust-indicators">
                  <div className="trust-item">
                    <span className="trust-number">10K+</span>
                    <span className="trust-label">Properties</span>
                  </div>
                  <div className="trust-separator"></div>
                  <div className="trust-item">
                    <span className="trust-number">50K+</span>
                    <span className="trust-label">Happy Clients</span>
                  </div>
                  <div className="trust-separator"></div>
                  <div className="trust-item">
                    <span className="trust-number">99.8%</span>
                    <span className="trust-label">Success Rate</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <div className="scroll-text">Scroll to explore</div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="features-premium">
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className="features-grid">
                {/* Feature 1 */}
                <div className="feature-card-premium feature-1">
                  <div className="feature-icon-container">
                    <div className="feature-icon-bg"></div>
                    <div className="feature-icon">🎯</div>
                  </div>
                  <h3 className="feature-title">Smart Matching</h3>
                  <p className="feature-description">
                    AI-powered property recommendations based on your preferences and behavior
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="feature-card-premium feature-2">
                  <div className="feature-icon-container">
                    <div className="feature-icon-bg"></div>
                    <div className="feature-icon">⚡</div>
                  </div>
                  <h3 className="feature-title">Instant Search</h3>
                  <p className="feature-description">
                    Real-time filtering with advanced search capabilities and instant results
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="feature-card-premium feature-3">
                  <div className="feature-icon-container">
                    <div className="feature-icon-bg"></div>
                    <div className="feature-icon">🛡️</div>
                  </div>
                  <h3 className="feature-title">Secure Platform</h3>
                  <p className="feature-description">
                    Bank-level security with verified listings and protected transactions
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="feature-card-premium feature-4">
                  <div className="feature-icon-container">
                    <div className="feature-icon-bg"></div>
                    <div className="feature-icon">📊</div>
                  </div>
                  <h3 className="feature-title">Analytics Dashboard</h3>
                  <p className="feature-description">
                    Comprehensive insights and analytics for property owners and seekers
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Premium Categories Section */}
      <section className="categories-premium">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <div className="section-header-premium">
                <div className="section-badge-premium">Property Categories</div>
                <h2 className="section-title-premium">
                  Find Your <span className="gradient-text">Ideal Space</span>
                </h2>
                <p className="section-description-premium">
                  Explore curated property categories designed for every lifestyle and business need
                </p>
              </div>
            </Col>
          </Row>

          <Row className="g-4">
            {[
              { 
                category: 'Property Rentals', 
                icon: '🏠', 
                title: 'Residential', 
                desc: 'Luxury apartments, modern flats, family homes',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                count: '2.5K+'
              },
              { 
                category: 'Commercial', 
                icon: '🏢', 
                title: 'Commercial', 
                desc: 'Premium offices, retail spaces, warehouses',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                count: '1.8K+'
              },
              { 
                category: 'Land', 
                icon: '🌾', 
                title: 'Land & Plots', 
                desc: 'Agricultural land, commercial plots, development sites',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                count: '950+'
              },
              { 
                category: 'Parking', 
                icon: '🚗', 
                title: 'Parking', 
                desc: 'Secure parking, garages, covered spaces',
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                count: '3.2K+'
              },
              { 
                category: 'Event', 
                icon: '🎉', 
                title: 'Events', 
                desc: 'Banquet halls, gardens, conference venues',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                count: '420+'
              },
              { 
                category: 'manage-properties', 
                icon: '⚙️', 
                title: 'Management', 
                desc: 'Property management tools and services',
                gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                count: 'Tools',
                isManage: true
              }
            ].map((item, index) => (
              <Col lg={4} md={6} key={index}>
                <Card 
                  className="category-card-premium"
                  as={Link}
                  to={item.isManage ? '/manage-properties' : `/find-property?category=${item.category}`}
                  style={{ '--category-gradient': item.gradient }}
                >
                  <div className="category-gradient-bg"></div>
                  <Card.Body className="category-body">
                    <div className="category-header">
                      <div className="category-icon-premium">{item.icon}</div>
                      <div className="category-count">{item.count}</div>
                    </div>
                    <h4 className="category-title-premium">{item.title}</h4>
                    <p className="category-desc-premium">{item.desc}</p>
                    <div className="category-arrow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                      </svg>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Premium Featured Properties */}
      <section className="featured-premium">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <div className="section-header-premium">
                <div className="section-badge-premium">Featured Properties</div>
                <h2 className="section-title-premium">
                  Handpicked <span className="gradient-text">Premium Listings</span>
                </h2>
                <p className="section-description-premium">
                  Discover exceptional properties curated by our expert team for discerning clients
                </p>
              </div>
            </Col>
          </Row>

          {loading ? (
            <div className="loading-premium">
              <div className="loading-spinner-premium">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
              </div>
              <p className="loading-text-premium">Loading premium properties...</p>
            </div>
          ) : error ? (
            <div className="error-premium">
              <div className="error-icon-premium">⚠️</div>
              <div className="error-message-premium">{error}</div>
            </div>
          ) : (
            <>
              <Row className="g-4 mb-5">
                {featuredProperties.slice(0, 6).map((property, index) => (
                  <Col key={property._id} lg={4} md={6}>
                    <div 
                      className="property-card-wrapper" 
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <PropertyCard property={property} showOwner={true} />
                    </div>
                  </Col>
                ))}
              </Row>
              
              <Row>
                <Col className="text-center">
                  <Button 
                    as={Link} 
                    to="/find-property" 
                    className="btn-premium-tertiary"
                  >
                    <span className="btn-text">View All Properties</span>
                    <span className="btn-count">{featuredProperties.length}+ available</span>
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>

      {/* Premium CTA Section */}
      <section className="cta-premium">
        <div className="cta-bg-elements">
          <div className="cta-gradient-1"></div>
          <div className="cta-gradient-2"></div>
          <div className="cta-mesh"></div>
        </div>
        
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <div className="cta-content-premium">
                <h2 className="cta-title-premium">
                  Ready to Find Your <span className="gradient-text-white">Perfect Space?</span>
                </h2>
                <p className="cta-description-premium">
                  Join thousands of satisfied customers who discovered their ideal properties through SpaceLink's premium platform
                </p>
                
                <div className="cta-buttons-premium">
                  <Button 
                    as={Link} 
                    to="/find-property" 
                    className="btn-cta-primary"
                  >
                    Start Your Search
                  </Button>
                  <Button 
                    as={Link} 
                    to="/add-property" 
                    className="btn-cta-secondary"
                  >
                    List Your Property
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
