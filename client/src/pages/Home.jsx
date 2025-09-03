import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError } from '../utils/api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeaturedProperties();
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
      {/* Hero Section with Gradient Background */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <Container className="position-relative">
          <Row className="justify-content-center text-center min-vh-75 align-items-center">
            <Col lg={10} xl={8}>
              <div className="hero-content animate-fade-in">
                <h1 className="hero-title display-3 fw-bold mb-4 text-white">
                  Welcome to <span className="text-gradient">SpaceLink</span>
                </h1>
                <p className="hero-subtitle lead mb-5 text-white-75 fs-4">
                  Your trusted platform for finding and renting properties. 
                  From residential apartments to commercial spaces, parking, and event venues.
                </p>
                <div className="hero-buttons d-flex gap-4 justify-content-center flex-wrap">
                  <Button 
                    as={Link} 
                    to="/find-property" 
                    className="btn-hero-primary px-5 py-3"
                    size="lg"
                  >
                    <i className="fas fa-search me-2"></i>
                    Find Your Space
                  </Button>
                  <Button 
                    as={Link} 
                    to="/add-property" 
                    className="btn-hero-secondary px-5 py-3"
                    size="lg"
                  >
                    <i className="fas fa-plus me-2"></i>
                    List Property
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 bg-white shadow-sm">
        <Container>
          <Row className="text-center">
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <div className="stat-item">
                <h3 className="stat-number text-primary mb-2">1000+</h3>
                <p className="stat-label text-muted mb-0">Properties Listed</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <div className="stat-item">
                <h3 className="stat-number text-success mb-2">5000+</h3>
                <p className="stat-label text-muted mb-0">Happy Customers</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4 mb-md-0">
              <div className="stat-item">
                <h3 className="stat-number text-warning mb-2">50+</h3>
                <p className="stat-label text-muted mb-0">Cities Covered</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-item">
                <h3 className="stat-number text-info mb-2">99.9%</h3>
                <p className="stat-label text-muted mb-0">Success Rate</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Properties */}
      <section className="featured-section py-6 bg-light-gradient">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <div className="section-header">
                <span className="section-badge">Featured</span>
                <h2 className="section-title display-4 fw-bold mb-3">
                  Premium <span className="text-primary">Properties</span>
                </h2>
                <p className="section-subtitle lead text-muted mb-0">
                  Discover our handpicked selection of exceptional properties
                </p>
              </div>
            </Col>
          </Row>

          {loading ? (
            <div className="loading-container text-center py-5">
              <div className="custom-loader">
                <div className="loader-spinner"></div>
                <p className="mt-3 text-muted">Loading amazing properties...</p>
              </div>
            </div>
          ) : error ? (
            <div className="error-container text-center py-5">
              <div className="error-icon mb-3">
                <i className="fas fa-exclamation-triangle text-danger fs-1"></i>
              </div>
              <div className="alert alert-danger d-inline-block">{error}</div>
            </div>
          ) : (
            <>
              <Row className="g-4 mb-5">
                {featuredProperties.slice(0, 6).map((property, index) => (
                  <Col key={property._id} lg={4} md={6} className="property-col">
                    <div className="property-wrapper" style={{ animationDelay: `${index * 0.1}s` }}>
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
                    className="btn-explore px-5 py-3"
                    size="lg"
                  >
                    <i className="fas fa-compass me-2"></i>
                    Explore All Properties
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-6">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <div className="section-header">
                <span className="section-badge">Categories</span>
                <h2 className="section-title display-4 fw-bold mb-3">
                  Find Your Perfect <span className="text-primary">Space</span>
                </h2>
                <p className="section-subtitle lead text-muted mb-0">
                  Explore different property types tailored to your specific needs
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
                desc: 'Apartments, Flats, Houses',
                color: 'primary'
              },
              { 
                category: 'Commercial', 
                icon: '🏢', 
                title: 'Commercial', 
                desc: 'Offices, Shops, Warehouses',
                color: 'success'
              },
              { 
                category: 'Land', 
                icon: '🌾', 
                title: 'Land & Plots', 
                desc: 'Agricultural, Commercial Plots',
                color: 'warning'
              },
              { 
                category: 'Parking', 
                icon: '🚗', 
                title: 'Parking', 
                desc: 'Car, Bike, Garage Spaces',
                color: 'info'
              },
              { 
                category: 'Event', 
                icon: '🎉', 
                title: 'Events', 
                desc: 'Banquet, Gardens, Halls',
                color: 'danger'
              },
              { 
                category: 'manage-properties', 
                icon: '🔧', 
                title: 'Manage', 
                desc: 'Add & Manage Properties',
                color: 'dark',
                isManage: true
              }
            ].map((item, index) => (
              <Col lg={2} md={4} sm={6} key={index} className="category-col">
                <Card 
                  className={`category-card h-100 border-0 shadow-hover text-center category-${item.color}`}
                  as={Link}
                  to={item.isManage ? '/manage-properties' : `/find-property?category=${item.category}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card.Body className="p-4">
                    <div className="category-icon mb-3">
                      <span className="icon-emoji">{item.icon}</span>
                    </div>
                    <h5 className="category-title mb-2">{item.title}</h5>
                    <p className="category-desc text-muted small mb-0">{item.desc}</p>
                  </Card.Body>
                  <div className="category-overlay"></div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-6 bg-light-gradient">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <div className="section-header">
                <span className="section-badge">Features</span>
                <h2 className="section-title display-4 fw-bold mb-3">
                  Why Choose <span className="text-primary">SpaceLink?</span>
                </h2>
                <p className="section-subtitle lead text-muted mb-0">
                  Experience the future of property rentals with cutting-edge features
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="g-5">
            {[
              {
                icon: '⚡',
                title: 'Smart Filtering',
                desc: 'Find properties instantly with our AI-powered filtering system. Search by category, price, location, and availability with real-time results.',
                color: 'warning'
              },
              {
                icon: '🛠️',
                title: 'Owner Dashboard',
                desc: 'Comprehensive property management tools for owners. Add, edit, disable properties and track bookings with detailed analytics.',
                color: 'primary'
              },
              {
                icon: '🔒',
                title: 'Secure Platform',
                desc: 'Bank-level security with protected routes and secure authentication. Your data and transactions are always safe and private.',
                color: 'success'
              }
            ].map((feature, index) => (
              <Col md={4} key={index} className="feature-col">
                <Card className="feature-card h-100 border-0 shadow-sm">
                  <Card.Body className="p-5 text-center">
                    <div className={`feature-icon-wrapper mb-4 text-${feature.color}`}>
                      <div className="feature-icon-bg"></div>
                      <span className="feature-icon">{feature.icon}</span>
                    </div>
                    <h4 className="feature-title mb-3">{feature.title}</h4>
                    <p className="feature-desc text-muted mb-0">{feature.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-6 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-4">Ready to Get Started?</h2>
              <p className="lead mb-5 opacity-90">
                Join thousands of satisfied customers who found their perfect space through SpaceLink
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Button 
                  as={Link} 
                  to="/find-property" 
                  variant="light" 
                  size="lg"
                  className="px-5 py-3"
                >
                  Start Searching
                </Button>
                <Button 
                  as={Link} 
                  to="/add-property" 
                  variant="outline-light" 
                  size="lg"
                  className="px-5 py-3"
                >
                  List Your Property
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
