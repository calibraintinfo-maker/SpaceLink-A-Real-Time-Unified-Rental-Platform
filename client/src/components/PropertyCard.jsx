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
      {/* Hero Section */}
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
              lineHeight: 1.2
            }}>
              Find Your Perfect Property
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover verified properties from our premium collection across India.
              <br />From luxury apartments to commercial spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* ✅ PROFESSIONAL MAIN LAYOUT */}
      <Container fluid style={{ padding: '0' }}>
        <Row style={{ margin: '0' }}>
          
          {/* ✅ PROFESSIONAL SIDEBAR WITH BETTER DESIGN */}
          <Col xl={3} lg={4} style={{
            background: 'white',
            boxShadow: '4px 0 20px rgba(0,0,0,0.04)',
            padding: '0',
            minHeight: 'calc(100vh - 200px)',
            borderRight: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              position: 'sticky', 
              top: '100px',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}>
              
              {/* ✅ SIDEBAR CONTENT */}
              <div style={{ padding: '30px 25px', flex: 1 }}>
                
                {/* Search Card */}
                <Card style={{
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
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #f1f5f9',
                        padding: '12px 16px',
                        fontSize: '14px'
                      }}
                    />
                    {searchQuery && (
                      <small className="text-muted mt-2 d-block" style={{ fontSize: '12px' }}>
                        <span className="fw-semibold">{filteredProperties.length} results</span> for "{searchQuery}"
                      </small>
                    )}
                  </Card.Body>
                </Card>

                {/* Filters Card */}
                <Card style={{
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
                      style={{
                        width: '100%',
                        borderRadius: '10px',
                        padding: '10px',
                        border: '2px solid #7c3aed',
                        color: '#7c3aed',
                        fontWeight: 600,
                        fontSize: '14px'
                      }}
                      onClick={clearFilters}
                      disabled={getActiveFiltersCount() === 0}
                    >
                      ✕ Clear All Filters
                      {getActiveFiltersCount() > 0 && ` (${getActiveFiltersCount()})`}
                    </Button>
                  </Card.Body>
                </Card>
              </div>

              {/* ✅ PROFESSIONAL SIDEBAR FOOTER */}
              <div style={{
                borderTop: '1px solid #e5e7eb',
                padding: '16px 25px',
                background: '#f9fafb',
                marginTop: 'auto'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 700, 
                      color: '#7c3aed',
                      marginBottom: '2px'
                    }}>
                      {filteredProperties.length}
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#6b7280',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Available
                    </div>
                  </div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></div>
                </div>
              </div>

            </div>
          </Col>

          {/* ✅ MAIN CONTENT AREA - SMALLER CARDS */}
          <Col xl={9} lg={8} style={{ 
            padding: '30px',
            background: '#f8fafc'
          }}>
            
            {/* Header */}
            <div style={{
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
                  {filteredProperties.length} Properties Found
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '14px',
                  margin: 0
                }}>
                  Browse our premium collection • Updated {new Date().toLocaleDateString()}
                </p>
              </div>

              {/* View Toggle */}
              <div style={{
                display: 'flex',
                gap: '8px',
                background: 'white',
                padding: '4px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'light'}
                  onClick={() => setViewMode('grid')}
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: 600
                  }}
                >
                  ⊞ Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'light'}
                  onClick={() => setViewMode('list')}
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: 600
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
                  marginBottom: '16px'
                }}>
                  💎 Featured Properties
                </h4>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '14px', 
                  marginBottom: '20px'
                }}>
                  Handpicked premium properties that match your search criteria
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['Luxury Villas in Mumbai', 'Modern Apartments in Bangalore', 'Commercial Spaces in Delhi'].map((item, index) => (
                    <Badge key={index} bg="light" text="dark" style={{ 
                      padding: '8px 12px', 
                      fontSize: '12px', 
                      fontWeight: 500
                    }}>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ SMALLER PROPERTIES GRID/LIST */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-5" style={{
                background: 'white',
                borderRadius: '20px',
                padding: '60px 40px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
              }}>
                <div style={{ fontSize: '4rem', opacity: 0.6, marginBottom: '20px' }}>
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
              // ✅ SMALLER CARDS - Changed from xl-3 to xl-4 and g-4 to g-3
              <Row className={viewMode === 'grid' ? 'row-cols-1 row-cols-md-3 row-cols-xl-4 g-3' : 'g-4'}>
                {filteredProperties.map((property) => {
                  if (!property || !property._id) return null;
                  
                  return (
                    <Col key={property._id} className={viewMode === 'list' ? 'col-12' : ''}>
                      <PropertyCard 
                        property={property} 
                        showOwner={false}
                        viewMode={viewMode}
                      />
                    </Col>
                  );
                })}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      {/* Professional CSS */}
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.5;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          border: none !important;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
        }
        
        .btn-outline-primary:hover {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          color: white !important;
          border-color: transparent !important;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        /* ✅ RESPONSIVE SMALLER CARDS */
        @media (max-width: 1400px) {
          .row-cols-xl-4 {
            --bs-columns: 3;
          }
        }
        
        @media (max-width: 1200px) {
          .row-cols-xl-4 {
            --bs-columns: 2;
          }
        }
        
        @media (max-width: 768px) {
          .row-cols-md-3 {
            --bs-columns: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
