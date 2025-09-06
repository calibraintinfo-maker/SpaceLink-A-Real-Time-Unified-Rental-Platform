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

  // ✅ FIXED: Real API data fetching with axios
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔍 Fetching properties from API...');
      
      // ✅ Using your existing API with axios
      const response = await api.properties.getAll();
      
      console.log('📡 API Response:', response);
      console.log('📊 Response Data:', response.data);
      
      // ✅ Axios puts data in response.data
      const propertiesData = response.data || [];
      
      console.log('🏠 Properties Array:', propertiesData);
      console.log('📏 Array Length:', propertiesData.length);
      
      if (Array.isArray(propertiesData)) {
        setProperties(propertiesData);
        setFilteredProperties(propertiesData);
      } else {
        console.error('❌ Properties data is not an array:', propertiesData);
        setProperties([]);
        setFilteredProperties([]);
        setError('Invalid data format received from server');
      }
      
    } catch (error) {
      console.error('❌ Fetch Error:', error);
      console.error('❌ Error Response:', error.response);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Real-time filtering with safe array operations
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

  // ✅ FIXED: Real property navigation
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
          <span key="bedrooms" className="custom-badge me-2 mb-2">
            🛏 {property.bedrooms} BHK
          </span>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <span key="bathrooms" className="custom-badge me-2 mb-2">
            🚿 {property.bathrooms} Bath
          </span>
        );
      }
    }

    if (property.category === 'Commercial' && property.washrooms > 0) {
      details.push(
        <span key="washrooms" className="custom-badge me-2 mb-2">
          🚻 {property.washrooms} Washrooms
        </span>
      );
    }

    if (property.size) {
      details.push(
        <span key="area" className="custom-badge me-2 mb-2">
          📐 {property.size}
        </span>
      );
    }

    if (property.capacity) {
      details.push(
        <span key="capacity" className="custom-badge-purple me-2 mb-2">
          👥 {property.capacity}
        </span>
      );
    }

    if (property.features && Array.isArray(property.features)) {
      if (property.features.includes('Artificial Grass')) {
        details.push(
          <span key="surface" className="custom-badge-green me-2 mb-2">
            ⚽ Artificial Grass
          </span>
        );
      }

      if (property.features.includes('24/7 Security')) {
        details.push(
          <span key="security" className="custom-badge-orange me-2 mb-2">
            🔒 24/7 Security
          </span>
        );
      }
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
      {/* Purple Hero Section */}
      <section 
        className="py-5 text-white"
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Container className="position-relative">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">
              Find Your Perfect Property
            </h1>
            <p className="fs-5 mb-0 opacity-90">
              Discover verified properties from our premium collection across India
            </p>
          </div>
        </Container>
      </section>

      {/* Main Layout */}
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff' }}>
        
        {/* Sidebar */}
        <div style={{
          width: '320px',
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          position: 'sticky',
          top: 0,
          overflowY: 'auto',
          borderRight: '1px solid #e2e8f0'
        }}>
          
          <div className="p-4 border-bottom bg-white">
            <div>
              <h5 className="mb-2 fw-bold" style={{ color: '#1e293b' }}>Filters</h5>
              <small className="text-muted">Refine your search</small>
            </div>
          </div>

          <div className="p-4">
            
            {/* Search Input */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3">
                Search Properties
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3">
                Location
              </Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                {indianLocations.map((location, index) => (
                  <option key={index} value={location === "All Locations" ? "" : location}>
                    {location}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Property Type Filter */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3">
                Property Type
              </Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3">
                Price Range
              </Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="0-2000">₹0 - ₹2,000</option>
                <option value="2000-5000">₹2,000 - ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-999999">₹10,000+</option>
              </Form.Select>
            </div>

            {/* Conditional Bedrooms Filter */}
            {shouldShowBedroomFilter() && (
              <div className="mb-4">
                <Form.Label className="fw-semibold mb-3">
                  Bedrooms
                </Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1+ BHK</option>
                  <option value="2">2+ BHK</option>
                  <option value="3">3+ BHK</option>
                  <option value="4">4+ BHK</option>
                </Form.Select>
              </div>
            )}

            <Button 
              variant="outline-secondary"
              className="w-100 mb-4 fw-semibold"
              onClick={clearFilters}
            >
              ✕ Clear All Filters
            </Button>

            <div style={{
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e5e7eb'
            }}>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semibold">Active Filters</span>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: '6px'
                }}>
                  {Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Container fluid className="py-5 px-5">
            
            {/* Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div>
                <h2 className="h2 fw-bold mb-3" style={{ color: '#1e293b' }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="text-muted fs-6 mb-0">
                  Browse our premium collection
                </p>
              </div>
              
              {/* View Toggle Buttons */}
              <div className="btn-group" role="group">
                <input 
                  type="radio" 
                  className="btn-check" 
                  name="viewMode" 
                  id="gridView" 
                  checked={viewMode === 'grid'}
                  onChange={() => setViewMode('grid')}
                />
                <label 
                  className={`btn fw-semibold ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  htmlFor="gridView"
                >
                  ⊞ Grid
                </label>
                
                <input 
                  type="radio" 
                  className="btn-check" 
                  name="viewMode" 
                  id="listView"
                  checked={viewMode === 'list'} 
                  onChange={() => setViewMode('list')}
                />
                <label 
                  className={`btn fw-semibold ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  htmlFor="listView"
                >
                  ☰ List
                </label>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length === 0 ? (
              <Card className="border-0 shadow-sm text-center p-5">
                <Card.Body>
                  <div className="mb-4 text-muted" style={{ fontSize: '5rem' }}>
                    🔍
                  </div>
                  <h3 className="fw-bold mb-4" style={{ color: '#1e293b' }}>No Properties Found</h3>
                  <p className="text-muted fs-6 mb-4">
                    We couldn't find any properties matching your criteria. Try adjusting your filters.
                  </p>
                  <Button 
                    style={{
                      backgroundColor: '#7c3aed',
                      borderColor: '#7c3aed',
                      fontWeight: 600
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
                      <Card 
                        className="h-100 border-0 shadow-sm"
                        style={{ 
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          borderRadius: '12px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12)';
                        }}
                      >
                        {/* Property Image */}
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
                              height: viewMode === 'grid' ? '240px' : '200px', 
                              objectFit: 'cover',
                              borderRadius: '12px 12px 0 0'
                            }}
                          />
                          
                          <div className="position-absolute top-0 start-0 p-3">
                            <Badge bg="success" className="me-2">For Rent</Badge>
                            <Badge bg="primary">✓ Verified</Badge>
                          </div>
                          
                          <div className="position-absolute top-0 end-0 p-3">
                            <Badge bg="secondary">
                              {property.subtype || property.category || 'Property'}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Property Details */}
                        <Card.Body className="d-flex flex-column p-4">
                          {/* Location */}
                          <div className="d-flex align-items-center text-muted mb-3">
                            <span className="me-2" style={{ color: '#7c3aed' }}>📍</span>
                            <span className="fw-medium">
                              {property.address?.city || 'City'}, {property.address?.state || 'State'}
                            </span>
                          </div>
                          
                          {/* Property Title */}
                          <Card.Title className="h4 fw-bold mb-4" style={{ 
                            lineHeight: '1.4',
                            color: '#1e293b'
                          }}>
                            {property.title || 'Property Title'}
                          </Card.Title>
                          
                          {/* Property Features */}
                          <div className="mb-4 flex-grow-1">
                            {renderPropertyDetails(property)}
                          </div>
                          
                          {/* Price and Action Buttons */}
                          <div className="mt-auto">
                            <div className="mb-4">
                              <div className="h3 fw-bold text-success mb-1">
                                {formatPrice(property.price, getSafeRentType(property))}
                              </div>
                              <small className="text-muted fw-medium">
                                Available for {getSafeRentTypes(property).join(', ')} rental
                              </small>
                            </div>
                            
                            {/* Navigation Buttons */}
                            <div className="d-grid gap-3 d-md-flex">
                              <Button
                                variant="outline-primary"
                                className="flex-fill fw-semibold"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleViewDetails(property._id);
                                }}
                              >
                                View Details
                              </Button>
                              <Button
                                variant="primary"
                                className="flex-fill fw-semibold"
                                style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleBookNow(property._id);
                                }}
                              >
                                Book Now
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
