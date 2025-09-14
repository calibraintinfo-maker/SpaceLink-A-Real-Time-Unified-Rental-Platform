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
    "Coimbatore", "Kochi", "Madurai", "Nashik", "Faridabad", "Ghaziabad", "Rajkot",
    "Meerut", "Kalyan", "Vasai", "Varanasi", "Dhanbad", "Jodhpur", "Amritsar",
    "Raipur", "Allahabad", "Jabalpur", "Gwalior", "Vijayawada"
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
          property.title, 
          property.description, 
          property.address?.city,
          property.address?.state, 
          property.address?.street, 
          property.category, 
          property.subtype
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
          property.address.city, 
          property.address.state, 
          property.address.street
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
    if (!property) return [];
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
    
    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="info" className="me-2 mb-2" style={{ fontSize: '0.75rem' }}>
          {property.capacity}
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
      <div className="dashboard-wrapper">
        {/* PROFESSIONAL HERO SECTION - FIXED RESPONSIVE */}
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
              
              <h1 className="hero-title">
                Find Your Perfect Property
              </h1>
              
              <p className="hero-subtitle">
                Discover verified properties from our premium collection across India. 
                From luxury apartments to sports turfs and commercial spaces.
              </p>
            </div>
          </Container>
        </section>
        
        <Container className="loading-container">
          <Spinner animation="border" className="loading-spinner" />
          <p className="loading-text">Loading properties...</p>
        </Container>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="dashboard-wrapper">
        {/* PROFESSIONAL HERO SECTION - FIXED RESPONSIVE */}
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
              
              <h1 className="hero-title">
                Find Your Perfect Property
              </h1>
              
              <p className="hero-subtitle">
                Discover verified properties from our premium collection across India. 
                From luxury apartments to sports turfs and commercial spaces.
              </p>
            </div>
          </Container>
        </section>

        <Container className="error-container">
          <Alert variant="danger" className="error-alert">
            <Alert.Heading>Error Loading Properties</Alert.Heading>
            <p>{error}</p>
            <Button onClick={fetchProperties} className="retry-button">
              Try Again
            </Button>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* PROFESSIONAL HERO SECTION - FIXED RESPONSIVE */}
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
            
            <h1 className="hero-title">
              Find Your Perfect Property
            </h1>
            
            <p className="hero-subtitle">
              Discover verified properties from our premium collection across India. 
              From luxury apartments to sports turfs and commercial spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* MAIN DASHBOARD LAYOUT */}
      <div className="dashboard-main">
        
        {/* PROFESSIONAL SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-content">
            {/* Search Section */}
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

            {/* Smart Filters Header */}
            <div className="filters-header">
              <span className="filter-icon">✨</span>
              <h6 className="filters-title">Smart Filters</h6>
            </div>

            {/* Location Filter */}
            <div className="filter-section">
              <div className="filter-header">
                <span className="filter-icon location-icon">📍</span>
                <label className="filter-label location-label">LOCATION</label>
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
                <span className="filter-icon property-icon">🏠</span>
                <label className="filter-label property-label">PROPERTY TYPE</label>
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
              
              {/* Category hint */}
              {filters.propertyType && filters.propertyType !== "All Categories" && (
                <div className="category-hint">
                  <span className="hint-text">
                    {filters.propertyType === 'Property Rentals' && 'Includes: Villa, Apartment, House, Studio, Flat'}
                    {filters.propertyType === 'Commercial' && 'Includes: Office, Shop, Warehouse, Showroom'}
                    {filters.propertyType === 'Event' && 'Includes: Banquet Hall, Garden, Meeting Room'}
                    {filters.propertyType === 'Turf' && 'Includes: Football Turf, Cricket Ground, Multi-Sport, Tennis Court'}
                    {filters.propertyType === 'Parking' && 'Includes: Car Parking, Bike Parking, Garage'}
                    {filters.propertyType === 'Land' && 'Includes: Agricultural, Commercial Plot, Residential Plot'}
                  </span>
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <div className="filter-header">
                <span className="filter-icon price-icon">💰</span>
                <label className="filter-label price-label">PRICE RANGE</label>
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

            {/* Conditional Bedrooms Filter */}
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

            {/* Clear Filters Button */}
            <Button
              variant="outline-secondary"
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
              className="clear-filters-btn"
            >
              <span className="clear-icon">✕</span>
              Clear All Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>

            {/* Active Filters Summary */}
            <div className="active-filters-section">
              <div className="active-filters-header">
                <span className="active-filters-title">
                  <span className="active-icon">⚡</span>
                  Active Filters
                </span>
                <div className="active-count">
                  {getActiveFiltersCount()}
                </div>
              </div>
              
              <div className="active-filters-tags">
                {searchQuery && (
                  <div className="filter-tag search-tag">
                    🔍 {searchQuery.substring(0, 10)}{searchQuery.length > 10 ? '...' : ''}
                  </div>
                )}
                {filters.location && (
                  <div className="filter-tag location-tag">
                    📍 {filters.location}
                  </div>
                )}
                {filters.propertyType && (
                  <div className="filter-tag property-tag">
                    {getCategoryIcon(filters.propertyType)} {filters.propertyType}
                  </div>
                )}
                {filters.priceRange && (
                  <div className="filter-tag price-tag">
                    💰 ₹{filters.priceRange.replace('-', ' - ₹')}
                  </div>
                )}
                {filters.bedrooms && (
                  <div className="filter-tag bedroom-tag">
                    🛏️ {filters.bedrooms}+ BHK
                  </div>
                )}
              </div>
              
              {getActiveFiltersCount() === 0 && (
                <div className="no-filters">
                  <p className="no-filters-text">No active filters</p>
                  <small className="no-filters-hint">Use filters above to refine your search</small>
                </div>
              )}
            </div>

            {/* PROFESSIONAL AVAILABLE COUNTER */}
            <div className="available-counter">
              <h2 className="available-number">{filteredProperties.length}</h2>
              <p className="available-text">Available</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="main-content">
          <Container fluid className="content-container">
            
            {/* PROFESSIONAL RESULTS HEADER */}
            <div className="results-header">
              <div className="results-info">
                <h2 className="results-title">
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="results-subtitle">
                  Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
                </p>
              </div>

              {/* FIXED VIEW TOGGLE BUTTONS */}
              <div className="view-toggle">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                  className={`view-btn grid-btn ${viewMode === 'grid' ? 'active' : ''}`}
                >
                  🔲 GRID VIEW
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
                  className={`view-btn list-btn ${viewMode === 'list' ? 'active' : ''}`}
                >
                  📋 LIST VIEW
                </Button>
              </div>
            </div>

            {/* PROPERTIES DISPLAY */}
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
                    `We couldn't find any properties matching "${searchQuery}". Try adjusting your search terms.` : 
                    (getActiveFiltersCount() > 0 ? 
                      'No properties match your current filters. Try adjusting or clearing some filters.' : 
                      'No properties are currently available. Please check back later.'
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
                        // PROFESSIONAL LIST VIEW CARD
                        <Card className="property-list-card">
                          <Row className="card-row">
                            <Col md={4} className="image-col">
                              <div className="property-image-container">
                                <img
                                  src={getImageUrl(property.images && Array.isArray(property.images) ? property.images[0] : property.image)}
                                  alt={property.title || 'Property'}
                                  onError={handleImageError}
                                  className="property-image"
                                />
                                <div className="property-badges">
                                  <Badge className="available-badge">✓ AVAILABLE</Badge>
                                  <Badge className="verified-badge">✓ VERIFIED</Badge>
                                </div>
                              </div>
                            </Col>
                            <Col md={8} className="content-col">
                              <Card.Body className="property-card-body">
                                <div className="property-location">
                                  <span className="location-icon">📍</span>
                                  <span className="location-text">
                                    {property.address?.city || 'City'}, {property.address?.state || 'State'}
                                  </span>
                                </div>
                                
                                <Card.Title className="property-title">
                                  {property.title || 'Property Title'}
                                </Card.Title>
                                
                                <p className="property-description">
                                  {property.description ? 
                                    property.description.substring(0, 120) + '...' : 
                                    'Premium property with modern amenities and excellent location.'
                                  }
                                </p>
                                
                                <div className="property-details">
                                  <Badge className="category-badge">
                                    {property.category || 'Land'}
                                  </Badge>
                                  <small className="property-size">{property.size || '10000'}</small>
                                  <div className="property-badges-details">
                                    {renderPropertyDetails(property)}
                                  </div>
                                </div>
                                
                                <div className="property-footer">
                                  <div className="property-pricing">
                                    <div className="property-price">
                                      {formatPrice(property.price, getSafeRentType(property))}
                                    </div>
                                    <small className="property-availability">
                                      Available for {getSafeRentTypes(property).join(', ') || 'rental'}
                                    </small>
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
                        // PROFESSIONAL GRID VIEW CARD
                        <PropertyCard 
                          property={property} 
                          showOwner={false}
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

      {/* COMPLETE PROFESSIONAL CSS STYLES */}
      <style jsx>{`
        /* PROFESSIONAL DASHBOARD CSS - ALL BUGS FIXED */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .dashboard-wrapper {
          min-height: 100vh;
          background-color: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 400;
          line-height: 1.6;
          color: #1f2937;
          letter-spacing: 0.005em;
        }
        
        /* PROFESSIONAL HERO SECTION - FIXED RESPONSIVE */
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
          50% { transform: translateY(-1.25rem) rotate(5deg); }
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
          border-radius: 1.5625rem;
          padding: 0.5rem 1.25rem;
          margin-bottom: 1.25rem;
        }
        
        .hero-badge-text {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.03125rem;
          text-transform: uppercase;
          color: white;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.015625rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: white;
          text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.95);
          max-width: 37.5rem;
          margin: 0 auto;
          line-height: 1.6;
          text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
        }
        
        /* RESPONSIVE HERO SECTION */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.125rem;
          }
          .hero-section {
            min-height: 20rem;
            padding: 2rem 0;
          }
        }
        
        /* DASHBOARD MAIN LAYOUT */
        .dashboard-main {
          display: flex;
          min-height: calc(100vh - 25rem);
          background-color: #ffffff;
        }
        
        /* PROFESSIONAL SIDEBAR */
        .sidebar {
          width: 22rem;
          min-width: 22rem;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          box-shadow: 0.25rem 0 1.25rem rgba(0, 0, 0, 0.08);
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
        
        .location-label {
          color: #dc3545;
        }
        
        .property-label {
          color: #f97316;
        }
        
        .price-label {
          color: #f97316;
        }
        
        .filter-count {
          font-size: 0.7rem;
          font-weight: 500;
          color: #6b7280;
        }
        
        .search-input, .filter-select {
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          padding: 0.625rem 0.75rem;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
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
          display: inline-block;
          margin-left: 0.5rem;
        }
        
        .category-hint {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: #f8f9fa;
          border-radius: 0.375rem;
        }
        
        .hint-text {
          font-size: 0.75rem;
          color: #6b7280;
        }
        
        .clear-filters-btn {
          width: 100%;
          border-radius: 0.5rem;
          padding: 0.625rem;
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          border-width: 1px;
        }
        
        .clear-icon {
          margin-right: 0.375rem;
        }
        
        .active-filters-section {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          padding: 1rem;
          border-radius: 0.75rem;
          border: 1px solid #cbd5e1;
          margin-bottom: 1.5rem;
        }
        
        .active-filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .active-filters-title {
          font-weight: 600;
          color: #1f2937;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
        }
        
        .active-icon {
          margin-right: 0.375rem;
        }
        
        .active-count {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 0.75rem;
          min-width: 1.25rem;
          text-align: center;
        }
        
        .active-filters-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }
        
        .filter-tag {
          padding: 0.125rem 0.375rem;
          border-radius: 0.625rem;
          font-size: 0.7rem;
          font-weight: 500;
          color: white;
        }
        
        .search-tag {
          background: #3b82f6;
        }
        
        .location-tag {
          background: #10b981;
        }
        
        .property-tag {
          background: #f59e0b;
        }
        
        .price-tag {
          background: #ef4444;
        }
        
        .bedroom-tag {
          background: #8b5cf6;
        }
        
        .no-filters {
          text-align: center;
        }
        
        .no-filters-text {
          font-size: 0.8rem;
          color: #6b7280;
          margin: 0;
        }
        
        .no-filters-hint {
          font-size: 0.7rem;
          color: #9ca3af;
        }
        
        .available-counter {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border-radius: 0.75rem;
          padding: 1.25rem;
          text-align: center;
          color: white;
        }
        
        .available-number {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0;
          margin-bottom: 0.375rem;
          text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
          color: white;
        }
        
        .available-text {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          opacity: 0.95;
          color: white;
        }
        
        /* MAIN CONTENT AREA */
        .main-content {
          flex: 1;
          background-color: #ffffff;
        }
        
        .content-container {
          padding: 1.5rem;
          max-width: 75rem;
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
          min-width: 18.75rem;
        }
        
        .results-title {
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #111827;
          font-size: 2rem;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.0125rem;
        }
        
        .results-subtitle {
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
        }
        
        .view-toggle {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        
        .view-btn {
          font-weight: 600;
          padding: 0.625rem 1.125rem;
          font-size: 0.85rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.015625rem;
          min-width: 7.5rem;
          border-width: 1px;
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
        
        /* NO RESULTS SECTION */
        .no-results {
          text-align: center;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          border-radius: 1rem;
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
          font-family: 'Inter', sans-serif;
        }
        
        .no-results-text {
          color: #6b7280;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          max-width: 31.25rem;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }
        
        .no-results-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          font-weight: 600;
          border-radius: 0.625rem;
          padding: 0.625rem 1.5rem;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.015625rem;
        }
        
        /* PROPERTIES GRID */
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
        
        /* PROFESSIONAL LIST VIEW CARD */
        .property-list-card {
          border: none;
          border-radius: 1rem;
          box-shadow: 0 0.25rem 0.9375rem rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          background: #ffffff;
          overflow: hidden;
        }
        
        .property-list-card:hover {
          transform: translateY(-0.125rem);
          box-shadow: 0 0.5rem 1.5625rem rgba(124, 58, 237, 0.12);
        }
        
        .card-row {
          margin: 0;
        }
        
        .image-col {
          padding: 0;
        }
        
        .property-image-container {
          position: relative;
          height: 11.25rem;
          overflow: hidden;
        }
        
        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1rem 0 0 1rem;
        }
        
        .property-badges {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          gap: 0.375rem;
        }
        
        .available-badge, .verified-badge {
          font-size: 0.65rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.015625rem;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
        }
        
        .available-badge {
          background-color: #059669;
          color: white;
        }
        
        .verified-badge {
          background-color: #3b82f6;
          color: white;
        }
        
        .content-col {
          padding: 0;
        }
        
        .property-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          height: 11.25rem;
        }
        
        .property-location {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .location-icon {
          color: #7c3aed;
          font-size: 0.875rem;
          margin-right: 0.375rem;
        }
        
        .location-text {
          font-size: 0.8rem;
          color: #64748b;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.03125rem;
        }
        
        .property-title {
          color: #111827;
          font-size: 1.25rem;
          line-height: 1.3;
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.009375rem;
        }
        
        .property-description {
          font-size: 0.85rem;
          line-height: 1.5;
          color: #374151;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          margin-bottom: 0.75rem;
          flex-grow: 1;
        }
        
        .property-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        
        .category-badge {
          background-color: #7c3aed;
          color: white;
          font-size: 0.7rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
        }
        
        .property-size {
          color: #64748b;
          font-size: 0.75rem;
        }
        
        .property-badges-details {
          display: flex;
          gap: 0.25rem;
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
          margin-bottom: 0.125rem;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.00625rem;
        }
        
        .property-availability {
          color: #64748b;
          font-size: 0.75rem;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.03125rem;
        }
        
        .property-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .view-details-btn {
          border-radius: 0.5rem;
          padding: 0.375rem 0.75rem;
          font-weight: 600;
          font-size: 0.75rem;
          border-color: #7c3aed;
          color: #7c3aed;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }
        
        .view-details-btn:hover {
          background-color: #f3f4f6;
          color: #1f2937;
        }
        
        .book-now-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          border-radius: 0.5rem;
          padding: 0.375rem 0.75rem;
          font-weight: 600;
          font-size: 0.75rem;
          color: white;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }
        
        .book-now-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        
        /* LOADING AND ERROR STATES */
        .loading-container {
          padding: 3rem 0;
          text-align: center;
        }
        
        .loading-spinner {
          color: #7c3aed;
        }
        
        .loading-text {
          margin-top: 1rem;
          font-size: 1.125rem;
          font-weight: 600;
        }
        
        .error-container {
          padding: 3rem 0;
        }
        
        .error-alert {
          text-align: center;
        }
        
        .retry-button {
          background-color: #7c3aed;
          border-color: #7c3aed;
        }
        
        /* RESPONSIVE DESIGN - FIXED F11 FULLSCREEN ISSUES */
        @media (max-width: 1200px) {
          .sidebar {
            width: 20rem;
            min-width: 20rem;
          }
          
          .content-container {
            padding: 1.25rem;
          }
          
          .results-title {
            font-size: 1.75rem;
          }
        }
        
        @media (max-width: 992px) {
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
            gap: 1rem;
          }
          
          .view-toggle {
            align-self: stretch;
          }
          
          .view-btn {
            flex: 1;
            min-width: auto;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            min-height: 20rem;
            padding: 2rem 0;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.125rem;
          }
          
          .results-title {
            font-size: 1.5rem;
          }
          
          .content-container {
            padding: 1rem;
          }
          
          .properties-grid.grid-view {
            --bs-gutter-x: 0.5rem;
            --bs-gutter-y: 0.5rem;
          }
        }
        
        @media (max-width: 576px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .sidebar-content {
            padding: 1rem;
          }
          
          .filter-section {
            margin-bottom: 1rem;
          }
          
          .view-toggle {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .view-btn {
            width: 100%;
          }
        }
        
        /* FULLSCREEN (F11) OPTIMIZATIONS */
        @media (min-width: 1400px) {
          .content-container {
            max-width: 90rem;
            padding: 2rem 3rem;
          }
          
          .hero-title {
            font-size: 4rem;
          }
          
          .hero-subtitle {
            font-size: 1.375rem;
          }
          
          .results-title {
            font-size: 2.25rem;
          }
          
          .sidebar {
            width: 24rem;
            min-width: 24rem;
          }
        }
        
        /* HIGH RESOLUTION DISPLAYS */
        @media (min-width: 1920px) {
          .content-container {
            max-width: 120rem;
            padding: 2.5rem 4rem;
          }
          
          .hero-title {
            font-size: 4.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.5rem;
          }
          
          .sidebar {
            width: 26rem;
            min-width: 26rem;
          }
          
          .sidebar-content {
            padding: 2rem;
          }
        }
        
        /* PRINT STYLES */
        @media print {
          .sidebar {
            display: none;
          }
          
          .dashboard-main {
            flex-direction: column;
          }
          
          .hero-section {
            background: #7c3aed;
            color: white;
            -webkit-print-color-adjust: exact;
          }
        }
        
        /* FOCUS STYLES FOR ACCESSIBILITY */
        .search-input:focus,
        .filter-select:focus,
        .clear-filters-btn:focus,
        .view-btn:focus,
        .view-details-btn:focus,
        .book-now-btn:focus,
        .no-results-btn:focus,
        .retry-button:focus {
          outline: 2px solid #7c3aed;
          outline-offset: 2px;
        }
        
        /* REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .floating-element,
          .property-list-card,
          .view-btn,
          .book-now-btn,
          .view-details-btn {
            animation: none;
            transition: none;
          }
        }
        
        /* HIGH CONTRAST MODE */
        @media (prefers-contrast: high) {
          .hero-section {
            background: #000;
            color: #fff;
          }
          
          .property-list-card {
            border: 2px solid #000;
          }
          
          .filter-tag {
            border: 1px solid #000;
          }
        }
      `}</style>
    </>
  );
};

export default FindProperty;
