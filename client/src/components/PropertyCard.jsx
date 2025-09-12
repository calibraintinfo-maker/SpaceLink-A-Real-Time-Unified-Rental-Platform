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
              <div style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '25px',
                padding: '8px 20px',
                marginBottom: '20px',
                fontSize: '0.85rem',
                fontWeight: 600
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
        <Container className="py-5 text-center">
          <Spinner animation="border" style={{ color: '#7c3aed' }} />
          <p className="mt-3 fs-5 fw-semibold">Loading properties...</p>
        </Container>
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
        <Container className="py-5">
          <Alert variant="danger" className="text-center">
            <Alert.Heading>⚠️ Error Loading Properties</Alert.Heading>
            <p>{error}</p>
            <Button onClick={fetchProperties} style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}>
              Try Again
            </Button>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* ✅ HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        padding: '50px 0 70px 0',
        color: 'white',
        position: 'relative'
      }}>
        <Container>
          <div className="text-center">
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '25px',
              padding: '8px 20px',
              marginBottom: '20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              ✨ {filteredProperties.length} Premium Properties Available
            </div>
            
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 800,
              marginBottom: '16px',
              lineHeight: 1.2,
              fontFamily: "'Inter', sans-serif"
            }}>
              Find Your Perfect Property
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
              fontFamily: "'Inter', sans-serif"
            }}>
              Discover verified properties from our premium collection across India.
              <br />From luxury apartments to commercial spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* ✅ MAIN LAYOUT */}
      <Container fluid style={{ padding: '0', maxWidth: '1200px', margin: '0 auto' }}>
        <Row style={{ margin: '0' }}>
          
          {/* ✅ PROFESSIONAL SIDEBAR */}
          <Col xl={3} lg={4} style={{
            background: 'white',
            boxShadow: '4px 0 20px rgba(0,0,0,0.04)',
            padding: '0',
            minHeight: 'calc(100vh - 200px)'
          }}>
            <div style={{ 
              position: 'sticky', 
              top: '100px',
              padding: '25px 20px',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto'
            }}>
              
              {/* Search Card */}
              <Card style={{
                border: 'none',
                borderRadius: '12px',
                background: 'white',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                marginBottom: '16px'
              }}>
                <Card.Body style={{ padding: '18px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '1rem' }}>🔍</span>
                    <h6 style={{
                      margin: 0,
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#1f2937',
                      fontFamily: "'Inter', sans-serif"
                    }}>Search Properties</h6>
                  </div>
                  <Form.Control
                    type="text"
                    placeholder="Search by location, type, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      padding: '10px 12px',
                      fontSize: '13px',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  />
                  {searchQuery && (
                    <small className="text-muted mt-2 d-block" style={{ 
                      fontSize: '11px',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      <span className="fw-semibold">{filteredProperties.length} results</span> for "{searchQuery}"
                    </small>
                  )}
                </Card.Body>
              </Card>

              {/* Filters Card */}
              <Card style={{
                border: 'none',
                borderRadius: '12px',
                background: 'white',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                marginBottom: '16px'
              }}>
                <Card.Body style={{ padding: '18px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <span style={{ fontSize: '1rem' }}>⚙️</span>
                    <h6 style={{
                      margin: 0,
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#1f2937',
                      fontFamily: "'Inter', sans-serif"
                    }}>Smart Filters</h6>
                  </div>

                  {/* Location Filter */}
                  <div style={{ marginBottom: '14px' }}>
                    <Form.Label style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontFamily: "'Inter', sans-serif"
                    }}>📍 Location</Form.Label>
                    <Form.Select
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        padding: '8px 10px',
                        fontSize: '13px',
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
                  <div style={{ marginBottom: '14px' }}>
                    <Form.Label style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontFamily: "'Inter', sans-serif"
                    }}>🏠 Property Type</Form.Label>
                    <Form.Select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        padding: '8px 10px',
                        fontSize: '13px',
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
                  <div style={{ marginBottom: '14px' }}>
                    <Form.Label style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontFamily: "'Inter', sans-serif"
                    }}>💰 Price Range</Form.Label>
                    <Form.Select
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        padding: '8px 10px',
                        fontSize: '13px',
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
                    <div style={{ marginBottom: '14px' }}>
                      <Form.Label style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontFamily: "'Inter', sans-serif"
                      }}>🛏️ Bedrooms</Form.Label>
                      <Form.Select
                        value={filters.bedrooms}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                        style={{
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          padding: '8px 10px',
                          fontSize: '13px',
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
                    style={{
                      width: '100%',
                      borderRadius: '6px',
                      padding: '8px',
                      border: '1px solid #7c3aed',
                      color: '#7c3aed',
                      fontWeight: 500,
                      fontSize: '12px',
                      fontFamily: "'Inter', sans-serif"
                    }}
                    onClick={clearFilters}
                    disabled={getActiveFiltersCount() === 0}
                  >
                    ✕ Clear All Filters
                    {getActiveFiltersCount() > 0 && ` (${getActiveFiltersCount()})`}
                  </Button>
                </Card.Body>
              </Card>

              {/* ✅ PROFESSIONAL COMPACT STATS CARD */}
              <Card style={{
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                background: '#f9fafb',
                maxHeight: '140px'
              }}>
                <Card.Body style={{ padding: '16px', textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 700, 
                    marginBottom: '4px',
                    color: '#7c3aed',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {filteredProperties.length}
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#6b7280',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '6px',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    Properties Available
                  </div>
                  <div style={{
                    width: '40px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                    borderRadius: '2px',
                    margin: '0 auto'
                  }}></div>
                </Card.Body>
              </Card>

            </div>
          </Col>

          {/* ✅ MAIN CONTENT AREA */}
          <Col xl={9} lg={8} style={{ 
            padding: '25px',
            background: '#f8fafc'
          }}>
            
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.9rem',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '6px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '13px',
                  margin: 0,
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Browse our premium collection • Updated {new Date().toLocaleDateString()}
                </p>
              </div>

              {/* View Toggle */}
              <div style={{
                display: 'flex',
                gap: '4px',
                background: 'white',
                padding: '3px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'light'}
                  onClick={() => setViewMode('grid')}
                  style={{
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  ⊞ Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'light'}
                  onClick={() => setViewMode('list')}
                  style={{
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  ☰ List
                </Button>
              </div>
            </div>

            {/* Featured Properties Section - Only when less than 5 */}
            {filteredProperties.length > 0 && filteredProperties.length < 5 && (
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '18px',
                marginBottom: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 600, 
                  color: '#1f2937', 
                  marginBottom: '10px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  💎 Featured Properties
                </h4>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '12px', 
                  marginBottom: '14px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Handpicked premium properties that match your search criteria
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Luxury Villas in Mumbai', 'Modern Apartments in Bangalore', 'Commercial Spaces in Delhi'].map((item, index) => (
                    <Badge key={index} bg="light" text="dark" style={{ 
                      padding: '5px 10px', 
                      fontSize: '10px', 
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ COMPACT PROPERTIES GRID/LIST */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-4" style={{
                background: 'white',
                borderRadius: '12px',
                padding: '40px 30px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{ fontSize: '3rem', opacity: 0.6, marginBottom: '16px' }}>
                  {searchQuery ? '🔍' : getActiveFiltersCount() > 0 ? '🎯' : '🏠'}
                </div>
                <h3 style={{
                  fontWeight: 600,
                  color: '#1f2937',
                  fontSize: '1.3rem',
                  marginBottom: '8px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {searchQuery ? 'No Search Results' : getActiveFiltersCount() > 0 ? 'No Matching Properties' : 'No Properties Available'}
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '13px',
                  marginBottom: '18px',
                  maxWidth: '400px',
                  margin: '0 auto 18px auto',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {searchQuery ? `We couldn't find any properties matching "${searchQuery}". Try adjusting your search terms.` :
                   getActiveFiltersCount() > 0 ? 'No properties match your current filters. Try adjusting or clearing some filters.' :
                   'No properties are currently available. Please check back later.'}
                </p>
                <Button 
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    border: 'none',
                    fontWeight: 600,
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '12px',
                    fontFamily: "'Inter', sans-serif"
                  }}
                  onClick={clearFilters}
                >
                  {getActiveFiltersCount() > 0 ? 'Clear All Filters' : 'Refresh Properties'}
                </Button>
              </div>
            ) : (
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr',
                gap: '18px',
                alignItems: 'start'
              }}>
                {filteredProperties.map((property) => {
                  if (!property || !property._id) return null;
                  
                  return (
                    <div key={property._id} style={{ maxWidth: viewMode === 'grid' ? '320px' : '100%' }}>
                      <PropertyCard 
                        property={property} 
                        showOwner={false}
                        viewMode={viewMode}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* ✅ PROFESSIONAL FOOTER */}
      <footer style={{
        background: '#f9fafb',
        borderTop: '1px solid #e5e7eb',
        padding: '40px 0 20px 0',
        marginTop: '60px'
      }}>
        <Container style={{ maxWidth: '1200px' }}>
          <Row>
            <Col lg={3} md={6} className="mb-4">
              <div style={{ marginBottom: '20px' }}>
                <h5 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#7c3aed',
                  marginBottom: '16px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  SpaceLink
                </h5>
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  lineHeight: '1.5',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Your trusted global rental platform helping clients worldwide.
                </p>
              </div>
            </Col>
            <Col lg={2} md={6} className="mb-4">
              <h6 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: "'Inter', sans-serif"
              }}>
                Quick Links
              </h6>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Find Property', 'List Property', 'My Bookings', 'Profile'].map((item, index) => (
                  <li key={index} style={{ marginBottom: '6px' }}>
                    <a href="#" style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => e.target.style.color = '#7c3aed'}
                    onMouseLeave={e => e.target.style.color = '#6b7280'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg={2} md={6} className="mb-4">
              <h6 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: "'Inter', sans-serif"
              }}>
                Categories
              </h6>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Properties', 'Event Venues', 'Vehicles', 'Parking'].map((item, index) => (
                  <li key={index} style={{ marginBottom: '6px' }}>
                    <a href="#" style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => e.target.style.color = '#7c3aed'}
                    onMouseLeave={e => e.target.style.color = '#6b7280'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg={2} md={6} className="mb-4">
              <h6 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: "'Inter', sans-serif"
              }}>
                Support
              </h6>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Help Center', 'Contact Us', 'About Us', 'Blog'].map((item, index) => (
                  <li key={index} style={{ marginBottom: '6px' }}>
                    <a href="#" style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => e.target.style.color = '#7c3aed'}
                    onMouseLeave={e => e.target.style.color = '#6b7280'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <h6 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: "'Inter', sans-serif"
              }}>
                Stay Updated
              </h6>
              <Form style={{ display: 'flex', gap: '8px' }}>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  style={{
                    fontSize: '12px',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
                <Button
                  style={{
                    background: '#7c3aed',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '11px',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  Subscribe
                </Button>
              </Form>
            </Col>
          </Row>
          
          <hr style={{ margin: '30px 0 20px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
          
          <Row className="align-items-center">
            <Col md={6}>
              <p style={{
                fontSize: '11px',
                color: '#9ca3af',
                margin: 0,
                fontFamily: "'Inter', sans-serif"
              }}>
                © 2025 SpaceLink. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-end">
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                  <a key={index} href="#" style={{
                    fontSize: '11px',
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={e => e.target.style.color = '#7c3aed'}
                  onMouseLeave={e => e.target.style.color = '#9ca3af'}>
                    {item}
                  </a>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* ✅ PROFESSIONAL CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.5;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          line-height: 1.3;
        }
        
        .card-title {
          font-family: 'Inter', sans-serif !important;
          font-weight: 600 !important;
          color: '#1f2937' !important; 
          line-height: 1.3 !important;
          font-size: 1.1rem !important;
        }
        
        .card-text {
          font-family: 'Inter', sans-serif !important;
          color: '#6b7280' !important;
          font-weight: 400 !important;
          line-height: 1.4 !important;
          font-size: 0.85rem !important;
        }
        
        .btn {
          font-family: 'Inter', sans-serif !important;
          font-weight: 500 !important;
          transition: all 0.2s ease !important;
        }
        
        .form-control, .form-select {
          font-family: 'Inter', sans-serif !important;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.1) !important;
        }
        
        .btn-outline-primary:hover {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          color: white !important;
          border-color: transparent !important;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          border: none !important;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }
        
        /* Compact Grid */
        @media (max-width: 1200px) {
          .properties-grid-container {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
            gap: 16px !important;
          }
        }
        
        @media (max-width: 768px) {
          .properties-grid-container {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
