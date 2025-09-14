import React, { useState, useEffect, useCallback } from 'react';
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
  const [retryCount, setRetryCount] = useState(0);
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
    "Coimbatore", "Kochi", "Madurai", "Nashik", "Faridabad", "Ghaziabad", "Rajkot",
    "Meerut", "Kalyan", "Vasai", "Varanasi", "Dhanbad", "Jodhpur", "Amritsar",
    "Raipur", "Allahabad", "Jabalpur", "Gwalior", "Vijayawada", "Namakkal"
  ];

  const propertyTypes = [
    "All Categories", "Property Rentals", "Commercial", "Event", "Parking", "Land", "Turf"
  ];

  const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];

  // 🔥 Debug environment variables
  useEffect(() => {
    console.log('🔍 Environment Debug:');
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('Mode:', import.meta.env.MODE);
  }, []);

  // 🔥 FIXED: Helper function for beautiful property images
  const getValidImages = (property) => {
    if (property.images && Array.isArray(property.images) && property.images.length > 0) {
      const validImages = property.images.filter(img => 
        img && 
        typeof img === 'string' && 
        (img.startsWith('http') || img.startsWith('data:image') || img.startsWith('/'))
      );
      if (validImages.length > 0) return validImages;
    }
    
    if (property.image && typeof property.image === 'string' && property.image.trim()) {
      return [property.image];
    }
    
    // 🔥 Beautiful fallback property images from Unsplash
    const fallbackImages = [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=400&h=300&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop&auto=format'
    ];
    
    return [fallbackImages[Math.floor(Math.random() * fallbackImages.length)]];
  };

  // 🔥 FIXED: API fetching with proper error handling
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🚀 Fetching properties from your Render backend...');
      const response = await api.properties.getAll();
      
      let propertiesArray = [];
      
      if (response.data) {
        if (Array.isArray(response.data)) {
          propertiesArray = response.data;
        } else if (Array.isArray(response.data.data)) {
          propertiesArray = response.data.data;
        } else if (Array.isArray(response.data.properties)) {
          propertiesArray = response.data.properties;
        }
      }
      
      console.log('📦 Raw properties:', propertiesArray.length);
      
      // 🔥 FIXED: Clean and validate property data
      const validProperties = propertiesArray.filter(property => {
        return property && (property._id || property.id);
      }).map(property => ({
        ...property,
        _id: property._id || property.id,
        title: property.title || 'Premium Property',
        description: property.description || 'Premium property with modern amenities and excellent location.',
        price: Number(property.price) || 0,
        category: property.category || 'Land',
        subtype: property.subtype || property.category || 'Land',
        address: {
          city: property.address?.city || 'Namakkal',
          state: property.address?.state || 'Tamil Nadu',
          street: property.address?.street || ''
        },
        images: getValidImages(property),
        size: property.size || `${Math.floor(Math.random() * 2000) + 500} sqft`,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        rentType: property.rentType || ['monthly']
      }));
      
      console.log('✅ Valid properties processed:', validProperties.length);
      
      setProperties(validProperties);
      setFilteredProperties(validProperties);
      setRetryCount(0);
      
    } catch (error) {
      console.error('❌ API Error:', error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Retry mechanism
  const fetchWithRetry = async (maxRetries = 3) => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        await fetchProperties();
        return;
      } catch (error) {
        console.log(`Retry attempt ${attempt + 1} failed:`, error);
        setRetryCount(attempt + 1);
        
        if (attempt === maxRetries) {
          setError(`Failed after ${maxRetries + 1} attempts. Please try again later.`);
          return;
        }
        
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  useEffect(() => {
    fetchWithRetry();
  }, []);

  // 🔥 Advanced filtering with debounce
  const applyFilters = useCallback(() => {
    if (!Array.isArray(properties)) return;
    
    let filtered = [...properties];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property => {
        const searchFields = [
          property.title,
          property.description,
          property.address?.city,
          property.address?.state,
          property.category,
          property.subtype
        ].filter(Boolean);
        
        return searchFields.some(field => 
          field.toLowerCase().includes(query)
        );
      });
    }
    
    if (filters.location && filters.location !== "All Locations") {
      filtered = filtered.filter(property => {
        const locationText = `${property.address.city} ${property.address.state}`.toLowerCase();
        return locationText.includes(filters.location.toLowerCase());
      });
    }
    
    if (filters.propertyType && filters.propertyType !== "All Categories") {
      filtered = filtered.filter(property =>
        property.category === filters.propertyType || 
        property.subtype === filters.propertyType
      );
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        const price = Number(property.price) || 0;
        return price >= min && (max ? price <= max : true);
      });
    }
    
    if (filters.bedrooms) {
      const minBedrooms = parseInt(filters.bedrooms);
      filtered = filtered.filter(property => {
        if (residentialTypes.includes(property.subtype)) {
          return (property.bedrooms || 0) >= minBedrooms;
        }
        return true;
      });
    }
    
    setFilteredProperties(filtered);
  }, [properties, searchQuery, filters]);

  useEffect(() => {
    const timeoutId = setTimeout(applyFilters, 300);
    return () => clearTimeout(timeoutId);
  }, [applyFilters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({ location: '', propertyType: '', priceRange: '', bedrooms: '' });
    setSearchQuery('');
  };

  const shouldShowBedroomFilter = () => {
    return filters.propertyType === 'Property Rentals' || 
           residentialTypes.includes(filters.propertyType);
  };

  const getActiveFiltersCount = () => {
    const filterCount = Object.values(filters).filter(f => f && f !== "All Categories").length;
    return filterCount + (searchQuery.trim() ? 1 : 0);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Property Rentals': '🏠',
      'Commercial': '🏢',
      'Land': '🌾',
      'Parking': '🚗',
      'Event': '🎉',
      'Turf': '⚽',
      'House': '🏠',
      'Villa': '🏛️',
      'Apartment': '🏢'
    };
    return icons[category] || '🏠';
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleBookNow = (propertyId) => {
    navigate(`/book/${propertyId}`);
  };

  const handleImageError = (e) => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'
    ];
    e.target.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  };

  const renderPropertyDetails = (property) => {
    const details = [];
    
    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.75rem' }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.75rem' }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }
    
    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.75rem' }}>
          {property.size}
        </Badge>
      );
    }
    
    return details;
  };

  const getFormattedPrice = (property) => {
    const price = Number(property.price) || 0;
    if (price === 0) return 'Price on Request';
    
    const rentTypes = Array.isArray(property.rentType) ? property.rentType : ['monthly'];
    const rentType = rentTypes[0] || 'monthly';
    
    return formatPrice(price, rentType);
  };

  const getSafeRentTypes = (property) => {
    const rentTypes = Array.isArray(property.rentType) ? property.rentType : ['monthly'];
    return rentTypes.map(type => type.toUpperCase()).join(', ');
  };

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <section className="hero-section">
          <Container>
            <div className="hero-content text-center text-white">
              <div className="hero-badge">
                <span className="hero-badge-text">⭐ Loading Properties...</span>
              </div>
              <h1 className="hero-title">Find Your Perfect Property</h1>
              <p className="hero-subtitle">Connecting to your Render backend...</p>
            </div>
          </Container>
        </section>
        
        <Container className="py-5 text-center">
          <Spinner animation="border" style={{color: '#7c3aed', width: '3rem', height: '3rem'}} />
          <h4 className="mt-3">Loading Properties...</h4>
          <p className="text-muted">
            {retryCount > 0 ? `Retry attempt ${retryCount}...` : 'Fetching from your backend...'}
          </p>
        </Container>
      </div>
    );
  }

  // 🔥 ERROR STATE
  if (error) {
    return (
      <div className="dashboard-wrapper">
        <section className="hero-section">
          <Container>
            <div className="hero-content text-center text-white">
              <div className="hero-badge">
                <span className="hero-badge-text">⚠️ Connection Issue</span>
              </div>
              <h1 className="hero-title">Find Your Perfect Property</h1>
            </div>
          </Container>
        </section>

        <Container className="py-5">
          <Alert variant="danger" className="text-center">
            <Alert.Heading>🚨 Connection Error</Alert.Heading>
            <p className="mb-3">{error}</p>
            {retryCount > 0 && (
              <p className="small text-muted mb-3">
                Attempts made: {retryCount}
              </p>
            )}
            <div className="d-flex gap-3 justify-content-center">
              <Button onClick={() => fetchWithRetry()} disabled={loading}>
                🔄 Try Again
              </Button>
              <Button variant="outline-primary" onClick={() => window.location.reload()}>
                ⟳ Refresh Page
              </Button>
            </div>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* 🔥 HERO SECTION */}
      <section className="hero-section">
        <Container>
          <div className="hero-content text-center text-white">
            <div className="hero-badge">
              <span className="hero-badge-text">
                ⭐ {filteredProperties.length} Premium Properties Available
              </span>
            </div>
            <h1 className="hero-title">Find Your Perfect Property</h1>
            <p className="hero-subtitle">
              Discover verified properties from our premium collection across India
            </p>
          </div>
        </Container>
      </section>

      {/* 🔥 MAIN DASHBOARD */}
      <div className="dashboard-main">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-content p-4">
            {/* Search */}
            <div className="mb-4">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2">🔍</span>
                <label className="form-label mb-0 fw-bold">SEARCH PROPERTIES</label>
              </div>
              <Form.Control
                type="text"
                placeholder="Search by location, type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <small className="text-muted mt-1 d-block">
                  <span className="fw-bold">{filteredProperties.length} results</span> for "{searchQuery}"
                </small>
              )}
            </div>

            {/* Smart Filters Header */}
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <span className="me-2">✨</span>
                <h6 className="mb-0 fw-bold">Smart Filters</h6>
              </div>
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <span className="me-2">📍</span>
                  <label className="form-label mb-0 fw-bold small">LOCATION</label>
                </div>
                <small className="text-muted">{indianLocations.length - 1} cities</small>
              </div>
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
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <span className="me-2">🏠</span>
                  <label className="form-label mb-0 fw-bold small">PROPERTY TYPE</label>
                </div>
                <small className="text-muted">{propertyTypes.length - 1} categories</small>
              </div>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type}>
                    {getCategoryIcon(type)} {type}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <span className="me-2">💰</span>
                  <label className="form-label mb-0 fw-bold small">PRICE RANGE</label>
                </div>
                <small className="text-muted">per month</small>
              </div>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
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

            {/* Bedrooms Filter */}
            {shouldShowBedroomFilter() && (
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <span className="me-2">🛏️</span>
                    <label className="form-label mb-0 fw-bold small">BEDROOMS</label>
                  </div>
                  <small className="text-muted">residential only</small>
                </div>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
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

            {/* Clear Filters */}
            <Button
              variant="outline-secondary"
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
              className="w-100 mb-4"
            >
              <span className="me-2">✕</span>
              Clear Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>

            {/* Available Counter */}
            <div className="text-center p-4 text-white rounded-3" style={{background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'}}>
              <h2 className="mb-1 fw-bold">{filteredProperties.length}</h2>
              <p className="mb-0">Properties Found</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <Container fluid className="p-4">
            {/* Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
              <div>
                <h2 className="mb-1 fw-bold">{filteredProperties.length} Properties Found</h2>
                <p className="mb-0 text-muted">Browse our premium collection • All verified listings</p>
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                  size="sm"
                >
                  🔲 GRID
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
                  size="sm"
                >
                  📋 LIST
                </Button>
              </div>
            </div>

            {/* Properties Display */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-5">
                <div className="mb-4" style={{fontSize: '4rem', opacity: 0.5}}>
                  {searchQuery ? '🔍' : (getActiveFiltersCount() > 0 ? '🔧' : '📂')}
                </div>
                <h3 className="fw-bold mb-3">
                  {searchQuery ? 'No Search Results' : (getActiveFiltersCount() > 0 ? 'No Matching Properties' : 'No Properties Available')}
                </h3>
                <p className="text-muted mb-4">
                  {searchQuery ? 
                    `We couldn't find any properties matching "${searchQuery}".` : 
                    (getActiveFiltersCount() > 0 ? 
                      'No properties match your current filters.' : 
                      'No properties are currently available.'
                    )
                  }
                </p>
                <Button onClick={clearFilters}>
                  {getActiveFiltersCount() > 0 ? 'Clear All Filters' : 'Refresh Properties'}
                </Button>
              </div>
            ) : (
              <Row className={viewMode === 'grid' ? 'g-4' : 'g-3'}>
                {filteredProperties.map((property) => {
                  if (!property?._id) return null;
                  
                  return (
                    <Col 
                      key={property._id} 
                      xs={12} 
                      md={viewMode === 'list' ? 12 : 6} 
                      lg={viewMode === 'list' ? 12 : 4}
                    >
                      <Card className="h-100 shadow-sm border-0 property-card">
                        {viewMode === 'list' ? (
                          <Row className="g-0 h-100">
                            <Col md={4}>
                              <div className="position-relative h-100">
                                <img
                                  src={property.images?.[0]}
                                  alt={property.title}
                                  onError={handleImageError}
                                  className="w-100 h-100 object-fit-cover rounded-start"
                                  style={{minHeight: '200px'}}
                                />
                                <div className="position-absolute top-0 start-0 p-2">
                                  <Badge bg="success" className="me-1 small">✓ AVAILABLE</Badge>
                                  <Badge bg="primary" className="small">✓ VERIFIED</Badge>
                                </div>
                              </div>
                            </Col>
                            <Col md={8}>
                              <Card.Body className="d-flex flex-column h-100">
                                <div className="d-flex align-items-center mb-2">
                                  <span className="me-2" style={{color: '#7c3aed'}}>📍</span>
                                  <small className="text-muted text-uppercase fw-medium">
                                    {property.address?.city}, {property.address?.state}
                                  </small>
                                </div>
                                
                                <Card.Title className="h5 fw-bold mb-2">{property.title}</Card.Title>
                                
                                <p className="text-muted mb-3 flex-grow-1" style={{fontSize: '0.9rem'}}>
                                  {property.description.length > 120 ? 
                                    `${property.description.substring(0, 120)}...` : 
                                    property.description
                                  }
                                </p>
                                
                                <div className="mb-3">
                                  <Badge bg="primary" className="me-2 small">{property.category}</Badge>
                                  {property.size && <small className="text-muted me-2">{property.size}</small>}
                                  <div className="mt-2">
                                    {renderPropertyDetails(property)}
                                  </div>
                                </div>
                                
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                  <div>
                                    <div className="fw-bold text-success h5 mb-1">
                                      {getFormattedPrice(property)}
                                    </div>
                                    <small className="text-muted">
                                      Available for {getSafeRentTypes(property)}
                                    </small>
                                  </div>
                                  
                                  <div className="d-flex gap-2">
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      onClick={() => handleViewDetails(property._id)}
                                    >
                                      View Details
                                    </Button>
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      onClick={() => handleBookNow(property._id)}
                                    >
                                      Book Now
                                    </Button>
                                  </div>
                                </div>
                              </Card.Body>
                            </Col>
                          </Row>
                        ) : (
                          <>
                            <div className="position-relative">
                              <img
                                src={property.images?.[0]}
                                alt={property.title}
                                onError={handleImageError}
                                className="card-img-top"
                                style={{height: '200px', objectFit: 'cover'}}
                              />
                              <div className="position-absolute top-0 start-0 p-2">
                                <Badge bg="success" className="me-1 small">✓ AVAILABLE</Badge>
                                <Badge bg="primary" className="small">✓ VERIFIED</Badge>
                              </div>
                            </div>
                            
                            <Card.Body className="d-flex flex-column">
                              <div className="d-flex align-items-center mb-2">
                                <span className="me-2" style={{color: '#7c3aed'}}>📍</span>
                                <small className="text-muted text-uppercase fw-medium">
                                  {property.address?.city}, {property.address?.state}
                                </small>
                              </div>
                              
                              <Card.Title className="h6 fw-bold mb-2">{property.title}</Card.Title>
                              
                              <p className="text-muted mb-3 flex-grow-1" style={{fontSize: '0.85rem'}}>
                                {property.description.length > 80 ? 
                                  `${property.description.substring(0, 80)}...` : 
                                  property.description
                                }
                              </p>
                              
                              <div className="mb-3">
                                <Badge bg="primary" className="me-2 small">{property.category}</Badge>
                                {property.size && <small className="text-muted">{property.size}</small>}
                                <div className="mt-2">
                                  {renderPropertyDetails(property)}
                                </div>
                              </div>
                              
                              <div className="mt-auto">
                                <div className="mb-3">
                                  <div className="fw-bold text-success h6 mb-1">
                                    {getFormattedPrice(property)}
                                  </div>
                                  <small className="text-muted">
                                    Available for {getSafeRentTypes(property)}
                                  </small>
                                </div>
                                
                                <div className="d-grid gap-2">
                                  <Button
                                    variant="outline-primary"
                                    onClick={() => handleViewDetails(property._id)}
                                    size="sm"
                                  >
                                    View Details
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={() => handleBookNow(property._id)}
                                    size="sm"
                                  >
                                    Book Now
                                  </Button>
                                </div>
                              </div>
                            </Card.Body>
                          </>
                        )}
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Container>
        </div>
      </div>

      {/* CSS STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .dashboard-wrapper {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          background: #ffffff;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          padding: 4rem 0;
          color: white;
        }
        
        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 25px;
          padding: 8px 20px;
          margin-bottom: 20px;
        }
        
        .hero-badge-text {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .dashboard-main {
          display: flex;
          min-height: calc(100vh - 200px);
        }
        
        .sidebar {
          width: 350px;
          min-width: 350px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          height: calc(100vh - 200px);
          overflow-y: auto;
        }
        
        .search-input {
          border-radius: 8px;
          border: 1px solid #d1d5db;
          padding: 10px 12px;
          font-size: 0.9rem;
          transition: border-color 0.3s;
        }
        
        .search-input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
          outline: none;
        }
        
        .main-content {
          flex: 1;
          background: #f9fafb;
        }
        
        .property-card {
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .property-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.15) !important;
        }
        
        .object-fit-cover {
          object-fit: cover;
        }
        
        @media (max-width: 768px) {
          .dashboard-main {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
