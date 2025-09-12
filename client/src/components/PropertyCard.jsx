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

  // ✅ SKELETON LOADER COMPONENT
  const SkeletonCard = () => (
    <Card style={{ border: 'none', borderRadius: '20px', background: 'white', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
      <div style={{ 
        height: '240px', 
        background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%)', 
        backgroundSize: '200% 100%', 
        animation: 'shimmer 1.5s infinite', 
        borderRadius: '20px 20px 0 0' 
      }}></div>
      <Card.Body style={{ padding: '20px' }}>
        <div style={{ 
          height: '20px', 
          background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%)', 
          backgroundSize: '200% 100%', 
          animation: 'shimmer 1.5s infinite', 
          borderRadius: '4px', 
          marginBottom: '12px', 
          width: '70%' 
        }}></div>
        <div style={{ 
          height: '16px', 
          background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%)', 
          backgroundSize: '200% 100%', 
          animation: 'shimmer 1.5s infinite', 
          borderRadius: '4px', 
          marginBottom: '16px', 
          width: '90%' 
        }}></div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <div style={{ 
            height: '24px', 
            width: '60px', 
            background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%)', 
            backgroundSize: '200% 100%', 
            animation: 'shimmer 1.5s infinite', 
            borderRadius: '12px' 
          }}></div>
          <div style={{ 
            height: '24px', 
            width: '60px', 
            background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%)', 
            backgroundSize: '200% 100%', 
            animation: 'shimmer 1.5s infinite', 
            borderRadius: '12px' 
          }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ 
            height: '20px', 
            width: '80px', 
            background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%)', 
            backgroundSize: '200% 100%', 
            animation: 'shimmer 1.5s infinite', 
            borderRadius: '4px' 
          }}></div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ 
              height: '32px', 
              width: '80px', 
              background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%)', 
              backgroundSize: '200% 100%', 
              animation: 'shimmer 1.5s infinite', 
              borderRadius: '6px' 
            }}></div>
            <div style={{ 
              height: '32px', 
              width: '80px', 
              background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%)', 
              backgroundSize: '200% 100%', 
              animation: 'shimmer 1.5s infinite', 
              borderRadius: '6px' 
            }}></div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  // ✅ LOADING STATE
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
                    <Col key={i}><SkeletonCard /></Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  // ✅ ERROR STATE
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
      {/* ✅ PROFESSIONAL HERO SECTION */}
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
              animation: 'fadeInUp 0.8s ease-out 0.2s both',
              fontFamily: "'Inter', sans-serif"
            }}>
              Find Your Perfect Property
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
              animation: 'fadeInUp 0.8s ease-out 0.4s both',
              fontFamily: "'Inter', sans-serif"
            }}>
              Discover verified properties from our premium collection across India. From luxury apartments to commercial spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* ✅ PROFESSIONAL BRIDGE SECTION */}
      <div style={{ 
        background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.03) 0%, rgba(248, 250, 252, 1) 100%)',
        padding: '30px 0',
        marginTop: '-30px',
        borderBottom: '1px solid rgba(124, 58, 237, 0.08)'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '20px',
                animation: 'slideInLeft 0.8s ease-out',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  boxShadow: '0 4px 20px rgba(124, 58, 237, 0.08)',
                  border: '1px solid rgba(124, 58, 237, 0.1)'
                }}>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 700, 
                    color: '#7c3aed',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    🔥 {filteredProperties.length} Active Listings
                  </span>
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.1)'
                }}>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 700, 
                    color: '#059669',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    ✓ All Verified Properties
                  </span>
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  boxShadow: '0 4px 20px rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.1)'
                }}>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 700, 
                    color: '#f59e0b',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    ⚡ Updated Today
                  </span>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-end">
              <div style={{
                fontSize: '0.85rem',
                color: '#6b7280',
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                animation: 'slideInRight 0.8s ease-out'
              }}>
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ✅ MAIN LAYOUT */}
      <Container fluid style={{ padding: '0', maxWidth: '1400px', margin: '0 auto' }}>
        <Row style={{ margin: '0' }}>
          
          {/* ✅ PROFESSIONAL SIDEBAR */}
          <Col xl={3} lg={4} style={{ 
            background: 'white',
            boxShadow: '4px 0 30px rgba(0,0,0,0.06)',
            padding: '0',
            minHeight: 'calc(100vh - 200px)'
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
                      color: '#1f2937',
                      fontFamily: "'Inter', sans-serif"
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
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  />
                  {searchQuery && (
                    <small className="text-muted mt-2 d-block animate-slide-in" style={{ 
                      fontSize: '12px',
                      fontFamily: "'Inter', sans-serif"
                    }}>
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
                      color: '#1f2937',
                      fontFamily: "'Inter', sans-serif"
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
                      letterSpacing: '0.5px',
                      fontFamily: "'Inter', sans-serif"
                    }}>📍 Location</Form.Label>
                    <Form.Select
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="animated-select"
                      style={{
                        borderRadius: '10px',
                        border: '2px solid #f1f5f9',
                        padding: '10px 14px',
                        fontSize: '14px',
                        fontFamily: "'Inter', sans-serif"
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
                      letterSpacing: '0.5px',
                      fontFamily: "'Inter', sans-serif"
                    }}>🏠 Property Type</Form.Label>
                    <Form.Select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      className="animated-select"
                      style={{
                        borderRadius: '10px',
                        border: '2px solid #f1f5f9',
                        padding: '10px 14px',
                        fontSize: '14px',
                        fontFamily: "'Inter', sans-serif"
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
                      letterSpacing: '0.5px',
                      fontFamily: "'Inter', sans-serif"
                    }}>💰 Price Range</Form.Label>
                    <Form.Select
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="animated-select"
                      style={{
                        borderRadius: '10px',
                        border: '2px solid #f1f5f9',
                        padding: '10px 14px',
                        fontSize: '14px',
                        fontFamily: "'Inter', sans-serif"
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
                        letterSpacing: '0.5px',
                        fontFamily: "'Inter', sans-serif"
                      }}>🛏️ Bedrooms</Form.Label>
                      <Form.Select
                        value={filters.bedrooms}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                        className="animated-select"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #f1f5f9',
                          padding: '10px 14px',
                          fontSize: '14px',
                          fontFamily: "'Inter', sans-serif"
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
                      transition: 'all 0.3s ease',
                      fontFamily: "'Inter', sans-serif"
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
                <Card.Body style={{ padding: '16px', textAlign: 'center' }}>
                  <h5 className="counter-animation" style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: 800, 
                    marginBottom: '4px',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {filteredProperties.length}
                  </h5>
                  <p style={{ 
                    fontSize: '12px', 
                    opacity: 0.9, 
                    margin: 0,
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    Properties Available
                  </p>
                </Card.Body>
              </Card>

            </div>
          </Col>

          {/* ✅ MAIN CONTENT AREA */}
          <Col xl={9} lg={8} style={{ 
            padding: '40px 30px',
            background: '#f8fafc',
            minHeight: '100vh'
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
                  marginBottom: '8px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  <span className="counter-animation">{filteredProperties.length}</span> Properties Found
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '14px',
                  margin: 0,
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Browse our premium collection • Updated {new Date().toLocaleDateString()}
                </p>
              </div>

              {/* ✅ PROFESSIONAL VIEW TOGGLE */}
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
                    position: 'relative',
                    fontFamily: "'Inter', sans-serif"
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
                    position: 'relative',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  ☰ List
                </Button>
              </div>
            </div>

            {/* ✅ FEATURED PROPERTIES SECTION */}
            {filteredProperties.length > 0 && filteredProperties.length < 5 && (
              <div className="featured-section animate-slide-in" style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                marginBottom: '30px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 700, 
                  color: '#1f2937', 
                  marginBottom: '16px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  💎 Featured Properties
                </h4>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '14px', 
                  marginBottom: '20px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Handpicked premium properties that match your search criteria
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['Luxury Villas in Mumbai', 'Modern Apartments in Bangalore', 'Commercial Spaces in Delhi'].map((item, index) => (
                    <Badge key={index} bg="light" text="dark" className="animated-badge" style={{ 
                      padding: '8px 12px', 
                      fontSize: '12px', 
                      fontWeight: 500,
                      animation: `bounceIn 0.6s ease-out ${index * 0.2}s both`,
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ MARKET INSIGHTS SECTION */}
            {filteredProperties.length > 10 && (
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '20px',
                padding: '24px',
                marginBottom: '30px',
                border: '1px solid #e2e8f0'
              }}>
                <Row>
                  <Col md={8}>
                    <h4 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 700, 
                      color: '#1f2937', 
                      marginBottom: '8px',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      📊 Market Insights
                    </h4>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '14px', 
                      marginBottom: '16px',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      We found {filteredProperties.length} properties matching your criteria across multiple locations
                    </p>
                  </Col>
                  <Col md={4} className="text-end">
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: 800, 
                          color: '#7c3aed',
                          fontFamily: "'Inter', sans-serif"
                        }}>
                          {Math.round(filteredProperties.length * 0.7)}
                        </div>
                        <small style={{ 
                          color: '#6b7280', 
                          fontSize: '11px',
                          fontFamily: "'Inter', sans-serif"
                        }}>Available Now</small>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: 800, 
                          color: '#059669',
                          fontFamily: "'Inter', sans-serif"
                        }}>
                          {Math.round(filteredProperties.length * 0.3)}
                        </div>
                        <small style={{ 
                          color: '#6b7280', 
                          fontSize: '11px',
                          fontFamily: "'Inter', sans-serif"
                        }}>Recently Added</small>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            )}

            {/* ✅ PROPERTIES GRID/LIST */}
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
                  marginBottom: '12px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {searchQuery ? 'No Search Results' : getActiveFiltersCount() > 0 ? 'No Matching Properties' : 'No Properties Available'}
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '16px',
                  marginBottom: '24px',
                  maxWidth: '500px',
                  margin: '0 auto 24px auto',
                  fontFamily: "'Inter', sans-serif"
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
                    textTransform: 'uppercase',
                    fontFamily: "'Inter', sans-serif"
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
                {viewMode === 'grid' ? (
                  <div 
                    className="properties-grid-container"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                      gap: '24px',
                      alignItems: 'start'
                    }}
                  >
                    {filteredProperties.map((property, index) => {
                      if (!property || !property._id) return null;
                      
                      return (
                        <div 
                          key={property._id}
                          style={{
                            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                          }}
                        >
                          <PropertyCard 
                            property={property} 
                            showOwner={false}
                            viewMode={viewMode}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Row className="g-4">
                    {filteredProperties.map((property, index) => {
                      if (!property || !property._id) return null;
                      
                      return (
                        <Col key={property._id} xs={12}>
                          <div
                            style={{
                              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                            }}
                          >
                            <PropertyCard 
                              property={property} 
                              showOwner={false}
                              viewMode={viewMode}
                            />
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* ✅ PROFESSIONAL CSS */}
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
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
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
        
        /* ✅ BUTTON ANIMATIONS */
        .animated-button-primary {
          position: relative;
          overflow: hidden;
        }
        
        .animated-button-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 15px 35px rgba(124, 58, 237, 0.4);
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
        
        /* ✅ PROFESSIONAL GRID */
        .properties-grid-container {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* ✅ RESPONSIVE GRID */
        @media (max-width: 1200px) {
          .properties-grid-container {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 768px) {
          .properties-grid-container {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          
          .animated-button, .animated-button-primary {
            transform: none !important;
          }
          
          .hero-bg-animation {
            animation: none;
          }
        }
        
        /* ✅ TYPOGRAPHY */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }
        
        .card-title {
          font-family: 'Inter', sans-serif !important;
          font-weight: 800 !important;
          letter-spacing: -0.01em !important;
        }
        
        .card-text {
          font-family: 'Inter', sans-serif !important;
          font-weight: 400 !important;
          line-height: 1.6 !important;
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
      `}</style>
    </div>
  );
};

export default FindProperty;
