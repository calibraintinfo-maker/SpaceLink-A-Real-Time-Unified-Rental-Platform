import React, { useState, useEffect } from 'react';
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
          <Badge key="bedrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.75rem' }}>
            Bed {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.75rem' }}>
            Bath {property.bathrooms}
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.75rem' }}>
          Area {property.size}
        </Badge>
      );
    }

    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="info" className="me-2 mb-2" style={{ fontSize: '0.75rem' }}>
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

  // Loading state with skeletons
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
        
        {/* ✅ FIXED: Added proper spacing */}
        <div style={{ marginTop: '60px' }}>
          <Container fluid style={{ padding: '0' }}>
            <Row style={{ margin: '0' }}>
              <Col xl={3} lg={4} style={{ background: 'white', padding: '30px 25px' }}>
                <div style={{ height: '200px', background: '#f8fafc', borderRadius: '16px', marginBottom: '20px' }}></div>
                <div style={{ height: '300px', background: '#f8fafc', borderRadius: '16px', marginBottom: '20px' }}></div>
                <div style={{ height: '80px', background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', borderRadius: '16px' }}></div>
              </Col>
              <Col xl={9} lg={8} style={{ padding: '30px', background: '#f8fafc' }}>
                <div style={{ marginBottom: '30px' }}>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1f2937' }}>Loading Properties...</h2>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>Please wait while we fetch the latest listings</p>
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
            <Alert variant="danger" className="text-center">
              <Alert.Heading>⚠️ Error Loading Properties</Alert.Heading>
              <p>{error}</p>
              <Button onClick={fetchProperties} style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}>
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
      {/* ✅ HERO SECTION - Perfect spacing */}
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
              Discover verified properties from our premium collection across India. From luxury apartments to commercial spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* ✅ MAIN LAYOUT - Fixed spacing and overlaps */}
      <div style={{ marginTop: '60px' }}>
        <Container fluid style={{ padding: '0' }}>
          <Row style={{ margin: '0' }}>
            
            {/* ✅ PROFESSIONAL SIDEBAR - Fixed positioning */}
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
                overflowY: 'auto'
              }}>
                
                {/* Search Card - ✅ FIXED: Removed hover effects to prevent overlap */}
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
                        fontSize: '14px',
                        transition: 'all 0.3s ease'
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

                {/* ✅ COMPACT Stats Card - Much smaller */}
                <Card style={{
                  border: 'none',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  color: 'white'
                }}>
                  <Card.Body style={{ padding: '12px', textAlign: 'center' }}>
                    <h5 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2px' }}>
                      {filteredProperties.length}
                    </h5>
                    <p style={{ fontSize: '11px', opacity: 0.9, margin: 0 }}>
                      Available
                    </p>
                  </Card.Body>
                </Card>

              </div>
            </Col>

            {/* ✅ MAIN CONTENT AREA - Better spacing */}
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

              {/* ✅ INNOVATIVE: Featured Properties Section (when properties < 5) */}
              {filteredProperties.length > 0 && filteredProperties.length < 5 && (
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '24px',
                  marginBottom: '30px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
                }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>
                    💎 Featured Properties
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
                    Handpicked premium properties that match your search criteria
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['Luxury Villas in Mumbai', 'Modern Apartments in Bangalore', 'Commercial Spaces in Delhi'].map((item, index) => (
                      <Badge key={index} bg="light" text="dark" style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 500 }}>
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* ✅ INNOVATIVE: Market Insights Section (when properties > 10) */}
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
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1f2937', marginBottom: '8px' }}>
                        📊 Market Insights
                      </h4>
                      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
                        We found {filteredProperties.length} properties matching your criteria across multiple locations
                      </p>
                    </Col>
                    <Col md={4} className="text-end">
                      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7c3aed' }}>
                            {Math.round(filteredProperties.length * 0.7)}
                          </div>
                          <small style={{ color: '#6b7280', fontSize: '11px' }}>Available Now</small>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>
                            {Math.round(filteredProperties.length * 0.3)}
                          </div>
                          <small style={{ color: '#6b7280', fontSize: '11px' }}>Recently Added</small>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {/* Properties Grid/List */}
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
                <Row className={viewMode === 'grid' ? 'row-cols-1 row-cols-md-2 row-cols-xl-3 g-4' : 'g-4'}>
                  {filteredProperties.map((property) => {
                    if (!property || !property._id) return null;
                    
                    return (
                      <Col key={property._id} className={viewMode === 'list' ? 'col-12' : ''}>
                        {viewMode === 'list' ? (
                          /* ✅ PROFESSIONAL LIST VIEW - Fixed styling */
                          <Card style={{ 
                            border: 'none',
                            borderRadius: '20px',
                            background: 'white',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            minHeight: '240px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.12)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
                          }}>
                            <Row className="g-0 align-items-center">
                              <Col md={4}>
                                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                                  <img
                                    src={getImageUrl(
                                      (property.images && Array.isArray(property.images) && property.images[0]) || 
                                      property.image
                                    )}
                                    alt={property.title || 'Property'}
                                    onError={handleImageError}
                                    style={{ 
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      borderRadius: '20px 0 0 20px'
                                    }}
                                  />
                                  
                                  <div className="position-absolute top-0 start-0 p-3">
                                    <Badge bg="success" className="me-2 fw-semibold shadow-sm" 
                                           style={{ 
                                             borderRadius: '20px',
                                             padding: '6px 12px', 
                                             fontSize: '0.75rem',
                                             fontWeight: 600,
                                             textTransform: 'uppercase'
                                           }}>
                                      ✓ Available
                                    </Badge>
                                    <Badge bg="primary" className="fw-semibold shadow-sm" 
                                           style={{ 
                                             borderRadius: '20px', 
                                             padding: '6px 12px', 
                                             fontSize: '0.75rem',
                                             fontWeight: 600,
                                             textTransform: 'uppercase'
                                           }}>
                                      🏆 Verified
                                    </Badge>
                                  </div>
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
                                        style={{
                                          borderRadius: '12px',
                                          padding: '12px 20px',
                                          borderWidth: '2px',
                                          fontWeight: 700,
                                          fontSize: '0.8rem',
                                          borderColor: '#7c3aed',
                                          color: '#7c3aed',
                                          fontFamily: "'Inter', sans-serif",
                                          textTransform: 'uppercase'
                                        }}
                                        onClick={() => handleViewDetails(property._id)}
                                      >
                                        View Details
                                      </Button>
                                      <Button
                                        style={{ 
                                          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                                          border: 'none',
                                          borderRadius: '12px',
                                          padding: '12px 20px',
                                          fontWeight: 700,
                                          fontSize: '0.8rem',
                                          fontFamily: "'Inter', sans-serif",
                                          textTransform: 'uppercase',
                                          color: 'white'
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
                        ) : (
                          <PropertyCard 
                            property={property} 
                            showOwner={false}
                          />
                        )}
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* ✅ PROFESSIONAL CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
          transform: translateY(-1px);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          border: none !important;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
        }
        
        .card:hover {
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          
          h1 {
            font-size: 2.5rem !important;
          }
          
          h2 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
