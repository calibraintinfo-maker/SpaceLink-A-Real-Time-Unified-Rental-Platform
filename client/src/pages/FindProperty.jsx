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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: '#7c3aed' }} />
          <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem' }}>
            Loading properties...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={fetchProperties} style={{ 
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', 
          border: 'none',
          fontFamily: "'Inter', sans-serif"
        }}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* 🔥 HERO SECTION - Keep Previous Beautiful Design */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        color: 'white',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'float 6s ease-in-out infinite reverse'
        }}></div>
        
        <Container className="position-relative">
          <div className="text-center">
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '25px',
              padding: '8px 20px',
              marginBottom: '20px'
            }}>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: 'white'
              }}>
                ✨ {filteredProperties.length} Premium Properties Available
              </span>
            </div>
            
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              fontFamily: 'Inter, Plus Jakarta Sans, system-ui, sans-serif',
              letterSpacing: '-0.025em',
              lineHeight: '1.1',
              marginBottom: '24px',
              color: 'white'
            }}>
              Find Your Perfect Property
            </h1>
            
            <p style={{
              fontSize: '1.25rem',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontFamily: 'Inter, system-ui, sans-serif',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              Discover verified properties from our premium collection across India. 
              From luxury apartments to sports turfs and commercial spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* 🎯 MAIN LAYOUT */}
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        
        {/* 🎯 PROFESSIONAL COMPACT DASHBOARD - Exact Reference Match */}
        <div style={{
          width: '280px',
          minWidth: '280px',
          backgroundColor: '#ffffff',
          padding: '16px 14px',
          borderRight: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          boxShadow: '1px 0 5px rgba(0, 0, 0, 0.03)'
        }}>
          
          {/* 🔍 Search Properties */}
          <div className="mb-3">
            <h3 style={{
              color: '#1f2937',
              fontWeight: '600',
              fontSize: '0.8rem',
              marginBottom: '6px',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              alignItems: 'center'
            }}>
              <span className="me-2" style={{ fontSize: '0.9rem' }}>🔍</span>
              Search Properties
            </h3>
            <Form.Control
              type="text"
              placeholder="Search by location, type, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                padding: '7px 9px',
                fontSize: '0.75rem',
                fontFamily: "'Inter', sans-serif",
                backgroundColor: '#ffffff'
              }}
            />
          </div>

          {/* ✨ Smart Filters */}
          <div className="mb-3">
            <h3 style={{
              color: '#1f2937',
              fontWeight: '600',
              fontSize: '0.8rem',
              marginBottom: '10px',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              alignItems: 'center'
            }}>
              <span className="me-2" style={{ fontSize: '0.9rem' }}>✨</span>
              Smart Filters
            </h3>

            {/* 📍 Location */}
            <div className="mb-2">
              <Form.Label style={{
                fontWeight: '600',
                marginBottom: '3px',
                fontSize: '0.7rem',
                color: '#e11d48',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-1" style={{ fontSize: '0.75rem' }}>📍</span>
                LOCATION
              </Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  borderRadius: '5px',
                  border: '1px solid #d1d5db',
                  padding: '5px 7px',
                  fontSize: '0.7rem',
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: '#ffffff'
                }}
              >
                {indianLocations.map((location, index) => (
                  <option key={index} value={location === "All Locations" ? "" : location}>
                    {location}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* 🏠 Property Type */}
            <div className="mb-2">
              <Form.Label style={{
                fontWeight: '600',
                marginBottom: '3px',
                fontSize: '0.7rem',
                color: '#ea580c',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-1" style={{ fontSize: '0.75rem' }}>🏠</span>
                PROPERTY TYPE
              </Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{
                  borderRadius: '5px',
                  border: '1px solid #d1d5db',
                  padding: '5px 7px',
                  fontSize: '0.7rem',
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: '#ffffff'
                }}
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* 💰 Price Range */}
            <div className="mb-2">
              <Form.Label style={{
                fontWeight: '600',
                marginBottom: '3px',
                fontSize: '0.7rem',
                color: '#d97706',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-1" style={{ fontSize: '0.75rem' }}>💰</span>
                PRICE RANGE
                <span className="ms-auto" style={{
                  fontSize: '0.6rem',
                  color: '#6b7280',
                  fontWeight: '400'
                }}>
                  per month
                </span>
              </Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{
                  borderRadius: '5px',
                  border: '1px solid #d1d5db',
                  padding: '5px 7px',
                  fontSize: '0.7rem',
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: '#ffffff'
                }}
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
              <div className="mb-2">
                <Form.Label style={{
                  fontWeight: '600',
                  marginBottom: '3px',
                  fontSize: '0.7rem',
                  color: '#7c3aed',
                  fontFamily: "'Inter', sans-serif",
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span className="me-1" style={{ fontSize: '0.75rem' }}>🛏️</span>
                  BEDROOMS
                </Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    borderRadius: '5px',
                    border: '1px solid #d1d5db',
                    padding: '5px 7px',
                    fontSize: '0.7rem',
                    fontFamily: "'Inter', sans-serif",
                    backgroundColor: '#ffffff'
                  }}
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
          </div>

          {/* Clear Filters Button */}
          <Button
            className="w-100 mb-3"
            onClick={clearFilters}
            disabled={getActiveFiltersCount() === 0}
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
              border: 'none',
              borderRadius: '5px',
              padding: '6px',
              fontWeight: '600',
              fontSize: '0.7rem',
              fontFamily: "'Inter', sans-serif",
              color: '#ffffff'
            }}
          >
            <span className="me-1">✕</span>
            Clear All Filters
          </Button>

          {/* 🎯 EXACT Availability Counter (Perfect Professional Size) */}
          <div style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center',
            color: '#ffffff',
            fontFamily: "'Inter', sans-serif",
            marginTop: '12px'
          }}>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '800',
              margin: '0 0 4px 0',
              color: '#ffffff',
              lineHeight: '1'
            }}>
              {filteredProperties.length}
            </h2>
            <p style={{
              fontSize: '0.8rem',
              fontWeight: '500',
              margin: '0',
              color: '#ffffff'
            }}>
              Available
            </p>
          </div>
        </div>

        {/* 🎯 MAIN CONTENT AREA */}
        <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Container fluid className="py-3 px-3">
            
            {/* Results Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '25px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h2 style={{
                  fontWeight: '800',
                  marginBottom: '6px',
                  color: '#1f2937',
                  fontSize: '2rem',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.025em'
                }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  marginBottom: '0',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '400'
                }}>
                  Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
                </p>
              </div>

              {/* 🎯 PERFECT VIEW TOGGLE BUTTONS */}
              <div style={{
                display: 'flex',
                gap: '6px',
                background: '#f1f5f9',
                padding: '4px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0'
              }}>
                <Button
                  onClick={() => setViewMode('grid')}
                  style={{
                    fontWeight: '600',
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    background: viewMode === 'grid' ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : 'transparent',
                    color: viewMode === 'grid' ? 'white' : '#7c3aed',
                    border: 'none',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Inter', sans-serif",
                    minWidth: '90px'
                  }}
                >
                  ⊞ Grid
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  style={{
                    fontWeight: '600',
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    background: viewMode === 'list' ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : 'transparent',
                    color: viewMode === 'list' ? 'white' : '#7c3aed',
                    border: 'none',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Inter', sans-serif",
                    minWidth: '90px'
                  }}
                >
                  ☰ List
                </Button>
              </div>
            </div>

            {/* Properties Display */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-5" style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '2.5rem 2rem'
              }}>
                <div className="mb-4" style={{ fontSize: '3.5rem', opacity: '0.6' }}>
                  {searchQuery ? '🔍' : getActiveFiltersCount() > 0 ? '🎯' : '🏠'}
                </div>
                <h3 style={{
                  fontWeight: '800',
                  marginBottom: '12px',
                  color: '#1f2937',
                  fontSize: '1.6rem',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {searchQuery ? 'No Search Results' : 
                   getActiveFiltersCount() > 0 ? 'No Matching Properties' : 
                   'No Properties Available'}
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1rem',
                  marginBottom: '20px',
                  maxWidth: '500px',
                  margin: '0 auto 20px auto',
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: '1.5'
                }}>
                  {searchQuery ? `We couldn't find any properties matching "${searchQuery}". Try adjusting your search terms.` :
                   getActiveFiltersCount() > 0 ? 'No properties match your current filters. Try adjusting or clearing some filters.' :
                   'No properties are currently available. Please check back later.'}
                </p>
                <Button
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    border: 'none',
                    fontWeight: '700',
                    borderRadius: '10px',
                    padding: '12px 28px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem'
                  }}
                  onClick={clearFilters}
                >
                  {getActiveFiltersCount() > 0 ? 'Clear All Filters' : 'Refresh Properties'}
                </Button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <Row className="g-3">
                    {filteredProperties.map((property) => {
                      if (!property || !property._id) return null;
                      
                      return (
                        <Col key={property._id} lg={4} md={6} sm={12}>
                          <PropertyCard 
                            property={property} 
                            showOwner={false}
                            viewMode="grid"
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
                          showOwner={false}
                          viewMode="list"
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </Container>
        </div>
      </div>

      {/* 🎯 PERFECT CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 400;
          line-height: 1.5;
          color: '#1f2937';
          background-color: '#f8fafc';
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 0.4em;
          color: '#1f2937';
        }
        
        .btn {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-weight: 600 !important;
          letter-spacing: 0.02em !important;
          transition: all 0.3s ease !important;
        }
        
        .form-control, .form-select {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          transition: all 0.2s ease !important;
        }
        
        .form-control:focus, .form-select:focus {
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.08) !important;
          border-color: #7c3aed !important;
        }
        
        @media (max-width: 768px) {
          .d-flex {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 16px;
          }
          
          h1 { 
            font-size: 2.2rem !important; 
          }
          
          h2 { 
            font-size: 1.8rem !important; 
          }
        }
      `}</style>
    </>
  );
};

export default FindProperty;
