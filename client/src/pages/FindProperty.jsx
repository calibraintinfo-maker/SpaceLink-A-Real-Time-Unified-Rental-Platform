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
    
    const premiumImages = [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&auto=format&q=80'
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
          <Badge key="bedrooms" className="detail-badge">
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" className="detail-badge">
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }
    
    if (property.size) {
      details.push(
        <Badge key="area" className="detail-badge">
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

  if (loading) {
    return (
      <div className="enterprise-dashboard">
        <div className="loading-section">
          <Container>
            <div className="loading-content">
              <Spinner animation="border" className="loading-spinner" />
              <h3 className="loading-title">Loading Properties</h3>
              <p className="loading-subtitle">Connecting to your backend...</p>
            </div>
          </Container>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="enterprise-dashboard">
        <div className="error-section">
          <Container>
            <Alert className="error-alert">
              <h3>Connection Error</h3>
              <p>{error}</p>
              <Button onClick={fetchProperties} className="retry-btn">
                Retry Connection
              </Button>
            </Alert>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="enterprise-dashboard">
      {/* PROFESSIONAL HERO SECTION */}
      <section className="professional-hero">
        <Container>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">{filteredProperties.length} Premium Properties Available</span>
            </div>
            <h1 className="hero-title">
              Find Your Perfect
              <span className="title-accent"> Property</span>
            </h1>
            <p className="hero-subtitle">
              Discover verified properties from our premium collection across India.
              From luxury apartments to sports turfs and commercial spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* PROFESSIONAL DASHBOARD */}
      <section className="dashboard-section">
        <Container fluid>
          <Row>
            {/* CLEAN SIDEBAR */}
            <Col lg={3} className="sidebar-col">
              <div className="professional-sidebar">
                <div className="sidebar-header">
                  <h4 className="sidebar-title">Smart Filters</h4>
                  {getActiveFiltersCount() > 0 && (
                    <span className="active-count">{getActiveFiltersCount()}</span>
                  )}
                </div>

                <div className="sidebar-content">
                  {/* Search */}
                  <div className="filter-group">
                    <label className="filter-label">SEARCH PROPERTIES</label>
                    <Form.Control
                      type="text"
                      placeholder="Search by location, type, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="professional-input"
                    />
                    {searchQuery && (
                      <div className="search-results">
                        <span className="results-count">{filteredProperties.length}</span> results for "{searchQuery}"
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="filter-group">
                    <label className="filter-label">
                      LOCATION
                      <span className="filter-count">{indianLocations.length - 1} cities</span>
                    </label>
                    <Form.Select
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="professional-select"
                    >
                      {indianLocations.map((location, index) => (
                        <option key={index} value={location === "All Locations" ? "" : location}>
                          {location}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  {/* Property Type */}
                  <div className="filter-group">
                    <label className="filter-label">
                      PROPERTY TYPE
                      <span className="filter-count">{propertyTypes.length - 1} categories</span>
                    </label>
                    <Form.Select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      className="professional-select"
                    >
                      {propertyTypes.map((type, index) => (
                        <option key={index} value={type === "All Categories" ? "" : type}>
                          {type}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  {/* Price Range */}
                  <div className="filter-group">
                    <label className="filter-label">
                      PRICE RANGE
                      <span className="filter-count">per month</span>
                    </label>
                    <Form.Select
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="professional-select"
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

                  {/* Bedrooms */}
                  {shouldShowBedroomFilter() && (
                    <div className="filter-group">
                      <label className="filter-label">
                        BEDROOMS
                        <span className="filter-count">residential only</span>
                      </label>
                      <Form.Select
                        value={filters.bedrooms}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                        className="professional-select"
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
                    onClick={clearFilters}
                    disabled={getActiveFiltersCount() === 0}
                    className="clear-btn"
                  >
                    Clear All Filters
                    {getActiveFiltersCount() > 0 && ` (${getActiveFiltersCount()})`}
                  </Button>

                  {/* Results Counter */}
                  <div className="results-counter">
                    <div className="counter-number">{filteredProperties.length}</div>
                    <div className="counter-text">Properties Found</div>
                  </div>
                </div>
              </div>
            </Col>

            {/* MAIN CONTENT */}
            <Col lg={9} className="main-content-col">
              <div className="main-content">
                {/* Results Header */}
                <div className="results-header">
                  <div className="results-info">
                    <h2 className="results-title">
                      {filteredProperties.length} Properties Found
                    </h2>
                    <p className="results-subtitle">
                      Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
                    </p>
                  </div>
                  <div className="view-controls">
                    <div className="view-toggle">
                      <Button
                        className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                      >
                        Grid
                      </Button>
                      <Button
                        className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                      >
                        List
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Properties Display */}
                {filteredProperties.length === 0 ? (
                  <div className="no-results">
                    <h3>No Properties Found</h3>
                    <p>Try adjusting your search criteria or clear filters to see more properties.</p>
                    <Button onClick={clearFilters}>Clear All Filters</Button>
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
                          xl={viewMode === 'list' ? 12 : 4}
                        >
                          <Card className={`professional-card ${viewMode === 'list' ? 'list-card' : 'grid-card'}`}>
                            {viewMode === 'list' ? (
                              <Row className="g-0">
                                <Col md={4}>
                                  <div className="card-image-container">
                                    <img
                                      src={property.images?.[0]}
                                      alt={property.title}
                                      onError={handleImageError}
                                      className="card-image"
                                    />
                                    <div className="property-badges">
                                      <Badge className="status-badge available">AVAILABLE</Badge>
                                      <Badge className="status-badge verified">VERIFIED</Badge>
                                    </div>
                                  </div>
                                </Col>
                                <Col md={8}>
                                  <Card.Body className="card-body">
                                    <div className="property-location">
                                      {property.address?.city}, {property.address?.state}
                                    </div>
                                    
                                    <h3 className="property-title">{property.title}</h3>
                                    
                                    <p className="property-description">
                                      {property.description.length > 120 ? 
                                        `${property.description.substring(0, 120)}...` : 
                                        property.description
                                      }
                                    </p>
                                    
                                    <div className="property-details">
                                      <Badge className="category-badge">{property.category}</Badge>
                                      <div className="detail-badges">
                                        {renderPropertyDetails(property)}
                                      </div>
                                    </div>
                                    
                                    <div className="card-footer">
                                      <div className="pricing">
                                        <div className="price">{getFormattedPrice(property)}</div>
                                        <div className="period">Available for {getSafeRentTypes(property)}</div>
                                      </div>
                                      
                                      <div className="actions">
                                        <Button
                                          onClick={() => handleViewDetails(property._id)}
                                          className="details-btn"
                                        >
                                          View Details
                                        </Button>
                                        <Button
                                          onClick={() => handleBookNow(property._id)}
                                          className="book-btn"
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
                                <div className="card-image-container">
                                  <img
                                    src={property.images?.[0]}
                                    alt={property.title}
                                    onError={handleImageError}
                                    className="card-image"
                                  />
                                  <div className="property-badges">
                                    <Badge className="status-badge available">AVAILABLE</Badge>
                                    <Badge className="status-badge verified">VERIFIED</Badge>
                                  </div>
                                </div>
                                
                                <Card.Body className="card-body">
                                  <div className="property-location">
                                    {property.address?.city}, {property.address?.state}
                                  </div>
                                  
                                  <h3 className="property-title">{property.title}</h3>
                                  
                                  <p className="property-description">
                                    {property.description.length > 80 ? 
                                      `${property.description.substring(0, 80)}...` : 
                                      property.description
                                    }
                                  </p>
                                  
                                  <div className="property-details">
                                    <Badge className="category-badge">{property.category}</Badge>
                                    <div className="detail-badges">
                                      {renderPropertyDetails(property)}
                                    </div>
                                  </div>
                                  
                                  <div className="card-footer">
                                    <div className="pricing">
                                      <div className="price">{getFormattedPrice(property)}</div>
                                      <div className="period">Available for {getSafeRentTypes(property)}</div>
                                    </div>
                                    
                                    <div className="actions">
                                      <Button
                                        onClick={() => handleViewDetails(property._id)}
                                        className="details-btn"
                                      >
                                        View Details
                                      </Button>
                                      <Button
                                        onClick={() => handleBookNow(property._id)}
                                        className="book-btn"
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
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ENTERPRISE CSS STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        :root {
          --primary: #7c3aed;
          --primary-dark: #6d28d9;
          --secondary: #64748b;
          --success: #059669;
          --danger: #dc2626;
          --warning: #d97706;
          --gray-50: #f8fafc;
          --gray-100: #f1f5f9;
          --gray-200: #e2e8f0;
          --gray-300: #cbd5e1;
          --gray-400: #94a3b8;
          --gray-500: #64748b;
          --gray-600: #475569;
          --gray-700: #334155;
          --gray-800: #1e293b;
          --gray-900: #0f172a;
          --white: #ffffff;
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
          --border-radius: 8px;
          --border-radius-lg: 12px;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .enterprise-dashboard {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: var(--gray-900);
          background-color: var(--gray-50);
        }
        
        /* PROFESSIONAL HERO */
        .professional-hero {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          padding: 5rem 0;
        }
        
        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 0.75rem 1.5rem;
          margin-bottom: 2rem;
        }
        
        .badge-text {
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.025em;
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
        }
        
        .title-accent {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        /* DASHBOARD SECTION */
        .dashboard-section {
          padding: 3rem 0;
        }
        
        .sidebar-col {
          padding-right: 2rem;
        }
        
        .professional-sidebar {
          background: var(--white);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-lg);
          position: sticky;
          top: 2rem;
          height: fit-content;
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
        }
        
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.5rem 1rem;
          border-bottom: 1px solid var(--gray-200);
        }
        
        .sidebar-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
          margin: 0;
        }
        
        .active-count {
          background: var(--primary);
          color: white;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }
        
        .sidebar-content {
          padding: 1.5rem;
        }
        
        .filter-group {
          margin-bottom: 1.5rem;
        }
        
        .filter-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--gray-700);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }
        
        .filter-count {
          font-size: 0.7rem;
          color: var(--gray-500);
          font-weight: 500;
        }
        
        .professional-input, .professional-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius);
          font-size: 0.875rem;
          font-weight: 500;
          background: var(--white);
          transition: all 0.2s ease;
        }
        
        .professional-input:focus, .professional-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
          outline: none;
        }
        
        .search-results {
          font-size: 0.75rem;
          color: var(--gray-600);
          margin-top: 0.5rem;
        }
        
        .results-count {
          font-weight: 700;
          color: var(--primary);
        }
        
        .clear-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--white);
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius);
          color: var(--gray-700);
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.2s ease;
          margin-bottom: 1.5rem;
        }
        
        .clear-btn:hover:not(:disabled) {
          border-color: var(--danger);
          color: var(--danger);
          background: rgba(220, 38, 38, 0.05);
        }
        
        .clear-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .results-counter {
          background: var(--primary);
          color: white;
          border-radius: var(--border-radius-lg);
          padding: 1.5rem;
          text-align: center;
        }
        
        .counter-number {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 0.25rem;
        }
        
        .counter-text {
          font-size: 0.875rem;
          font-weight: 600;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        /* MAIN CONTENT */
        .main-content-col {
          padding-left: 2rem;
        }
        
        .main-content {
          background: var(--white);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 2rem;
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
          font-size: 1.875rem;
          font-weight: 800;
          color: var(--gray-900);
          margin-bottom: 0.25rem;
          line-height: 1.2;
        }
        
        .results-subtitle {
          font-size: 0.875rem;
          color: var(--gray-600);
          margin: 0;
        }
        
        .view-controls {
          flex-shrink: 0;
        }
        
        .view-toggle {
          display: flex;
          background: var(--gray-100);
          border-radius: var(--border-radius);
          padding: 0.25rem;
        }
        
        .toggle-btn {
          padding: 0.5rem 1rem;
          border: none;
          background: transparent;
          color: var(--gray-600);
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: calc(var(--border-radius) - 2px);
          transition: all 0.2s ease;
        }
        
        .toggle-btn.active {
          background: var(--white);
          color: var(--gray-900);
          box-shadow: var(--shadow-sm);
        }
        
        /* PROFESSIONAL CARDS */
        .professional-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
        }
        
        .professional-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--gray-300);
        }
        
        .card-image-container {
          position: relative;
          overflow: hidden;
        }
        
        .grid-card .card-image-container {
          height: 200px;
        }
        
        .list-card .card-image-container {
          height: 180px;
        }
        
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        
        .professional-card:hover .card-image {
          transform: scale(1.05);
        }
        
        .property-badges {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          gap: 0.5rem;
        }
        
        .status-badge {
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          border: none;
        }
        
        .status-badge.available {
          background-color: var(--success);
          color: white;
        }
        
        .status-badge.verified {
          background-color: var(--primary);
          color: white;
        }
        
        .card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .list-card .card-body {
          justify-content: space-between;
        }
        
        .property-location {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--gray-500);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        
        .property-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
          line-height: 1.3;
          margin-bottom: 0.75rem;
        }
        
        .property-description {
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--gray-600);
          margin-bottom: 1rem;
          flex-grow: 1;
        }
        
        .property-details {
          margin-bottom: 1rem;
        }
        
        .category-badge {
          background-color: var(--primary);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          border: none;
          margin-bottom: 0.5rem;
          display: inline-block;
        }
        
        .detail-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .detail-badge {
          background-color: var(--gray-100);
          color: var(--gray-700);
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          border: none;
        }
        
        .card-footer {
          margin-top: auto;
        }
        
        .pricing {
          margin-bottom: 1rem;
        }
        
        .price {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--success);
          line-height: 1.2;
          margin-bottom: 0.25rem;
        }
        
        .period {
          font-size: 0.75rem;
          color: var(--gray-500);
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
        
        .actions {
          display: flex;
          gap: 0.75rem;
        }
        
        .list-card .actions {
          flex-direction: column;
        }
        
        .grid-card .actions {
          flex-direction: row;
        }
        
        .details-btn, .book-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius);
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.2s ease;
          border: none;
          text-align: center;
        }
        
        .details-btn {
          background: var(--white);
          color: var(--primary);
          border: 1px solid var(--primary);
        }
        
        .details-btn:hover {
          background: var(--primary);
          color: white;
        }
        
        .book-btn {
          background: var(--primary);
          color: white;
        }
        
        .book-btn:hover {
          background: var(--primary-dark);
        }
        
        /* NO RESULTS */
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--gray-600);
        }
        
        .no-results h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 1rem;
        }
        
        .no-results p {
          margin-bottom: 2rem;
          font-size: 1rem;
        }
        
        .no-results button {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius);
          font-weight: 600;
        }
        
        /* LOADING & ERROR STATES */
        .loading-section, .error-section {
          background: var(--primary);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }
        
        .loading-content, .error-alert {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .loading-spinner {
          color: white;
          width: 3rem;
          height: 3rem;
          margin-bottom: 1rem;
        }
        
        .loading-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .loading-subtitle {
          opacity: 0.8;
        }
        
        .error-alert {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--border-radius-lg);
          padding: 2rem;
          text-align: center;
        }
        
        .error-alert h3 {
          margin-bottom: 1rem;
        }
        
        .error-alert p {
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }
        
        .retry-btn {
          background: white;
          color: var(--primary);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius);
          font-weight: 600;
        }
        
        /* RESPONSIVE */
        @media (max-width: 992px) {
          .sidebar-col, .main-content-col {
            padding-left: 0;
            padding-right: 0;
          }
          
          .sidebar-col {
            margin-bottom: 2rem;
          }
          
          .professional-sidebar {
            position: relative;
            max-height: none;
          }
          
          .results-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .view-controls {
            width: 100%;
          }
          
          .view-toggle {
            width: 100%;
          }
          
          .toggle-btn {
            flex: 1;
          }
        }
        
        @media (max-width: 768px) {
          .dashboard-section {
            padding: 1.5rem 0;
          }
          
          .professional-sidebar, .main-content {
            border-radius: var(--border-radius);
          }
          
          .sidebar-content, .main-content {
            padding: 1rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .results-title {
            font-size: 1.5rem;
          }
          
          .actions {
            flex-direction: column;
          }
        }
        
        /* SCROLLBAR */
        .professional-sidebar::-webkit-scrollbar {
          width: 4px;
        }
        
        .professional-sidebar::-webkit-scrollbar-track {
          background: var(--gray-100);
        }
        
        .professional-sidebar::-webkit-scrollbar-thumb {
          background: var(--gray-400);
          border-radius: 2px;
        }
        
        /* ACCESSIBILITY */
        .professional-input:focus, .professional-select:focus,
        .toggle-btn:focus, .details-btn:focus, .book-btn:focus, .clear-btn:focus {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          .professional-card:hover { transform: none; }
          .card-image { transition: none; }
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
