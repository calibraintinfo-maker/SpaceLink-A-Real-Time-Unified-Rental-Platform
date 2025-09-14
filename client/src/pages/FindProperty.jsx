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
    "Raipur", "Allahabad", "Jabalpur", "Gwalior", "Vijayawada"
  ];

  const propertyTypes = [
    "All Categories", "Property Rentals", "Commercial", "Event", "Parking", "Land", "Turf"
  ];

  const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];

  // 🔥 FIXED API FETCHING FOR YOUR AXIOS SETUP
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🚀 Starting API call to your Render backend...');
      
      // Call your API using the existing structure
      const response = await api.properties.getAll();
      
      console.log('📦 Raw API Response:', response);
      
      // Handle axios response - data is in response.data
      let propertiesArray = [];
      
      if (response.data) {
        if (Array.isArray(response.data)) {
          propertiesArray = response.data;
        } else if (Array.isArray(response.data.data)) {
          propertiesArray = response.data.data;
        } else if (Array.isArray(response.data.properties)) {
          propertiesArray = response.data.properties;
        } else if (response.data && typeof response.data === 'object') {
          // Check for other possible property names
          const possibleKeys = ['results', 'items', 'listings'];
          for (const key of possibleKeys) {
            if (Array.isArray(response.data[key])) {
              propertiesArray = response.data[key];
              console.log(`✅ Found properties in response.data.${key}`);
              break;
            }
          }
        }
      }
      
      console.log(`📊 Processed ${propertiesArray.length} properties`);
      
      // Validate and clean property data
      const validProperties = propertiesArray.filter(property => {
        return property && (property._id || property.id) && property.title;
      }).map(property => ({
        ...property,
        _id: property._id || property.id,
        price: Number(property.price) || 0,
        title: property.title || 'Untitled Property',
        description: property.description || 'No description available',
        category: property.category || 'Property',
        address: property.address || { city: 'Unknown', state: 'Unknown' },
        images: Array.isArray(property.images) ? property.images : 
                property.image ? [property.image] : []
      }));
      
      setProperties(validProperties);
      setFilteredProperties(validProperties);
      setRetryCount(0);
      
      console.log(`✅ Successfully loaded ${validProperties.length} valid properties`);
      
    } catch (error) {
      console.error('❌ API Error:', error);
      
      let errorMessage = 'Failed to load properties. ';
      
      if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        errorMessage += 'Network connection failed. Please check your internet connection.';
      } else if (error.response) {
        // Server responded with error status
        errorMessage += `Server error: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        // Network error
        errorMessage += 'Unable to connect to server. Please check if the backend is running.';
      } else {
        errorMessage += error.message;
      }
      
      setError(errorMessage);
      setProperties([]);
      setFilteredProperties([]);
      
    } finally {
      setLoading(false);
    }
  };

  // 🔥 RETRY WITH EXPONENTIAL BACKOFF
  const fetchWithRetry = async (maxRetries = 3) => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        await fetchProperties();
        return; // Success
      } catch (error) {
        console.log(`Retry attempt ${attempt + 1} failed:`, error);
        setRetryCount(attempt + 1);
        
        if (attempt === maxRetries) {
          setError(`Failed after ${maxRetries + 1} attempts. Please try again later.`);
          return;
        }
        
        // Exponential backoff: wait 1s, 2s, 4s...
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  useEffect(() => {
    fetchWithRetry();
  }, []);

  // 🔥 OPTIMIZED FILTERING
  const applyFilters = useCallback(() => {
    if (!Array.isArray(properties)) return;
    
    let filtered = [...properties];
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property => {
        const searchableFields = [
          property.title,
          property.description,
          property.address?.city,
          property.address?.state,
          property.address?.street,
          property.category,
          property.subtype
        ].filter(Boolean);
        
        return searchableFields.some(field => 
          field.toLowerCase().includes(query)
        );
      });
    }
    
    // Location filter
    if (filters.location && filters.location !== "All Locations") {
      filtered = filtered.filter(property => {
        if (!property?.address) return false;
        const locationFields = [
          property.address.city,
          property.address.state,
          property.address.street
        ].filter(Boolean);
        
        return locationFields.some(field =>
          field.toLowerCase().includes(filters.location.toLowerCase())
        );
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
      'Turf': '⚽'
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
    e.target.src = 'https://via.placeholder.com/400x240/e2e8f0/64748b?text=Property+Image';
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

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <section className="hero-section">
          <div className="hero-floating-elements">
            <div className="floating-element floating-element-1"></div>
            <div className="floating-element floating-element-2"></div>
          </div>
          <Container className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-text">
                  ⭐ Loading Premium Properties...
                </span>
              </div>
              <h1 className="hero-title">Find Your Perfect Property</h1>
              <p className="hero-subtitle">
                Discover verified properties from our premium collection across India.
              </p>
            </div>
          </Container>
        </section>
        
        <Container className="loading-container">
          <div className="loading-content">
            <Spinner animation="border" className="loading-spinner" />
            <h4 className="loading-title">Loading Properties...</h4>
            <p className="loading-subtitle">
              {retryCount > 0 ? `Retry attempt ${retryCount}...` : 'Fetching latest property listings from your Render backend...'}
            </p>
            <div className="loading-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // 🔥 ERROR STATE
  if (error) {
    return (
      <div className="dashboard-wrapper">
        <section className="hero-section">
          <div className="hero-floating-elements">
            <div className="floating-element floating-element-1"></div>
            <div className="floating-element floating-element-2"></div>
          </div>
          <Container className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-text">⚠️ Connection Issue</span>
              </div>
              <h1 className="hero-title">Find Your Perfect Property</h1>
              <p className="hero-subtitle">
                We're having trouble connecting to your backend. Please try again.
              </p>
            </div>
          </Container>
        </section>

        <Container className="error-container">
          <Alert variant="danger" className="error-alert">
            <Alert.Heading>🚨 Connection Error</Alert.Heading>
            <p className="error-message">{error}</p>
            
            {retryCount > 0 && (
              <p className="retry-info">
                <strong>Attempts made:</strong> {retryCount}
              </p>
            )}
            
            <div className="error-actions">
              <Button 
                onClick={() => fetchWithRetry()} 
                className="retry-button"
                disabled={loading}
              >
                <span className="me-2">🔄</span>
                {loading ? 'Retrying...' : 'Try Again'}
              </Button>
              
              <Button 
                variant="outline-primary"
                onClick={() => window.location.reload()}
                className="refresh-button"
              >
                <span className="me-2">⟳</span>
                Refresh Page
              </Button>
            </div>
            
            <details className="error-details mt-3">
              <summary>🔧 Troubleshooting</summary>
              <ul className="mt-2">
                <li>Check if your Render backend is awake and running</li>
                <li>Verify the API endpoint URL in utils/api.js</li>
                <li>Check CORS settings on your backend</li>
                <li>Try refreshing the page</li>
              </ul>
            </details>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-floating-elements">
          <div className="floating-element floating-element-1"></div>
          <div className="floating-element floating-element-2"></div>
        </div>
        <Container className="hero-container">
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
                  <small className="filter-count">residential only</small>
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
              className="clear-filters-btn"
            >
              <span className="clear-icon">✕</span>
              Clear All Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
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
          <Container fluid className="content-container">
            {/* Results Header */}
            <div className="results-header">
              <div className="results-info">
                <h2 className="results-title">{filteredProperties.length} Properties Found</h2>
                <p className="results-subtitle">
                  Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
                </p>
              </div>
              <div className="view-toggle">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                >
                  🔲 GRID VIEW
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                >
                  📋 LIST VIEW
                </Button>
              </div>
            </div>

            {/* Properties Display */}
            {filteredProperties.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">
                  {searchQuery ? '🔍' : (getActiveFiltersCount() > 0 ? '🔧' : '📂')}
                </div>
                <h3 className="no-results-title">
                  {searchQuery ? 'No Search Results' : (getActiveFiltersCount() > 0 ? 'No Matching Properties' : 'No Properties Available')}
                </h3>
                <p className="no-results-text">
                  {searchQuery ? 
                    `We couldn't find any properties matching "${searchQuery}".` : 
                    (getActiveFiltersCount() > 0 ? 
                      'No properties match your current filters.' : 
                      'No properties are currently available.'
                    )
                  }
                </p>
                <Button onClick={clearFilters} className="no-results-btn">
                  {getActiveFiltersCount() > 0 ? 'Clear All Filters' : 'Refresh Properties'}
                </Button>
              </div>
            ) : (
              <Row className={`properties-grid ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
                {filteredProperties.map((property) => {
                  if (!property || !property._id) return null;
                  
                  return (
                    <Col key={property._id} className={`property-col ${viewMode === 'list' ? 'list-col' : 'grid-col'}`}>
                      {viewMode === 'list' ? (
                        <Card className="property-list-card">
                          <Row className="card-row">
                            <Col md={4}>
                              <div className="property-image-container">
                                <img
                                  src={getImageUrl(property.images?.[0])}
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
                              <Card.Body className="property-card-body">
                                <div className="property-location">
                                  <span className="location-icon">📍</span>
                                  <span className="location-text">
                                    {property.address?.city}, {property.address?.state}
                                  </span>
                                </div>
                                <Card.Title className="property-title">{property.title}</Card.Title>
                                <p className="property-description">
                                  {property.description.length > 120 ? 
                                    property.description.substring(0, 120) + '...' : 
                                    property.description
                                  }
                                </p>
                                <div className="property-details">
                                  <Badge className="category-badge">{property.category}</Badge>
                                  {property.size && <small className="property-size">{property.size}</small>}
                                  <div className="property-badges-details">
                                    {renderPropertyDetails(property)}
                                  </div>
                                </div>
                                <div className="property-footer">
                                  <div className="property-pricing">
                                    <div className="property-price">
                                      {formatPrice(property.price)}
                                    </div>
                                    <small className="property-availability">Available for rental</small>
                                  </div>
                                  <div className="property-actions">
                                    <Button
                                      variant="outline-primary"
                                      onClick={() => handleViewDetails(property._id)}
                                      className="view-details-btn"
                                    >
                                      View Details
                                    </Button>
                                    <Button
                                      onClick={() => handleBookNow(property._id)}
                                      className="book-now-btn"
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
                          onViewDetails={() => handleViewDetails(property._id)}
                          onBookNow={() => handleBookNow(property._id)}
                        />
                      )}
                    </Col>
                  );
                })}
              </Row>
            )}
          </Container>
        </div>
      </div>

      {/* COMPLETE CSS STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .dashboard-wrapper {
          min-height: 100vh;
          background-color: #ffffff;
          font-family: 'Inter', sans-serif;
          color: #1f2937;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
          min-height: 25rem;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 3rem 0;
        }
        
        .hero-floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        
        .floating-element {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.8;
        }
        
        .floating-element-1 {
          top: 15%;
          right: 10%;
          width: 12.5rem;
          height: 12.5rem;
          background: rgba(255, 255, 255, 0.1);
          animation: float 8s ease-in-out infinite;
        }
        
        .floating-element-2 {
          bottom: 15%;
          left: 10%;
          width: 9.375rem;
          height: 9.375rem;
          background: rgba(255, 255, 255, 0.08);
          animation: float 6s ease-in-out infinite reverse;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .hero-container {
          position: relative;
          z-index: 2;
        }
        
        .hero-content {
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
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: white;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 24px;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.95);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .loading-container {
          padding: 4rem 0;
          text-align: center;
        }
        
        .loading-content {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .loading-spinner {
          color: #7c3aed;
          width: 3rem;
          height: 3rem;
          margin-bottom: 1.5rem;
        }
        
        .loading-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
        }
        
        .loading-subtitle {
          color: #6b7280;
          margin-bottom: 2rem;
        }
        
        .loading-progress {
          width: 100%;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #7c3aed, #a855f7);
          border-radius: 2px;
          animation: progress 2s ease-in-out infinite;
        }
        
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        
        .error-container {
          padding: 3rem 0;
        }
        
        .error-alert {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .error-message {
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        
        .retry-info {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        
        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .retry-button {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          font-weight: 600;
          border-radius: 8px;
          padding: 10px 20px;
        }
        
        .refresh-button {
          border-color: #7c3aed;
          color: #7c3aed;
          font-weight: 600;
          border-radius: 8px;
          padding: 10px 20px;
        }
        
        .error-details {
          text-align: left;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .error-details summary {
          cursor: pointer;
          font-weight: 600;
          color: #7c3aed;
        }
        
        .error-details ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        
        .dashboard-main {
          display: flex;
          min-height: calc(100vh - 25rem);
          background-color: #ffffff;
        }
        
        .sidebar {
          width: 22rem;
          min-width: 22rem;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          height: fit-content;
          max-height: calc(100vh - 25rem);
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
        
        .filter-icon {
          font-size: 0.875rem;
          margin-right: 0.5rem;
        }
        
        .filter-label {
          font-weight: 600;
          font-size: 0.8rem;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          margin: 0;
        }
        
        .filter-count {
          font-size: 0.7rem;
          font-weight: 500;
          color: #6b7280;
        }
        
        .search-input, .filter-select {
          border-radius: 8px;
          border: 1px solid #d1d5db;
          padding: 10px 12px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          background: white;
          width: 100%;
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
          display: block;
        }
        
        .results-count {
          font-weight: 600;
        }
        
        .filters-header {
          margin-bottom: 1.5rem;
        }
        
        .filters-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #374151;
          margin: 0;
          margin-left: 0.5rem;
        }
        
        .clear-filters-btn {
          width: 100%;
          border-radius: 8px;
          padding: 10px;
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .clear-icon {
          margin-right: 6px;
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
          margin: 0;
          margin-bottom: 6px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          color: white;
        }
        
        .available-text {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          opacity: 0.95;
          color: white;
        }
        
        .main-content {
          flex: 1;
          background-color: #ffffff;
        }
        
        .content-container {
          padding: 1.5rem;
          max-width: 1200px;
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .results-info {
          flex: 1;
          min-width: 300px;
        }
        
        .results-title {
          font-weight: 800;
          margin-bottom: 8px;
          color: #111827;
          font-size: 2rem;
          letter-spacing: -0.02em;
        }
        
        .results-subtitle {
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0;
          font-weight: 400;
        }
        
        .view-toggle {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        
        .view-btn {
          font-weight: 600;
          padding: 10px 18px;
          font-size: 0.85rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          min-width: 120px;
        }
        
        .view-btn.active {
          background-color: #7c3aed;
          border-color: #7c3aed;
          color: white;
        }
        
        .view-btn:not(.active) {
          background-color: transparent;
          border-color: #7c3aed;
          color: #7c3aed;
        }
        
        .view-btn:not(.active):hover {
          background-color: #f3f4f6;
          color: #1f2937;
        }
        
        .no-results {
          text-align: center;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
        
        .no-results-icon {
          font-size: 3rem;
          opacity: 0.6;
          margin-bottom: 1rem;
        }
        
        .no-results-title {
          font-weight: 700;
          margin-bottom: 1rem;
          color: #111827;
          font-size: 1.5rem;
        }
        
        .no-results-text {
          color: #6b7280;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }
        
        .no-results-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          font-weight: 600;
          border-radius: 10px;
          padding: 10px 24px;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
        
        .properties-grid.grid-view {
          --bs-gutter-x: 1rem;
          --bs-gutter-y: 1rem;
        }
        
        .properties-grid.list-view {
          --bs-gutter-x: 0;
          --bs-gutter-y: 0.75rem;
        }
        
        .property-col.grid-col {
          padding: 0.5rem;
        }
        
        .property-col.list-col {
          padding: 0.375rem 0;
        }
        
        .property-list-card {
          border: none;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          background: #ffffff;
          overflow: hidden;
        }
        
        .property-list-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.12);
        }
        
        .card-row {
          margin: 0;
        }
        
        .property-image-container {
          position: relative;
          height: 180px;
          overflow: hidden;
        }
        
        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px 0 0 16px;
        }
        
        .property-badges {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          gap: 6px;
        }
        
        .available-badge, .verified-badge {
          font-size: 0.65rem;
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .available-badge {
          background-color: #059669;
          color: white;
        }
        
        .verified-badge {
          background-color: #3b82f6;
          color: white;
        }
        
        .property-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          height: 180px;
        }
        
        .property-location {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .location-icon {
          color: #7c3aed;
          font-size: 0.875rem;
          margin-right: 6px;
        }
        
        .location-text {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .property-title {
          color: #111827;
          font-size: 1.25rem;
          line-height: 1.3;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.015em;
        }
        
        .property-description {
          font-size: 0.85rem;
          line-height: 1.5;
          color: #374151;
          font-weight: 400;
          margin-bottom: 12px;
          flex-grow: 1;
        }
        
        .property-details {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        
        .category-badge {
          background-color: #7c3aed;
          color: white;
          font-size: 0.7rem;
          padding: 4px 8px;
          border-radius: 8px;
        }
        
        .property-size {
          color: #64748b;
          font-size: 0.75rem;
        }
        
        .property-badges-details {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        
        .property-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        
        .property-pricing {
          flex: 1;
        }
        
        .property-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: #059669;
          margin-bottom: 2px;
          letter-spacing: -0.01em;
        }
        
        .property-availability {
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .property-actions {
          display: flex;
          gap: 8px;
        }
        
        .view-details-btn {
          border-radius: 8px;
          padding: 6px 12px;
          font-weight: 600;
          font-size: 0.75rem;
          border-color: #7c3aed;
          color: #7c3aed;
          transition: all 0.3s ease;
        }
        
        .view-details-btn:hover {
          background-color: #f3f4f6;
          color: #1f2937;
        }
        
        .book-now-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          border-radius: 8px;
          padding: 6px 12px;
          font-weight: 600;
          font-size: 0.75rem;
          color: white;
          transition: all 0.3s ease;
        }
        
        .book-now-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.125rem;
          }
          .dashboard-main {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            min-width: 100%;
            max-height: none;
            position: relative;
          }
          .results-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .view-toggle {
            width: 100%;
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
