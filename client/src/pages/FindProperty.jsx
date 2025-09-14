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
    "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara",
    "Coimbatore", "Kochi", "Madurai", "Nashik", "Faridabad", "Ghaziabad", "Rajkot",
    "Meerut", "Kalyan", "Vasai", "Varanasi", "Dhanbad", "Jodhpur", "Amritsar",
    "Raipur", "Allahabad", "Jabalpur", "Gwalior", "Vijayawada"
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
          property.title, 
          property.description, 
          property.address?.city,
          property.address?.state, 
          property.address?.street, 
          property.category, 
          property.subtype
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
          property.address.city, 
          property.address.state, 
          property.address.street
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
      'Property Rentals': '🏠',
      'Commercial': '🏢',
      'Land': '🌾',
      'Parking': '🚗',
      'Event': '🎉',
      'Turf': '⚽'
    };
    return icons[category] || '🏠';
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleBookNow = (propertyId) => {
    navigate(`/book/${propertyId}`);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x240/e2e8f0/64748b?text=Property+Image';
  };

  const renderPropertyDetails = (property) => {
    if (!property) return [];
    const details = [];
    
    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
            {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
            {property.bathrooms} Bath
          </Badge>
        );
      }
    }
    
    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
          {property.size}
        </Badge>
      );
    }
    
    if (property.capacity) {
      details.push(
        <Badge key="capacity" bg="info" className="me-2 mb-2" style={{ fontSize: '0.8rem' }}>
          {property.capacity}
        </Badge>
      );
    }
    
    return details;
  };

  const getSafeRentType = (property) => {
    if (!property?.rentType) return 'rental';
    return Array.isArray(property.rentType) ? property.rentType[0] : property.rentType;
  };

  const getSafeRentTypes = (property) => {
    if (!property?.rentType) return ['rental'];
    return Array.isArray(property.rentType) ? property.rentType : [property.rentType];
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        {/* COMPLETE FULL HERO SECTION */}
        <section className="py-5 text-white" style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Floating background elements */}
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float 8s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
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
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
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
        
        <Container className="py-5 text-center">
          <Spinner animation="border" style={{ color: '#7c3aed' }} />
          <p className="mt-3 fs-5 fw-semibold">Loading properties...</p>
        </Container>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        {/* COMPLETE FULL HERO SECTION */}
        <section className="py-5 text-white" style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float 8s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
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
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
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
      {/* COMPLETE FULL HERO SECTION - EXACTLY LIKE REFERENCE */}
      <section className="py-5 text-white" style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating background elements */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
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
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
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

      {/* Main Layout - COMPACT DASHBOARD */}
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff' }}>
        
        {/* SIDEBAR - COMPACT WHITE DESIGN */}
        <div style={{
          width: '320px',
          minHeight: '100vh',
          background: '#ffffff',
          position: 'sticky',
          top: 0,
          overflowY: 'auto',
          borderRight: '1px solid #e2e8f0',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)'
        }}>

          <div className="p-3">
            {/* Search Input */}
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2" style={{ fontSize: '1rem' }}>🔍</span>
                <Form.Label style={{
                  fontWeight: '600',
                  marginBottom: '0',
                  fontSize: '0.95rem',
                  color: '#374151',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
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
                  border: '1px solid #d1d5db',
                  padding: '10px 12px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7c3aed';
                  e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {searchQuery && (
                <small className="text-muted mt-1 d-block" style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.8rem'
                }}>
                  <span className="fw-semibold">{filteredProperties.length} results</span> for "{searchQuery}"
                </small>
              )}
            </div>

            {/* Smart Filters Header */}
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <span className="me-2" style={{ fontSize: '1rem' }}>✨</span>
                <h6 style={{
                  margin: '0',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#374151',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  Smart Filters
                </h6>
              </div>
            </div>

            {/* Location Filter */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <span className="me-2" style={{ color: '#dc3545', fontSize: '0.9rem' }}>📍</span>
                  <Form.Label style={{
                    margin: '0',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    color: '#dc3545',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    LOCATION
                  </Form.Label>
                </div>
                <small style={{
                  fontSize: '0.7rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {indianLocations.length - 1} cities
                </small>
              </div>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '8px 10px',
                  fontSize: '0.9rem',
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
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <span className="me-2" style={{ color: '#f97316', fontSize: '0.9rem' }}>🏠</span>
                  <Form.Label style={{
                    margin: '0',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    color: '#f97316',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    PROPERTY TYPE
                  </Form.Label>
                </div>
                <small style={{
                  fontSize: '0.7rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {propertyTypes.length - 1} categories
                </small>
              </div>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '8px 10px',
                  fontSize: '0.9rem',
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
              
              {/* Category hint */}
              {filters.propertyType && filters.propertyType !== "All Categories" && (
                <div className="mt-1 p-2 bg-light rounded" style={{
                  fontSize: '0.75rem',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  <span className="text-muted">
                    {filters.propertyType === 'Property Rentals' && 'Includes: Villa, Apartment, House, Studio, Flat'}
                    {filters.propertyType === 'Commercial' && 'Includes: Office, Shop, Warehouse, Showroom'}
                    {filters.propertyType === 'Event' && 'Includes: Banquet Hall, Garden, Meeting Room'}
                    {filters.propertyType === 'Turf' && 'Includes: Football Turf, Cricket Ground, Multi-Sport, Tennis Court'}
                    {filters.propertyType === 'Parking' && 'Includes: Car Parking, Bike Parking, Garage'}
                    {filters.propertyType === 'Land' && 'Includes: Agricultural, Commercial Plot, Residential Plot'}
                  </span>
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <span className="me-2" style={{ color: '#f97316', fontSize: '0.9rem' }}>💰</span>
                  <Form.Label style={{
                    margin: '0',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    color: '#f97316',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    PRICE RANGE
                  </Form.Label>
                </div>
                <small style={{
                  fontSize: '0.7rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  per month
                </small>
              </div>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '8px 10px',
                  fontSize: '0.9rem',
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

            {/* Conditional Bedrooms Filter */}
            {shouldShowBedroomFilter() && (
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div className="d-flex align-items-center">
                    <span className="me-2" style={{ fontSize: '0.9rem' }}>🛏️</span>
                    <Form.Label style={{
                      margin: '0',
                      fontWeight: '600',
                      fontSize: '0.8rem',
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.025em',
                      fontFamily: 'Inter, system-ui, sans-serif'
                    }}>
                      BEDROOMS
                    </Form.Label>
                  </div>
                  <small style={{
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    color: '#6b7280',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    residential only
                  </small>
                </div>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    padding: '8px 10px',
                    fontSize: '0.9rem',
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

            {/* Clear Filters Button */}
            <Button
              variant="outline-secondary"
              className="w-100 mb-3"
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
              style={{
                borderRadius: '6px',
                padding: '10px',
                borderWidth: '1px',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                fontSize: '0.85rem',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            >
              <span className="me-1">✕</span>
              Clear All Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>

            {/* Active Filters Summary */}
            <div style={{
              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              marginBottom: '15px'
            }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span style={{
                  fontWeight: '600',
                  color: '#1f2937',
                  fontSize: '0.9rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span className="me-1">⚡</span>
                  Active Filters
                </span>
                <div style={{
                  background: getActiveFiltersCount() > 0 ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : '#6b7280',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  minWidth: '20px',
                  textAlign: 'center',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {getActiveFiltersCount()}
                </div>
              </div>
              
              <div className="d-flex flex-wrap gap-1">
                {searchQuery && (
                  <div style={{
                    background: '#3b82f6',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    🔍 {searchQuery.substring(0, 10)}{searchQuery.length > 10 ? '...' : ''}
                  </div>
                )}
                {filters.location && (
                  <div style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    📍 {filters.location}
                  </div>
                )}
                {filters.propertyType && (
                  <div style={{
                    background: '#f59e0b',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    {getCategoryIcon(filters.propertyType)} {filters.propertyType}
                  </div>
                )}
                {filters.priceRange && (
                  <div style={{
                    background: '#ef4444',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    💰 ₹{filters.priceRange.replace('-', ' - ₹')}
                  </div>
                )}
                {filters.bedrooms && (
                  <div style={{
                    background: '#8b5cf6',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    🛏️ {filters.bedrooms}+ BHK
                  </div>
                )}
              </div>
              
              {getActiveFiltersCount() === 0 && (
                <div className="text-center">
                  <p className="text-muted mb-0" style={{
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    No active filters
                  </p>
                  <small className="text-muted" style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.7rem'
                  }}>
                    Use filters above to refine your search
                  </small>
                </div>
              )}
            </div>

            {/* COMPACT AVAILABLE COUNTER WITH WHITE NUMBERS */}
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              borderRadius: '10px',
              padding: '1.2rem',
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                margin: 0, 
                marginBottom: '6px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                color: 'white'
              }}>
                {filteredProperties.length}
              </h2>
              <p style={{ 
                margin: 0, 
                fontSize: '1rem', 
                fontWeight: '600',
                opacity: '0.95',
                color: 'white'
              }}>
                Available
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area - COMPACT */}
        <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Container fluid style={{ padding: '1.5rem', maxWidth: '1200px' }}>
            
            {/* Results Header - FIXED BUTTON OVERLAP */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ flex: '1', minWidth: '300px' }}>
                <h2 style={{
                  fontWeight: '800',
                  marginBottom: '6px',
                  color: '#111827',
                  fontSize: '2rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '-0.02em'
                }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  marginBottom: '0',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: '400'
                }}>
                  Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
                </p>
              </div>

              {/* View Toggle Buttons - FIXED NO OVERLAP */}
              <div style={{ 
                display: 'flex',
                gap: '8px',
                flexShrink: 0
              }}>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                  style={{
                    fontWeight: '600',
                    padding: '10px 18px',
                    fontSize: '0.85rem',
                    backgroundColor: viewMode === 'grid' ? '#7c3aed' : 'transparent',
                    borderColor: '#7c3aed',
                    color: viewMode === 'grid' ? 'white' : '#7c3aed',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    minWidth: '120px'
                  }}
                >
                  🔲 GRID VIEW
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
                  style={{
                    fontWeight: '600',
                    padding: '10px 18px',
                    fontSize: '0.85rem',
                    backgroundColor: viewMode === 'list' ? '#7c3aed' : 'transparent',
                    borderColor: '#7c3aed',
                    color: viewMode === 'list' ? 'white' : '#7c3aed',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    minWidth: '120px'
                  }}
                >
                  📋 LIST VIEW
                </Button>
              </div>
            </div>

            {/* Properties Grid/List - COMPACT CARDS */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-4" style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '2rem'
              }}>
                <div className="mb-3" style={{
                  fontSize: '3rem',
                  opacity: '0.6'
                }}>
                  {searchQuery ? '🔍' : (getActiveFiltersCount() > 0 ? '🔧' : '📂')}
                </div>
                <h3 style={{
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#111827',
                  fontSize: '1.5rem',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {searchQuery ? 'No Search Results' : (getActiveFiltersCount() > 0 ? 'No Matching Properties' : 'No Properties Available')}
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.95rem',
                  marginBottom: '20px',
                  maxWidth: '400px',
                  margin: '0 auto 20px auto',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  lineHeight: '1.5'
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
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    border: 'none',
                    fontWeight: '600',
                    borderRadius: '10px',
                    padding: '10px 24px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em'
                  }}
                  onClick={clearFilters}
                >
                  {getActiveFiltersCount() > 0 ? 'Clear All Filters' : 'Refresh Properties'}
                </Button>
              </div>
            ) : (
              <Row className={viewMode === 'grid' ? 'row-cols-1 row-cols-md-2 row-cols-xl-3 g-3' : 'g-2'}>
                {filteredProperties.map((property) => {
                  if (!property || !property._id) return null;
                  
                  return (
                    <Col key={property._id} className={viewMode === 'list' ? 'col-12' : ''}>
                      {viewMode === 'list' ? (
                        // COMPACT LIST VIEW CARD
                        <Card className="border-0 shadow-sm" style={{
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          minHeight: '180px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #e5e7eb'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
                        }}>
                          <Row className="g-0 align-items-center">
                            <Col md={4}>
                              <div style={{
                                position: 'relative',
                                height: '180px',
                                overflow: 'hidden'
                              }}>
                                <img
                                  src={getImageUrl(property.images && Array.isArray(property.images) ? property.images[0] : property.image)}
                                  alt={property.title || 'Property'}
                                  onError={handleImageError}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '12px 0 0 12px'
                                  }}
                                />
                                <div className="position-absolute top-0 start-0 p-2">
                                  <Badge bg="success" className="me-1 fw-semibold shadow-sm" style={{
                                    borderRadius: '12px',
                                    padding: '4px 8px',
                                    fontSize: '0.65rem',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.025em'
                                  }}>
                                    ✓ AVAILABLE
                                  </Badge>
                                  <Badge bg="primary" className="fw-semibold shadow-sm" style={{
                                    borderRadius: '12px',
                                    padding: '4px 8px',
                                    fontSize: '0.65rem',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.025em'
                                  }}>
                                    ✓ VERIFIED
                                  </Badge>
                                </div>
                              </div>
                            </Col>
                            <Col md={8}>
                              <Card.Body className="p-3" style={{
                                minHeight: '180px',
                                display: 'flex',
                                flexDirection: 'column'
                              }}>
                                <div className="d-flex align-items-center mb-2">
                                  <span className="me-1" style={{
                                    color: '#7c3aed',
                                    fontSize: '0.9rem'
                                  }}>📍</span>
                                  <span style={{
                                    fontSize: '0.8rem',
                                    color: '#64748b',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                    fontWeight: '500',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}>
                                    {property.address?.city || 'City'}, {property.address?.state || 'State'}
                                  </span>
                                </div>
                                
                                <Card.Title style={{
                                  color: '#111827',
                                  fontSize: '1.2rem',
                                  lineHeight: '1.3',
                                  fontWeight: '700',
                                  marginBottom: '8px',
                                  fontFamily: 'Inter, system-ui, sans-serif',
                                  letterSpacing: '-0.015em'
                                }}>
                                  {property.title || 'Property Title'}
                                </Card.Title>
                                
                                <p className="mb-2" style={{
                                  fontSize: '0.85rem',
                                  lineHeight: '1.5',
                                  flexGrow: 1,
                                  color: '#374151',
                                  fontFamily: 'Inter, system-ui, sans-serif',
                                  fontWeight: '400'
                                }}>
                                  {property.description ? 
                                    property.description.substring(0, 100) + '...' : 
                                    'Premium property with modern amenities and excellent location.'
                                  }
                                </p>
                                
                                <div className="mb-2">
                                  <Badge bg="primary" style={{
                                    marginRight: '6px',
                                    backgroundColor: '#7c3aed',
                                    fontSize: '0.7rem',
                                    padding: '4px 8px',
                                    borderRadius: '8px'
                                  }}>
                                    {property.category || 'Land'}
                                  </Badge>
                                  <small style={{ 
                                    color: '#64748b',
                                    fontSize: '0.75rem'
                                  }}>
                                    {property.size || '10000'}
                                  </small>
                                </div>
                                
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                  <div>
                                    <div style={{
                                      fontSize: '1.3rem',
                                      fontWeight: '700',
                                      color: '#059669',
                                      marginBottom: '2px',
                                      fontFamily: 'Inter, system-ui, sans-serif',
                                      letterSpacing: '-0.01em'
                                    }}>
                                      {formatPrice(property.price, getSafeRentType(property))}
                                    </div>
                                    <small style={{
                                      color: '#64748b',
                                      fontSize: '0.75rem',
                                      fontFamily: 'Inter, system-ui, sans-serif',
                                      fontWeight: '500',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px'
                                    }}>
                                      Available for {getSafeRentTypes(property).join(', ') || 'rental'}
                                    </small>
                                  </div>
                                  
                                  <div className="d-flex gap-2">
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      style={{
                                        borderRadius: '8px',
                                        padding: '6px 12px',
                                        borderWidth: '1px',
                                        fontWeight: '600',
                                        fontSize: '0.75rem',
                                        borderColor: '#7c3aed',
                                        color: '#7c3aed',
                                        fontFamily: 'Inter, system-ui, sans-serif'
                                      }}
                                      onClick={() => handleViewDetails(property._id)}
                                    >
                                      View Details
                                    </Button>
                                    <Button
                                      size="sm"
                                      style={{
                                        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '6px 12px',
                                        fontWeight: '600',
                                        fontSize: '0.75rem',
                                        fontFamily: 'Inter, system-ui, sans-serif'
                                      }}
                                      onClick={() => handleBookNow(property._id)}
                                    >
                                      Book Now
                                    </Button>
                                  </div>
                                </div>
                              </Card.Body>
                            </Col>
                          </Row>
                        </Card>
                      ) : (
                        // COMPACT GRID VIEW CARD
                        <PropertyCard 
                          property={property} 
                          showOwner={false}
                          compact={true}
                          onViewDetails={() => handleViewDetails(property._id)}
                          onBookNow={() => handleBookNow(property._id)}
                        />
                      )}
                    </Col>
                  );
                })}
              </Row>
            )}
          </Container>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .btn-group .btn:focus {
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.3) !important;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 400;
          line-height: 1.6;
          color: #1f2937;
          letter-spacing: 0.005em;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin-bottom: 0.5em;
          color: #0f172a;
        }
        
        .card-title {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-weight: 800 !important;
          color: #111827 !important;
          letter-spacing: -0.02em !important;
          line-height: 1.3 !important;
        }
        
        .card-text {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          color: #374151 !important;
          font-weight: 400 !important;
          line-height: 1.6 !important;
        }
        
        .btn {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 0.025em !important;
          transition: all 0.3s ease !important;
          border-radius: 8px !important;
        }
        
        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          
          .btn-group .btn {
            border-radius: 8px !important;
            margin-bottom: 4px;
          }
          
          h1 {
            font-size: 2.5rem !important;
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
