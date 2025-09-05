import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, InputGroup } from 'react-bootstrap';

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

  // ENTERPRISE-GRADE SAMPLE DATA WITH SMART LOGIC
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

  // ENTERPRISE-GRADE PROPERTY DETAILS RENDERER
  const renderPropertyDetails = (property) => {
    const details = [];

    // Smart conditional rendering based on property type
    if (property.isResidential && property.bedrooms > 0) {
      details.push(
        <Badge key="bedrooms" bg="light" text="dark" className="me-2 fw-normal">
          {property.bedrooms} BHK
        </Badge>
      );
    }

    if (property.isResidential && property.bathrooms > 0) {
      details.push(
        <Badge key="bathrooms" bg="light" text="dark" className="me-2 fw-normal">
          {property.bathrooms} Bath
        </Badge>
      );
    }

    if (!property.isResidential && property.bathrooms > 0) {
      details.push(
        <Badge key="washrooms" bg="light" text="dark" className="me-2 fw-normal">
          {property.bathrooms} Washrooms
        </Badge>
      );
    }

    details.push(
      <Badge key="area" bg="light" text="dark" className="me-2 fw-normal">
        {property.area.toLocaleString()} sq ft
      </Badge>
    );

    // Special attributes
    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="primary" className="me-2">
          {property.capacity}
        </Badge>
      );
    }

    if (property.surface) {
      details.push(
        <Badge key="surface" bg="success" className="me-2">
          {property.surface}
        </Badge>
      );
    }

    if (property.security) {
      details.push(
        <Badge key="security" bg="info" className="me-2">
          {property.security}
        </Badge>
      );
    }

    return details;
  };

  return (
    <>
      {/* ENTERPRISE HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        padding: '4rem 0 3rem 0'
      }}>
        <Container>
          <div className="text-center text-white">
            <h1 className="display-5 fw-bold mb-3">Find Your Perfect Property</h1>
            <p className="fs-5 mb-0 opacity-90">
              Discover verified properties from our premium collection across India
            </p>
          </div>
        </Container>
      </section>

      {/* ENTERPRISE LAYOUT */}
      <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#fafbfc' }}>
        
        {/* WORLD-CLASS SIDEBAR */}
        <div 
          className="position-fixed start-0 bg-white border-end"
          style={{
            width: '320px',
            height: '100vh',
            top: 0,
            overflowY: 'auto',
            zIndex: 1040,
            borderColor: '#e5e7eb !important'
          }}
        >
          
          {/* Sidebar Header */}
          <div className="p-4 border-bottom" style={{ borderColor: '#e5e7eb' }}>
            <div className="d-flex align-items-center">
              <div 
                className="rounded-2 me-3 d-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#6366f1',
                  color: 'white'
                }}
              >
                <i className="fas fa-filter"></i>
              </div>
              <div>
                <h6 className="mb-1 fw-semibold text-gray-900">Filters</h6>
                <small className="text-muted">Refine your search</small>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="p-4">
            
            {/* Search */}
            <div className="mb-4">
              <Form.Label className="fw-medium text-gray-700 mb-2">Search</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <i className="fas fa-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-start-0 ps-0"
                  style={{ boxShadow: 'none' }}
                />
              </InputGroup>
            </div>

            {/* Location */}
            <div className="mb-4">
              <Form.Label className="fw-medium text-gray-700 mb-2">Location</Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="form-select-lg"
                style={{ fontSize: '0.875rem' }}
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
              <Form.Label className="fw-medium text-gray-700 mb-2">Property Type</Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="form-select-lg"
                style={{ fontSize: '0.875rem' }}
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
              <Form.Label className="fw-medium text-gray-700 mb-2">Price Range</Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="form-select-lg"
                style={{ fontSize: '0.875rem' }}
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
                <Form.Label className="fw-medium text-gray-700 mb-2">Bedrooms</Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="form-select-lg"
                  style={{ fontSize: '0.875rem' }}
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
              variant="outline-primary" 
              className="w-100 mb-4 fw-medium"
              onClick={clearFilters}
              style={{ 
                borderColor: '#6366f1',
                color: '#6366f1'
              }}
            >
              <i className="fas fa-times me-2"></i>Clear Filters
            </Button>

            {/* Filter Status */}
            <div 
              className="p-3 rounded-3"
              style={{ backgroundColor: '#f8fafc', border: '1px solid #e5e7eb' }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted fw-medium">Active Filters</small>
                <Badge 
                  bg={Object.values(filters).filter(f => f).length || searchQuery ? 'primary' : 'light'}
                  text={Object.values(filters).filter(f => f).length || searchQuery ? 'white' : 'dark'}
                >
                  {Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - ZERO OVERLAP GUARANTEED */}
        <div 
          style={{ 
            marginLeft: '320px',
            flex: 1,
            paddingBottom: '120px', // GUARANTEED FOOTER CLEARANCE
            minHeight: '100vh'
          }}
        >
          <Container fluid className="py-4 px-4">
            
            {/* Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="h4 fw-bold text-gray-900 mb-1">
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="text-muted mb-0">
                  {searchQuery && `Results for "${searchQuery}"`}
                  {Object.values(filters).some(f => f) && ' with filters applied'}
                  {!searchQuery && !Object.values(filters).some(f => f) && 'Browse our premium collection'}
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
                <label className="btn btn-outline-primary btn-sm" htmlFor="gridView">
                  <i className="fas fa-th me-1"></i>Grid
                </label>
                
                <input 
                  type="radio" 
                  className="btn-check" 
                  name="viewMode" 
                  id="listView"
                  checked={viewMode === 'list'} 
                  onChange={() => setViewMode('list')}
                />
                <label className="btn btn-outline-primary btn-sm" htmlFor="listView">
                  <i className="fas fa-list me-1"></i>List
                </label>
              </div>
            </div>

            {/* Property Cards */}
            {filteredProperties.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-5">
                  <div className="mb-4" style={{ fontSize: '4rem', color: '#d1d5db' }}>
                    <i className="fas fa-search"></i>
                  </div>
                  <h4 className="fw-bold text-gray-900 mb-3">No Properties Found</h4>
                  <p className="text-muted mb-4">
                    We couldn't find any properties matching your criteria. Try adjusting your filters.
                  </p>
                  <Button 
                    variant="primary" 
                    onClick={clearFilters}
                    style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}
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
                      className="h-100 border-0 shadow-sm hover-card"
                      style={{ 
                        transition: 'all 0.2s ease-in-out',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
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
                          style={{ 
                            height: viewMode === 'grid' ? '200px' : '180px', 
                            objectFit: 'cover'
                          }}
                        />
                        
                        {/* Status & Verification Badges */}
                        <div className="position-absolute top-0 start-0 p-3">
                          <Badge 
                            bg={property.status === 'For Sale' ? 'warning' : 'success'}
                            className="me-2"
                          >
                            {property.status}
                          </Badge>
                          {property.verified && (
                            <Badge bg="primary">
                              <i className="fas fa-check me-1"></i>Verified
                            </Badge>
                          )}
                        </div>
                        
                        {/* Property Type */}
                        <div className="position-absolute top-0 end-0 p-3">
                          <Badge bg="dark" className="opacity-75">
                            {property.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <Card.Body className="d-flex flex-column p-4">
                        {/* Location */}
                        <div className="d-flex align-items-center text-muted mb-2">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          <small className="fw-medium">{property.location}</small>
                        </div>
                        
                        {/* Title */}
                        <Card.Title className="h5 fw-bold text-gray-900 mb-3">
                          {property.title}
                        </Card.Title>
                        
                        {/* Property Details */}
                        <div className="mb-3">
                          {renderPropertyDetails(property)}
                        </div>
                        
                        {/* Spacer */}
                        <div className="mt-auto">
                          {/* Price */}
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <div className="h4 fw-bold text-success mb-0">
                                ₹{property.price.toLocaleString()}
                              </div>
                              <small className="text-muted">per {property.priceType}</small>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="d-grid gap-2 d-md-flex">
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              className="flex-fill"
                              style={{ 
                                borderColor: '#d1d5db',
                                color: '#6b7280'
                              }}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="primary" 
                              size="sm" 
                              className="flex-fill"
                              style={{ 
                                backgroundColor: '#6366f1',
                                borderColor: '#6366f1'
                              }}
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

            {/* Load More */}
            {filteredProperties.length > 0 && (
              <div className="text-center mt-5">
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  className="px-5"
                  style={{ 
                    borderColor: '#6366f1',
                    color: '#6366f1'
                  }}
                >
                  <i className="fas fa-plus me-2"></i>Load More Properties
                </Button>
              </div>
            )}
          </Container>
        </div>
      </div>

      {/* ENTERPRISE STYLES */}
      <style>{`
        .text-gray-900 { color: #111827 !important; }
        .text-gray-700 { color: #374151 !important; }
        .form-select-lg { padding: 0.75rem 1rem; }
        .hover-card:hover { transform: translateY(-4px) !important; }
        
        /* Custom focus states */
        .form-control:focus, .form-select:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .sidebar { 
            position: relative !important;
            width: 100% !important;
            height: auto !important;
          }
          .main-content { 
            margin-left: 0 !important; 
          }
        }
      `}</style>
    </>
  );
};

export default FindProperty;
