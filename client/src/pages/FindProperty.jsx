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

  // EXACT REFERENCE VIOLET COLORS
  const VIOLET_PRIMARY = '#7c3aed';
  const VIOLET_DARK = '#6b46c1'; 
  const VIOLET_LIGHT = '#a855f7';
  const VIOLET_MEDIUM = '#8b5cf6';

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
        for (const key in response.data) {
          if (Array.isArray(response.data[key])) {
            propertiesArray = response.data[key];
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
        const locationFields = [property.address.city, property.address.state, property.address.street].filter(Boolean);
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
          background: `linear-gradient(135deg, ${VIOLET_PRIMARY} 0%, ${VIOLET_LIGHT} 100%)`,
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          padding: '3rem 0'
        }}>
          <Container className="text-center text-white">
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>Find Your Perfect Property</h1>
            <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>Discover verified properties from our premium collection across India</p>
          </Container>
        </section>
        <Container className="py-5 text-center">
          <Spinner animation="border" style={{ color: VIOLET_PRIMARY }} />
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
          <Button onClick={fetchProperties} style={{ backgroundColor: VIOLET_PRIMARY, borderColor: VIOLET_PRIMARY }}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* EXACT REFERENCE HEADER - PERFECT VIOLET GRADIENT */}
      <section style={{
        background: `linear-gradient(135deg, ${VIOLET_PRIMARY} 0%, ${VIOLET_LIGHT} 100%)`,
        padding: '3rem 0',
        textAlign: 'center',
        color: 'white',
        position: 'relative'
      }}>
        <Container>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '25px',
            padding: '8px 20px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            ⭐ {filteredProperties.length} PREMIUM PROPERTIES AVAILABLE
          </div>
          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: '900',
            marginBottom: '1rem',
            lineHeight: '1.1'
          }}>
            Find Your Perfect Property
          </h1>
          <p style={{
            fontSize: '1.1rem',
            opacity: '0.95',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover verified properties from our premium collection across India. From luxury apartments to sports turfs and commercial spaces.
          </p>
        </Container>
      </section>

      {/* MAIN LAYOUT - EXACTLY LIKE REFERENCE */}
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        
        {/* SIDEBAR - EXACTLY LIKE REFERENCE */}
        <div style={{
          width: '380px',
          minWidth: '380px',
          backgroundColor: 'white',
          borderRight: '1px solid #e9ecef',
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
        }}>
          
          {/* Smart Property Filters Header - EXACT REFERENCE COLORS */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e9ecef',
            background: `linear-gradient(135deg, ${VIOLET_DARK} 0%, ${VIOLET_PRIMARY} 100%)`,
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h5 style={{ 
                  margin: 0, 
                  fontWeight: '700', 
                  display: 'flex', 
                  alignItems: 'center',
                  fontSize: '1.2rem'
                }}>
                  <span style={{ fontSize: '1.3rem', marginRight: '8px' }}>✨</span>
                  Smart Property Filters
                </h5>
                <small style={{ 
                  color: 'white', 
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  opacity: '0.95'
                }}>
                  Find your perfect match
                </small>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: '700',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                {filteredProperties.length} found
              </div>
            </div>
          </div>

          <div style={{ padding: '1.5rem' }}>
            {/* Search Properties */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ marginRight: '8px', fontSize: '1rem' }}>🔍</span>
                <Form.Label style={{ margin: 0, fontWeight: '600', fontSize: '0.95rem' }}>
                  Search Properties
                </Form.Label>
              </div>
              <Form.Control
                type="text"
                placeholder="Search by location, type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  padding: '12px'
                }}
              />
            </div>

            {/* Location Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '8px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', color: '#dc3545', fontSize: '1rem' }}>📍</span>
                  <Form.Label style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem', color: '#dc3545' }}>
                    LOCATION
                  </Form.Label>
                </div>
                <small style={{ color: '#6c757d', fontSize: '0.75rem' }}>
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
                marginBottom: '8px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', color: '#fd7e14', fontSize: '1rem' }}>🏠</span>
                  <Form.Label style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem', color: '#fd7e14' }}>
                    PROPERTY TYPE
                  </Form.Label>
                </div>
                <small style={{ color: '#6c757d', fontSize: '0.75rem' }}>
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
                marginBottom: '8px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', color: '#fd7e14', fontSize: '1rem' }}>💰</span>
                  <Form.Label style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem', color: '#fd7e14' }}>
                    PRICE RANGE
                  </Form.Label>
                </div>
                <small style={{ color: '#6c757d', fontSize: '0.75rem' }}>per month</small>
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

            {/* Clear Filters Button */}
            <Button
              variant="outline-secondary"
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
              style={{
                width: '100%',
                marginBottom: '1.5rem',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '0.9rem'
              }}
            >
              <span style={{ marginRight: '6px' }}>✕</span>
              Clear All Filters
            </Button>

            {/* Available Counter - EXACT REFERENCE DESIGN */}
            <div style={{
              background: `linear-gradient(135deg, ${VIOLET_PRIMARY} 0%, ${VIOLET_LIGHT} 100%)`,
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                margin: 0, 
                marginBottom: '8px' 
              }}>
                {filteredProperties.length}
              </h2>
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Available</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
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

              {/* VIEW TOGGLE BUTTONS - EXACT REFERENCE STYLE */}
              <div>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                  style={{ 
                    marginRight: '0.5rem',
                    backgroundColor: viewMode === 'grid' ? VIOLET_PRIMARY : 'transparent',
                    borderColor: VIOLET_PRIMARY,
                    color: viewMode === 'grid' ? 'white' : VIOLET_PRIMARY
                  }}
                >
                  🔲 GRID VIEW
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
                  style={{ 
                    backgroundColor: viewMode === 'list' ? VIOLET_PRIMARY : 'transparent',
                    borderColor: VIOLET_PRIMARY,
                    color: viewMode === 'list' ? 'white' : VIOLET_PRIMARY
                  }}
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
                <Button 
                  onClick={clearFilters} 
                  style={{ 
                    backgroundColor: VIOLET_PRIMARY,
                    borderColor: VIOLET_PRIMARY 
                  }}
                >
                  Clear All Filters
                </Button>
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
                            violetColors={{
                              primary: VIOLET_PRIMARY,
                              dark: VIOLET_DARK,
                              light: VIOLET_LIGHT
                            }}
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
                          violetColors={{
                            primary: VIOLET_PRIMARY,
                            dark: VIOLET_DARK,
                            light: VIOLET_LIGHT
                          }}
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
