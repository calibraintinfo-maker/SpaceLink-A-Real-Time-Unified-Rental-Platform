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
        <section className="py-5 text-white" style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Container className="text-center">
            <h1 className="display-4 fw-bold mb-4">Find Your Perfect Property</h1>
            <p className="fs-5 opacity-90">Discover verified properties from our premium collection across India</p>
          </Container>
        </section>
        <Container className="py-5 text-center">
          <Spinner animation="border" style={{ color: '#7c3aed' }} />
          <p className="mt-3 fs-5 fw-semibold">Loading properties...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <section className="py-5 text-white" style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Container className="text-center">
            <h1 className="display-4 fw-bold mb-4">Find Your Perfect Property</h1>
            <p className="fs-5 opacity-90">Discover verified properties from our premium collection across India</p>
          </Container>
        </section>

        <section>
          <Container className="py-5">
            <Alert variant="danger" className="text-center">
              <Alert.Heading>Error Loading Properties</Alert.Heading>
              <p>{error}</p>
              <Button onClick={fetchProperties} style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}>
                Try Again
              </Button>
            </Alert>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <>
      {/* 🔥 BEAUTIFUL HERO SECTION */}
      <section className="py-5 text-white" style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        minHeight: '320px',
        display: 'flex',
        alignItems: 'center',
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
                ⭐ {filteredProperties.length} Premium Properties Available
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

      {/* 🎯 MAIN LAYOUT - PERFECT DASHBOARD */}
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff' }}>
        
        {/* 🔥 SIDEBAR - EXACT 378PX FIXED WIDTH */}
        <div style={{
          width: '378px',
          minWidth: '378px',
          maxWidth: '378px',
          minHeight: '100vh',
          background: '#ffffff',
          position: 'sticky',
          top: 0,
          overflowY: 'auto',
          borderRight: '1px solid #e5e7eb',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
          zIndex: 10
        }}>
          
          {/* Perfect Header Section */}
          <div style={{
            padding: '23px 24px 18px 24px',
            borderBottom: '1px solid #e5e7eb',
            background: '#ffffff'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0',
                fontFamily: 'Inter, system-ui, sans-serif',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '8px', fontSize: '14px' }}>✨</span>
                Smart Property Filters
              </h4>
              <div style={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '14px',
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                {filteredProperties.length} found
              </div>
            </div>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '0',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              Find your perfect match
            </p>
          </div>

          <div style={{ padding: '24px' }}>
            {/* Search Input */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ marginRight: '8px', fontSize: '14px' }}>🔍</span>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  Search Properties
                </label>
              </div>
              <Form.Control
                type="text"
                placeholder="Search by location, type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  transition: 'all 0.2s ease'
                }}
              />
              {searchQuery && (
                <small style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  marginTop: '4px',
                  display: 'block'
                }}>
                  {filteredProperties.length} results for "{searchQuery}"
                </small>
              )}
            </div>

            {/* Location Filter */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', color: '#ef4444', fontSize: '14px' }}>📍</span>
                  <label style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#374151',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    Location
                  </label>
                </div>
                <span style={{
                  fontSize: '11px',
                  color: '#9ca3af',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {indianLocations.length - 1} cities
                </span>
              </div>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
              >
                {indianLocations.map((location, index) => (
                  <option key={index} value={location === "All Locations" ? "" : location}>
                    {location}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Property Type Filter */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', color: '#f59e0b', fontSize: '14px' }}>🏠</span>
                  <label style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#374151',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    Property Type
                  </label>
                </div>
                <span style={{
                  fontSize: '11px',
                  color: '#9ca3af',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {propertyTypes.length - 1} categories
                </span>
              </div>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Price Range Filter */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', color: '#f59e0b', fontSize: '14px' }}>💰</span>
                  <label style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#374151',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    Price Range
                  </label>
                </div>
                <span style={{
                  fontSize: '11px',
                  color: '#9ca3af',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  per month
                </span>
              </div>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'Inter, system-ui, sans-serif'
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
              <div style={{ marginBottom: '18px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px', fontSize: '14px' }}>🛏️</span>
                    <label style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#374151',
                      fontFamily: 'Inter, system-ui, sans-serif'
                    }}>
                      Bedrooms
                    </label>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    color: '#9ca3af',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    residential only
                  </span>
                </div>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontFamily: 'Inter, system-ui, sans-serif'
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

            {/* Clear Filters Button */}
            <Button
              variant="outline-secondary"
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '20px',
                fontFamily: 'Inter, system-ui, sans-serif',
                border: '1px solid #d1d5db',
                color: '#6b7280',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ marginRight: '6px' }}>✕</span>
              Clear All Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>

            {/* Available Counter */}
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              color: 'white'
            }}>
              <div style={{
                fontSize: '40px',
                fontWeight: '800',
                lineHeight: '1',
                marginBottom: '6px',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                {filteredProperties.length}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Available
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 MAIN CONTENT AREA */}
        <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Container fluid style={{ padding: '32px 40px' }}>
            
            {/* Results Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px'
            }}>
              <div>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#1f2937',
                  marginBottom: '6px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '-0.02em'
                }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '14px',
                  marginBottom: '0',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
                </p>
              </div>

              {/* 🎯 PERFECT VIEW TOGGLE BUTTONS */}
              <div style={{
                display: 'flex',
                gap: '0',
                background: '#f1f5f9',
                padding: '4px',
                borderRadius: '8px'
              }}>
                <Button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '10px 20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '6px',
                    background: viewMode === 'grid' ? '#8b5cf6' : 'transparent',
                    color: viewMode === 'grid' ? 'white' : '#6b7280',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    transition: 'all 0.2s ease',
                    minWidth: '120px'
                  }}
                >
                  🔲 GRID VIEW
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '10px 20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '6px',
                    background: viewMode === 'list' ? '#8b5cf6' : 'transparent',
                    color: viewMode === 'list' ? 'white' : '#6b7280',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    transition: 'all 0.2s ease',
                    minWidth: '120px'
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
                background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                borderRadius: '16px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  opacity: '0.6'
                }}>
                  {searchQuery ? '🔍' : (getActiveFiltersCount() > 0 ? '🔧' : '📂')}
                </div>
                <h3 style={{
                  fontWeight: '800',
                  marginBottom: '1rem',
                  color: '#111827',
                  fontSize: '1.5rem',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {searchQuery ? 'No Search Results' : (getActiveFiltersCount() > 0 ? 'No Matching Properties' : 'No Properties Available')}
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1rem',
                  marginBottom: '1.5rem',
                  maxWidth: '400px',
                  margin: '0 auto 1.5rem auto',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  lineHeight: '1.6'
                }}>
                  {searchQuery ? 
                    `We couldn't find any properties matching "${searchQuery}". Try adjusting your search terms.` : 
                    (getActiveFiltersCount() > 0 ? 
                      'No properties match your current filters. Try adjusting or clearing some filters.' : 
                      'No properties are currently available. Please check back later.'
                    )
                  }
                </p>
                <Button
                  onClick={clearFilters}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    border: 'none',
                    fontWeight: '700',
                    borderRadius: '8px',
                    padding: '12px 30px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em'
                  }}
                  size="lg"
                >
                  {getActiveFiltersCount() > 0 ? 'Clear All Filters' : 'Refresh Properties'}
                </Button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <Row className="g-4">
                    {filteredProperties.map((property) => {
                      if (!property || !property._id) return null;
                      return (
                        <Col key={property._id} lg={4} md={6} sm={12}>
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
        </div>
      </div>

      {/* 🔥 PREMIUM CSS STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #8b5cf6 !important;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1) !important;
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 400;
          line-height: 1.6;
          color: '#1f2937';
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin-bottom: 0.5em;
          color: '#0f172a';
        }
      `}</style>
    </>
  );
};

export default FindProperty;
