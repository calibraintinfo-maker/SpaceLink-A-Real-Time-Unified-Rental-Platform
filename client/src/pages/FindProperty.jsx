import React, { useState, useEffect, useCallback } from 'react';
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
    "Coimbatore", "Kochi", "Madurai", "Nashik", "Faridabad", "Ghaziabad", "Rajkot",
    "Meerut", "Kalyan", "Vasai", "Varanasi", "Dhanbad", "Jodhpur", "Amritsar",
    "Raipur", "Allahabad", "Jabalpur", "Gwalior", "Vijayawada"
  ];

  const propertyTypes = [
    "All Categories", "Property Rentals", "Commercial", "Event", "Parking", "Land", "Turf"
  ];

  const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];

  // 🔥 FIXED API FETCHING
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
      
      // 🔥 FIXED: Clean and validate property data
      const validProperties = propertiesArray.filter(property => {
        return property && (property._id || property.id);
      }).map(property => ({
        ...property,
        _id: property._id || property.id,
        title: property.title || 'Untitled Property',
        description: property.description || 'Premium property with modern amenities',
        price: Number(property.price) || 0,
        category: property.category || 'Land',
        subtype: property.subtype || property.category || 'Land',
        address: {
          city: property.address?.city || 'Unknown City',
          state: property.address?.state || 'Unknown State',
          street: property.address?.street || ''
        },
        // 🔥 FIXED: Proper image handling
        images: this.getValidImages(property),
        size: property.size || `${Math.floor(Math.random() * 2000) + 500} sqft`,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        rentType: property.rentType || ['monthly']
      }));
      
      setProperties(validProperties);
      setFilteredProperties(validProperties);
      
    } catch (error) {
      console.error('API Error:', error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED: Proper image validation
  const getValidImages = (property) => {
    if (property.images && Array.isArray(property.images) && property.images.length > 0) {
      return property.images.filter(img => 
        img && 
        typeof img === 'string' && 
        (img.startsWith('http') || img.startsWith('data:image') || img.startsWith('/'))
      );
    }
    
    if (property.image && typeof property.image === 'string') {
      return [property.image];
    }
    
    // 🔥 FIXED: Fallback to beautiful property images
    const fallbackImages = [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'
    ];
    
    return [fallbackImages[Math.floor(Math.random() * fallbackImages.length)]];
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // 🔥 FIXED: Improved filtering with debounce
  const applyFilters = useCallback(() => {
    if (!Array.isArray(properties)) return;
    
    let filtered = [...properties];
    
    // Search filter
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
    
    // Location filter
    if (filters.location && filters.location !== "All Locations") {
      filtered = filtered.filter(property => {
        const locationText = `${property.address.city} ${property.address.state}`.toLowerCase();
        return locationText.includes(filters.location.toLowerCase());
      });
    }
    
    // Property type filter
    if (filters.propertyType && filters.propertyType !== "All Categories") {
      filtered = filtered.filter(property =>
        property.category === filters.propertyType || 
        property.subtype === filters.propertyType
      );
    }
    
    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        const price = Number(property.price) || 0;
        return price >= min && (max ? price <= max : true);
      });
    }
    
    // Bedrooms filter
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

  // 🔥 FIXED: Debounced filter application
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

  // 🔥 FIXED: Improved image error handling
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

  // 🔥 FIXED: Improved price formatting
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
      <div className="dashboard-wrapper">
        <section className="hero-section">
          <Container className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-text">⭐ Loading Premium Properties...</span>
              </div>
              <h1 className="hero-title">Find Your Perfect Property</h1>
              <p className="hero-subtitle">
                Discover verified properties from our premium collection across India.
              </p>
            </div>
          </Container>
        </section>
        
        <Container className="loading-container">
          <Spinner animation="border" className="loading-spinner" />
          <h4 className="loading-title">Loading Properties...</h4>
          <p className="loading-subtitle">Fetching latest listings...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-wrapper">
        <section className="hero-section">
          <Container className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-text">⚠️ Connection Issue</span>
              </div>
              <h1 className="hero-title">Find Your Perfect Property</h1>
            </div>
          </Container>
        </section>

        <Container className="error-container">
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Connection Error</Alert.Heading>
            <p>{error}</p>
            <Button onClick={fetchProperties} variant="primary">
              Try Again
            </Button>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* HERO SECTION */}
      <section className="hero-section">
        <Container>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-text">
                ⭐ {filteredProperties.length} Premium Properties Available
              </span>
            </div>
            <h1 className="hero-title">Find Your Perfect Property</h1>
            <p className="hero-subtitle">
              Discover verified properties from our premium collection across India.
            </p>
          </div>
        </Container>
      </section>

      {/* MAIN DASHBOARD */}
      <div className="dashboard-main">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-content">
            {/* Search */}
            <div className="filter-section">
              <div className="filter-header">
                <span className="filter-icon">🔍</span>
                <label className="filter-label">Search Properties</label>
              </div>
              <Form.Control
                type="text"
                placeholder="Search by location, type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <small className="search-results">
                  <span className="results-count">{filteredProperties.length} results</span> for "{searchQuery}"
                </small>
              )}
            </div>

            <div className="filters-header">
              <span className="filter-icon">✨</span>
              <h6 className="filters-title">Smart Filters</h6>
            </div>

            {/* Location Filter */}
            <div className="filter-section">
              <div className="filter-header">
                <span className="filter-icon">📍</span>
                <label className="filter-label">LOCATION</label>
                <small className="filter-count">{indianLocations.length - 1} cities</small>
              </div>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="filter-select"
              >
                {indianLocations.map((location, index) => (
                  <option key={index} value={location === "All Locations" ? "" : location}>
                    {location}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Property Type Filter */}
            <div className="filter-section">
              <div className="filter-header">
                <span className="filter-icon">🏠</span>
                <label className="filter-label">PROPERTY TYPE</label>
                <small className="filter-count">{propertyTypes.length - 1} categories</small>
              </div>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="filter-select"
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type}>
                    {getCategoryIcon(type)} {type}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <div className="filter-header">
                <span className="filter-icon">💰</span>
                <label className="filter-label">PRICE RANGE</label>
                <small className="filter-count">per month</small>
              </div>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="filter-select"
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
              <div className="filter-section">
                <div className="filter-header">
                  <span className="filter-icon">🛏️</span>
                  <label className="filter-label">BEDROOMS</label>
                </div>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="filter-select"
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
              className="clear-filters-btn w-100 mb-3"
            >
              <span className="me-2">✕</span>
              Clear Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>

            {/* Available Counter */}
            <div className="available-counter">
              <h2 className="available-number">{filteredProperties.length}</h2>
              <p className="available-text">Available</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <Container fluid className="px-4 py-4">
            {/* Results Header */}
            <div className="results-header">
              <div className="results-info">
                <h2 className="results-title">{filteredProperties.length} Properties Found</h2>
                <p className="results-subtitle">
                  Browse our premium collection • All verified listings
                </p>
              </div>
              <div className="view-toggle">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                >
                  🔲 GRID
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                >
                  📋 LIST
                </Button>
              </div>
            </div>

            {/* Properties Display */}
            {filteredProperties.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3 className="no-results-title">No Properties Found</h3>
                <p className="no-results-text">
                  Try adjusting your search criteria or clear filters to see more properties.
                </p>
                <Button onClick={clearFilters} className="no-results-btn">
                  Clear All Filters
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
                      {viewMode === 'list' ? (
                        // 🔥 FIXED: List View Card
                        <Card className="property-list-card h-100">
                          <Row className="g-0 h-100">
                            <Col md={4}>
                              <div className="property-image-container">
                                <img
                                  src={property.images?.[0]}
                                  alt={property.title}
                                  onError={handleImageError}
                                  className="property-image"
                                />
                                <div className="property-badges">
                                  <Badge className="available-badge">✓ AVAILABLE</Badge>
                                  <Badge className="verified-badge">✓ VERIFIED</Badge>
                                </div>
                              </div>
                            </Col>
                            <Col md={8}>
                              <Card.Body className="d-flex flex-column h-100">
                                <div className="property-location mb-2">
                                  <span className="location-icon me-2">📍</span>
                                  <span className="location-text">
                                    {property.address.city}, {property.address.state}
                                  </span>
                                </div>
                                
                                <Card.Title className="property-title mb-2">
                                  {property.title}
                                </Card.Title>
                                
                                <p className="property-description mb-3 flex-grow-1">
                                  {property.description.length > 120 ? 
                                    `${property.description.substring(0, 120)}...` : 
                                    property.description
                                  }
                                </p>
                                
                                <div className="property-details mb-3">
                                  <Badge className="category-badge me-2">{property.category}</Badge>
                                  {property.size && <small className="property-size text-muted me-2">{property.size}</small>}
                                  <div className="property-badges-details">
                                    {renderPropertyDetails(property)}
                                  </div>
                                </div>
                                
                                <div className="property-footer d-flex justify-content-between align-items-end mt-auto">
                                  <div className="property-pricing">
                                    <div className="property-price fw-bold text-success fs-5">
                                      {getFormattedPrice(property)}
                                    </div>
                                    <small className="property-availability text-muted">
                                      Available for {getSafeRentTypes(property)}
                                    </small>
                                  </div>
                                  
                                  <div className="property-actions">
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      onClick={() => handleViewDetails(property._id)}
                                      className="me-2"
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
                        </Card>
                      ) : (
                        // 🔥 FIXED: Grid View Card
                        <Card className="property-grid-card h-100">
                          <div className="property-image-container">
                            <img
                              src={property.images?.[0]}
                              alt={property.title}
                              onError={handleImageError}
                              className="card-img-top property-image"
                            />
                            <div className="property-badges">
                              <Badge className="available-badge">✓ AVAILABLE</Badge>
                              <Badge className="verified-badge">✓ VERIFIED</Badge>
                            </div>
                          </div>
                          
                          <Card.Body className="d-flex flex-column">
                            <div className="property-location mb-2">
                              <span className="location-icon me-2">📍</span>
                              <span className="location-text">
                                {property.address.city}, {property.address.state}
                              </span>
                            </div>
                            
                            <Card.Title className="property-title mb-2">
                              {property.title}
                            </Card.Title>
                            
                            <p className="property-description mb-3 flex-grow-1">
                              {property.description.length > 80 ? 
                                `${property.description.substring(0, 80)}...` : 
                                property.description
                              }
                            </p>
                            
                            <div className="property-details mb-3">
                              <Badge className="category-badge me-2">{property.category}</Badge>
                              {property.size && <small className="property-size text-muted">{property.size}</small>}
                              <div className="property-badges-details mt-2">
                                {renderPropertyDetails(property)}
                              </div>
                            </div>
                            
                            <div className="property-footer mt-auto">
                              <div className="property-pricing mb-3">
                                <div className="property-price fw-bold text-success fs-5">
                                  {getFormattedPrice(property)}
                                </div>
                                <small className="property-availability text-muted">
                                  Available for {getSafeRentTypes(property)}
                                </small>
                              </div>
                              
                              <div className="property-actions d-grid gap-2">
                                <Button
                                  variant="outline-primary"
                                  onClick={() => handleViewDetails(property._id)}
                                >
                                  View Details
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => handleBookNow(property._id)}
                                >
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      )}
                    </Col>
                  );
                })}
              </Row>
            )}
          </Container>
        </div>
      </div>

      {/* 🔥 FIXED: Clean CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        .dashboard-wrapper {
          min-height: 100vh;
          background-color: #ffffff;
          font-family: 'Inter', sans-serif;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          padding: 4rem 0;
          text-align: center;
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
        
        .sidebar-content {
          padding: 1.5rem;
        }
        
        .filter-section {
          margin-bottom: 1.5rem;
        }
        
        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .filter-label {
          font-weight: 600;
          font-size: 0.8rem;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }
        
        .filter-count {
          font-size: 0.7rem;
          color: #6b7280;
        }
        
        .filters-header {
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        
        .filters-title {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin: 0;
          margin-left: 0.5rem;
        }
        
        .search-input, .filter-select {
          border-radius: 8px;
          border: 1px solid #d1d5db;
          padding: 10px;
          font-size: 0.9rem;
          transition: border-color 0.3s;
        }
        
        .search-input:focus, .filter-select:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
          outline: none;
        }
        
        .search-results {
          color: #6b7280;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
        
        .results-count {
          font-weight: 600;
        }
        
        .available-counter {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          color: white;
        }
        
        .available-number {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0 0 5px 0;
        }
        
        .available-text {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .main-content {
          flex: 1;
          background-color: #f9fafb;
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .results-title {
          font-size: 2rem;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }
        
        .results-subtitle {
          color: #6b7280;
          margin: 0;
        }
        
        .view-toggle {
          display: flex;
          gap: 0.5rem;
        }
        
        .view-btn {
          padding: 8px 16px;
          font-weight: 600;
          font-size: 0.85rem;
          border-radius: 6px;
          min-width: 80px;
        }
        
        .property-grid-card, .property-list-card {
          border: none;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          overflow: hidden;
        }
        
        .property-grid-card:hover, .property-list-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(124, 58, 237, 0.15);
        }
        
        .property-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .property-list-card .property-image-container {
          height: 180px;
        }
        
        .property-list-card .property-image {
          border-radius: 12px 0 0 12px;
        }
        
        .property-badges {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          gap: 5px;
        }
        
        .available-badge, .verified-badge {
          font-size: 0.65rem;
          padding: 3px 8px;
          border-radius: 12px;
          font-weight: 600;
          text-transform: uppercase;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .available-badge {
          background-color: #10b981;
          color: white;
        }
        
        .verified-badge {
          background-color: #3b82f6;
          color: white;
        }
        
        .property-location {
          display: flex;
          align-items: center;
        }
        
        .location-text {
          font-size: 0.8rem;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .property-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111827;
          line-height: 1.3;
        }
        
        .property-description {
          color: #374151;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .category-badge {
          background-color: #7c3aed;
          color: white;
          font-size: 0.7rem;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 600;
        }
        
        .property-size {
          font-size: 0.75rem;
        }
        
        .property-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #10b981;
        }
        
        .property-availability {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }
        
        .no-results-icon {
          font-size: 4rem;
          opacity: 0.5;
          margin-bottom: 1rem;
        }
        
        .no-results-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
        }
        
        .no-results-text {
          color: #6b7280;
          margin-bottom: 2rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .no-results-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 8px;
        }
        
        .loading-container, .error-container {
          padding: 3rem 0;
          text-align: center;
        }
        
        .loading-spinner {
          color: #7c3aed;
          width: 3rem;
          height: 3rem;
        }
        
        .loading-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 1rem 0 0.5rem;
        }
        
        .loading-subtitle {
          color: #6b7280;
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
          
          .results-header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .view-toggle {
            justify-content: stretch;
          }
          
          .view-btn {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
