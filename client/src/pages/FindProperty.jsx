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
        <Badge key="bedrooms" className="me-2 mb-2" style={{ 
          backgroundColor: '#f3f4f6', 
          color: '#374151',
          fontSize: '0.8rem',
          fontWeight: '500',
          padding: '6px 12px'
        }}>
          <i className="fas fa-bed me-1"></i>{property.bedrooms} BHK
        </Badge>
      );
    }

    if (property.isResidential && property.bathrooms > 0) {
      details.push(
        <Badge key="bathrooms" className="me-2 mb-2" style={{ 
          backgroundColor: '#f3f4f6', 
          color: '#374151',
          fontSize: '0.8rem',
          fontWeight: '500',
          padding: '6px 12px'
        }}>
          <i className="fas fa-bath me-1"></i>{property.bathrooms} Bath
        </Badge>
      );
    }

    if (!property.isResidential && property.bathrooms > 0) {
      details.push(
        <Badge key="washrooms" className="me-2 mb-2" style={{ 
          backgroundColor: '#f3f4f6', 
          color: '#374151',
          fontSize: '0.8rem',
          fontWeight: '500',
          padding: '6px 12px'
        }}>
          <i className="fas fa-restroom me-1"></i>{property.bathrooms} Washrooms
        </Badge>
      );
    }

    details.push(
      <Badge key="area" className="me-2 mb-2" style={{ 
        backgroundColor: '#f3f4f6', 
        color: '#374151',
        fontSize: '0.8rem',
        fontWeight: '500',
        padding: '6px 12px'
      }}>
        <i className="fas fa-ruler-combined me-1"></i>{property.area.toLocaleString()} sq ft
      </Badge>
    );

    if (property.capacity) {
      details.push(
        <Badge key="capacity" className="me-2 mb-2" style={{ 
          backgroundColor: '#3b82f6', 
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: '500',
          padding: '6px 12px'
        }}>
          <i className="fas fa-users me-1"></i>{property.capacity}
        </Badge>
      );
    }

    if (property.surface) {
      details.push(
        <Badge key="surface" className="me-2 mb-2" style={{ 
          backgroundColor: '#3b82f6', 
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: '500',
          padding: '6px 12px'
        }}>
          <i className="fas fa-futbol me-1"></i>{property.surface}
        </Badge>
      );
    }

    if (property.security) {
      details.push(
        <Badge key="security" className="me-2 mb-2" style={{ 
          backgroundColor: '#3b82f6', 
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: '500',
          padding: '6px 12px'
        }}>
          <i className="fas fa-shield-alt me-1"></i>{property.security}
        </Badge>
      );
    }

    return details;
  };

  return (
    <>
      {/* CLEAN PROFESSIONAL HERO */}
      <section 
        className="text-white py-5"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Find Your Perfect Property</h1>
            <p className="fs-5 mb-0 opacity-90">
              Discover verified properties from our premium collection across India
            </p>
          </div>
        </Container>
      </section>

      {/* CLEAN MODERN LAYOUT */}
      <div 
        style={{ 
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: '#ffffff'
        }}
      >
        
        {/* LIGHT CLEAN SIDEBAR */}
        <div 
          className="border-end"
          style={{
            width: '320px',
            minHeight: '100vh',
            backgroundColor: '#fafbfc',
            position: 'sticky',
            top: 0,
            overflowY: 'auto',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)'
          }}
        >
          
          {/* Clean Sidebar Header */}
          <div className="p-4 border-bottom bg-white">
            <div className="d-flex align-items-center">
              <div 
                className="rounded-3 me-3 d-flex align-items-center justify-content-center"
                style={{ 
                  width: '44px', 
                  height: '44px',
                  backgroundColor: '#3b82f6',
                  color: 'white'
                }}
              >
                <i className="fas fa-filter"></i>
              </div>
              <div>
                <h5 className="mb-1 fw-bold text-dark">Filters</h5>
                <small className="text-muted">Refine your search</small>
              </div>
            </div>
          </div>

          {/* Clean Sidebar Content */}
          <div className="p-4">
            
            {/* Search */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3 text-dark">Search Properties</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <i className="fas fa-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-start-0 ps-0"
                  style={{ 
                    boxShadow: 'none',
                    fontSize: '0.95rem',
                    padding: '12px 16px'
                  }}
                />
              </InputGroup>
            </div>

            {/* Location */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3 text-dark">Location</Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{ 
                  fontSize: '0.95rem',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb'
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
              <Form.Label className="fw-semibold mb-3 text-dark">Property Type</Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{ 
                  fontSize: '0.95rem',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb'
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
              <Form.Label className="fw-semibold mb-3 text-dark">Price Range</Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{ 
                  fontSize: '0.95rem',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb'
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
                <Form.Label className="fw-semibold mb-3 text-dark">Bedrooms</Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{ 
                    fontSize: '0.95rem',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb'
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
              variant="outline-primary"
              className="w-100 mb-4 fw-semibold"
              onClick={clearFilters}
              style={{ 
                fontSize: '0.95rem',
                padding: '12px 16px',
                borderWidth: '2px'
              }}
            >
              <i className="fas fa-times me-2"></i>Clear All Filters
            </Button>

            {/* Filter Status */}
            <div 
              className="p-4 rounded-3 bg-white border"
              style={{ borderColor: '#e5e7eb' }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semibold">Active Filters</span>
                <Badge 
                  bg="primary"
                  className="fw-semibold"
                  style={{ fontSize: '0.8rem' }}
                >
                  {Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - PERFECT SPACING */}
        <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Container fluid className="py-5 px-5" style={{ paddingBottom: '120px' }}>
            
            {/* Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div>
                <h2 className="h2 fw-bold text-dark mb-3">
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="text-muted fs-6 mb-0">
                  {searchQuery && `Results for "${searchQuery}"`}
                  {Object.values(filters).some(f => f) && ' with filters applied'}
                  {!searchQuery && !Object.values(filters).some(f => f) && 'Browse our premium collection'}
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="btn-group shadow-sm" role="group">
                <input 
                  type="radio" 
                  className="btn-check" 
                  name="viewMode" 
                  id="gridView" 
                  checked={viewMode === 'grid'}
                  onChange={() => setViewMode('grid')}
                />
                <label 
                  className="btn btn-outline-primary fw-semibold" 
                  htmlFor="gridView"
                  style={{ fontSize: '0.9rem', padding: '10px 20px' }}
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
                  className="btn btn-outline-primary fw-semibold" 
                  htmlFor="listView"
                  style={{ fontSize: '0.9rem', padding: '10px 20px' }}
                >
                  <i className="fas fa-list me-2"></i>List
                </label>
              </div>
            </div>

            {/* Beautiful Property Cards */}
            {filteredProperties.length === 0 ? (
              <Card className="border-0 shadow-sm text-center p-5">
                <Card.Body>
                  <div className="mb-4 text-muted" style={{ fontSize: '5rem' }}>
                    <i className="fas fa-search"></i>
                  </div>
                  <h3 className="fw-bold text-dark mb-4">No Properties Found</h3>
                  <p className="text-muted fs-6 mb-4">
                    We couldn't find any properties matching your criteria. Try adjusting your filters.
                  </p>
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={clearFilters}
                    className="fw-semibold"
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
                      className="h-100 border-0 shadow"
                      style={{ 
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        borderRadius: '16px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
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
                        
                        {/* Clean Status Badges */}
                        <div className="position-absolute top-0 start-0 p-3">
                          <Badge 
                            className="me-2 fw-semibold shadow-sm"
                            style={{ 
                              fontSize: '0.8rem',
                              padding: '8px 16px',
                              backgroundColor: property.status === 'For Sale' ? '#f59e0b' : '#10b981',
                              color: 'white'
                            }}
                          >
                            {property.status}
                          </Badge>
                          {property.verified && (
                            <Badge 
                              className="fw-semibold shadow-sm"
                              style={{ 
                                fontSize: '0.8rem',
                                padding: '8px 16px',
                                backgroundColor: '#3b82f6',
                                color: 'white'
                              }}
                            >
                              <i className="fas fa-check me-1"></i>Verified
                            </Badge>
                          )}
                        </div>
                        
                        {/* Property Type Badge */}
                        <div className="position-absolute top-0 end-0 p-3">
                          <Badge 
                            className="fw-semibold shadow-sm"
                            style={{ 
                              fontSize: '0.8rem',
                              padding: '8px 16px',
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
                          <i className="fas fa-map-marker-alt me-2" style={{ color: '#3b82f6' }}></i>
                          <span className="fw-medium">{property.location}</span>
                        </div>
                        
                        {/* Title */}
                        <Card.Title className="h4 fw-bold mb-4" style={{ 
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
                          <div className="mb-4">
                            <div className="h3 fw-bold text-success mb-1">
                              ₹{property.price.toLocaleString()}
                            </div>
                            <small className="text-muted fw-medium">per {property.priceType}</small>
                          </div>
                          
                          {/* Beautiful Action Buttons */}
                          <div className="d-grid gap-3 d-md-flex">
                            <Button 
                              variant="outline-primary" 
                              size="lg"
                              className="flex-fill fw-semibold"
                              style={{ 
                                fontSize: '0.9rem',
                                padding: '14px 20px',
                                borderRadius: '12px',
                                borderWidth: '2px'
                              }}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="primary"
                              size="lg"
                              className="flex-fill fw-semibold shadow"
                              style={{ 
                                fontSize: '0.9rem',
                                padding: '14px 20px',
                                borderRadius: '12px'
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
          </Container>
        </div>
      </div>

      {/* Perfect Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.25) !important;
        }
        
        .btn-outline-primary:hover {
          background-color: #3b82f6 !important;
          border-color: #3b82f6 !important;
        }
        
        .btn-primary {
          background-color: #3b82f6 !important;
          border-color: #3b82f6 !important;
        }
        
        .btn-primary:hover {
          background-color: #2563eb !important;
          border-color: #2563eb !important;
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
