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
    "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara",
    "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot",
    "Gurgaon", "Noida", "Kochi", "Coimbatore", "Chandigarh", "Guwahati"
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
        <Badge key="bedrooms" bg="light" text="dark" className="me-2 mb-1 fw-normal">
          <i className="fas fa-bed me-1"></i>{property.bedrooms} BHK
        </Badge>
      );
    }

    if (property.isResidential && property.bathrooms > 0) {
      details.push(
        <Badge key="bathrooms" bg="light" text="dark" className="me-2 mb-1 fw-normal">
          <i className="fas fa-bath me-1"></i>{property.bathrooms} Bath
        </Badge>
      );
    }

    if (!property.isResidential && property.bathrooms > 0) {
      details.push(
        <Badge key="washrooms" bg="light" text="dark" className="me-2 mb-1 fw-normal">
          <i className="fas fa-restroom me-1"></i>{property.bathrooms} Washrooms
        </Badge>
      );
    }

    details.push(
      <Badge key="area" bg="light" text="dark" className="me-2 mb-1 fw-normal">
        <i className="fas fa-ruler-combined me-1"></i>{property.area.toLocaleString()} sq ft
      </Badge>
    );

    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="success" className="me-2 mb-1">
          <i className="fas fa-users me-1"></i>{property.capacity}
        </Badge>
      );
    }

    if (property.surface) {
      details.push(
        <Badge key="surface" bg="success" className="me-2 mb-1">
          <i className="fas fa-futbol me-1"></i>{property.surface}
        </Badge>
      );
    }

    if (property.security) {
      details.push(
        <Badge key="security" bg="info" className="me-2 mb-1">
          <i className="fas fa-shield-alt me-1"></i>{property.security}
        </Badge>
      );
    }

    return details;
  };

  return (
    <>
      {/* MODERN PROFESSIONAL HERO SECTION - NO HARSH BLUES */}
      <section 
        className="text-white py-5"
        style={{
          background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)', // Professional dark gradient
          position: 'relative'
        }}
      >
        {/* Subtle overlay pattern */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1
          }}
        />
        <Container className="position-relative">
          <div className="text-center">
            <h1 className="display-5 fw-bold mb-3">Find Your Perfect Property</h1>
            <p className="fs-5 mb-0 opacity-90">
              Discover verified properties from our premium collection across India
            </p>
          </div>
        </Container>
      </section>

      {/* BULLETPROOF LAYOUT WITH CSS GRID - ZERO OVERLAP GUARANTEED */}
      <div 
        style={{ 
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          minHeight: '100vh',
          backgroundColor: '#f8fafc'
        }}
      >
        
        {/* PROFESSIONAL SIDEBAR */}
        <div 
          className="bg-white border-end"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
            zIndex: 1040,
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)'
          }}
        >
          
          {/* Sidebar Header */}
          <div 
            className="p-4 border-bottom text-white"
            style={{
              background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'
            }}
          >
            <div className="d-flex align-items-center">
              <div 
                className="rounded-2 me-3 d-flex align-items-center justify-content-center bg-white"
                style={{ 
                  width: '40px', 
                  height: '40px',
                  color: '#1f2937'
                }}
              >
                <i className="fas fa-filter"></i>
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">Filters</h6>
                <small className="opacity-75">Refine your search</small>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="p-4">
            
            {/* Search */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-2" style={{ color: '#1f2937' }}>Search</Form.Label>
              <InputGroup>
                <InputGroup.Text 
                  className="bg-light border-end-0"
                  style={{ borderColor: '#e5e7eb' }}
                >
                  <i className="fas fa-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-start-0 ps-0"
                  style={{ 
                    boxShadow: 'none',
                    fontSize: '0.9rem',
                    borderColor: '#e5e7eb'
                  }}
                />
              </InputGroup>
            </div>

            {/* Location */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-2" style={{ color: '#1f2937' }}>Location</Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{ 
                  fontSize: '0.9rem',
                  borderColor: '#e5e7eb'
                }}
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
              <Form.Label className="fw-semibold mb-2" style={{ color: '#1f2937' }}>Property Type</Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{ 
                  fontSize: '0.9rem',
                  borderColor: '#e5e7eb'
                }}
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
              <Form.Label className="fw-semibold mb-2" style={{ color: '#1f2937' }}>Price Range</Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{ 
                  fontSize: '0.9rem',
                  borderColor: '#e5e7eb'
                }}
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
                <Form.Label className="fw-semibold mb-2" style={{ color: '#1f2937' }}>Bedrooms</Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{ 
                    fontSize: '0.9rem',
                    borderColor: '#e5e7eb'
                  }}
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
              variant="outline-dark"
              className="w-100 mb-4 fw-semibold"
              onClick={clearFilters}
              style={{ 
                fontSize: '0.9rem',
                borderColor: '#374151',
                color: '#374151'
              }}
            >
              <i className="fas fa-times me-2"></i>Clear Filters
            </Button>

            {/* Filter Status */}
            <div 
              className="p-3 rounded-3"
              style={{ 
                backgroundColor: '#f8fafc',
                border: '1px solid #e5e7eb'
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted fw-semibold">Active Filters</small>
                <Badge 
                  bg={Object.values(filters).filter(f => f).length || searchQuery ? 'dark' : 'secondary'}
                  className="fw-normal"
                >
                  {Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - BULLETPROOF FOOTER CLEARANCE */}
        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}
        >
          <Container fluid className="flex-grow-1 py-4 px-4">
            
            {/* Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
              <div>
                <h2 className="h3 fw-bold mb-2" style={{ color: '#1f2937' }}>
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
                <label 
                  className="btn btn-outline-dark btn-sm fw-semibold" 
                  htmlFor="gridView"
                  style={{ fontSize: '0.85rem', color: '#374151' }}
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
                  className="btn btn-outline-dark btn-sm fw-semibold" 
                  htmlFor="listView"
                  style={{ fontSize: '0.85rem', color: '#374151' }}
                >
                  <i className="fas fa-list me-2"></i>List
                </label>
              </div>
            </div>

            {/* Property Cards */}
            {filteredProperties.length === 0 ? (
              <Card className="border-0 shadow-sm text-center py-5">
                <Card.Body>
                  <div className="mb-4 text-muted" style={{ fontSize: '4rem' }}>
                    <i className="fas fa-search"></i>
                  </div>
                  <h4 className="fw-bold mb-3" style={{ color: '#1f2937' }}>No Properties Found</h4>
                  <p className="text-muted mb-4">
                    We couldn't find any properties matching your criteria. Try adjusting your filters.
                  </p>
                  <Button 
                    variant="dark" 
                    onClick={clearFilters}
                    style={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#1f2937',
                      fontSize: '0.9rem'
                    }}
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
                      className="h-100 border-0"
                      style={{ 
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #e5e7eb'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                      }}
                    >
                      <div className="position-relative">
                        <Card.Img 
                          variant="top" 
                          src={property.image}
                          style={{ 
                            height: viewMode === 'grid' ? '240px' : '200px', 
                            objectFit: 'cover',
                            borderRadius: '16px 16px 0 0'
                          }}
                        />
                        
                        {/* Status & Verification */}
                        <div className="position-absolute top-0 start-0 p-3">
                          <Badge 
                            bg={property.status === 'For Sale' ? 'warning' : 'success'}
                            className="me-2 fw-semibold shadow-sm"
                            style={{ fontSize: '0.75rem' }}
                          >
                            {property.status}
                          </Badge>
                          {property.verified && (
                            <Badge 
                              bg="dark" 
                              className="fw-semibold shadow-sm"
                              style={{ 
                                fontSize: '0.75rem',
                                backgroundColor: '#1f2937'
                              }}
                            >
                              <i className="fas fa-check me-1"></i>Verified
                            </Badge>
                          )}
                        </div>
                        
                        {/* Property Type */}
                        <div className="position-absolute top-0 end-0 p-3">
                          <Badge 
                            className="fw-semibold shadow-sm"
                            style={{ 
                              fontSize: '0.75rem',
                              backgroundColor: 'rgba(31, 41, 55, 0.8)',
                              color: 'white'
                            }}
                          >
                            {property.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <Card.Body className="d-flex flex-column p-4">
                        {/* Location */}
                        <div className="d-flex align-items-center text-muted mb-3">
                          <i className="fas fa-map-marker-alt me-2" style={{ color: '#1f2937' }}></i>
                          <small className="fw-medium">{property.location}</small>
                        </div>
                        
                        {/* Title */}
                        <Card.Title className="h5 fw-bold mb-3" style={{ 
                          lineHeight: '1.4',
                          color: '#1f2937'
                        }}>
                          {property.title}
                        </Card.Title>
                        
                        {/* Property Details */}
                        <div className="mb-4 flex-grow-1">
                          {renderPropertyDetails(property)}
                        </div>
                        
                        {/* Price & Buttons */}
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <div className="h4 fw-bold text-success mb-0">
                                ₹{property.price.toLocaleString()}
                              </div>
                              <small className="text-muted">per {property.priceType}</small>
                            </div>
                          </div>
                          
                          {/* Perfect Action Buttons */}
                          <div className="d-grid gap-2 d-md-flex">
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              className="flex-fill fw-semibold"
                              style={{ 
                                fontSize: '0.85rem',
                                padding: '12px 18px',
                                borderRadius: '10px',
                                borderColor: '#d1d5db',
                                color: '#6b7280'
                              }}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="dark"
                              size="sm" 
                              className="flex-fill fw-semibold"
                              style={{ 
                                backgroundColor: '#1f2937',
                                borderColor: '#1f2937',
                                fontSize: '0.85rem',
                                padding: '12px 18px',
                                borderRadius: '10px'
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
              <div className="text-center mt-5 pb-5"> {/* Added pb-5 for extra footer clearance */}
                <Button 
                  variant="outline-dark" 
                  size="lg" 
                  className="px-5 fw-semibold"
                  style={{ 
                    borderColor: '#1f2937',
                    color: '#1f2937',
                    fontSize: '0.95rem',
                    borderRadius: '12px'
                  }}
                >
                  <i className="fas fa-plus me-2"></i>Load More Properties
                </Button>
              </div>
            )}
          </Container>
        </div>
      </div>

      {/* WORLD-CLASS STYLES */}
      <style>{`
        /* Professional focus states */
        .form-control:focus, .form-select:focus {
          border-color: #374151 !important;
          box-shadow: 0 0 0 0.2rem rgba(31, 41, 55, 0.25) !important;
        }
        
        /* Hover effects */
        .btn-outline-dark:hover {
          background-color: #1f2937 !important;
          border-color: #1f2937 !important;
        }
        
        /* Perfect scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
          .main-layout {
            display: block !important;
          }
          .sidebar-container { 
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </>
  );
};

export default FindProperty;
