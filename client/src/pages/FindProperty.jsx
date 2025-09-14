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
        {/* HERO SECTION WITH WHITE TEXT */}
        <section style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          padding: '2rem 0'
        }}>
          <Container className="text-center">
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: '900', 
              color: 'white',
              marginBottom: '1rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Find Your Perfect Property
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              color: 'white', 
              opacity: '0.95',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              Discover verified properties from our premium collection across India
            </p>
          </Container>
        </section>
        <Container className="py-5 text-center">
          <Spinner animation="border" style={{ color: '#7c3aed' }} />
          <p className="mt-3">Loading properties...</p>
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
          <Button onClick={fetchProperties} style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* HERO SECTION WITH WHITE TEXT - EXACTLY LIKE REFERENCE */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem 0',
        textAlign: 'center'
      }}>
        <Container>
          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: '900',
            color: 'white',
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            Find Your Perfect Property
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'white',
            opacity: '0.95',
            maxWidth: '600px',
            margin: '0 auto',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            Discover verified properties from our premium collection across India. From luxury apartments to sports turfs and commercial spaces.
          </p>
        </Container>
      </section>

      {/* MAIN LAYOUT - EXACTLY LIKE REFERENCE */}
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        
        {/* SIDEBAR WITH WHITE BACKGROUND - EXACTLY LIKE REFERENCE */}
        <div style={{
          width: '350px',
          minWidth: '350px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e9ecef',
          boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
          padding: '0'
        }}>
          
          {/* Search Section */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f3f4' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ marginRight: '8px', fontSize: '1.1rem' }}>🔍</span>
              <h6 style={{
                margin: 0,
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1f2937',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Search Properties
              </h6>
            </div>
            <Form.Control
              type="text"
              placeholder="Search by location, type, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                padding: '12px',
                fontSize: '0.9rem',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            />
          </div>

          {/* Smart Filters Section - WHITE BACKGROUND */}
          <div style={{ padding: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <span style={{ marginRight: '8px', fontSize: '1.1rem' }}>✨</span>
              <h6 style={{
                margin: 0,
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1f2937',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Smart Filters
              </h6>
            </div>

            {/* Location Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ marginRight: '8px', color: '#dc3545', fontSize: '1rem' }}>📍</span>
                <Form.Label style={{
                  margin: 0,
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  color: '#dc3545',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  LOCATION
                </Form.Label>
                <small style={{
                  marginLeft: 'auto',
                  color: '#6c757d',
                  fontSize: '0.8rem'
                }}>
                  {indianLocations.length - 1} cities
                </small>
              </div>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  padding: '10px',
                  fontSize: '0.9rem',
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
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ marginRight: '8px', color: '#f97316', fontSize: '1rem' }}>🏠</span>
                <Form.Label style={{
                  margin: 0,
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  color: '#f97316',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  PROPERTY TYPE
                </Form.Label>
                <small style={{
                  marginLeft: 'auto',
                  color: '#6c757d',
                  fontSize: '0.8rem'
                }}>
                  {propertyTypes.length - 1} categories
                </small>
              </div>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  padding: '10px',
                  fontSize: '0.9rem',
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
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ marginRight: '8px', color: '#f97316', fontSize: '1rem' }}>💰</span>
                <Form.Label style={{
                  margin: 0,
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  color: '#f97316',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  PRICE RANGE
                </Form.Label>
                <small style={{
                  marginLeft: 'auto',
                  color: '#6c757d',
                  fontSize: '0.8rem'
                }}>
                  per month
                </small>
              </div>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  padding: '10px',
                  fontSize: '0.9rem',
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
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ marginRight: '8px', fontSize: '1rem' }}>🛏️</span>
                  <Form.Label style={{
                    margin: 0,
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    color: '#1f2937',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}>
                    BEDROOMS
                  </Form.Label>
                  <small style={{
                    marginLeft: 'auto',
                    color: '#6c757d',
                    fontSize: '0.8rem'
                  }}>
                    residential only
                  </small>
                </div>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    padding: '10px',
                    fontSize: '0.9rem',
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
                borderRadius: '8px',
                padding: '10px',
                fontWeight: '600',
                fontSize: '0.9rem',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            >
              <span style={{ marginRight: '6px' }}>✕</span>
              Clear All Filters
            </Button>

            {/* REFERENCE AVAILABLE COUNTER */}
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              <h2 style={{
                fontSize: '3rem',
                fontWeight: '800',
                margin: 0,
                marginBottom: '8px'
              }}>
                {filteredProperties.length}
              </h2>
              <p style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                Available
              </p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <main style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Container fluid style={{ padding: '2rem' }}>
            
            {/* Results Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div>
                <h2 style={{
                  fontSize: '2.2rem',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: '#111827',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1rem',
                  marginBottom: '0',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
                </p>
              </div>

              {/* VIEW TOGGLE BUTTONS */}
              <div>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                  style={{
                    marginRight: '0.5rem',
                    backgroundColor: viewMode === 'grid' ? '#7c3aed' : 'transparent',
                    borderColor: '#7c3aed',
                    color: viewMode === 'grid' ? 'white' : '#7c3aed',
                    fontWeight: '600',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}
                >
                  🔲 Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
                  style={{
                    backgroundColor: viewMode === 'list' ? '#7c3aed' : 'transparent',
                    borderColor: '#7c3aed',
                    color: viewMode === 'list' ? 'white' : '#7c3aed',
                    fontWeight: '600',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}
                >
                  📋 List
                </Button>
              </div>
            </div>

            {/* 🔥 FEATURED PROPERTIES SECTION - EXACTLY LIKE REFERENCE */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{ marginRight: '8px', color: '#3b82f6', fontSize: '1.2rem' }}>💎</span>
                <h5 style={{
                  margin: 0,
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  Featured Properties
                </h5>
              </div>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                margin: 0,
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Handpicked premium properties that match your search criteria
              </p>
              
              {/* Featured Tags */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <Badge pill style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  Luxury Villas in Mumbai
                </Badge>
                <Badge pill style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  Modern Apartments in Bangalore
                </Badge>
                <Badge pill style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                  Commercial Spaces in Delhi
                </Badge>
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
                <Button onClick={clearFilters} style={{
                  backgroundColor: '#7c3aed',
                  borderColor: '#7c3aed'
                }}>
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
