import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form } from 'react-bootstrap';

const FindProperty = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
    "All Categories", "Properties", "Event Venues", "Turf", "Parking",
    "Villa", "Apartment", "House", "Studio", "Commercial", "Office Space", 
    "Shop", "Land", "Agricultural Land", "Residential Plot"
  ];

  const residentialTypes = ["Villa", "Apartment", "House", "Studio"];

  const sampleProperties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Modern Studio Apartment',
      location: 'Bangalore, Karnataka',
      price: 1800,
      priceType: 'month',
      type: 'Studio',
      category: 'Properties',
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      status: 'For Rent',
      isResidential: true,
      verified: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Premium Office Space',
      location: 'Mumbai, Maharashtra',
      price: 5000,
      priceType: 'month',
      type: 'Commercial',
      category: 'Properties',
      bedrooms: 0,
      bathrooms: 3,
      area: 3000,
      status: 'For Rent',
      isResidential: false,
      verified: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Family Villa',
      location: 'Pune, Maharashtra',
      price: 3200,
      priceType: 'month',
      type: 'House',
      category: 'Properties',
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      status: 'For Rent',
      isResidential: true,
      verified: true
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Grand Wedding Venue',
      location: 'Chennai, Tamil Nadu',
      price: 15000,
      priceType: 'day',
      type: 'Event Venues',
      category: 'Event Venues',
      bedrooms: 0,
      bathrooms: 0,
      area: 5000,
      status: 'For Rent',
      isResidential: false,
      verified: true,
      capacity: '500 guests'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Professional Football Turf',
      location: 'Delhi, India',
      price: 2500,
      priceType: 'hour',
      type: 'Turf',
      category: 'Turf',
      bedrooms: 0,
      bathrooms: 0,
      area: 8000,
      status: 'For Rent',
      isResidential: false,
      verified: true,
      surface: 'Artificial Grass'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Secure Parking Bay',
      location: 'Gurgaon, Haryana',
      price: 1500,
      priceType: 'month',
      type: 'Parking',
      category: 'Parking',
      bedrooms: 0,
      bathrooms: 0,
      area: 200,
      status: 'For Rent',
      isResidential: false,
      verified: true,
      security: '24/7 CCTV'
    }
  ];

  useEffect(() => {
    setProperties(sampleProperties);
    setFilteredProperties(sampleProperties);
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property =>
        property.type === filters.propertyType || property.category === filters.propertyType
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property =>
        property.price >= min && property.price <= max
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property =>
        property.isResidential && property.bedrooms >= parseInt(filters.bedrooms)
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
    return residentialTypes.includes(filters.propertyType) || filters.propertyType === 'Properties';
  };

  const renderPropertyDetails = (property) => {
    const details = [];

    if (property.isResidential && property.bedrooms > 0) {
      details.push(
        <span key="bedrooms" className="custom-badge me-2 mb-2">
          <i className="fas fa-bed me-1"></i>{property.bedrooms} BHK
        </span>
      );
    }

    if (property.isResidential && property.bathrooms > 0) {
      details.push(
        <span key="bathrooms" className="custom-badge me-2 mb-2">
          <i className="fas fa-bath me-1"></i>{property.bathrooms} Bath
        </span>
      );
    }

    if (!property.isResidential && property.bathrooms > 0) {
      details.push(
        <span key="washrooms" className="custom-badge me-2 mb-2">
          <i className="fas fa-restroom me-1"></i>{property.bathrooms} Washrooms
        </span>
      );
    }

    details.push(
      <span key="area" className="custom-badge me-2 mb-2">
        <i className="fas fa-ruler-combined me-1"></i>{property.area.toLocaleString()} sq ft
      </span>
    );

    if (property.capacity) {
      details.push(
        <span key="capacity" className="custom-badge-purple me-2 mb-2">
          <i className="fas fa-users me-1"></i>{property.capacity}
        </span>
      );
    }

    if (property.surface) {
      details.push(
        <span key="surface" className="custom-badge-green me-2 mb-2">
          <i className="fas fa-futbol me-1"></i>{property.surface}
        </span>
      );
    }

    if (property.security) {
      details.push(
        <span key="security" className="custom-badge-orange me-2 mb-2">
          <i className="fas fa-shield-alt me-1"></i>{property.security}
        </span>
      );
    }

    return details;
  };

  return (
    <>
      {/* PURPLE HERO */}
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
          
          <div className="p-4 border-bottom bg-white" style={{ borderColor: '#e2e8f0' }}>
            <div>
              <h5 className="mb-2 fw-bold" style={{ color: '#1e293b' }}>Filters</h5>
              <small className="text-muted">Refine your search</small>
            </div>
          </div>

          <div className="p-4">
            
            {/* SEARCH INPUT WITH ICON */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                Search Properties
              </Form.Label>
              <div className="search-wrapper">
                <i className="fas fa-search search-icon"></i>
                <Form.Control
                  type="text"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Location */}
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

            {/* Property Type */}
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

            {/* Price Range */}
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

            {/* Conditional Bedrooms */}
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

            {/* Clear Filters */}
            <Button 
              variant="outline-secondary"
              className="w-100 mb-4 fw-semibold custom-clear-btn"
              onClick={clearFilters}
            >
              <i className="fas fa-times me-2"></i>Clear All Filters
            </Button>

            {/* Filter Status */}
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

        {/* MAIN CONTENT */}
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
              
              {/* View Toggle */}
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
                  <i className="fas fa-th me-2"></i>Grid
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
                  <i className="fas fa-list me-2"></i>List
                </label>
              </div>
            </div>

            {/* PROPERTY CARDS - CUSTOM BADGES, NO BOOTSTRAP COLORS */}
            {filteredProperties.length === 0 ? (
              <Card className="border-0 shadow-sm text-center p-5">
                <Card.Body>
                  <div className="mb-4 text-muted" style={{ fontSize: '5rem' }}>
                    <i className="fas fa-search"></i>
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
                {filteredProperties.map((property) => (
                  <Col key={property.id}>
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
                      <div className="position-relative">
                        <Card.Img 
                          variant="top" 
                          src={property.image}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x240/f3f4f6/9ca3af?text=No+Image+Available';
                          }}
                          style={{ 
                            height: viewMode === 'grid' ? '240px' : '200px', 
                            objectFit: 'cover',
                            borderRadius: '12px 12px 0 0'
                          }}
                        />
                        
                        {/* CUSTOM BADGES - NO BOOTSTRAP COLORS */}
                        <div className="position-absolute top-0 start-0 p-3">
                          <span className="status-badge-green me-2">
                            {property.status}
                          </span>
                          {property.verified && (
                            <span className="status-badge-purple">
                              <i className="fas fa-check me-1"></i>Verified
                            </span>
                          )}
                        </div>
                        
                        {/* PROPERTY TYPE BADGE - GRAY ONLY */}
                        <div className="position-absolute top-0 end-0 p-3">
                          <span className="status-badge-gray">
                            {property.type}
                          </span>
                        </div>
                      </div>
                      
                      <Card.Body className="d-flex flex-column p-4">
                        {/* Location */}
                        <div className="d-flex align-items-center text-muted mb-3">
                          <i className="fas fa-map-marker-alt me-2" style={{ color: '#7c3aed' }}></i>
                          <span className="fw-medium">{property.location}</span>
                        </div>
                        
                        {/* Title */}
                        <Card.Title className="h4 fw-bold mb-4" style={{ 
                          lineHeight: '1.4',
                          color: '#1e293b'
                        }}>
                          {property.title}
                        </Card.Title>
                        
                        {/* Property Details */}
                        <div className="mb-4 flex-grow-1">
                          {renderPropertyDetails(property)}
                        </div>
                        
                        {/* Price & Buttons */}
                        <div className="mt-auto">
                          <div className="mb-4">
                            <div className="h3 fw-bold text-success mb-1">
                              ₹{property.price.toLocaleString()}
                            </div>
                            <small className="text-muted fw-medium">per {property.priceType}</small>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="d-grid gap-3 d-md-flex">
                            <Button 
                              className="flex-fill fw-semibold custom-outline-btn"
                              size="lg"
                            >
                              View Details
                            </Button>
                            <Button 
                              className="flex-fill fw-semibold custom-primary-btn"
                              size="lg"
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </div>
      </div>

      {/* CUSTOM STYLES - OVERRIDE ALL BOOTSTRAP BLUES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        /* Search input with icon */
        .search-wrapper {
          position: relative;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          z-index: 5;
          font-size: 1rem;
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
        
        /* Custom selects */
        .custom-select {
          fontSize: 0.95rem !important;
          padding: 12px 16px !important;
          border: 1.5px solid #d1d5db !important;
          border-radius: 8px !important;
          background-color: #ffffff !important;
        }
        
        .custom-select:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 0.2rem rgba(124, 58, 237, 0.25) !important;
        }
        
        /* Custom badges - NO BOOTSTRAP CLASSES */
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
        
        /* Status badges - COMPLETELY CUSTOM */
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
        
        /* Custom buttons */
        .custom-primary-btn {
          background-color: #7c3aed !important;
          border-color: #7c3aed !important;
          color: white !important;
          font-size: 0.9rem !important;
          padding: 12px 20px !important;
          border-radius: 12px !important;
          border: none !important;
        }
        
        .custom-primary-btn:hover {
          background-color: #6d28d9 !important;
          border-color: #6d28d9 !important;
          color: white !important;
        }
        
        .custom-outline-btn {
          background-color: #ffffff !important;
          border: 1.5px solid #d1d5db !important;
          color: #6b7280 !important;
          font-size: 0.9rem !important;
          padding: 12px 20px !important;
          border-radius: 12px !important;
        }
        
        .custom-outline-btn:hover {
          background-color: #7c3aed !important;
          border-color: #7c3aed !important;
          color: white !important;
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
        
        /* View toggle buttons */
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
        
        /* Filter status */
        .filter-status {
          padding: 12px;
          border-radius: 8px;
          background-color: #f8fafc;
          border: 1px solid #e5e7eb;
        }
        
        /* Override any remaining Bootstrap blues */
        .badge-primary, .bg-primary {
          background-color: #7c3aed !important;
        }
        
        .text-primary {
          color: #7c3aed !important;
        }
        
        .btn-primary {
          background-color: #7c3aed !important;
          border-color: #7c3aed !important;
        }
        
        .btn-primary:hover {
          background-color: #6d28d9 !important;
          border-color: #6d28d9 !important;
        }
        
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
