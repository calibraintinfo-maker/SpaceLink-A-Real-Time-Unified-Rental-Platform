import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api, handleApiError, formatPrice, getImageUrl } from '../utils/api';

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
    "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara"
  ];

  const propertyTypes = [
    "All Categories", "Property Rentals", "Commercial", "Event", "Parking", "Land"
  ];

  const residentialTypes = ["Villa", "Apartment", "House", "Studio"];

  useEffect(() => {
    fetchProperties();
  }, []);

  // ✅ ROBUST: Handles all API response structures
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔍 Fetching properties from API...');
      const response = await api.properties.getAll();
      
      console.log('📡 API Response:', response);
      console.log('📊 Response Data:', response.data);
      
      // Handle different response structures
      let propertiesArray = [];
      
      if (Array.isArray(response)) {
        propertiesArray = response;
      } else if (Array.isArray(response?.data)) {
        propertiesArray = response.data;
      } else if (Array.isArray(response?.data?.properties)) {
        propertiesArray = response.data.properties;
      } else if (Array.isArray(response?.data?.data)) {
        propertiesArray = response.data.data;
      } else if (response?.data && typeof response.data === 'object') {
        // Look for any array property in the response.data object
        const dataObj = response.data;
        for (const key in dataObj) {
          if (Array.isArray(dataObj[key])) {
            propertiesArray = dataObj[key];
            console.log(`✅ Array found in response.data.${key}`);
            break;
          }
        }
      }
      
      console.log('🏠 Final Properties Array:', propertiesArray);
      console.log('📏 Array Length:', propertiesArray.length);
      
      if (Array.isArray(propertiesArray) && propertiesArray.length >= 0) {
        setProperties(propertiesArray);
        setFilteredProperties(propertiesArray);
        console.log(`✅ Successfully loaded ${propertiesArray.length} properties`);
      } else {
        console.error('❌ No valid properties array found in response');
        setProperties([]);
        setFilteredProperties([]);
        setError('No properties found in server response');
      }
      
    } catch (error) {
      console.error('❌ API Error:', error);
      console.error('❌ Error Details:', error.response?.data || error.message);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // Real-time filtering
  useEffect(() => {
    if (!Array.isArray(properties)) {
      setFilteredProperties([]);
      return;
    }

    let filtered = properties;

    if (searchQuery) {
      filtered = filtered.filter(property => {
        if (!property) return false;
        
        const searchFields = [
          property.title,
          property.address?.city,
          property.address?.state,
          property.category,
          property.subtype
        ].filter(Boolean);
        
        return searchFields.some(field => 
          field.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    if (filters.location) {
      filtered = filtered.filter(property => {
        if (!property?.address) return false;
        
        const locationFields = [
          property.address.city,
          property.address.state
        ].filter(Boolean);
        
        return locationFields.some(field =>
          field.toLowerCase().includes(filters.location.toLowerCase())
        );
      });
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property => 
        property?.category === filters.propertyType ||
        property?.subtype === filters.propertyType
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => 
        property?.price && property.price >= min && property.price <= max
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property =>
        property?.subtype && residentialTypes.includes(property.subtype) &&
        property.bedrooms >= parseInt(filters.bedrooms)
      );
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
    if (!filters.propertyType) return false;
    return residentialTypes.includes(filters.propertyType) || filters.propertyType === 'Property Rentals';
  };

  const handleViewDetails = (propertyId) => {
    console.log('🔍 Navigating to property:', propertyId);
    navigate(`/property/${propertyId}`);
  };

  const handleBookNow = (propertyId) => {
    console.log('📅 Navigating to booking:', propertyId);
    navigate(`/book/${propertyId}`);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x240/e2e8f0/64748b?text=Property+Image';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Property Rentals': '🏠',
      'Commercial': '🏢',
      'Land': '🌾',
      'Parking': '🚗',
      'Event': '🎉'
    };
    return icons[category] || '🏠';
  };

  const renderPropertyDetails = (property) => {
    if (!property) return [];
    
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
            🛏 {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
            🚿 {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
          📐 {property.size}
        </Badge>
      );
    }

    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="info" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
          👥 {property.capacity}
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

  // Loading state
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <section 
          className="py-5 text-white"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Container className="text-center">
            <h1 className="display-4 fw-bold mb-4">Find Your Perfect Property</h1>
            <p className="fs-5 opacity-90">Discover verified properties from our premium collection across India</p>
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
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <section 
          className="py-5 text-white"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Container className="text-center">
            <h1 className="display-4 fw-bold mb-4">Find Your Perfect Property</h1>
            <p className="fs-5 opacity-90">Discover verified properties from our premium collection across India</p>
          </Container>
        </section>
        <Container className="py-5">
          <Alert variant="danger" className="text-center">
            <Alert.Heading>⚠️ Error Loading Properties</Alert.Heading>
            <p>{error}</p>
            <Button 
              onClick={fetchProperties}
              style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
            >
              Try Again
            </Button>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <>
      {/* ✅ IMPROVED: Purple Hero Section */}
      <section 
        className="py-5 text-white"
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
          minHeight: '320px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}></div>
        
        <Container className="position-relative">
          <div className="text-center">
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '25px',
              padding: '8px 20px',
              marginBottom: '20px'
            }}>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                ✨ Premium Properties Collection
              </span>
            </div>
            
            <h1 className="display-4 fw-bold mb-4" style={{ fontWeight: 900 }}>
              Find Your Perfect Property
            </h1>
            <p className="fs-5 mb-0 opacity-90 mx-auto" style={{ maxWidth: '600px' }}>
              Discover verified properties from our premium collection across India. 
              From luxury apartments to commercial spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Layout */}
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff' }}>
        
        {/* ✅ ENHANCED: Premium Sidebar */}
        <div style={{
          width: '380px',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          position: 'sticky',
          top: 0,
          overflowY: 'auto',
          borderRight: '1px solid #e2e8f0',
          boxShadow: '4px 0 12px rgba(0, 0, 0, 0.05)'
        }}>
          
          {/* Sidebar Header */}
          <div className="p-4 border-bottom" style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            color: 'white'
          }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="mb-1 fw-bold">🎯 Smart Filters</h5>
                <small className="opacity-90">Refine your perfect match</small>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '8px 12px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                {filteredProperties.length} found
              </div>
            </div>
          </div>

          <div className="p-4">
            
            {/* ✅ ENHANCED: Search Input */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3 d-flex align-items-center">
                <span className="me-2">🔍</span>
                Search Properties
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Type location, property type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  padding: '12px 16px',
                  fontSize: '0.95rem'
                }}
              />
              {searchQuery && (
                <small className="text-muted mt-1 d-block">
                  Searching for "{searchQuery}"
                </small>
              )}
            </div>

            {/* ✅ ENHANCED: Location Filter */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3 d-flex align-items-center">
                <span className="me-2">📍</span>
                Location
              </Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  padding: '12px 16px'
                }}
              >
                {indianLocations.map((location, index) => (
                  <option key={index} value={location === "All Locations" ? "" : location}>
                    {location}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* ✅ ENHANCED: Property Type Filter */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3 d-flex align-items-center">
                <span className="me-2">🏠</span>
                Property Type
              </Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  padding: '12px 16px'
                }}
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* ✅ ENHANCED: Price Range Filter */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3 d-flex align-items-center">
                <span className="me-2">💰</span>
                Price Range
              </Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  padding: '12px 16px'
                }}
              >
                <option value="">All Prices</option>
                <option value="0-2000">₹0 - ₹2,000</option>
                <option value="2000-5000">₹2,000 - ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-25000">₹10,000 - ₹25,000</option>
                <option value="25000-999999">₹25,000+</option>
              </Form.Select>
            </div>

            {/* Conditional Bedrooms Filter */}
            {shouldShowBedroomFilter() && (
              <div className="mb-4">
                <Form.Label className="fw-semibold mb-3 d-flex align-items-center">
                  <span className="me-2">🛏️</span>
                  Bedrooms
                </Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    padding: '12px 16px'
                  }}
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1+ BHK</option>
                  <option value="2">2+ BHK</option>
                  <option value="3">3+ BHK</option>
                  <option value="4">4+ BHK</option>
                </Form.Select>
              </div>
            )}

            {/* ✅ ENHANCED: Clear Filters Button */}
            <Button 
              variant="outline-secondary"
              className="w-100 mb-4 fw-semibold"
              onClick={clearFilters}
              style={{
                borderRadius: '12px',
                padding: '12px',
                borderWidth: '2px'
              }}
            >
              ✕ Clear All Filters
            </Button>

            {/* ✅ ENHANCED: Active Filters Summary */}
            <div style={{
              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid #cbd5e1'
            }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold text-dark">Active Filters</span>
                <Badge 
                  bg="primary" 
                  style={{ 
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    fontSize: '0.8rem',
                    padding: '6px 12px'
                  }}
                >
                  {Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)}
                </Badge>
              </div>
              
              <div className="d-flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge bg="info" className="rounded-pill">
                    Search: {searchQuery.substring(0, 15)}...
                  </Badge>
                )}
                {filters.location && (
                  <Badge bg="success" className="rounded-pill">
                    📍 {filters.location}
                  </Badge>
                )}
                {filters.propertyType && (
                  <Badge bg="warning" className="rounded-pill">
                    🏠 {filters.propertyType}
                  </Badge>
                )}
                {filters.priceRange && (
                  <Badge bg="danger" className="rounded-pill">
                    💰 ₹{filters.priceRange}
                  </Badge>
                )}
                {filters.bedrooms && (
                  <Badge bg="secondary" className="rounded-pill">
                    🛏️ {filters.bedrooms}+ BHK
                  </Badge>
                )}
              </div>
              
              {Object.values(filters).filter(f => f).length === 0 && !searchQuery && (
                <p className="text-muted mb-0 small">No active filters</p>
              )}
            </div>
          </div>
        </div>

        {/* ✅ ENHANCED: Main Content Area */}
        <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Container fluid className="py-5 px-5">
            
            {/* ✅ ENHANCED: Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div>
                <h2 className="fw-bold mb-2" style={{ color: '#1e293b', fontSize: '2.2rem' }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="text-muted fs-6 mb-0">
                  Browse our premium collection • Updated {new Date().toLocaleDateString()}
                </p>
              </div>
              
              {/* ✅ ENHANCED: View Toggle Buttons */}
              <div className="btn-group shadow-sm" role="group">
                <Button 
                  variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
                  onClick={() => setViewMode('grid')}
                  style={{
                    borderRadius: '12px 0 0 12px',
                    fontWeight: 600,
                    padding: '12px 20px'
                  }}
                >
                  ⊞ Grid View
                </Button>
                
                <Button 
                  variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
                  onClick={() => setViewMode('list')}
                  style={{
                    borderRadius: '0 12px 12px 0',
                    fontWeight: 600,
                    padding: '12px 20px'
                  }}
                >
                  ☰ List View
                </Button>
              </div>
            </div>

            {/* ✅ ENHANCED: Properties Grid/List */}
            {filteredProperties.length === 0 ? (
              <Card className="border-0 shadow-sm text-center p-5" style={{ borderRadius: '20px' }}>
                <Card.Body>
                  <div className="mb-4 text-muted" style={{ fontSize: '5rem' }}>
                    🔍
                  </div>
                  <h3 className="fw-bold mb-4" style={{ color: '#1e293b' }}>No Properties Found</h3>
                  <p className="text-muted fs-6 mb-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button 
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      border: 'none',
                      fontWeight: 600,
                      borderRadius: '12px',
                      padding: '12px 30px'
                    }}
                    size="lg"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Row className={viewMode === 'grid' ? 'row-cols-1 row-cols-md-2 row-cols-xl-3 g-4' : 'g-4'}>
                {filteredProperties.map((property) => {
                  if (!property || !property._id) return null;
                  
                  return (
                    <Col key={property._id}>
                      {/* ✅ ENHANCED: Premium Property Card */}
                      <Card 
                        className="h-100 border-0 shadow-sm"
                        style={{ 
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                          borderRadius: '20px',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                        }}
                      >
                        {/* ✅ ENHANCED: Property Image */}
                        <div className="position-relative">
                          <img
                            className="card-img-top"
                            src={getImageUrl(
                              (property.images && Array.isArray(property.images) && property.images[0]) || 
                              property.image
                            )}
                            alt={property.title || 'Property Image'}
                            onError={handleImageError}
                            style={{ 
                              height: viewMode === 'grid' ? '280px' : '240px', 
                              objectFit: 'cover'
                            }}
                          />
                          
                          {/* Enhanced badges */}
                          <div className="position-absolute top-0 start-0 p-3">
                            <Badge 
                              bg="success" 
                              className="me-2 fw-semibold shadow-sm" 
                              style={{ borderRadius: '20px', padding: '8px 16px' }}
                            >
                              ✓ Available
                            </Badge>
                            <Badge 
                              bg="primary" 
                              className="fw-semibold shadow-sm" 
                              style={{ borderRadius: '20px', padding: '8px 16px' }}
                            >
                              🏆 Verified
                            </Badge>
                          </div>
                          
                          <div className="position-absolute top-0 end-0 p-3">
                            <Badge 
                              bg="dark" 
                              className="fw-semibold shadow-sm"
                              style={{ 
                                borderRadius: '20px', 
                                padding: '8px 16px',
                                background: 'rgba(0, 0, 0, 0.7)',
                                backdropFilter: 'blur(10px)'
                              }}
                            >
                              {getCategoryIcon(property.category)} {property.subtype || property.category || 'Property'}
                            </Badge>
                          </div>

                          {/* Price overlay */}
                          <div className="position-absolute bottom-0 start-0 end-0 p-3">
                            <div style={{
                              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
                              borderRadius: '16px',
                              padding: '20px 16px 16px 16px',
                              margin: '-20px -16px -16px -16px'
                            }}>
                              <div className="h4 fw-bold text-white mb-1">
                                {formatPrice(property.price, getSafeRentType(property))}
                              </div>
                              <small className="text-light opacity-75">
                                Available for {getSafeRentTypes(property).join(', ')} rental
                              </small>
                            </div>
                          </div>
                        </div>
                        
                        {/* ✅ ENHANCED: Property Details */}
                        <Card.Body className="d-flex flex-column p-4">
                          {/* Location */}
                          <div className="d-flex align-items-center text-muted mb-3">
                            <span className="me-2" style={{ 
                              color: '#7c3aed', 
                              fontSize: '1.1rem',
                              filter: 'drop-shadow(0 2px 4px rgba(124, 58, 237, 0.2))'
                            }}>📍</span>
                            <span className="fw-medium">
                              {property.address?.city || 'City'}, {property.address?.state || 'State'}
                            </span>
                          </div>
                          
                          {/* Property Title */}
                          <Card.Title className="h4 fw-bold mb-3" style={{ 
                            lineHeight: '1.3',
                            color: '#1e293b',
                            fontSize: '1.4rem'
                          }}>
                            {property.title || 'Property Title'}
                          </Card.Title>
                          
                          {/* Property Features */}
                          <div className="mb-4 flex-grow-1">
                            <div className="d-flex flex-wrap gap-2">
                              {renderPropertyDetails(property)}
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="mt-auto">
                            <div className="d-grid gap-2 d-md-flex">
                              <Button
                                variant="outline-primary"
                                className="flex-fill fw-semibold"
                                style={{
                                  borderRadius: '12px',
                                  padding: '12px 20px',
                                  borderWidth: '2px',
                                  transition: 'all 0.3s ease'
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleViewDetails(property._id);
                                }}
                              >
                                👁️ View Details
                              </Button>
                              <Button
                                className="flex-fill fw-semibold"
                                style={{ 
                                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                                  border: 'none',
                                  borderRadius: '12px',
                                  padding: '12px 20px',
                                  transition: 'all 0.3s ease'
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleBookNow(property._id);
                                }}
                              >
                                📅 Book Now
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Container>
        </div>
      </div>
    </>
  );
};

export default FindProperty;
