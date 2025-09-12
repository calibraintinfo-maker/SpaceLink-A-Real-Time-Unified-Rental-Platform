import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Row, Col, Button, Spinner, Form, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api, handleApiError } from '../utils/api';
import PropertyCard from '../components/PropertyCard';

// ✅ PERFORMANCE HOOKS
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const FindProperty = () => {
  const navigate = useNavigate();
  
  // ✅ OPTIMIZED STATE
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  
  // ✅ PERFORMANCE SETTINGS
  const ITEMS_PER_PAGE = 9;
  const debouncedSearch = useDebounce(searchQuery, 500);
  const debouncedFilters = useDebounce(filters, 400);
  const abortRef = useRef();

  // ✅ CONSTANTS
  const indianLocations = [
    "All Locations", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", 
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur"
  ];

  const propertyTypes = [
    "All Categories", "Property Rentals", "Commercial", "Event", "Parking", "Land", "Turf"
  ];

  const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];

  // ✅ MEMOIZED FILTERED DATA
  const filteredProperties = useMemo(() => {
    if (!Array.isArray(properties)) return [];
    
    let filtered = properties;

    // Apply search
    if (debouncedSearch.trim()) {
      const searchTerm = debouncedSearch.toLowerCase();
      filtered = filtered.filter(property => {
        const searchFields = [
          property.title, property.description, 
          property.address?.city, property.address?.state,
          property.address?.street, property.category, property.subtype
        ].filter(Boolean);
        return searchFields.some(field => 
          field.toLowerCase().includes(searchTerm)
        );
      });
    }

    // Apply location filter
    if (debouncedFilters.location && debouncedFilters.location !== "All Locations") {
      filtered = filtered.filter(property => {
        if (!property?.address) return false;
        const locationFields = [
          property.address.city, property.address.state, property.address.street
        ].filter(Boolean);
        return locationFields.some(field =>
          field.toLowerCase().includes(debouncedFilters.location.toLowerCase())
        );
      });
    }

    // Apply property type filter
    if (debouncedFilters.propertyType && debouncedFilters.propertyType !== "All Categories") {
      filtered = filtered.filter(property => {
        if (!property) return false;
        return property.category === debouncedFilters.propertyType ||
               property.subtype === debouncedFilters.propertyType;
      });
    }

    // Apply price range filter
    if (debouncedFilters.priceRange) {
      const [min, max] = debouncedFilters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        if (!property?.price) return false;
        const price = Number(property.price);
        return price >= min && (max ? price <= max : true);
      });
    }

    // Apply bedrooms filter
    if (debouncedFilters.bedrooms) {
      const minBedrooms = parseInt(debouncedFilters.bedrooms);
      filtered = filtered.filter(property => {
        if (!property?.subtype) return false;
        if (residentialTypes.includes(property.subtype)) {
          return property.bedrooms >= minBedrooms;
        }
        return true;
      });
    }

    return filtered;
  }, [properties, debouncedSearch, debouncedFilters, residentialTypes]);

  // ✅ PAGINATED DATA
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage, ITEMS_PER_PAGE]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  // ✅ OPTIMIZED API CALL
  useEffect(() => {
    const fetchData = async () => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      
      setLoading(true);
      setError('');
      
      try {
        const response = await api.properties.getAll({
          signal: abortRef.current.signal,
          timeout: 10000
        });
        
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
        setCurrentPage(1);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('API Error:', err);
          setError(handleApiError(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  // ✅ OPTIMIZED HANDLERS
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ location: '', propertyType: '', priceRange: '', bedrooms: '' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const shouldShowBedroomFilter = () => {
    if (!filters.propertyType || filters.propertyType === "All Categories") return false;
    return filters.propertyType === 'Property Rentals' || residentialTypes.includes(filters.propertyType);
  };

  const getActiveFiltersCount = () => {
    const filterCount = Object.values(filters).filter(f => f && f !== "All Categories").length;
    return filterCount + (searchQuery.trim() ? 1 : 0);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Property Rentals': '🏠', 'Commercial': '🏢', 'Land': '🌾',
      'Parking': '🚗', 'Event': '🎉', 'Turf': '⚽'
    };
    return icons[category] || '🏷️';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: '#6d28d9' }} />
          <p className="mt-3">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* ✅ HERO SECTION - Fixed Colors */}
      <section style={{
        background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)', // ✅ Fixed consistent purple
        color: 'white',
        padding: '60px 0',
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
        
        <Container>
          <div className="text-center">
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '25px',
              padding: '8px 20px',
              marginBottom: '20px',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              ✨ {filteredProperties.length} PREMIUM PROPERTIES AVAILABLE
            </div>
            
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '-0.025em',
              lineHeight: '1.1',
              marginBottom: '24px'
            }}>
              Find Your Perfect Property
            </h1>
            
            <p style={{
              fontSize: '1.25rem',
              fontWeight: '400',
              opacity: '0.95',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              Discover verified properties from our premium collection across India. From luxury apartments to sports turfs and commercial spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* ✅ MAIN LAYOUT - Fixed Sidebar & Content */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 300px)' }}>
        
        {/* ✅ SIDEBAR - Fixed White Text & Consistent Colors */}
        <div style={{
          width: '380px',
          minWidth: '380px',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          position: 'sticky',
          top: '0',
          height: 'calc(100vh - 300px)',
          overflowY: 'auto',
          borderRight: '1px solid #e2e8f0',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)'
        }}>
          
          {/* ✅ FIXED HEADER - White Text on Purple Background */}
          <div className="p-4 border-bottom" style={{
            background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)', // ✅ Consistent purple
            color: '#ffffff' // ✅ Fixed to pure white
          }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 style={{
                  marginBottom: '4px',
                  fontWeight: '800',
                  fontSize: '1.3rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '-0.01em',
                  color: '#ffffff' // ✅ Fixed to pure white
                }} className="d-flex align-items-center">
                  <span className="me-2">⚙️</span>
                  Smart Property Filters
                </h5>
                <small style={{
                  color: '#ffffff', // ✅ Fixed to pure white
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  opacity: 0.9
                }}>
                  Find your perfect match
                </small>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '8px 12px',
                fontSize: '0.85rem',
                fontWeight: '700',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#ffffff' // ✅ Fixed to pure white
              }}>
                {filteredProperties.length} found
              </div>
            </div>
          </div>

          <div className="p-4">
            {/* Search Input */}
            <div className="mb-4">
              <Form.Label style={{
                fontWeight: '700',
                marginBottom: '12px',
                fontSize: '1.05rem',
                color: '#1f2937',
                fontFamily: 'Inter, system-ui, sans-serif',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-2" style={{ fontSize: '1.1rem' }}>🔍</span>
                Search Properties
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by location, type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  padding: '14px 16px',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6d28d9'; // ✅ Consistent purple
                  e.target.style.boxShadow = '0 0 0 3px rgba(109, 40, 217, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {searchQuery && (
                <small className="text-muted mt-2 d-block" style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.85rem'
                }}>
                  <span className="fw-semibold">{filteredProperties.length} results</span> for "{searchQuery}"
                </small>
              )}
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <Form.Label style={{
                fontWeight: '700',
                marginBottom: '12px',
                fontSize: '1.05rem',
                color: '#1f2937',
                fontFamily: 'Inter, system-ui, sans-serif',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-2" style={{ fontSize: '1.1rem' }}>📍</span>
                Location
                <span className="ms-auto" style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {indianLocations.length - 1} cities
                </span>
              </Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  padding: '12px 16px',
                  fontSize: '0.95rem',
                  background: 'white',
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
            <div className="mb-4">
              <Form.Label style={{
                fontWeight: '700',
                marginBottom: '12px',
                fontSize: '1.05rem',
                color: '#1f2937',
                fontFamily: 'Inter, system-ui, sans-serif',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-2" style={{ fontSize: '1.1rem' }}>🏠</span>
                Property Type
                <span className="ms-auto" style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {propertyTypes.length - 1} categories
                </span>
              </Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  padding: '12px 16px',
                  fontSize: '0.95rem',
                  background: 'white',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type}>
                    {getCategoryIcon(type)} {type}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <Form.Label style={{
                fontWeight: '700',
                marginBottom: '12px',
                fontSize: '1.05rem',
                color: '#1f2937',
                fontFamily: 'Inter, system-ui, sans-serif',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-2" style={{ fontSize: '1.1rem' }}>💰</span>
                Price Range
                <span className="ms-auto" style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  per month
                </span>
              </Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  padding: '12px 16px',
                  fontSize: '0.95rem',
                  background: 'white',
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

            {/* Bedrooms Filter */}
            {shouldShowBedroomFilter() && (
              <div className="mb-4">
                <Form.Label style={{
                  fontWeight: '700',
                  marginBottom: '12px',
                  fontSize: '1.05rem',
                  color: '#1f2937',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span className="me-2" style={{ fontSize: '1.1rem' }}>🛏️</span>
                  Bedrooms
                  <span className="ms-auto" style={{
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#6b7280',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    residential only
                  </span>
                </Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    padding: '12px 16px',
                    fontSize: '0.95rem',
                    background: 'white',
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

            {/* Clear Filters */}
            <Button
              variant="outline-danger"
              className="w-100 mb-4"
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
              style={{
                borderRadius: '12px',
                padding: '12px',
                borderWidth: '2px',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                fontSize: '0.95rem',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            >
              ✕ Clear All Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>

            {/* Stats */}
            <div className="text-center" style={{
              background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)', // ✅ Consistent purple
              color: 'white',
              padding: '20px',
              borderRadius: '16px'
            }}>
              <h4 className="mb-1" style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0 }}>
                {filteredProperties.length}
              </h4>
              <small style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Properties Found
              </small>
            </div>
          </div>
        </div>

        {/* ✅ MAIN CONTENT - Fixed Grid Layout */}
        <div style={{ 
          flex: 1,
          padding: '30px',
          backgroundColor: '#f8fafc',
          overflowY: 'auto',
          height: 'calc(100vh - 300px)'
        }}>
          
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <div>
              <h2 style={{
                fontSize: '2.2rem',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '8px',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                {filteredProperties.length} Properties Found
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '14px',
                margin: 0,
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
              </p>
            </div>

            {/* ✅ FIXED VIEW TOGGLE - Consistent Colors */}
            <div style={{
              display: 'flex',
              gap: '8px',
              background: 'white',
              padding: '4px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'light'}
                onClick={() => setViewMode('grid')}
                style={{
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  background: viewMode === 'grid' ? 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)' : '#f8fafc' // ✅ Consistent purple
                }}
              >
                ⊞ GRID VIEW
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'light'}
                onClick={() => setViewMode('list')}
                style={{
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  background: viewMode === 'list' ? 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)' : '#f8fafc' // ✅ Consistent purple
                }}
              >
                ☰ LIST VIEW
              </Button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="danger" className="text-center">
              <Alert.Heading>⚠️ Error Loading Properties</Alert.Heading>
              <p>{error}</p>
              <Button onClick={() => window.location.reload()} variant="primary">
                Retry
              </Button>
            </Alert>
          )}

          {/* No Results */}
          {filteredProperties.length === 0 && !loading && !error && (
            <div className="text-center py-5" style={{
              background: 'white',
              borderRadius: '20px',
              padding: '60px 40px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
            }}>
              <div style={{ fontSize: '4rem', opacity: 0.6, marginBottom: '20px' }}>🏠</div>
              <h3 style={{ fontWeight: 800, fontSize: '1.8rem', marginBottom: '12px' }}>
                No Properties Found
              </h3>
              <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '24px' }}>
                Try adjusting your search criteria or clear filters to see more results.
              </p>
              <Button 
                variant="primary" 
                onClick={clearFilters}
                style={{
                  background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)', // ✅ Consistent purple
                  border: 'none',
                  fontWeight: '700',
                  borderRadius: '12px',
                  padding: '12px 30px'
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* ✅ PROPERTIES DISPLAY - Fixed Layout */}
          {filteredProperties.length > 0 && (
            <>
              {viewMode === 'grid' ? (
                <Row className="g-4" style={{ minHeight: '400px' }}> {/* ✅ Fixed minimum height */}
                  {paginatedProperties.map(property => (
                    <Col key={property._id} md={6} lg={4}> {/* ✅ Fixed responsive columns */}
                      <PropertyCard property={property} viewMode="grid" showOwner={false} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div style={{ minHeight: '400px' }}> {/* ✅ Fixed minimum height */}
                  {paginatedProperties.map(property => (
                    <PropertyCard key={property._id} property={property} viewMode="list" showOwner={false} />
                  ))}
                </div>
              )}

              {/* ✅ PAGINATION */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-5">
                  <div className="btn-group">
                    <Button
                      variant="outline-primary"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      style={{
                        borderColor: '#6d28d9', // ✅ Consistent purple
                        color: '#6d28d9'
                      }}
                    >
                      ← Previous
                    </Button>
                    
                    <Button 
                      variant="primary" 
                      disabled
                      style={{
                        background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)', // ✅ Consistent purple
                        border: 'none'
                      }}
                    >
                      {currentPage} of {totalPages}
                    </Button>
                    
                    <Button
                      variant="outline-primary"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      style={{
                        borderColor: '#6d28d9', // ✅ Consistent purple
                        color: '#6d28d9'
                      }}
                    >
                      Next →
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ✅ GLOBAL STYLES - Fixed Colors & Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        body {
          font-family: 'Inter', sans-serif !important;
          font-weight: 400;
          line-height: 1.5;
          color: #1f2937;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', sans-serif !important;
          font-weight: 700;
          color: #111827;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #6d28d9 !important;
          box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.1) !important;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%) !important;
          border: none !important;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%) !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(109, 40, 217, 0.3);
        }
        
        .btn-outline-primary {
          border-color: #6d28d9 !important;
          color: #6d28d9 !important;
        }
        
        .btn-outline-primary:hover {
          background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%) !important;
          color: white !important;
          border-color: transparent !important;
        }

        .card:hover {
          transform: translateY(-2px);
        }
        
        .text-muted {
          color: #6b7280 !important;
        }
        
        @media (max-width: 768px) {
          .d-flex.justify-content-between {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
