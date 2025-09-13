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
    "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara"
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
          property.title, property.description, property.address?.city,
          property.address?.state, property.address?.street, property.category, property.subtype
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
          property.address.city, property.address.state, property.address.street
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

  const handleViewDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleBookNow = (propertyId) => {
    navigate(`/book/${propertyId}`);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <section style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          padding: '2rem 0'
        }}>
          <Container className="text-center text-white">
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Find Your Perfect Property</h1>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Discover verified properties from our premium collection across India</p>
          </Container>
        </section>
        <Container className="py-5 text-center">
          <Spinner animation="border" style={{ color: '#7c3aed' }} />
          <p className="mt-3 fs-5">Loading properties...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error Loading Properties</Alert.Heading>
          <p>{error}</p>
          <Button onClick={fetchProperties} variant="primary">Try Again</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* 🔥 HANDPICKED PREMIUM PROPERTIES SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        padding: '3rem 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <Container>
          <p style={{ fontSize: '1rem', marginBottom: '1rem', opacity: '0.9' }}>
            Handpicked premium properties that match your search criteria
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Badge pill style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              padding: '0.5rem 1rem',
              fontSize: '0.9rem'
            }}>
              Luxury Villas in Mumbai
            </Badge>
            <Badge pill style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              padding: '0.5rem 1rem',
              fontSize: '0.9rem'
            }}>
              Modern Apartments in Bangalore
            </Badge>
            <Badge pill style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              padding: '0.5rem 1rem',
              fontSize: '0.9rem'
            }}>
              Commercial Spaces in Delhi
            </Badge>
          </div>
        </Container>
      </section>

      {/* 🎯 MAIN DASHBOARD LAYOUT */}
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        
        {/* 🔥 BEAUTIFUL SIDEBAR - EXACTLY LIKE YOUR DESIGN */}
        <aside style={{
          width: '360px',
          minWidth: '360px',
          backgroundColor: 'white',
          borderRight: '1px solid #e9ecef',
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
        }}>
          
          {/* Smart Property Filters Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>✨</span>
              <h5 style={{ margin: 0, fontWeight: '700' }}>Smart Property Filters</h5>
            </div>
            <Badge pill bg="primary" style={{ fontSize: '0.8rem' }}>
              {filteredProperties.length} found
            </Badge>
          </div>
          <p style={{ 
            margin: 0, 
            padding: '0 1.5rem', 
            paddingTop: '0.5rem',
            fontSize: '0.9rem', 
            color: '#6c757d' 
          }}>
            Find your perfect match
          </p>

          <div style={{ padding: '1.5rem' }}>
            {/* Search Properties */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ marginRight: '0.5rem', fontSize: '1rem' }}>🔍</span>
                <Form.Label style={{ margin: 0, fontWeight: '600' }}>Search Properties</Form.Label>
              </div>
              <Form.Control
                type="text"
                placeholder="Search by location, type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
              />
            </div>

            {/* Location Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '0.5rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '0.5rem', color: '#dc3545', fontSize: '1rem' }}>📍</span>
                  <Form.Label style={{ margin: 0, fontWeight: '600' }}>LOCATION</Form.Label>
                </div>
                <small style={{ color: '#6c757d', fontSize: '0.8rem' }}>
                  {indianLocations.length - 1} cities
                </small>
              </div>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
              >
                {indianLocations.map((location, index) => (
                  <option key={index} value={location === "All Locations" ? "" : location}>
                    {location}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Property Type Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '0.5rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '0.5rem', color: '#fd7e14', fontSize: '1rem' }}>🏠</span>
                  <Form.Label style={{ margin: 0, fontWeight: '600' }}>PROPERTY TYPE</Form.Label>
                </div>
                <small style={{ color: '#6c757d', fontSize: '0.8rem' }}>
                  {propertyTypes.length - 1} categories
                </small>
              </div>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Price Range Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '0.5rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '0.5rem', color: '#fd7e14', fontSize: '1rem' }}>💰</span>
                  <Form.Label style={{ margin: 0, fontWeight: '600' }}>PRICE RANGE</Form.Label>
                </div>
                <small style={{ color: '#6c757d', fontSize: '0.8rem' }}>per month</small>
              </div>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
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
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '0.5rem', fontSize: '1rem' }}>🛏️</span>
                    <Form.Label style={{ margin: 0, fontWeight: '600' }}>BEDROOMS</Form.Label>
                  </div>
                  <small style={{ color: '#6c757d', fontSize: '0.8rem' }}>residential only</small>
                </div>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}
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

            {/* Clear All Filters Button */}
            <Button
              variant="outline-secondary"
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
              style={{
                width: '100%',
                marginBottom: '1.5rem',
                borderRadius: '8px',
                padding: '0.75rem'
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>✕</span>
              Clear All Filters
            </Button>

            {/* Available Counter - Exactly Like Your Design */}
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                margin: 0, 
                marginBottom: '0.5rem' 
              }}>
                {filteredProperties.length}
              </h2>
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Available</p>
            </div>
          </div>
        </aside>

        {/* 🔥 MAIN CONTENT AREA */}
        <main style={{ flex: 1, backgroundColor: 'white' }}>
          <Container fluid style={{ padding: '2rem' }}>
            
            {/* Results Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p style={{ margin: 0, color: '#6c757d' }}>
                  Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
                </p>
              </div>

              {/* 🎯 PERFECT VIEW TOGGLE BUTTONS - EXACTLY LIKE YOUR DESIGN */}
              <div>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                  style={{ marginRight: '0.5rem' }}
                >
                  🔲 GRID VIEW
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
                >
                  📋 LIST VIEW
                </Button>
              </div>
            </div>

            {/* Properties Display */}
            {filteredProperties.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px'
              }}>
                <h3>No Properties Found</h3>
                <p>Try adjusting your search criteria or clear all filters</p>
                <Button onClick={clearFilters} variant="primary">Clear All Filters</Button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredProperties.map((property) => {
                      if (!property || !property._id) return null;
                      return (
                        <Col key={property._id}>
                          <PropertyCard 
                            property={property} 
                            viewMode="grid" 
                            onViewDetails={() => handleViewDetails(property._id)}
                            onBookNow={() => handleBookNow(property._id)}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                ) : (
                  <div>
                    {filteredProperties.map((property) => {
                      if (!property || !property._id) return null;
                      return (
                        <PropertyCard 
                          key={property._id} 
                          property={property} 
                          viewMode="list"
                          onViewDetails={() => handleViewDetails(property._id)}
                          onBookNow={() => handleBookNow(property._id)}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </Container>
        </main>
      </div>
    </>
  );
};

export default FindProperty;
