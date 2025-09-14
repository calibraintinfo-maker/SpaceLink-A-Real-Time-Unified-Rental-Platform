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

  // 🔥 Professional image handling
  const getValidImages = (property) => {
    if (property.images && Array.isArray(property.images) && property.images.length > 0) {
      const validImages = property.images.filter(img => 
        img && typeof img === 'string' && (img.startsWith('http') || img.startsWith('data:image'))
      );
      if (validImages.length > 0) return validImages;
    }
    
    if (property.image && typeof property.image === 'string' && property.image.trim()) {
      return [property.image];
    }
    
    // Premium fallback images
    const premiumImages = [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop&auto=format&q=80'
    ];
    
    return [premiumImages[Math.floor(Math.random() * premiumImages.length)]];
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      
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
      
      const validProperties = propertiesArray.filter(property => 
        property && (property._id || property.id)
      ).map(property => ({
        ...property,
        _id: property._id || property.id,
        title: property.title || 'Premium Property',
        description: property.description || 'Experience luxury living with modern amenities and prime location access.',
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
      
      setProperties(validProperties);
      setFilteredProperties(validProperties);
      
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

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
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop&auto=format&q=80'
    ];
    e.target.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  };

  const renderPropertyDetails = (property) => {
    const details = [];
    
    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" className="detail-badge bedroom-badge">
            🛏️ {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" className="detail-badge bathroom-badge">
            🚿 {property.bathrooms} Bath
          </Badge>
        );
      }
    }
    
    if (property.size) {
      details.push(
        <Badge key="area" className="detail-badge area-badge">
          📐 {property.size}
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

  if (loading) {
    return (
      <div className="professional-dashboard">
        <div className="hero-section-loading">
          <Container>
            <div className="loading-content">
              <div className="loading-animation">
                <div className="pulse-ring"></div>
                <div className="pulse-ring delay-1"></div>
                <div className="pulse-ring delay-2"></div>
              </div>
              <h2 className="loading-title">Loading Premium Properties</h2>
              <p className="loading-subtitle">Connecting to your backend...</p>
            </div>
          </Container>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="professional-dashboard">
        <div className="hero-section-error">
          <Container>
            <Alert className="premium-error-alert">
              <div className="error-icon">⚠️</div>
              <h3 className="error-title">Connection Error</h3>
              <p className="error-message">{error}</p>
              <div className="error-actions">
                <Button onClick={fetchProperties} className="retry-btn">
                  <span className="btn-icon">🔄</span>
                  Retry Connection
                </Button>
                <Button variant="outline-light" onClick={() => window.location.reload()}>
                  <span className="btn-icon">⟳</span>
                  Refresh Page
                </Button>
              </div>
            </Alert>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="professional-dashboard">
      {/* PREMIUM HERO SECTION */}
      <section className="premium-hero">
        <div className="hero-gradient"></div>
        <div className="hero-particles"></div>
        <Container className="hero-container">
          <Row className="align-items-center min-vh-50">
            <Col lg={8} className="hero-content">
              <div className="hero-badge-container">
                <div className="hero-badge">
                  <span className="badge-icon">⭐</span>
                  <span className="badge-text">{filteredProperties.length} Premium Properties Available</span>
                  <div className="badge-glow"></div>
                </div>
              </div>
              <h1 className="hero-title">
                Find Your Perfect
                <span className="title-highlight"> Property</span>
              </h1>
              <p className="hero-subtitle">
                Discover verified premium properties across India with our advanced search and filtering system.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">{properties.length}+</span>
                  <span className="stat-label">Properties</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">{indianLocations.length - 1}+</span>
                  <span className="stat-label">Cities</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Verified</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* PROFESSIONAL DASHBOARD MAIN */}
      <section className="dashboard-main-section">
        <Container fluid className="px-0">
          <Row className="g-0">
            {/* PREMIUM SIDEBAR */}
            <Col xl={3} lg={4} className="sidebar-col">
              <div className="premium-sidebar">
                <div className="sidebar-header">
                  <h3 className="sidebar-title">
                    <span className="title-icon">🔍</span>
                    Smart Filters
                  </h3>
                  <div className="active-filters-count">
                    {getActiveFiltersCount()}
                  </div>
                </div>

                <div className="sidebar-content">
                  {/* Premium Search */}
                  <div className="filter-group search-group">
                    <div className="filter-label">
                      <span className="label-icon">🔍</span>
                      <span className="label-text">SEARCH PROPERTIES</span>
                    </div>
                    <div className="search-input-container">
                      <Form.Control
                        type="text"
                        placeholder="Search by location, type, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="premium-search-input"
                      />
                      <div className="search-icon-overlay">
                        <i className="search-icon">🔍</i>
                      </div>
                    </div>
                    {searchQuery && (
                      <div className="search-results-info">
                        <span className="results-count">{filteredProperties.length}</span>
                        <span className="results-text">results for "{searchQuery}"</span>
                      </div>
                    )}
                  </div>

                  {/* Location Filter */}
                  <div className="filter-group">
                    <div className="filter-label">
                      <span className="label-icon">📍</span>
                      <span className="label-text">LOCATION</span>
                      <span className="label-count">{indianLocations.length - 1} cities</span>
                    </div>
                    <Form.Select
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="premium-select"
                    >
                      {indianLocations.map((location, index) => (
                        <option key={index} value={location === "All Locations" ? "" : location}>
                          {location}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  {/* Property Type Filter */}
                  <div className="filter-group">
                    <div className="filter-label">
                      <span className="label-icon">🏠</span>
                      <span className="label-text">PROPERTY TYPE</span>
                      <span className="label-count">{propertyTypes.length - 1} categories</span>
                    </div>
                    <Form.Select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      className="premium-select"
                    >
                      {propertyTypes.map((type, index) => (
                        <option key={index} value={type === "All Categories" ? "" : type}>
                          {getCategoryIcon(type)} {type}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  {/* Price Range Filter */}
                  <div className="filter-group">
                    <div className="filter-label">
                      <span className="label-icon">💰</span>
                      <span className="label-text">PRICE RANGE</span>
                      <span className="label-count">per month</span>
                    </div>
                    <Form.Select
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="premium-select"
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
                    <div className="filter-group">
                      <div className="filter-label">
                        <span className="label-icon">🛏️</span>
                        <span className="label-text">BEDROOMS</span>
                        <span className="label-count">residential only</span>
                      </div>
                      <Form.Select
                        value={filters.bedrooms}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                        className="premium-select"
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
                  <div className="filter-actions">
                    <Button
                      onClick={clearFilters}
                      disabled={getActiveFiltersCount() === 0}
                      className="clear-filters-btn"
                    >
                      <span className="btn-icon">✕</span>
                      Clear All Filters
                      {getActiveFiltersCount() > 0 && (
                        <span className="filter-count">({getActiveFiltersCount()})</span>
                      )}
                    </Button>
                  </div>

                  {/* Results Counter */}
                  <div className="results-counter">
                    <div className="counter-number">{filteredProperties.length}</div>
                    <div className="counter-label">Properties Found</div>
                    <div className="counter-glow"></div>
                  </div>
                </div>
              </div>
            </Col>

            {/* PREMIUM MAIN CONTENT */}
            <Col xl={9} lg={8} className="main-content-col">
              <div className="premium-main-content">
                {/* Results Header */}
                <div className="results-header">
                  <div className="results-info">
                    <h2 className="results-title">
                      <span className="title-number">{filteredProperties.length}</span>
                      <span className="title-text">Properties Found</span>
                    </h2>
                    <p className="results-subtitle">
                      Premium collection • Updated today • All verified listings
                    </p>
                  </div>
                  <div className="view-controls">
                    <div className="view-toggle">
                      <Button
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                      >
                        <span className="btn-icon">⊞</span>
                        <span className="btn-text">Grid</span>
                      </Button>
                      <Button
                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                      >
                        <span className="btn-icon">☰</span>
                        <span className="btn-text">List</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Properties Display */}
                {filteredProperties.length === 0 ? (
                  <div className="no-results-section">
                    <div className="no-results-content">
                      <div className="no-results-icon">
                        {searchQuery ? '🔍' : (getActiveFiltersCount() > 0 ? '🔧' : '📂')}
                      </div>
                      <h3 className="no-results-title">
                        {searchQuery ? 'No Search Results' : (getActiveFiltersCount() > 0 ? 'No Matching Properties' : 'No Properties Available')}
                      </h3>
                      <p className="no-results-text">
                        {searchQuery ? 
                          `We couldn't find any properties matching "${searchQuery}". Try adjusting your search terms.` : 
                          (getActiveFiltersCount() > 0 ? 
                            'No properties match your current filters. Try adjusting or clearing some filters.' : 
                            'No properties are currently available. Please check back later.'
                          )
                        }
                      </p>
                      <Button onClick={clearFilters} className="no-results-btn">
                        <span className="btn-icon">{getActiveFiltersCount() > 0 ? '✕' : '🔄'}</span>
                        {getActiveFiltersCount() > 0 ? 'Clear All Filters' : 'Refresh Properties'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="properties-container">
                    <Row className={`properties-grid ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
                      {filteredProperties.map((property, index) => {
                        if (!property?._id) return null;
                        
                        return (
                          <Col 
                            key={property._id} 
                            xs={12} 
                            md={viewMode === 'list' ? 12 : 6} 
                            xl={viewMode === 'list' ? 12 : 4}
                            className="property-col"
                          >
                            <Card 
                              className={`premium-property-card ${viewMode === 'list' ? 'list-card' : 'grid-card'}`}
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              {viewMode === 'list' ? (
                                <Row className="g-0 h-100">
                                  <Col md={5} className="image-col">
                                    <div className="card-image-container">
                                      <img
                                        src={property.images?.[0]}
                                        alt={property.title}
                                        onError={handleImageError}
                                        className="card-image"
                                      />
                                      <div className="image-overlay"></div>
                                      <div className="property-badges">
                                        <Badge className="available-badge">
                                          <span className="badge-icon">✓</span>
                                          AVAILABLE
                                        </Badge>
                                        <Badge className="verified-badge">
                                          <span className="badge-icon">✓</span>
                                          VERIFIED
                                        </Badge>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col md={7} className="content-col">
                                    <Card.Body className="premium-card-body">
                                      <div className="property-location">
                                        <span className="location-icon">📍</span>
                                        <span className="location-text">
                                          {property.address?.city}, {property.address?.state}
                                        </span>
                                      </div>
                                      
                                      <h3 className="property-title">{property.title}</h3>
                                      
                                      <p className="property-description">
                                        {property.description.length > 120 ? 
                                          `${property.description.substring(0, 120)}...` : 
                                          property.description
                                        }
                                      </p>
                                      
                                      <div className="property-details">
                                        <Badge className="category-badge">
                                          {getCategoryIcon(property.category)} {property.category}
                                        </Badge>
                                        <div className="detail-badges">
                                          {renderPropertyDetails(property)}
                                        </div>
                                      </div>
                                      
                                      <div className="card-footer-content">
                                        <div className="pricing-info">
                                          <div className="price-main">
                                            {getFormattedPrice(property)}
                                          </div>
                                          <div className="price-period">
                                            Available for {getSafeRentTypes(property)}
                                          </div>
                                        </div>
                                        
                                        <div className="action-buttons">
                                          <Button
                                            onClick={() => handleViewDetails(property._id)}
                                            className="view-details-btn"
                                          >
                                            <span className="btn-icon">👁️</span>
                                            View Details
                                          </Button>
                                          <Button
                                            onClick={() => handleBookNow(property._id)}
                                            className="book-now-btn"
                                          >
                                            <span className="btn-icon">📅</span>
                                            Book Now
                                          </Button>
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Col>
                                </Row>
                              ) : (
                                <>
                                  <div className="card-image-container">
                                    <img
                                      src={property.images?.[0]}
                                      alt={property.title}
                                      onError={handleImageError}
                                      className="card-image"
                                    />
                                    <div className="image-overlay"></div>
                                    <div className="property-badges">
                                      <Badge className="available-badge">
                                        <span className="badge-icon">✓</span>
                                        AVAILABLE
                                      </Badge>
                                      <Badge className="verified-badge">
                                        <span className="badge-icon">✓</span>
                                        VERIFIED
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  <Card.Body className="premium-card-body">
                                    <div className="property-location">
                                      <span className="location-icon">📍</span>
                                      <span className="location-text">
                                        {property.address?.city}, {property.address?.state}
                                      </span>
                                    </div>
                                    
                                    <h3 className="property-title">{property.title}</h3>
                                    
                                    <p className="property-description">
                                      {property.description.length > 80 ? 
                                        `${property.description.substring(0, 80)}...` : 
                                        property.description
                                      }
                                    </p>
                                    
                                    <div className="property-details">
                                      <Badge className="category-badge">
                                        {getCategoryIcon(property.category)} {property.category}
                                      </Badge>
                                      <div className="detail-badges">
                                        {renderPropertyDetails(property)}
                                      </div>
                                    </div>
                                    
                                    <div className="card-footer-content">
                                      <div className="pricing-info">
                                        <div className="price-main">
                                          {getFormattedPrice(property)}
                                        </div>
                                        <div className="price-period">
                                          Available for {getSafeRentTypes(property)}
                                        </div>
                                      </div>
                                      
                                      <div className="action-buttons">
                                        <Button
                                          onClick={() => handleViewDetails(property._id)}
                                          className="view-details-btn"
                                        >
                                          <span className="btn-icon">👁️</span>
                                          View Details
                                        </Button>
                                        <Button
                                          onClick={() => handleBookNow(property._id)}
                                          className="book-now-btn"
                                        >
                                          <span className="btn-icon">📅</span>
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
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* INDUSTRY-GRADE CSS STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --premium-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          --premium-shadow-hover: 0 20px 60px rgba(0, 0, 0, 0.15);
          --border-radius: 16px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .professional-dashboard {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }
        
        /* PREMIUM HERO SECTION */
        .premium-hero {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          overflow: hidden;
          padding: 6rem 0 4rem;
        }
        
        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
          z-index: 1;
        }
        
        .hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          z-index: 2;
        }
        
        .hero-container {
          position: relative;
          z-index: 3;
        }
        
        .hero-badge-container {
          margin-bottom: 2rem;
        }
        
        .hero-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.025em;
        }
        
        .badge-icon {
          margin-right: 0.5rem;
          font-size: 1rem;
        }
        
        .badge-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          border-radius: 50px;
          z-index: -1;
          animation: glow 3s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
        }
        
        .title-highlight {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          font-weight: 400;
          opacity: 0.9;
          max-width: 600px;
          margin-bottom: 3rem;
          line-height: 1.6;
        }
        
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.25rem;
        }
        
        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .stat-divider {
          width: 1px;
          height: 2rem;
          background: rgba(255, 255, 255, 0.3);
        }
        
        /* PREMIUM SIDEBAR */
        .sidebar-col {
          background: white;
          box-shadow: var(--premium-shadow);
        }
        
        .premium-sidebar {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          background: white;
        }
        
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 1.5rem 1rem;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .sidebar-title {
          display: flex;
          align-items: center;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }
        
        .title-icon {
          margin-right: 0.75rem;
          font-size: 1.25rem;
        }
        
        .active-filters-count {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background: var(--primary-gradient);
          color: white;
          border-radius: 50%;
          font-size: 0.875rem;
          font-weight: 700;
        }
        
        .sidebar-content {
          padding: 1.5rem;
        }
        
        .filter-group {
          margin-bottom: 2rem;
        }
        
        .search-group {
          margin-bottom: 2.5rem;
        }
        
        .filter-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        
        .label-icon {
          margin-right: 0.5rem;
          font-size: 0.875rem;
        }
        
        .label-text {
          font-size: 0.75rem;
          font-weight: 700;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .label-count {
          font-size: 0.7rem;
          color: #999;
        }
        
        .search-input-container {
          position: relative;
        }
        
        .premium-search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 2.5rem;
          border: 2px solid #f0f0f0;
          border-radius: var(--border-radius);
          font-size: 0.875rem;
          font-weight: 500;
          background: white;
          transition: var(--transition);
        }
        
        .premium-search-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          outline: none;
        }
        
        .search-icon-overlay {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
        
        .search-icon {
          color: #999;
          font-size: 0.875rem;
        }
        
        .search-results-info {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #666;
        }
        
        .results-count {
          font-weight: 700;
          color: #667eea;
        }
        
        .premium-select {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #f0f0f0;
          border-radius: var(--border-radius);
          font-size: 0.875rem;
          font-weight: 500;
          background: white;
          transition: var(--transition);
        }
        
        .premium-select:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          outline: none;
        }
        
        .filter-actions {
          margin-bottom: 2rem;
        }
        
        .clear-filters-btn {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #f0f0f0;
          border-radius: var(--border-radius);
          background: white;
          color: #666;
          font-size: 0.875rem;
          font-weight: 600;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .clear-filters-btn:hover:not(:disabled) {
          border-color: #ff6b6b;
          color: #ff6b6b;
          background: rgba(255, 107, 107, 0.05);
        }
        
        .clear-filters-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .filter-count {
          background: #ff6b6b;
          color: white;
          padding: 0.125rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          margin-left: 0.5rem;
        }
        
        .results-counter {
          position: relative;
          background: var(--primary-gradient);
          color: white;
          padding: 2rem 1.5rem;
          border-radius: var(--border-radius);
          text-align: center;
          overflow: hidden;
        }
        
        .counter-number {
          font-size: 3rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        
        .counter-label {
          font-size: 1rem;
          font-weight: 600;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .counter-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          border-radius: var(--border-radius);
          z-index: -1;
          animation: glow 4s ease-in-out infinite;
        }
        
        /* PREMIUM MAIN CONTENT */
        .main-content-col {
          padding: 0;
        }
        
        .premium-main-content {
          padding: 2rem;
          background: #fafbfc;
          min-height: 100vh;
        }
        
        .results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .results-info {
          flex: 1;
        }
        
        .results-title {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .title-number {
          font-size: 2.5rem;
          font-weight: 900;
          color: #667eea;
          line-height: 1;
        }
        
        .title-text {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
        }
        
        .results-subtitle {
          font-size: 1rem;
          color: #666;
          margin: 0;
        }
        
        .view-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .view-toggle {
          display: flex;
          background: white;
          border-radius: var(--border-radius);
          padding: 0.25rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          border: 1px solid #f0f0f0;
        }
        
        .view-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          color: #666;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 12px;
          transition: var(--transition);
        }
        
        .view-btn.active {
          background: var(--primary-gradient);
          color: white;
          box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
        }
        
        .btn-icon {
          font-size: 0.875rem;
        }
        
        /* PREMIUM PROPERTY CARDS */
        .properties-container {
          animation: fadeInUp 0.6s ease-out;
        }
        
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
        
        .properties-grid {
          margin: -0.75rem;
        }
        
        .properties-grid.grid-view .property-col {
          padding: 0.75rem;
        }
        
        .properties-grid.list-view .property-col {
          padding: 0.5rem 0;
        }
        
        .premium-property-card {
          background: white;
          border: none;
          border-radius: var(--border-radius);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: var(--transition);
          overflow: hidden;
          cursor: pointer;
          animation: slideInUp 0.6s ease-out both;
        }
        
        .premium-property-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--premium-shadow-hover);
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card-image-container {
          position: relative;
          overflow: hidden;
        }
        
        .grid-card .card-image-container {
          height: 220px;
        }
        
        .list-card .card-image-container {
          height: 200px;
        }
        
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        
        .premium-property-card:hover .card-image {
          transform: scale(1.05);
        }
        
        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .premium-property-card:hover .image-overlay {
          opacity: 1;
        }
        
        .property-badges {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          gap: 0.5rem;
          z-index: 2;
        }
        
        .available-badge, .verified-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .available-badge {
          background: rgba(34, 197, 94, 0.9);
          color: white;
        }
        
        .verified-badge {
          background: rgba(59, 130, 246, 0.9);
          color: white;
        }
        
        .badge-icon {
          font-size: 0.75rem;
        }
        
        .premium-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .list-card .premium-card-body {
          justify-content: space-between;
        }
        
        .property-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .location-icon {
          color: #667eea;
          font-size: 0.875rem;
        }
        
        .location-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
        
        .property-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.3;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        
        .property-description {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        
        .property-details {
          margin-bottom: 1.5rem;
        }
        
        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          background: var(--primary-gradient);
          color: white;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        
        .detail-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .detail-badge {
          padding: 0.375rem 0.75rem;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 600;
          background: #f8f9fa;
          color: #495057;
          border: 1px solid #e9ecef;
        }
        
        .bedroom-badge { background: rgba(255, 107, 107, 0.1); color: #ff6b6b; border-color: rgba(255, 107, 107, 0.2); }
        .bathroom-badge { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border-color: rgba(59, 130, 246, 0.2); }
        .area-badge { background: rgba(16, 185, 129, 0.1); color: #10b981; border-color: rgba(16, 185, 129, 0.2); }
        
        .card-footer-content {
          margin-top: auto;
        }
        
        .pricing-info {
          margin-bottom: 1.5rem;
        }
        
        .price-main {
          font-size: 1.5rem;
          font-weight: 800;
          color: #10b981;
          line-height: 1.2;
          margin-bottom: 0.25rem;
        }
        
        .price-period {
          font-size: 0.8rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
        
        .action-buttons {
          display: flex;
          gap: 0.75rem;
        }
        
        .list-card .action-buttons {
          flex-direction: column;
        }
        
        .grid-card .action-buttons {
          flex-direction: row;
        }
        
        .view-details-btn, .book-now-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          transition: var(--transition);
          border: none;
        }
        
        .view-details-btn {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }
        
        .view-details-btn:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .book-now-btn {
          background: var(--primary-gradient);
          color: white;
        }
        
        .book-now-btn:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #667eea 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        /* NO RESULTS SECTION */
        .no-results-section {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          padding: 3rem;
        }
        
        .no-results-content {
          text-align: center;
          max-width: 500px;
        }
        
        .no-results-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          opacity: 0.6;
        }
        
        .no-results-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 1rem;
        }
        
        .no-results-text {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        
        .no-results-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: var(--primary-gradient);
          color: white;
          border: none;
          border-radius: var(--border-radius);
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          transition: var(--transition);
        }
        
        .no-results-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        
        /* LOADING STATES */
        .hero-section-loading {
          background: var(--primary-gradient);
          color: white;
          padding: 6rem 0;
          text-align: center;
        }
        
        .loading-content {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .loading-animation {
          position: relative;
          display: inline-block;
          margin-bottom: 2rem;
        }
        
        .pulse-ring {
          width: 60px;
          height: 60px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          position: absolute;
          animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        .delay-1 { animation-delay: 0.5s; }
        .delay-2 { animation-delay: 1s; }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.33); opacity: 1; }
          80%, 100% { transform: scale(2.5); opacity: 0; }
        }
        
        .loading-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .loading-subtitle {
          font-size: 1rem;
          opacity: 0.8;
        }
        
        /* ERROR STATES */
        .hero-section-error {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
          color: white;
          padding: 6rem 0;
        }
        
        .premium-error-alert {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--border-radius);
          color: white;
          text-align: center;
          padding: 2rem;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .error-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .error-message {
          font-size: 1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        
        .retry-btn {
          background: white;
          color: #ff6b6b;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          transition: var(--transition);
        }
        
        .retry-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        /* RESPONSIVE DESIGN */
        @media (max-width: 1200px) {
          .premium-hero { padding: 4rem 0 3rem; }
          .hero-title { font-size: clamp(2rem, 4vw, 3rem); }
          .hero-stats { gap: 1.5rem; }
          .stat-number { font-size: 1.75rem; }
          .sidebar-col { order: 2; }
          .main-content-col { order: 1; }
        }
        
        @media (max-width: 992px) {
          .premium-sidebar {
            position: relative;
            height: auto;
            background: white;
            border-radius: var(--border-radius);
            margin-bottom: 2rem;
          }
          .sidebar-header { padding: 1.5rem 1rem 0.5rem; }
          .sidebar-content { padding: 1rem; }
          .premium-main-content { padding: 1rem; }
          .results-header { flex-direction: column; align-items: flex-start; }
          .view-controls { align-self: stretch; }
          .view-toggle { width: 100%; }
          .view-btn { flex: 1; justify-content: center; }
        }
        
        @media (max-width: 768px) {
          .hero-title { font-size: clamp(1.75rem, 6vw, 2.5rem); }
          .hero-stats { flex-direction: column; gap: 1rem; }
          .stat-divider { display: none; }
          .properties-grid.grid-view .property-col { padding: 0.5rem 0; }
          .premium-property-card { border-radius: 12px; }
          .action-buttons { flex-direction: column; }
          .view-details-btn, .book-now-btn { padding: 0.75rem 1rem; }
          .results-title { flex-direction: column; align-items: flex-start; gap: 0; }
          .title-number { font-size: 2rem; }
          .title-text { font-size: 1.5rem; }
        }
        
        @media (max-width: 576px) {
          .premium-hero { padding: 3rem 0 2rem; }
          .hero-badge { padding: 0.5rem 1rem; font-size: 0.8rem; }
          .hero-subtitle { font-size: 1rem; margin-bottom: 2rem; }
          .premium-main-content { padding: 0.5rem; }
          .premium-sidebar { border-radius: 8px; }
          .premium-property-card { border-radius: 8px; }
          .card-image-container { height: 180px; }
          .premium-card-body { padding: 1rem; }
          .property-title { font-size: 1.125rem; }
          .price-main { font-size: 1.25rem; }
        }
        
        /* SCROLLBAR STYLING */
        .premium-sidebar::-webkit-scrollbar { width: 4px; }
        .premium-sidebar::-webkit-scrollbar-track { background: #f1f1f1; }
        .premium-sidebar::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 2px; }
        .premium-sidebar::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
        
        /* ACCESSIBILITY IMPROVEMENTS */
        .view-btn:focus, .premium-search-input:focus, .premium-select:focus,
        .view-details-btn:focus, .book-now-btn:focus, .clear-filters-btn:focus {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
          .premium-property-card:hover { transform: none; }
          .card-image { transition: none; }
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
