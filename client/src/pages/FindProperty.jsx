import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api, handleApiError } from '../utils/api';
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

  const getCategoryIcon = (category) => {
    const icons = {
      'Property Rentals': '🏠', 'Commercial': '🏢', 'Land': '🌾',
      'Parking': '🚗', 'Event': '🎉', 'Turf': '⚽'
    };
    return icons[category] || '🏷️';
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
      {/* 🎯 PERFECT HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        color: 'white',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating background elements */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '180px',
          height: '180px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '8%',
          width: '120px',
          height: '120px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'float 6s ease-in-out infinite reverse'
        }}></div>
        
        <Container className="position-relative text-center">
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '30px',
            padding: '10px 24px',
            marginBottom: '24px',
            fontFamily: "'Inter', sans-serif"
          }}>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: '700',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: 'white'
            }}>
              ✨ {filteredProperties.length} Premium Properties Available
            </span>
          </div>
          
          <h1 style={{
            fontSize: '4rem',
            fontWeight: '900',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.03em',
            lineHeight: '1.1',
            marginBottom: '24px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}>
            Find Your Perfect Property
          </h1>
          
          <p style={{
            fontSize: '1.3rem',
            fontWeight: '400',
            opacity: '0.95',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontFamily: "'Inter', sans-serif"
          }}>
            Discover verified properties from our premium collection across India. 
            From luxury apartments to commercial spaces.
          </p>
        </Container>
      </section>

      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        
        {/* 🎯 PERFECT SIDEBAR - Dashboard Theme */}
        <div style={{
          width: '380px',
          minWidth: '380px',
          background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
          color: 'white',
          boxShadow: '4px 0 30px rgba(124, 58, 237, 0.3)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto'
        }}>
          
          {/* 🎯 PERFECT DASHBOARD HEADER */}
          <div className="p-4 border-bottom" style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.05)'
          }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h4 style={{
                  marginBottom: '8px',
                  fontWeight: '800',
                  fontSize: '1.5rem',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.025em',
                  color: '#ffffff'
                }}>
                  <span className="me-3">⚙️</span>
                  Smart Property Filters
                </h4>
                <small style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Find your perfect match
                </small>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '0.9rem',
                fontWeight: '700',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily: "'Inter', sans-serif",
                color: '#ffffff'
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
                fontSize: '1rem',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
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
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  padding: '14px 16px',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Inter', sans-serif",
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#1f2937'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  e.target.style.background = 'rgba(255, 255, 255, 1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                }}
              />
              {searchQuery && (
                <small style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  marginTop: '8px',
                  display: 'block'
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
                fontSize: '1rem',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-2" style={{ fontSize: '1.1rem' }}>📍</span>
                Location
                <span className="ms-auto" style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {indianLocations.length - 1} cities
                </span>
              </Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  padding: '12px 16px',
                  fontSize: '0.95rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: "'Inter', sans-serif",
                  color: '#1f2937'
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
                fontSize: '1rem',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-2" style={{ fontSize: '1.1rem' }}>🏠</span>
                Property Type
                <span className="ms-auto" style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {propertyTypes.length - 1} categories
                </span>
              </Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  padding: '12px 16px',
                  fontSize: '0.95rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: "'Inter', sans-serif",
                  color: '#1f2937'
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
                fontSize: '1rem',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-2" style={{ fontSize: '1.1rem' }}>💰</span>
                Price Range
                <span className="ms-auto" style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  per month
                </span>
              </Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  padding: '12px 16px',
                  fontSize: '0.95rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: "'Inter', sans-serif",
                  color: '#1f2937'
                }}
              >
                <option value="">All Prices</option>
                <option value="0-1000">Rs 0 - Rs 1,000</option>
                <option value="1000-2500">Rs 1,000 - Rs 2,500</option>
                <option value="2500-5000">Rs 2,500 - Rs 5,000</option>
                <option value="5000-10000">Rs 5,000 - Rs 10,000</option>
                <option value="10000-25000">Rs 10,000 - Rs 25,000</option>
                <option value="25000-50000">Rs 25,000 - Rs 50,000</option>
                <option value="50000-999999">Rs 50,000+</option>
              </Form.Select>
            </div>

            {/* Conditional Bedrooms Filter */}
            {shouldShowBedroomFilter() && (
              <div className="mb-4">
                <Form.Label style={{
                  fontWeight: '700',
                  marginBottom: '12px',
                  fontSize: '1rem',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span className="me-2" style={{ fontSize: '1.1rem' }}>🛏️</span>
                  Bedrooms
                  <span className="ms-auto" style={{
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    residential only
                  </span>
                </Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    padding: '12px 16px',
                    fontSize: '0.95rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: "'Inter', sans-serif",
                    color: '#1f2937'
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
              className="w-100 mb-4"
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '12px',
                transition: 'all 0.3s ease',
                fontWeight: '700',
                fontSize: '0.95rem',
                fontFamily: "'Inter', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <span className="me-2">✕</span>
              Clear All Filters
              {getActiveFiltersCount() > 0 && ` (${getActiveFiltersCount()})`}
            </Button>

            {/* Active Filters Summary */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span style={{
                  fontWeight: '700',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: "'Inter', sans-serif",
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span className="me-2">📊</span>
                  Active Filters
                </span>
                <div style={{
                  background: getActiveFiltersCount() > 0 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  minWidth: '30px',
                  textAlign: 'center',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {getActiveFiltersCount()}
                </div>
              </div>
              
              <div className="d-flex flex-wrap gap-2">
                {searchQuery && (
                  <div style={{
                    background: '#3b82f6',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {searchQuery.substring(0, 15)}{searchQuery.length > 15 ? '...' : ''}
                  </div>
                )}
                {filters.location && (
                  <div style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {filters.location}
                  </div>
                )}
                {filters.propertyType && (
                  <div style={{
                    background: '#f59e0b',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {getCategoryIcon(filters.propertyType)} {filters.propertyType}
                  </div>
                )}
                {filters.priceRange && (
                  <div style={{
                    background: '#ef4444',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    Rs {filters.priceRange.replace('-', ' - Rs ')}
                  </div>
                )}
                {filters.bedrooms && (
                  <div style={{
                    background: '#8b5cf6',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {filters.bedrooms}+ BHK
                  </div>
                )}
              </div>
              
              {getActiveFiltersCount() === 0 && (
                <div className="text-center">
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.85rem',
                    fontFamily: "'Inter', sans-serif",
                    margin: '0'
                  }}>
                    No active filters
                  </p>
                  <small style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    Use filters above to refine your search
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🎯 PERFECT MAIN CONTENT AREA */}
        <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Container fluid className="py-5 px-4">
            
            {/* Results Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <h2 style={{
                  fontWeight: '800',
                  marginBottom: '8px',
                  color: '#1f2937',
                  fontSize: '2.5rem',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.025em'
                }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1rem',
                  marginBottom: '0',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '400'
                }}>
                  Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
                </p>
              </div>

              {/* 🎯 PERFECT VIEW TOGGLE BUTTONS - NO OVERLAPPING */}
              <div style={{
                display: 'flex',
                gap: '8px',
                background: '#f1f5f9',
                padding: '6px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0'
              }}>
                <Button
                  onClick={() => setViewMode('grid')}
                  style={{
                    fontWeight: '700',
                    padding: '12px 20px',
                    fontSize: '0.85rem',
                    background: viewMode === 'grid' ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : 'transparent',
                    color: viewMode === 'grid' ? 'white' : '#7c3aed',
                    border: 'none',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Inter', sans-serif",
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    minWidth: '120px'
                  }}
                  onMouseEnter={(e) => {
                    if (viewMode !== 'grid') {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.color = '#5b21b6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (viewMode !== 'grid') {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#7c3aed';
                    }
                  }}
                >
                  ⊞ Grid View
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  style={{
                    fontWeight: '700',
                    padding: '12px 20px',
                    fontSize: '0.85rem',
                    background: viewMode === 'list' ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : 'transparent',
                    color: viewMode === 'list' ? 'white' : '#7c3aed',
                    border: 'none',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Inter', sans-serif",
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    minWidth: '120px'
                  }}
                  onMouseEnter={(e) => {
                    if (viewMode !== 'list') {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.color = '#5b21b6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (viewMode !== 'list') {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#7c3aed';
                    }
                  }}
                >
                  ☰ List View
                </Button>
              </div>
            </div>

            {/* Properties Display */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-5" style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                padding: '4rem 2rem'
              }}>
                <div className="mb-4" style={{ fontSize: '4rem', opacity: '0.6' }}>
                  {searchQuery ? '🔍' : getActiveFiltersCount() > 0 ? '🎯' : '🏠'}
                </div>
                <h3 style={{
                  fontWeight: '800',
                  marginBottom: '16px',
                  color: '#1f2937',
                  fontSize: '1.8rem',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {searchQuery ? 'No Search Results' : 
                   getActiveFiltersCount() > 0 ? 'No Matching Properties' : 
                   'No Properties Available'}
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1.1rem',
                  marginBottom: '24px',
                  maxWidth: '600px',
                  margin: '0 auto 24px auto',
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: '1.6'
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
                    borderRadius: '12px',
                    padding: '14px 32px',
                    fontFamily: "'Inter', sans-serif",
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.9rem'
                  }}
                  size="lg"
                  onClick={clearFilters}
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

      {/* 🎯 PERFECT PROFESSIONAL CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
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
          background-color: '#f8fafc';
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin-bottom: 0.5em;
          color: '#1f2937';
        }
        
        .card-title {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-weight: 800 !important;
          color: '#1f2937' !important;
          letter-spacing: -0.025em !important;
          line-height: 1.3 !important;
        }
        
        .card-text {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          color: '#4b5563' !important;
          font-weight: 400 !important;
          line-height: 1.6 !important;
        }
        
        .btn {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 0.025em !important;
          transition: all 0.3s ease !important;
        }
        
        .form-control:focus, .form-select:focus {
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
        }
        
        @media (max-width: 768px) {
          .d-flex.justify-content-between {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 20px;
          }
          
          h1 { 
            font-size: 2.5rem !important; 
          }
          
          h2 { 
            font-size: 2rem !important; 
          }
          
          .btn-group {
            width: 100% !important;
          }
        }
      `}</style>
    </>
  );
};

export default FindProperty;
