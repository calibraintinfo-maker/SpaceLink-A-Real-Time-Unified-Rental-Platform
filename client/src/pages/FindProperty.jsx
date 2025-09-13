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
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <div style={{ width: '300px', backgroundColor: '#fff' }}></div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={fetchProperties}>Try Again</Button>
      </Container>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* 🎯 PERFECT SIDEBAR - Exactly like your reference */}
      <div style={{
        width: '300px',
        minWidth: '300px',
        backgroundColor: '#ffffff',
        padding: '24px 20px',
        borderRight: '1px solid #e5e7eb',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)'
      }}>
        
        {/* Search Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            color: '#1f2937',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            fontFamily: "'Inter', sans-serif"
          }}>
            <span style={{ marginRight: '8px' }}>🔍</span>
            Search Properties
          </h3>
          <Form.Control
            type="text"
            placeholder="Search by location, type, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif"
            }}
          />
        </div>

        {/* Smart Filters */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            color: '#1f2937',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            fontFamily: "'Inter', sans-serif"
          }}>
            <span style={{ marginRight: '8px' }}>✨</span>
            Smart Filters
          </h3>

          {/* Location */}
          <div style={{ marginBottom: '16px' }}>
            <Form.Label style={{
              color: '#1f2937',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              fontFamily: "'Inter', sans-serif"
            }}>
              <span style={{ marginRight: '6px' }}>📍</span>
              LOCATION
            </Form.Label>
            <Form.Select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
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

          {/* Property Type */}
          <div style={{ marginBottom: '16px' }}>
            <Form.Label style={{
              color: '#1f2937',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              fontFamily: "'Inter', sans-serif"
            }}>
              <span style={{ marginRight: '6px' }}>🏠</span>
              PROPERTY TYPE
            </Form.Label>
            <Form.Select
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
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

          {/* Price Range */}
          <div style={{ marginBottom: '16px' }}>
            <Form.Label style={{
              color: '#1f2937',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: "'Inter', sans-serif"
            }}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '6px' }}>💰</span>
                PRICE RANGE
              </span>
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>PER MONTH</span>
            </Form.Label>
            <Form.Select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
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

          {/* Bedrooms */}
          {shouldShowBedroomFilter() && (
            <div style={{ marginBottom: '16px' }}>
              <Form.Label style={{
                color: '#1f2937',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                fontFamily: "'Inter', sans-serif"
              }}>
                <span style={{ marginRight: '6px' }}>🛏️</span>
                BEDROOMS
              </Form.Label>
              <Form.Select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
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

          {/* Clear Filters Button */}
          <Button
            onClick={clearFilters}
            disabled={getActiveFiltersCount() === 0}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              marginBottom: '20px'
            }}
          >
            ✕ Clear All Filters
          </Button>
        </div>

        {/* Available Counter */}
        <div style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            fontSize: '48px',
            fontWeight: '800',
            lineHeight: '1',
            marginBottom: '8px',
            fontFamily: "'Inter', sans-serif"
          }}>
            {filteredProperties.length}
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: "'Inter', sans-serif"
          }}>
            Available
          </div>
        </div>
      </div>

      {/* 🎯 MAIN CONTENT */}
      <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <div style={{ padding: '32px 40px' }}>
          
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '8px',
                fontFamily: "'Inter', sans-serif"
              }}>
                {filteredProperties.length} Properties Found
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: '0',
                fontFamily: "'Inter', sans-serif"
              }}>
                Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
              </p>
            </div>

            {/* View Toggle */}
            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              padding: '6px',
              borderRadius: '12px',
              gap: '4px'
            }}>
              <Button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  background: viewMode === 'grid' ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : '#7c3aed',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                ⊞ Grid
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  background: viewMode === 'list' ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#7c3aed',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                ☰ List
              </Button>
            </div>
          </div>

          {/* Properties Display */}
          {filteredProperties.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 40px',
              background: '#f8fafc',
              borderRadius: '20px'
            }}>
              <h3>No Properties Found</h3>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <Row className="g-4">
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
        </div>
      </div>
    </div>
  );
};

export default FindProperty;
