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
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur"
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
          <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>Loading properties...</p>
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
          border: 'none'
        }}>Try Again</Button>
      </Container>
    );
  }

  return (
    <>
      {/* 🎯 MAIN LAYOUT - Exactly like Reference */}
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        
        {/* 🎯 PERFECT COMPACT DASHBOARD - Exact Reference Sizing */}
        <div style={{
          width: '280px',
          minWidth: '280px',
          backgroundColor: '#ffffff',
          padding: '20px 18px',
          borderRight: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          boxShadow: '1px 0 6px rgba(0, 0, 0, 0.05)'
        }}>
          
          {/* 🔍 Search Properties - Compact */}
          <div className="mb-4">
            <h3 style={{
              color: '#1f2937',
              fontWeight: '600',
              fontSize: '0.9rem',
              marginBottom: '10px',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              alignItems: 'center'
            }}>
              <span className="me-2" style={{ fontSize: '1rem' }}>🔍</span>
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
                padding: '8px 10px',
                fontSize: '0.8rem',
                fontFamily: "'Inter', sans-serif"
              }}
            />
          </div>

          {/* ✨ Smart Filters - Compact */}
          <div className="mb-4">
            <h3 style={{
              color: '#1f2937',
              fontWeight: '600',
              fontSize: '0.9rem',
              marginBottom: '12px',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              alignItems: 'center'
            }}>
              <span className="me-2" style={{ fontSize: '1rem' }}>✨</span>
              Smart Filters
            </h3>

            {/* 📍 Location */}
            <div className="mb-3">
              <Form.Label style={{
                fontWeight: '600',
                marginBottom: '5px',
                fontSize: '0.75rem',
                color: '#1f2937',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-1" style={{ fontSize: '0.8rem' }}>📍</span>
                LOCATION
              </Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '6px 8px',
                  fontSize: '0.75rem',
                  fontFamily: "'Inter', sans-serif"
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
            <div className="mb-3">
              <Form.Label style={{
                fontWeight: '600',
                marginBottom: '5px',
                fontSize: '0.75rem',
                color: '#1f2937',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-1" style={{ fontSize: '0.8rem' }}>🏠</span>
                PROPERTY TYPE
              </Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '6px 8px',
                  fontSize: '0.75rem',
                  fontFamily: "'Inter', sans-serif"
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
            <div className="mb-3">
              <Form.Label style={{
                fontWeight: '600',
                marginBottom: '5px',
                fontSize: '0.75rem',
                color: '#1f2937',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="me-1" style={{ fontSize: '0.8rem' }}>💰</span>
                PRICE RANGE
                <span className="ms-auto" style={{ fontSize: '0.65rem', color: '#6b7280' }}>per month</span>
              </Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '6px 8px',
                  fontSize: '0.75rem',
                  fontFamily: "'Inter', sans-serif"
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
              <div className="mb-3">
                <Form.Label style={{
                  fontWeight: '600',
                  marginBottom: '5px',
                  fontSize: '0.75rem',
                  color: '#1f2937',
                  fontFamily: "'Inter', sans-serif",
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span className="me-1" style={{ fontSize: '0.8rem' }}>🛏️</span>
                  BEDROOMS
                </Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    padding: '6px 8px',
                    fontSize: '0.75rem',
                    fontFamily: "'Inter', sans-serif"
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

          {/* Clear Filters */}
          <Button
            className="w-100 mb-3"
            onClick={clearFilters}
            disabled={getActiveFiltersCount() === 0}
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
              border: 'none',
              borderRadius: '6px',
              padding: '8px',
              fontWeight: '600',
              fontSize: '0.75rem',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            ✕ Clear All Filters
          </Button>

          {/* Available Counter - Compact */}
          <div style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            borderRadius: '12px',
            padding: '18px',
            textAlign: 'center',
            color: '#ffffff',
            fontFamily: "'Inter', sans-serif"
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '800',
              margin: '0 0 4px 0',
              lineHeight: '1'
            }}>
              {filteredProperties.length}
            </h2>
            <p style={{
              fontSize: '0.8rem',
              fontWeight: '500',
              margin: '0'
            }}>
              Available
            </p>
          </div>
        </div>

        {/* 🎯 MAIN CONTENT */}
        <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Container fluid className="py-3 px-3">
            
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px'
            }}>
              <div>
                <h2 style={{
                  fontWeight: '800',
                  marginBottom: '4px',
                  color: '#1f2937',
                  fontSize: '1.8rem',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.85rem',
                  marginBottom: '0',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
                </p>
              </div>

              {/* View Toggle */}
              <div style={{
                display: 'flex',
                gap: '4px',
                background: '#f1f5f9',
                padding: '4px',
                borderRadius: '8px'
              }}>
                <Button
                  onClick={() => setViewMode('grid')}
                  style={{
                    fontWeight: '600',
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    background: viewMode === 'grid' ? '#7c3aed' : 'transparent',
                    color: viewMode === 'grid' ? 'white' : '#7c3aed',
                    border: 'none',
                    borderRadius: '6px'
                  }}
                >
                  Grid
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  style={{
                    fontWeight: '600',
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    background: viewMode === 'list' ? '#7c3aed' : 'transparent',
                    color: viewMode === 'list' ? 'white' : '#7c3aed',
                    border: 'none',
                    borderRadius: '6px'
                  }}
                >
                  List
                </Button>
              </div>
            </div>

            {/* Properties Display */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-5">
                <h3>No Properties Found</h3>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <Row className="g-3">
                    {filteredProperties.map((property) => {
                      if (!property || !property._id) return null;
                      return (
                        <Col key={property._id} lg={4} md={6} sm={12}>
                          <PropertyCard property={property} viewMode="grid" />
                        </Col>
                      );
                    })}
                  </Row>
                ) : (
                  <div>
                    {filteredProperties.map((property) => {
                      if (!property || !property._id) return null;
                      return <PropertyCard key={property._id} property={property} viewMode="list" />;
                    })}
                  </div>
                )}
              </>
            )}
          </Container>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .form-control:focus, .form-select:focus {
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.1) !important;
          border-color: #7c3aed !important;
        }
      `}</style>
    </>
  );
};

export default FindProperty;
