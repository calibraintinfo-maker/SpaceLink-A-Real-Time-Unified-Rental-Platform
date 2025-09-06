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

  // ✅ FIXED: Handles ALL possible API response structures
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔍 Fetching properties from API...');
      const response = await api.properties.getAll();
      
      console.log('📡 Full API Response:', response);
      console.log('📊 Response Data:', response.data);
      
      // ✅ ROBUST: Handle all possible nested structures
      let propertiesArray = [];
      
      if (Array.isArray(response)) {
        // Direct array response
        propertiesArray = response;
        console.log('✅ Direct array response');
      } else if (Array.isArray(response?.data)) {
        // response.data is array
        propertiesArray = response.data;
        console.log('✅ Array in response.data');
      } else if (Array.isArray(response?.data?.properties)) {
        // response.data.properties is array
        propertiesArray = response.data.properties;
        console.log('✅ Array in response.data.properties');
      } else if (Array.isArray(response?.data?.data)) {
        // response.data.data is array
        propertiesArray = response.data.data;
        console.log('✅ Array in response.data.data');
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
        console.error('❌ Response structure:', JSON.stringify(response, null, 2));
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
          <span key="bedrooms" className="badge bg-light text-dark me-2 mb-2">
            🛏 {property.bedrooms} BHK
          </span>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <span key="bathrooms" className="badge bg-light text-dark me-2 mb-2">
            🚿 {property.bathrooms} Bath
          </span>
        );
      }
    }

    if (property.size) {
      details.push(
        <span key="area" className="badge bg-light text-dark me-2 mb-2">
          📐 {property.size}
        </span>
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
      {/* Purple Hero Section */}
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
            <h5 className="mb-2 fw-bold" style={{ color: '#1e293b' }}>Filters</h5>
            <small className="text-muted">Refine your search</small>
          </div>

          <div className="p-4">
            
            {/* Search Input */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3">Search Properties</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3">Location</Form.Label>
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
              <Form.Label className="fw-semibold mb-3">Property Type</Form.Label>
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
              <Form.Label className="fw-semibold mb-3">Price Range</Form.Label>
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
                <Form.Label className="fw-semibold mb-3">Bedrooms</Form.Label>
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
              className="w-100 mb-4"
              onClick={clearFilters}
            >
              ✕ Clear All Filters
            </Button>

            <div className="p-3 bg-light rounded">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semibold">Active Filters</span>
                <Badge bg="primary">
                  {Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1 }}>
          <Container fluid className="py-5 px-5">
            
            {/* Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div>
                <h2 className="fw-bold mb-3" style={{ color: '#1e293b' }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="text-muted">Browse our premium collection</p>
              </div>
              
              {/* View Toggle */}
              <div className="btn-group">
                <Button 
                  variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
                  onClick={() => setViewMode('grid')}
                >
                  ⊞ Grid
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
                  onClick={() => setViewMode('list')}
                >
                  ☰ List
                </Button>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length === 0 ? (
              <Card className="text-center p-5">
                <Card.Body>
                  <div className="mb-4" style={{ fontSize: '5rem' }}>🔍</div>
                  <h3 className="fw-bold mb-4">No Properties Found</h3>
                  <p className="text-muted mb-4">
                    We couldn't find any properties matching your criteria. Try adjusting your filters.
                  </p>
                  <Button variant="primary" size="lg" onClick={clearFilters}>
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
                        className="h-100 shadow-sm"
                        style={{ 
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
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
                            alt={property.title || 'Property'}
                            onError={handleImageError}
                            style={{ 
                              height: '240px', 
                              objectFit: 'cover'
                            }}
                          />
                          
                          {/* Badges */}
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
                        <Card.Body className="d-flex flex-column">
                          {/* Location */}
                          <div className="d-flex align-items-center text-muted mb-3">
                            <span className="me-2">📍</span>
                            <span>
                              {property.address?.city || 'City'}, {property.address?.state || 'State'}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <Card.Title className="fw-bold mb-3">
                            {property.title || 'Property Title'}
                          </Card.Title>
                          
                          {/* Features */}
                          <div className="mb-4 flex-grow-1">
                            {renderPropertyDetails(property)}
                          </div>
                          
                          {/* Price and Buttons */}
                          <div className="mt-auto">
                            <div className="mb-3">
                              <div className="h4 fw-bold text-success">
                                {formatPrice(property.price, getSafeRentType(property))}
                              </div>
                              <small className="text-muted">
                                Available for {getSafeRentTypes(property).join(', ')} rental
                              </small>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="d-grid gap-2 d-md-flex">
                              <Button
                                variant="outline-primary"
                                className="flex-fill"
                                onClick={() => handleViewDetails(property._id)}
                              >
                                View Details
                              </Button>
                              <Button
                                variant="primary"
                                className="flex-fill"
                                onClick={() => handleBookNow(property._id)}
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
