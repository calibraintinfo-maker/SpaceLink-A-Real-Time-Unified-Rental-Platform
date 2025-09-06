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

  // ENHANCED REAL-TIME API DATA FETCHING
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch real-time data from API with enhanced error handling
      const response = await api.properties.getAll();
      
      // Handle different response structures
      const propertiesData = response?.data || response || [];
      
      console.log('Properties fetched:', propertiesData); // Debug log
      
      // Ensure we have an array
      const propertiesArray = Array.isArray(propertiesData) ? propertiesData : [];
      
      setProperties(propertiesArray);
      setFilteredProperties(propertiesArray);
      
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // ENHANCED REAL-TIME FILTERING WITH SAFE ARRAY OPERATIONS
  useEffect(() => {
    if (!Array.isArray(properties)) {
      setFilteredProperties([]);
      return;
    }

    let filtered = properties;

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(property => {
        if (!property) return false;
        
        const searchFields = [
          property.title,
          property.address?.city,
          property.address?.state,
          property.category,
          property.subtype
        ].filter(Boolean); // Remove null/undefined values
        
        return searchFields.some(field => 
          field.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Location filter
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

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(property => 
        property?.category === filters.propertyType ||
        property?.subtype === filters.propertyType
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => 
        property?.price && property.price >= min && property.price <= max
      );
    }

    // Bedrooms filter
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

  // NAVIGATION FUNCTIONS - REAL PROPERTY IDS
  const handleViewDetails = (propertyId) => {
    console.log('Navigating to property details:', propertyId);
    navigate(`/property/${propertyId}`);
  };

  const handleBookNow = (propertyId) => {
    console.log('Navigating to book property:', propertyId);
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

    // Handle residential properties safely
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

    // Handle commercial properties
    if (property.category === 'Commercial' && property.washrooms > 0) {
      details.push(
        <span key="washrooms" className="custom-badge me-2 mb-2">
          🚻 {property.washrooms} Washrooms
        </span>
      );
    }

    // Size/Area - always show if available
    if (property.size) {
      details.push(
        <span key="area" className="custom-badge me-2 mb-2">
          📐 {property.size}
        </span>
      );
    }

    // Special features for different property types
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

  // Get safe rent type for display
  const getSafeRentType = (property) => {
    if (!property?.rentType) return 'rental';
    return Array.isArray(property.rentType) ? property.rentType[0] : property.rentType;
  };

  // Get safe rent types array for display
  const getSafeRentTypes = (property) => {
    if (!property?.rentType) return ['rental'];
    return Array.isArray(property.rentType) ? property.rentType : [property.rentType];
  };

  // LOADING STATE
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        {/* PURPLE HERO */}
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

        {/* Loading Content */}
        <Container className="py-5 text-center">
          <Spinner animation="border" style={{ color: '#7c3aed' }} />
          <p className="mt-3 fs-5 fw-semibold">Loading properties...</p>
        </Container>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        {/* PURPLE HERO */}
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

        {/* Error Content */}
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
      {/* PURPLE HERO SECTION */}
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
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='9' cy='9' r='9'/%3E%3Ccircle cx='51' cy='51' r='9'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.6
          }}
        />
        <Container className="position-relative">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4" style={{ 
              letterSpacing: '-0.025em',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Find Your Perfect Property
            </h1>
            <p className="fs-5 mb-0 opacity-90" style={{ 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: 1.6 
            }}>
              Discover verified properties from our premium collection across India
            </p>
          </div>
        </Container>
      </section>

      {/* MAIN LAYOUT */}
      <div 
        style={{ 
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: '#ffffff'
        }}
      >
        
        {/* SIDEBAR */}
        <div 
          style={{
            width: '320px',
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            position: 'sticky',
            top: 0,
            overflowY: 'auto',
            borderRight: '1px solid #e2e8f0'
          }}
        >
          
          {/* Sidebar Header */}
          <div className="p-4 border-bottom bg-white" style={{ borderColor: '#e2e8f0' }}>
            <div>
              <h5 className="mb-2 fw-bold" style={{ color: '#1e293b' }}>Filters</h5>
              <small className="text-muted">Refine your search</small>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="p-4">
            
            {/* SEARCH INPUT WITH WORKING ICON */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                Search Properties
              </Form.Label>
              <div className="search-wrapper">
                <svg 
                  className="search-icon" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="currentColor"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
                <Form.Control
                  type="text"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                Location
              </Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="custom-select"
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
              <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                Property Type
              </Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="custom-select"
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
              <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                Price Range
              </Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="custom-select"
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
                <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                  Bedrooms
                </Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="custom-select"
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1+ BHK</option>
                  <option value="2">2+ BHK</option>
                  <option value="3">3+ BHK</option>
                  <option value="4">4+ BHK</option>
                </Form.Select>
              </div>
            )}

            {/* Clear Filters Button */}
            <Button 
              variant="outline-secondary"
              className="w-100 mb-4 fw-semibold custom-clear-btn"
              onClick={clearFilters}
            >
              ✕ Clear All Filters
            </Button>

            {/* Active Filters Counter */}
            <div className="filter-status">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semibold">Active Filters</span>
                <span className="custom-badge-purple">
                  {Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Container fluid className="py-5 px-5" style={{ paddingBottom: '140px' }}>
            
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
                  className={`btn fw-semibold custom-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
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
                  className={`btn fw-semibold custom-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  htmlFor="listView"
                >
                  ☰ List
                </label>
              </div>
            </div>

            {/* PROPERTY CARDS SECTION - ENHANCED REAL DATA */}
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
                    className="custom-primary-btn fw-semibold"
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
                  if (!property || !property._id) return null; // Skip invalid properties
                  
                  return (
                    <Col key={property._id}>
                      <Card 
                        className="h-100 border-0 shadow-sm"
                        style={{ 
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                          
                          {/* CUSTOM BADGES - NO BLUE */}
                          <div className="position-absolute top-0 start-0 p-3">
                            <span className="status-badge-green me-2">
                              For Rent
                            </span>
                            <span className="status-badge-purple">
                              ✓ Verified
                            </span>
                          </div>
                          
                          {/* PROPERTY TYPE BADGE - GRAY ONLY */}
                          <div className="position-absolute top-0 end-0 p-3">
                            <span className="status-badge-gray">
                              {property.subtype || property.category || 'Property'}
                            </span>
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
                              <button 
                                type="button"
                                className="btn flex-fill fw-semibold custom-outline-btn"
                                style={{ fontSize: '0.9rem', padding: '12px 20px' }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleViewDetails(property._id);
                                }}
                              >
                                View Details
                              </button>
                              <button 
                                type="button"
                                className="btn flex-fill fw-semibold custom-primary-btn"
                                style={{ fontSize: '0.9rem', padding: '12px 20px' }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleBookNow(property._id);
                                }}
                              >
                                Book Now
                              </button>
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

      {/* COMPLETE CUSTOM STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        /* SEARCH INPUT WITH WORKING ICON */
        .search-wrapper {
          position: relative;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          z-index: 10;
          pointer-events: none;
        }
        
        .search-input {
          padding-left: 40px !important;
          border: 1.5px solid #d1d5db !important;
          border-radius: 8px !important;
          font-size: 0.95rem !important;
          padding: 12px 16px 12px 40px !important;
          background-color: #ffffff !important;
        }
        
        .search-input:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 0.2rem rgba(124, 58, 237, 0.25) !important;
        }
        
        /* CUSTOM SELECT STYLES */
        .custom-select {
          font-size: 0.95rem !important;
          padding: 12px 16px !important;
          border: 1.5px solid #d1d5db !important;
          border-radius: 8px !important;
          background-color: #ffffff !important;
        }
        
        .custom-select:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 0.2rem rgba(124, 58, 237, 0.25) !important;
        }
        
        /* CUSTOM BADGES */
        .custom-badge {
          display: inline-block;
          background-color: #f3f4f6;
          color: #4b5563;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }
        
        .custom-badge-purple {
          display: inline-block;
          background-color: #7c3aed;
          color: white;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 6px;
        }
        
        .custom-badge-green {
          display: inline-block;
          background-color: #059669;
          color: white;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 6px;
        }
        
        .custom-badge-orange {
          display: inline-block;
          background-color: #d97706;
          color: white;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 6px;
        }
        
        /* STATUS BADGES */
        .status-badge-green {
          display: inline-block;
          background-color: #059669;
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .status-badge-purple {
          display: inline-block;
          background-color: #7c3aed;
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .status-badge-gray {
          display: inline-block;
          background-color: #6b7280;
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        /* NAVIGATION BUTTONS */
        .custom-primary-btn {
          background-color: #7c3aed !important;
          border: 1px solid #7c3aed !important;
          color: white !important;
          border-radius: 12px !important;
          transition: all 0.2s ease !important;
        }
        
        .custom-primary-btn:hover {
          background-color: #6d28d9 !important;
          border-color: #6d28d9 !important;
          color: white !important;
          transform: translateY(-1px) !important;
        }
        
        .custom-outline-btn {
          background-color: transparent !important;
          border: 1.5px solid #d1d5db !important;
          color: #6b7280 !important;
          border-radius: 12px !important;
          transition: all 0.2s ease !important;
        }
        
        .custom-outline-btn:hover {
          background-color: #7c3aed !important;
          border-color: #7c3aed !important;
          color: white !important;
          transform: translateY(-1px) !important;
        }
        
        .custom-clear-btn {
          font-size: 0.95rem !important;
          padding: 12px 16px !important;
          border: 1.5px solid #d1d5db !important;
          border-radius: 8px !important;
          color: #6b7280 !important;
          background-color: #ffffff !important;
        }
        
        .custom-clear-btn:hover {
          background-color: #7c3aed !important;
          border-color: #7c3aed !important;
          color: white !important;
        }
        
        /* VIEW TOGGLE BUTTONS */
        .custom-toggle-btn {
          font-size: 0.9rem !important;
          padding: 12px 24px !important;
          border: 1.5px solid #d1d5db !important;
          color: #6b7280 !important;
          background-color: #ffffff !important;
          border-radius: 0 !important;
        }
        
        .custom-toggle-btn:first-child {
          border-radius: 8px 0 0 8px !important;
        }
        
        .custom-toggle-btn:last-child {
          border-radius: 0 8px 8px 0 !important;
          border-left: none !important;
        }
        
        .custom-toggle-btn.active {
          background-color: #7c3aed !important;
          border-color: #7c3aed !important;
          color: white !important;
        }
        
        .custom-toggle-btn:hover {
          background-color: #7c3aed !important;
          border-color: #7c3aed !important;
          color: white !important;
        }
        
        /* FILTER STATUS */
        .filter-status {
          padding: 12px;
          border-radius: 8px;
          background-color: #f8fafc;
          border: 1px solid #e5e7eb;
        }
        
        /* CARD IMAGES */
        .card-img-top {
          object-fit: cover;
          background-color: #f3f4f6;
        }
        
        /* RESPONSIVE DESIGN */
        @media (max-width: 768px) {
          .main-layout {
            flex-direction: column !important;
          }
          .sidebar-container { 
            position: relative !important;
            width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default FindProperty;
