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
          backgroundColor: '#f1f5f9', 
          color: '#475569',
          fontSize: '0.8rem',
          fontWeight: '600',
          padding: '8px 14px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0'
        }}>
          <i className="fas fa-bed me-1"></i>{property.bedrooms} BHK
        </Badge>
      );
    }

    if (property.isResidential && property.bathrooms > 0) {
      details.push(
        <Badge key="bathrooms" className="me-2 mb-2" style={{ 
          backgroundColor: '#f1f5f9', 
          color: '#475569',
          fontSize: '0.8rem',
          fontWeight: '600',
          padding: '8px 14px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0'
        }}>
          <i className="fas fa-bath me-1"></i>{property.bathrooms} Bath
        </Badge>
      );
    }

    if (!property.isResidential && property.bathrooms > 0) {
      details.push(
        <Badge key="washrooms" className="me-2 mb-2" style={{ 
          backgroundColor: '#f1f5f9', 
          color: '#475569',
          fontSize: '0.8rem',
          fontWeight: '600',
          padding: '8px 14px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0'
        }}>
          <i className="fas fa-restroom me-1"></i>{property.bathrooms} Washrooms
        </Badge>
      );
    }

    details.push(
      <Badge key="area" className="me-2 mb-2" style={{ 
        backgroundColor: '#f1f5f9', 
        color: '#475569',
        fontSize: '0.8rem',
        fontWeight: '600',
        padding: '8px 14px',
        borderRadius: '6px',
        border: '1px solid #e2e8f0'
      }}>
        <i className="fas fa-ruler-combined me-1"></i>{property.area.toLocaleString()} sq ft
      </Badge>
    );

    if (property.capacity) {
      details.push(
        <Badge key="capacity" className="me-2 mb-2" style={{ 
          backgroundColor: '#374151', 
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: '600',
          padding: '8px 14px',
          borderRadius: '6px'
        }}>
          <i className="fas fa-users me-1"></i>{property.capacity}
        </Badge>
      );
    }

    if (property.surface) {
      details.push(
        <Badge key="surface" className="me-2 mb-2" style={{ 
          backgroundColor: '#059669', 
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: '600',
          padding: '8px 14px',
          borderRadius: '6px'
        }}>
          <i className="fas fa-futbol me-1"></i>{property.surface}
        </Badge>
      );
    }

    if (property.security) {
      details.push(
        <Badge key="security" className="me-2 mb-2" style={{ 
          backgroundColor: '#d97706', 
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: '600',
          padding: '8px 14px',
          borderRadius: '6px'
        }}>
          <i className="fas fa-shield-alt me-1"></i>{property.security}
        </Badge>
      );
    }

    return details;
  };

  return (
    <>
      {/* WORLD-CLASS HERO SECTION - ENTERPRISE NEUTRAL */}
      <section 
        className="text-white py-5"
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {/* Subtle dot pattern overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.6
          }}
        />
        <Container className="position-relative">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4" style={{ 
              letterSpacing: '-0.025em',
              fontWeight: 800 
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

      {/* ENTERPRISE LAYOUT - ZERO OVERLAP GUARANTEED */}
      <div 
        style={{ 
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: '#fafbfc'
        }}
      >
        
        {/* WORLD-CLASS SIDEBAR */}
        <div 
          className="border-end"
          style={{
            width: '320px',
            minHeight: '100vh',
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            overflowY: 'auto',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05)',
            borderColor: '#e5e7eb'
          }}
        >
          
          {/* Professional Sidebar Header */}
          <div className="p-4 border-bottom bg-white" style={{ borderColor: '#e5e7eb' }}>
            <div className="d-flex align-items-center">
              <div 
                className="rounded-3 me-3 d-flex align-items-center justify-content-center"
                style={{ 
                  width: '48px', 
                  height: '48px',
                  backgroundColor: '#111827',
                  color: 'white'
                }}
              >
                <i className="fas fa-filter fs-5"></i>
              </div>
              <div>
                <h5 className="mb-1 fw-bold" style={{ color: '#111827' }}>Filters</h5>
                <small className="text-muted">Refine your search</small>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="p-4">
            
            {/* Search */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                Search Properties
              </Form.Label>
              <InputGroup>
                <InputGroup.Text 
                  className="bg-white border-end-0"
                  style={{ borderColor: '#d1d5db' }}
                >
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
                    padding: '12px 16px',
                    borderColor: '#d1d5db'
                  }}
                />
              </InputGroup>
            </div>

            {/* Location */}
            <div className="mb-4">
              <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                Location
              </Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{ 
                  fontSize: '0.95rem',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px'
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
              <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                Property Type
              </Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{ 
                  fontSize: '0.95rem',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px'
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
              <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                Price Range
              </Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{ 
                  fontSize: '0.95rem',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px'
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
                <Form.Label className="fw-semibold mb-3" style={{ color: '#374151' }}>
                  Bedrooms
                </Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{ 
                    fontSize: '0.95rem',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px'
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
                fontSize: '0.95rem',
                padding: '12px 16px',
                borderWidth: '1px',
                borderRadius: '8px',
                borderColor: '#374151',
                color: '#374151'
              }}
            >
              <i className="fas fa-times me-2"></i>Clear All Filters
            </Button>

            {/* Filter Status */}
            <div 
              className="p-4 rounded-3"
              style={{ 
                backgroundColor: '#f8fafc',
                border: '1px solid #e5e7eb'
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semibold">Active Filters</span>
                <Badge 
                  className="fw-semibold"
                  style={{ 
                    fontSize: '0.8rem',
                    backgroundColor: '#111827',
                    color: 'white'
                  }}
                >
                  {Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - ENTERPRISE PERFECTION */}
        <div style={{ flex: 1, backgroundColor: '#fafbfc' }}>
          <Container fluid className="py-5 px-5" style={{ paddingBottom: '140px' }}>
            
            {/* Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div>
                <h2 className="h2 fw-bold mb-3" style={{ color: '#111827' }}>
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
                  className="btn btn-outline-secondary fw-semibold" 
                  htmlFor="gridView"
                  style={{ 
                    fontSize: '0.9rem', 
                    padding: '12px 24px',
                    borderColor: '#d1d5db',
                    color: '#374151'
                  }}
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
                  className="btn btn-outline-secondary fw-semibold" 
                  htmlFor="listView"
                  style={{ 
                    fontSize: '0.9rem', 
                    padding: '12px 24px',
                    borderColor: '#d1d5db',
                    color: '#374151'
                  }}
                >
                  <i className="fas fa-list me-2"></i>List
                </label>
              </div>
            </div>

            {/* Enterprise Property Cards */}
            {filteredProperties.length === 0 ? (
              <Card className="border-0 shadow-sm text-center p-5" style={{ backgroundColor: 'white' }}>
                <Card.Body>
                  <div className="mb-4 text-muted" style={{ fontSize: '5rem' }}>
                    <i className="fas fa-search"></i>
                  </div>
                  <h3 className="fw-bold mb-4" style={{ color: '#111827' }}>No Properties Found</h3>
                  <p className="text-muted fs-6 mb-4">
                    We couldn't find any properties matching your criteria. Try adjusting your filters.
                  </p>
                  <Button 
                    variant="dark"
                    size="lg"
                    onClick={clearFilters}
                    className="fw-semibold"
                    style={{ 
                      backgroundColor: '#111827',
                      borderColor: '#111827'
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
                        backgroundColor: 'white',
                        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.05), 0 20px 40px rgba(0, 0, 0, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05)';
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
                        
                        {/* Professional Status Badges */}
                        <div className="position-absolute top-0 start-0 p-3">
                          <Badge 
                            className="me-2 fw-semibold shadow-sm"
                            style={{ 
                              fontSize: '0.8rem',
                              padding: '8px 16px',
                              borderRadius: '8px',
                              backgroundColor: property.status === 'For Sale' ? '#dc2626' : '#059669',
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
                                borderRadius: '8px',
                                backgroundColor: '#111827',
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
                              borderRadius: '8px',
                              backgroundColor: 'rgba(17, 24, 39, 0.8)',
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
                          <i className="fas fa-map-marker-alt me-2" style={{ color: '#111827' }}></i>
                          <span className="fw-medium">{property.location}</span>
                        </div>
                        
                        {/* Title */}
                        <Card.Title className="h4 fw-bold mb-4" style={{ 
                          lineHeight: '1.4',
                          color: '#111827'
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
                          
                          {/* World-Class Action Buttons */}
                          <div className="d-grid gap-3 d-md-flex">
                            <Button 
                              variant="outline-secondary" 
                              size="lg"
                              className="flex-fill fw-semibold"
                              style={{ 
                                fontSize: '0.9rem',
                                padding: '14px 20px',
                                borderRadius: '12px',
                                borderWidth: '1px',
                                borderColor: '#d1d5db',
                                color: '#374151'
                              }}
                            >
                              View Details
                            </Button>
                            <Button 
                              size="lg"
                              className="flex-fill fw-semibold shadow"
                              style={{ 
                                fontSize: '0.9rem',
                                padding: '14px 20px',
                                borderRadius: '12px',
                                backgroundColor: '#111827',
                                border: 'none',
                                color: 'white'
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

      {/* Enterprise-Grade Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #111827 !important;
          box-shadow: 0 0 0 0.25rem rgba(17, 24, 39, 0.25) !important;
        }
        
        .btn-outline-secondary:hover {
          background-color: #111827 !important;
          border-color: #111827 !important;
          color: white !important;
        }
        
        .btn-check:checked + .btn-outline-secondary {
          background-color: #111827 !important;
          border-color: #111827 !important;
          color: white !important;
        }
        
        .btn-outline-dark:hover {
          background-color: #111827 !important;
          border-color: #111827 !important;
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
