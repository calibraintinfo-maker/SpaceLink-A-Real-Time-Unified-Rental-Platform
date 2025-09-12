import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api, handleApiError, formatPrice, getImageUrl } from '../utils/api';
import PropertyCard from '../components/PropertyCard';

const FindProperty = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: ''
  });
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCards, setVisibleCards] = useState(new Set());
  const observerRef = useRef();

  const indianLocations = [
    "All Locations", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", 
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", 
    "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara",
    "Coimbatore", "Kochi", "Madurai", "Nashik", "Faridabad", "Ghaziabad",
    "Rajkot", "Meerut", "Kalyan", "Vasai", "Varanasi", "Dhanbad", "Jodhpur",
    "Amritsar", "Raipur", "Allahabad", "Jabalpur", "Gwalior", "Vijayawada"
  ];

  const propertyTypes = [
    "All Categories", "Property Rentals", "Commercial", "Event", "Parking", "Land", "Turf"
  ];

  const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];

  // ✅ SCROLL ANIMATION OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.dataset.cardId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.properties.getAll();
      
      let propertiesArray = [];
      
      if (Array.isArray(response)) {
        propertiesArray = response;
      } else if (Array.isArray(response?.data)) {
        propertiesArray = response.data;
      } else if (Array.isArray(response?.data?.properties)) {
        propertiesArray = response.data.properties;
      } else if (response?.data && typeof response.data === 'object') {
        const dataObj = response.data;
        for (const key in dataObj) {
          if (Array.isArray(dataObj[key])) {
            propertiesArray = dataObj[key];
            break;
          }
        }
      }
      
      setProperties(propertiesArray);
      setFilteredProperties(propertiesArray);
      
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Array.isArray(properties)) {
      setFilteredProperties([]);
      return;
    }

    let filtered = properties;

    if (searchQuery.trim()) {
      filtered = filtered.filter(property => {
        if (!property) return false;
        const searchFields = [
          property.title, property.description, property.address?.city,
          property.address?.state, property.address?.street, property.category, property.subtype
        ].filter(Boolean);
        return searchFields.some(field => 
          field.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    if (filters.location && filters.location !== "All Locations") {
      filtered = filtered.filter(property => {
        if (!property?.address) return false;
        const locationFields = [
          property.address.city, property.address.state, property.address.street
        ].filter(Boolean);
        return locationFields.some(field =>
          field.toLowerCase().includes(filters.location.toLowerCase())
        );
      });
    }

    if (filters.propertyType && filters.propertyType !== "All Categories") {
      filtered = filtered.filter(property => {
        if (!property) return false;
        return property.category === filters.propertyType || property.subtype === filters.propertyType;
      });
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        if (!property?.price) return false;
        const price = Number(property.price);
        return price >= min && (max ? price <= max : true);
      });
    }

    if (filters.bedrooms) {
      const minBedrooms = parseInt(filters.bedrooms);
      filtered = filtered.filter(property => {
        if (!property?.subtype) return false;
        if (residentialTypes.includes(property.subtype)) {
          return property.bedrooms >= minBedrooms;
        }
        return true;
      });
    }

    setFilteredProperties(filtered);
    setVisibleCards(new Set()); // Reset animations when filters change
  }, [searchQuery, filters, properties]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({ location: '', propertyType: '', priceRange: '', bedrooms: '' });
    setSearchQuery('');
  };

  const shouldShowBedroomFilter = () => {
    if (!filters.propertyType || filters.propertyType === "All Categories") return false;
    return filters.propertyType === 'Property Rentals' || residentialTypes.includes(filters.propertyType);
  };

  const getActiveFiltersCount = () => {
    const filterCount = Object.values(filters).filter(f => f && f !== "All Categories").length;
    return filterCount + (searchQuery.trim() ? 1 : 0);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Property Rentals': '🏠', 'Commercial': '🏢', 'Land': '🌾',
      'Parking': '🚗', 'Event': '🎉', 'Turf': '⚽'
    };
    return icons[category] || '🏷️';
  };

  const handleViewDetails = (propertyId) => navigate(`/property/${propertyId}`);
  const handleBookNow = (propertyId) => navigate(`/book/${propertyId}`);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x240/e2e8f0/64748b?text=Property+Image';
  };

  const renderPropertyDetails = (property) => {
    if (!property) return [];
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="light" text="dark" className="me-2 mb-2 animate-badge" style={{ fontSize: '0.75rem' }}>
            Bed {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-2 mb-2 animate-badge" style={{ fontSize: '0.75rem' }}>
            Bath {property.bathrooms}
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-2 mb-2 animate-badge" style={{ fontSize: '0.75rem' }}>
          Area {property.size}
        </Badge>
      );
    }

    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="info" className="me-2 mb-2 animate-badge" style={{ fontSize: '0.75rem' }}>
          Capacity {property.capacity}
        </Badge>
      );
    }

    return details;
  };

  const getSafeRentType = (property) => {
    if (!property?.rentType) return 'rental';
    return Array.isArray(property.rentType) ? property.rentType[0] : property.rentType;
  };

  const getSafeRentTypes = (property) => {
    if (!property?.rentType) return ['rental'];
    return Array.isArray(property.rentType) ? property.rentType : [property.rentType];
  };

  // ✅ ENHANCED ANIMATED PROPERTY CARD
  const AnimatedPropertyCard = ({ property, index, viewMode }) => {
    const cardRef = useRef();
    const [imageIndex, setImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const images = property.images || [property.image];
    const isVisible = visibleCards.has(property._id);

    useEffect(() => {
      if (cardRef.current && observerRef.current) {
        cardRef.current.dataset.cardId = property._id;
        observerRef.current.observe(cardRef.current);
      }
    }, [property._id]);

    useEffect(() => {
      let interval;
      if (isHovered && images.length > 1) {
        interval = setInterval(() => {
          setImageIndex(prev => (prev + 1) % images.length);
        }, 2000);
      } else {
        setImageIndex(0);
      }
      return () => clearInterval(interval);
    }, [isHovered, images.length]);

    if (viewMode === 'list') {
      return (
        <div
          ref={cardRef}
          className={`property-card-wrapper ${isVisible ? 'fade-up-visible' : 'fade-up-hidden'}`}
          style={{ 
            animationDelay: `${index * 100}ms`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <Card 
            className="property-card-enhanced"
            style={{ 
              border: 'none',
              borderRadius: '20px',
              background: 'white',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              minHeight: '240px',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              setIsHovered(true);
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(124, 58, 237, 0.15)';
            }}
            onMouseLeave={(e) => {
              setIsHovered(false);
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
            }}
          >
            <Row className="g-0 align-items-center">
              <Col md={4}>
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  {/* ✅ ANIMATED IMAGE SLIDER */}
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={getImageUrl(img)}
                        alt={`${property.title} - ${idx + 1}`}
                        onError={handleImageError}
                        style={{ 
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '20px 0 0 20px',
                          opacity: idx === imageIndex ? 1 : 0,
                          transition: 'opacity 0.5s ease-in-out',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* ✅ ANIMATED BADGES */}
                  <div className="position-absolute top-0 start-0 p-3">
                    <Badge 
                      bg="success" 
                      className="me-2 fw-semibold shadow-sm animated-badge" 
                      style={{ 
                        borderRadius: '20px',
                        padding: '6px 12px', 
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        animation: 'bounceIn 0.6s ease-out 0.2s both'
                      }}
                    >
                      ✓ Available
                    </Badge>
                    <Badge 
                      bg="primary" 
                      className="fw-semibold shadow-sm animated-badge" 
                      style={{ 
                        borderRadius: '20px', 
                        padding: '6px 12px', 
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        animation: 'bounceIn 0.6s ease-out 0.4s both'
                      }}
                    >
                      🏆 Verified
                    </Badge>
                  </div>

                  {/* ✅ IMAGE INDICATORS */}
                  {images.length > 1 && (
                    <div className="position-absolute bottom-0 start-0 end-0 p-3">
                      <div className="d-flex justify-content-center gap-1">
                        {images.map((_, idx) => (
                          <div
                            key={idx}
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: idx === imageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              
              <Col md={8}>
                <Card.Body className="p-4" style={{ minHeight: '240px', display: 'flex', flexDirection: 'column' }}>
                  <div className="d-flex align-items-center mb-3">
                    <span className="me-2" style={{ color: '#7c3aed', fontSize: '1.1rem' }}>📍</span>
                    <span style={{ 
                      fontSize: '0.85rem', 
                      color: '#6b7280',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {property.address?.city || 'City'}, {property.address?.state || 'State'}
                    </span>
                  </div>
                  
                  <Card.Title style={{ 
                    color: '#1f2937',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    marginBottom: '12px',
                    lineHeight: '1.3',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {property.title || 'Property Title'}
                  </Card.Title>
                  
                  <p className="mb-3" style={{ 
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    flexGrow: 1,
                    color: '#374151',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {property.description ? 
                      property.description.substring(0, 140) + '...' : 
                      'Premium property with modern amenities and excellent location.'
                    }
                  </p>
                  
                  <div className="mb-3">
                    <div className="d-flex flex-wrap gap-2">
                      {renderPropertyDetails(property)}
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                      <div style={{ 
                        fontSize: '1.6rem',
                        fontWeight: 800,
                        color: '#059669',
                        marginBottom: '4px',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {formatPrice(property.price, getSafeRentType(property))}
                      </div>
                      <small style={{ 
                        color: '#64748b',
                        fontSize: '0.8rem',
                        fontFamily: "'Inter', sans-serif",
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Available for {getSafeRentTypes(property).join(', ')} rental
                      </small>
                    </div>
                    
                    <div className="d-flex gap-3">
                      <Button
                        variant="outline-primary"
                        className="animated-button"
                        style={{
                          borderRadius: '12px',
                          padding: '12px 20px',
                          borderWidth: '2px',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          borderColor: '#7c3aed',
                          color: '#7c3aed',
                          fontFamily: "'Inter', sans-serif",
                          textTransform: 'uppercase',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => handleViewDetails(property._id)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="animated-button-primary"
                        style={{ 
                          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '12px 20px',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          fontFamily: "'Inter', sans-serif",
                          textTransform: 'uppercase',
                          color: 'white',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => handleBookNow(property._id)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      );
    } else {
      // Grid view
      return (
        <div
          ref={cardRef}
          className={`property-card-wrapper ${isVisible ? 'fade-up-visible' : 'fade-up-hidden'}`}
          style={{ 
            animationDelay: `${index * 150}ms`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <PropertyCard 
            property={property} 
            showOwner={false}
            className="enhanced-grid-card"
          />
        </div>
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <section style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
          padding: '50px 0 70px 0',
          color: 'white'
        }}>
          <Container>
            <div className="text-center">
              <div className="loading-badge" style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '25px',
                padding: '8px 20px',
                marginBottom: '20px',
                fontSize: '0.85rem',
                fontWeight: 600,
                animation: 'pulse 2s infinite'
              }}>
                ✨ Loading Properties...
              </div>
              <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>
                Find Your Perfect Property
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                Discover verified properties from our premium collection across India
              </p>
            </div>
          </Container>
        </section>
        
        <div style={{ marginTop: '60px' }}>
          <Container fluid style={{ padding: '0' }}>
            <Row style={{ margin: '0' }}>
              <Col xl={3} lg={4} style={{ background: 'white', padding: '30px 25px' }}>
                <div className="skeleton-card" style={{ height: '200px', marginBottom: '20px' }}></div>
                <div className="skeleton-card" style={{ height: '300px', marginBottom: '20px' }}></div>
                <div className="skeleton-card" style={{ height: '80px' }}></div>
              </Col>
              <Col xl={9} lg={8} style={{ padding: '30px', background: '#f8fafc' }}>
                <div style={{ marginBottom: '30px' }}>
                  <div className="skeleton-text" style={{ height: '40px', width: '300px', marginBottom: '10px' }}></div>
                  <div className="skeleton-text" style={{ height: '20px', width: '200px' }}></div>
                </div>
                <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Col key={i}>
                      <div className="skeleton-card animate-pulse" style={{ height: '400px' }}></div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  // Error state  
  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <section style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
          padding: '50px 0 70px 0',
          color: 'white'
        }}>
          <Container>
            <div className="text-center">
              <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>
                Find Your Perfect Property
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                Discover verified properties from our premium collection across India
              </p>
            </div>
          </Container>
        </section>
        
        <div style={{ marginTop: '60px' }}>
          <Container className="py-5">
            <Alert variant="danger" className="text-center animate-shake">
              <Alert.Heading>⚠️ Error Loading Properties</Alert.Heading>
              <p>{error}</p>
              <Button onClick={fetchProperties} className="animated-button-primary">
                Try Again
              </Button>
            </Alert>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* ✅ ANIMATED HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        padding: '50px 0 70px 0',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="hero-bg-animation"></div>
        <Container className="position-relative">
          <div className="text-center">
            <div className="hero-badge" style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '25px',
              padding: '8px 20px',
              marginBottom: '20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              animation: 'slideInDown 0.8s ease-out'
            }}>
              <span className="counter-animation">
                ✨ {filteredProperties.length} Premium Properties Available
              </span>
            </div>
            
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 800,
              marginBottom: '16px',
              lineHeight: 1.2,
              animation: 'fadeInUp 0.8s ease-out 0.2s both'
            }}>
              Find Your Perfect Property
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
              animation: 'fadeInUp 0.8s ease-out 0.4s both'
            }}>
              Discover verified properties from our premium collection across India. From luxury apartments to commercial spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* ✅ MAIN LAYOUT */}
      <div style={{ marginTop: '60px' }}>
        <Container fluid style={{ padding: '0' }}>
          <Row style={{ margin: '0' }}>
            
            {/* ✅ ANIMATED SIDEBAR */}
            <Col xl={3} lg={4} style={{ 
              background: 'white',
              boxShadow: '4px 0 20px rgba(0,0,0,0.04)',
              padding: '0'
            }}>
              <div style={{ 
                position: 'sticky', 
                top: '100px',
                padding: '30px 25px',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                animation: 'slideInLeft 0.6s ease-out'
              }}>
                
                {/* Search Card */}
                <Card className="animated-search-card" style={{
                  border: 'none',
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  marginBottom: '20px',
                  transition: 'transform 0.3s ease'
                }}>
                  <Card.Body style={{ padding: '24px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '16px'
                    }}>
                      <span style={{ fontSize: '1.1rem' }}>🔍</span>
                      <h6 style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#1f2937'
                      }}>Search Properties</h6>
                    </div>
                    <Form.Control
                      type="text"
                      placeholder="Search by location, type, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="animated-input"
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #f1f5f9',
                        padding: '12px 16px',
                        fontSize: '14px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                    {searchQuery && (
                      <small className="text-muted mt-2 d-block animate-slide-in" style={{ fontSize: '12px' }}>
                        <span className="fw-semibold counter-animation">{filteredProperties.length} results</span> for "{searchQuery}"
                      </small>
                    )}
                  </Card.Body>
                </Card>

                {/* Filters Card */}
                <Card className="animated-filters-card" style={{
                  border: 'none',
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  marginBottom: '20px'
                }}>
                  <Card.Body style={{ padding: '24px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '20px'
                    }}>
                      <span style={{ fontSize: '1.1rem' }}>⚙️</span>
                      <h6 style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#1f2937'
                      }}>Smart Filters</h6>
                    </div>

                    {/* Location Filter */}
                    <div style={{ marginBottom: '20px' }}>
                      <Form.Label style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>📍 Location</Form.Label>
                      <Form.Select
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        className="animated-select"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #f1f5f9',
                          padding: '10px 14px',
                          fontSize: '14px'
                        }}
                      >
                        {indianLocations.map((location, index) => (
                          <option key={index} value={location === "All Locations" ? "" : location}>
                            {location}
                          </option>
                        ))}
                      </Form.Select>
                    </div>

                    {/* Property Type Filter */}
                    <div style={{ marginBottom: '20px' }}>
                      <Form.Label style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>🏠 Property Type</Form.Label>
                      <Form.Select
                        value={filters.propertyType}
                        onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                        className="animated-select"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #f1f5f9',
                          padding: '10px 14px',
                          fontSize: '14px'
                        }}
                      >
                        {propertyTypes.map((type, index) => (
                          <option key={index} value={type === "All Categories" ? "" : type}>
                            {getCategoryIcon(type)} {type}
                          </option>
                        ))}
                      </Form.Select>
                    </div>

                    {/* Price Range Filter */}
                    <div style={{ marginBottom: '20px' }}>
                      <Form.Label style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>💰 Price Range</Form.Label>
                      <Form.Select
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="animated-select"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #f1f5f9',
                          padding: '10px 14px',
                          fontSize: '14px'
                        }}
                      >
                        <option value="">All Prices</option>
                        <option value="0-1000">₹0 - ₹1,000</option>
                        <option value="1000-2500">₹1,000 - ₹2,500</option>
                        <option value="2500-5000">₹2,500 - ₹5,000</option>
                        <option value="5000-10000">₹5,000 - ₹10,000</option>
                        <option value="10000-25000">₹10,000 - ₹25,000</option>
                        <option value="25000-50000">₹25,000 - ₹50,000</option>
                        <option value="50000-999999">₹50,000+</option>
                      </Form.Select>
                    </div>

                    {/* Conditional Bedrooms Filter */}
                    {shouldShowBedroomFilter() && (
                      <div style={{ marginBottom: '20px' }}>
                        <Form.Label style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#374151',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>🛏️ Bedrooms</Form.Label>
                        <Form.Select
                          value={filters.bedrooms}
                          onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                          className="animated-select"
                          style={{
                            borderRadius: '10px',
                            border: '2px solid #f1f5f9',
                            padding: '10px 14px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="">Any Bedrooms</option>
                          <option value="1">1+ BHK</option>
                          <option value="2">2+ BHK</option>
                          <option value="3">3+ BHK</option>
                          <option value="4">4+ BHK</option>
                          <option value="5">5+ BHK</option>
                        </Form.Select>
                      </div>
                    )}

                    {/* Clear Filters Button */}
                    <Button
                      variant="outline-primary"
                      className="animated-clear-button"
                      style={{
                        width: '100%',
                        borderRadius: '10px',
                        padding: '10px',
                        border: '2px solid #7c3aed',
                        color: '#7c3aed',
                        fontWeight: 600,
                        fontSize: '14px',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={clearFilters}
                      disabled={getActiveFiltersCount() === 0}
                    >
                      ✕ Clear All Filters
                      {getActiveFiltersCount() > 0 && (
                        <span className="filter-count-badge">
                          ({getActiveFiltersCount()})
                        </span>
                      )}
                    </Button>
                  </Card.Body>
                </Card>

                {/* Stats Card */}
                <Card className="animated-stats-card" style={{
                  border: 'none',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  color: 'white'
                }}>
                  <Card.Body style={{ padding: '12px', textAlign: 'center' }}>
                    <h5 className="counter-animation" style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2px' }}>
                      {filteredProperties.length}
                    </h5>
                    <p style={{ fontSize: '11px', opacity: 0.9, margin: 0 }}>
                      Available
                    </p>
                  </Card.Body>
                </Card>

              </div>
            </Col>

            {/* ✅ MAIN CONTENT AREA */}
            <Col xl={9} lg={8} style={{ 
              padding: '30px',
              background: '#f8fafc'
            }}>
              
              {/* Header */}
              <div className="animate-slide-in" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    <span className="counter-animation">{filteredProperties.length}</span> Properties Found
                  </h2>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    margin: 0
                  }}>
                    Browse our premium collection • Updated {new Date().toLocaleDateString()}
                  </p>
                </div>

                {/* ✅ ANIMATED VIEW TOGGLE */}
                <div className="view-toggle-wrapper" style={{
                  display: 'flex',
                  gap: '8px',
                  background: 'white',
                  padding: '4px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}>
                  <div 
                    className="toggle-slider"
                    style={{
                      position: 'absolute',
                      top: '4px',
                      left: viewMode === 'grid' ? '4px' : '50%',
                      width: 'calc(50% - 4px)',
                      height: 'calc(100% - 8px)',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      borderRadius: '8px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 1
                    }}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => setViewMode('grid')}
                    style={{
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 600,
                      background: 'transparent',
                      color: viewMode === 'grid' ? 'white' : '#6b7280',
                      zIndex: 2,
                      position: 'relative'
                    }}
                  >
                    ⊞ Grid
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setViewMode('list')}
                    style={{
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 600,
                      background: 'transparent',
                      color: viewMode === 'list' ? 'white' : '#6b7280',
                      zIndex: 2,
                      position: 'relative'
                    }}
                  >
                    ☰ List
                  </Button>
                </div>
              </div>

              {/* ✅ INNOVATIVE FEATURES */}
              {filteredProperties.length > 0 && filteredProperties.length < 5 && (
                <div className="featured-section animate-slide-in" style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '24px',
                  marginBottom: '30px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>
                    💎 Featured Properties
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
                    Handpicked premium properties that match your search criteria
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['Luxury Villas in Mumbai', 'Modern Apartments in Bangalore', 'Commercial Spaces in Delhi'].map((item, index) => (
                      <Badge key={index} bg="light" text="dark" className="animated-badge" style={{ 
                        padding: '8px 12px', 
                        fontSize: '12px', 
                        fontWeight: 500,
                        animation: `bounceIn 0.6s ease-out ${index * 0.2}s both`
                      }}>
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Properties Grid/List */}
              {filteredProperties.length === 0 ? (
                <div className="text-center py-5 animate-fade-in" style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '60px 40px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
                }}>
                  <div className="animate-bounce-slow" style={{ fontSize: '4rem', opacity: 0.6, marginBottom: '20px' }}>
                    {searchQuery ? '🔍' : getActiveFiltersCount() > 0 ? '🎯' : '🏠'}
                  </div>
                  <h3 style={{
                    fontWeight: 800,
                    color: '#1f2937',
                    fontSize: '1.8rem',
                    marginBottom: '12px'
                  }}>
                    {searchQuery ? 'No Search Results' : getActiveFiltersCount() > 0 ? 'No Matching Properties' : 'No Properties Available'}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '16px',
                    marginBottom: '24px',
                    maxWidth: '500px',
                    margin: '0 auto 24px auto'
                  }}>
                    {searchQuery ? `We couldn't find any properties matching "${searchQuery}". Try adjusting your search terms.` :
                     getActiveFiltersCount() > 0 ? 'No properties match your current filters. Try adjusting or clearing some filters.' :
                     'No properties are currently available. Please check back later.'}
                  </p>
                  <Button 
                    className="animated-button-primary"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      border: 'none',
                      fontWeight: 700,
                      borderRadius: '12px',
                      padding: '12px 30px',
                      textTransform: 'uppercase'
                    }}
                    size="lg"
                    onClick={clearFilters}
                  >
                    {getActiveFiltersCount() > 0 ? 'Clear All Filters' : 'Refresh Properties'}
                  </Button>
                </div>
              ) : (
                <div 
                  className={`properties-container ${viewMode === 'grid' ? 'grid-layout' : 'list-layout'}`}
                  style={{
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Row className={viewMode === 'grid' ? 'row-cols-1 row-cols-md-2 row-cols-xl-3 g-4' : 'g-4'}>
                    {filteredProperties.map((property, index) => {
                      if (!property || !property._id) return null;
                      
                      return (
                        <Col key={property._id} className={viewMode === 'list' ? 'col-12' : ''}>
                          <AnimatedPropertyCard 
                            property={property} 
                            index={index}
                            viewMode={viewMode}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* ✅ PROFESSIONAL ANIMATIONS CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        /* ✅ KEYFRAMES */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes shimmer {
          0% { 
            background-position: -1000px 0; 
          }
          100% { 
            background-position: 1000px 0; 
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
        
        /* ✅ HERO ANIMATIONS */
        .hero-bg-animation {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          animation: pulse 4s ease-in-out infinite;
        }
        
        .counter-animation {
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        /* ✅ CARD ANIMATIONS */
        .property-card-enhanced {
          transform-origin: center;
        }
        
        .property-card-enhanced:hover .animated-badge {
          transform: scale(1.05);
        }
        
        .fade-up-hidden {
          opacity: 0;
          transform: translateY(50px);
        }
        
        .fade-up-visible {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* ✅ BUTTON ANIMATIONS */
        .animated-button {
          position: relative;
          overflow: hidden;
        }
        
        .animated-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .animated-button:hover::before {
          left: 100%;
        }
        
        .animated-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(124, 58, 237, 0.3);
        }
        
        .animated-button-primary {
          position: relative;
          overflow: hidden;
        }
        
        .animated-button-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .animated-button-primary:hover::before {
          left: 100%;
        }
        
        .animated-button-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 15px 35px rgba(124, 58, 237, 0.4);
        }
        
        /* ✅ FORM ANIMATIONS */
        .animated-input:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
          transform: translateY(-2px);
        }
        
        .animated-select:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
          transform: translateY(-1px);
        }
        
        .animated-search-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.1) !important;
        }
        
        .animated-clear-button:hover:not(:disabled) {
          transform: translateY(-1px);
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white !important;
          border-color: transparent !important;
        }
        
        /* ✅ SKELETON ANIMATIONS */
        .skeleton-card {
          background: linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 16px;
        }
        
        .skeleton-text {
          background: linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .animate-bounce-slow {
          animation: bounceIn 2s infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-slide-in {
          animation: slideInLeft 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out;
        }
        
        /* ✅ VIEW TOGGLE ANIMATIONS */
        .view-toggle-wrapper {
          position: relative;
        }
        
        .toggle-slider {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* ✅ LAYOUT TRANSITIONS */
        .properties-container {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .grid-layout .property-card-wrapper {
          transition: all 0.3s ease;
        }
        
        .list-layout .property-card-wrapper {
          transition: all 0.3s ease;
        }
        
        /* ✅ RESPONSIVE ANIMATIONS */
        @media (max-width: 768px) {
          .animated-button, .animated-button-primary {
            transform: none !important;
          }
          
          .property-card-enhanced:hover {
            transform: translateY(-4px) scale(1.01) !important;
          }
          
          .hero-bg-animation {
            animation: none;
          }
        }
        
        /* ✅ ACCESSIBILITY */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
