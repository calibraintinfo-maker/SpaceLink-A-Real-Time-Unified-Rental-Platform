import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

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

  // All Indian Locations
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

  // PROFESSIONAL SAMPLE DATA - LOGICAL PROPERTY DETAILS
  const sampleProperties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Cozy Studio Apartment',
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
      hasToilets: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Premium Commercial Space',
      location: 'Mumbai, Maharashtra',
      price: 5000,
      priceType: 'month',
      type: 'Commercial',
      category: 'Properties',
      bedrooms: 0,
      bathrooms: 2,
      area: 3000,
      status: 'For Rent',
      isResidential: false,
      hasToilets: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Modern Family House',
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
      hasToilets: true
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Wedding Hall Venue',
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
      hasToilets: false,
      capacity: 500
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Football Turf Ground',
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
      hasToilets: false,
      surface: 'Artificial Grass'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Secure Parking Space',
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
      hasToilets: false,
      security: 'CCTV + Guards'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Luxury Villa',
      location: 'Goa, India',
      price: 8500,
      priceType: 'month',
      type: 'Villa',
      category: 'Properties',
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      status: 'For Sale',
      isResidential: true,
      hasToilets: true
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Cricket Turf Academy',
      location: 'Hyderabad, Telangana',
      price: 3000,
      priceType: 'hour',
      type: 'Turf',
      category: 'Turf',
      bedrooms: 0,
      bathrooms: 0,
      area: 10000,
      status: 'For Rent',
      isResidential: false,
      hasToilets: false,
      surface: 'Natural Grass'
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
        property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.category.toLowerCase().includes(searchQuery.toLowerCase())
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
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      priceRange: '',
      bedrooms: ''
    });
    setSearchQuery('');
  };

  const shouldShowBedroomFilter = () => {
    if (!filters.propertyType) return false;
    return residentialTypes.includes(filters.propertyType) || filters.propertyType === 'Properties';
  };

  // SMART PROPERTY DETAILS RENDERER
  const renderPropertyDetails = (property) => {
    const details = [];

    // Only show bedrooms for residential properties
    if (property.isResidential && property.bedrooms > 0) {
      details.push(
        <span key="bedrooms" className="badge bg-light text-dark me-2 mb-1">
          <i className="fas fa-bed me-1"></i>{property.bedrooms} BHK
        </span>
      );
    }

    // Only show bathrooms for properties that actually have them
    if (property.hasToilets && property.bathrooms > 0) {
      details.push(
        <span key="bathrooms" className="badge bg-light text-dark me-2 mb-1">
          <i className="fas fa-bath me-1"></i>{property.bathrooms} Bath
        </span>
      );
    }

    // Always show area
    details.push(
      <span key="area" className="badge bg-light text-dark me-2 mb-1">
        <i className="fas fa-ruler-combined me-1"></i>{property.area.toLocaleString()} sq ft
      </span>
    );

    // Show relevant details based on property type
    if (property.type === 'Event Venues' && property.capacity) {
      details.push(
        <span key="capacity" className="badge bg-info text-white me-2 mb-1">
          <i className="fas fa-users me-1"></i>{property.capacity} guests
        </span>
      );
    }

    if (property.type === 'Turf' && property.surface) {
      details.push(
        <span key="surface" className="badge bg-success text-white me-2 mb-1">
          <i className="fas fa-futbol me-1"></i>{property.surface}
        </span>
      );
    }

    if (property.type === 'Parking' && property.security) {
      details.push(
        <span key="security" className="badge bg-warning text-dark me-2 mb-1">
          <i className="fas fa-shield-alt me-1"></i>{property.security}
        </span>
      );
    }

    return details;
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-primary text-white py-5">
        <Container>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">Find Your Perfect Property</h1>
            <p className="lead mb-0">Discover amazing properties from our premium collection across India</p>
          </div>
        </Container>
      </section>

      {/* MAIN LAYOUT */}
      <div className="d-flex min-vh-100">
        
        {/* PROFESSIONAL SIDEBAR */}
        <div className="position-fixed start-0 top-0 bg-light border-end" 
             style={{
               width: '300px', 
               height: '100vh', 
               overflowY: 'auto', 
               zIndex: 1000,
               marginTop: '0'
             }}>
          
          {/* Sidebar Header */}
          <div className="p-4 bg-primary text-white">
            <h5 className="mb-1 fw-bold">
              <i className="fas fa-filter me-2"></i>Filters
            </h5>
            <small>Refine your search</small>
          </div>

          {/* Sidebar Content */}
          <div className="p-4">
            
            {/* Search */}
            <div className="mb-4">
              <Form.Label className="fw-semibold text-dark">Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-2"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <Form.Label className="fw-semibold text-dark">Location</Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="border-2"
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
              <Form.Label className="fw-semibold text-dark">Property Type</Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="border-2"
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
              <Form.Label className="fw-semibold text-dark">Price Range</Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="border-2"
              >
                <option value="">All Prices</option>
                <option value="0-2000">₹0 - ₹2,000</option>
                <option value="2000-5000">₹2,000 - ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-999999">₹10,000+</option>
              </Form.Select>
            </div>

            {/* Bedrooms - Conditional */}
            {shouldShowBedroomFilter() && (
              <div className="mb-4">
                <Form.Label className="fw-semibold text-dark">Bedrooms</Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="border-2"
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
              variant="primary" 
              className="w-100 mb-4"
              onClick={clearFilters}
            >
              <i className="fas fa-times me-2"></i>Clear All Filters
            </Button>

            {/* Filter Status */}
            <div className="bg-light p-3 rounded border">
              <small className="text-muted d-block mb-1">Active Filters:</small>
              <div className="fw-semibold text-dark">
                {Object.values(filters).filter(f => f).length || searchQuery ? 
                  `${Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)} active` : 
                  'None'
                }
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - FIXED FOOTER OVERLAP */}
        <div style={{ marginLeft: '300px', flex: 1, paddingBottom: '100px' }}>
          <Container fluid className="p-4">
            
            {/* Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
              <div>
                <h2 className="h3 fw-bold text-dark mb-2">
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
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                  size="sm"
                >
                  <i className="fas fa-th me-1"></i>Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
                  size="sm"
                >
                  <i className="fas fa-list me-1"></i>List
                </Button>
              </div>
            </div>

            {/* Property Cards */}
            {filteredProperties.length === 0 ? (
              <Card className="text-center p-5">
                <Card.Body>
                  <div className="display-1 text-muted mb-3">
                    <i className="fas fa-home"></i>
                  </div>
                  <h4 className="mb-3">No Properties Found</h4>
                  <p className="text-muted mb-4">Try adjusting your search criteria or filters</p>
                  <Button variant="primary" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Row className={viewMode === 'grid' ? 'row-cols-1 row-cols-md-2 row-cols-lg-3' : 'row-cols-1'}>
                {filteredProperties.map((property) => (
                  <Col key={property.id} className="mb-4">
                    <Card className="h-100 border-2 shadow-sm">
                      <div className="position-relative">
                        <Card.Img 
                          variant="top" 
                          src={property.image} 
                          style={{ height: viewMode === 'grid' ? '200px' : '180px', objectFit: 'cover' }}
                        />
                        
                        {/* Status Badge */}
                        <span className={`position-absolute top-0 start-0 m-3 badge ${
                          property.status === 'For Sale' ? 'bg-warning text-dark' : 'bg-success'
                        }`}>
                          {property.status}
                        </span>
                        
                        {/* Property Type Badge */}
                        <span className="position-absolute top-0 end-0 m-3 badge bg-dark">
                          {property.type}
                        </span>
                      </div>
                      
                      <Card.Body className="d-flex flex-column">
                        {/* Location */}
                        <div className="text-muted mb-2">
                          <i className="fas fa-map-marker-alt me-1"></i>
                          {property.location}
                        </div>
                        
                        {/* Title */}
                        <Card.Title className="h5 mb-3">{property.title}</Card.Title>
                        
                        {/* Property Details */}
                        <div className="mb-3">
                          {renderPropertyDetails(property)}
                        </div>
                        
                        {/* Spacer */}
                        <div className="mt-auto">
                          {/* Price */}
                          <div className="h4 text-success fw-bold mb-3">
                            ₹{property.price.toLocaleString()}/{property.priceType}
                          </div>
                          
                          {/* Buttons */}
                          <div className="d-grid gap-2">
                            <div className="row g-2">
                              <div className="col">
                                <Button variant="outline-primary" size="sm" className="w-100">
                                  View Details
                                </Button>
                              </div>
                              <div className="col">
                                <Button variant="primary" size="sm" className="w-100">
                                  Book Now
                                </Button>
                              </div>
                            </div>
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
                <Button variant="primary" size="lg">
                  <i className="fas fa-plus me-2"></i>Load More Properties
                </Button>
              </div>
            )}
          </Container>
        </div>
      </div>
    </>
  );
};

export default FindProperty;
