import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Spinner, Form, Card, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api, handleApiError, formatPrice, getImageUrl } from '../utils/api';

// ✅ DEBOUNCE HOOK - Prevents too many API calls
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const FindProperty = () => {
  const navigate = useNavigate();

  // State
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ PAGINATION - Limits properties shown at once
  const itemsPerPage = 9; // Show only 9 properties per page to reduce load

  // ✅ DEBOUNCED VALUES - Prevents rapid API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 600);
  const debouncedFilters = useDebounce(filters, 400);

  // ✅ REQUEST CANCELLATION - Prevents race conditions
  const abortControllerRef = useRef(null);

  const indianLocations = [
    "All Locations", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", 
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow"
  ];

  const propertyTypes = [
    "All Categories", "Property Rentals", "Commercial", "Event", "Parking", "Land", "Turf"
  ];

  const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];

  // ✅ FETCH WITH CANCELLATION
  useEffect(() => {
    fetchProperties();
    
    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedSearchQuery, debouncedFilters]);

  const fetchProperties = async () => {
    // Cancel previous request if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);

    try {
      // ✅ ADD SIGNAL FOR CANCELLATION
      const response = await api.properties.getAll({ 
        signal: abortControllerRef.current.signal,
        timeout: 8000 // 8 second timeout
      });

      let propertiesArray = [];
      
      if (Array.isArray(response)) {
        propertiesArray = response;
      } else if (Array.isArray(response?.data)) {
        propertiesArray = response.data;
      } else if (Array.isArray(response?.data?.properties)) {
        propertiesArray = response.data.properties;
      }
      
      setProperties(propertiesArray);
      applyFilters(propertiesArray);
      setCurrentPage(1); // Reset to first page
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('API Error:', error);
        setError('Failed to load properties. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ OPTIMIZED FILTERING
  const applyFilters = (propertyList) => {
    let filtered = [...propertyList];

    // Search filter
    if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
      const searchTerm = debouncedSearchQuery.toLowerCase();
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
          field.toLowerCase().includes(searchTerm)
        );
      });
    }

    // Location filter
    if (debouncedFilters.location && debouncedFilters.location !== "All Locations") {
      const locationTerm = debouncedFilters.location.toLowerCase();
      filtered = filtered.filter(property => {
        if (!property?.address) return false;
        
        const locationFields = [
          property.address.city,
          property.address.state,
          property.address.street
        ].filter(Boolean);

        return locationFields.some(field =>
          field.toLowerCase().includes(locationTerm)
        );
      });
    }

    // Property type filter
    if (debouncedFilters.propertyType && debouncedFilters.propertyType !== "All Categories") {
      filtered = filtered.filter(property => {
        if (!property) return false;
        return property.category === debouncedFilters.propertyType || 
               property.subtype === debouncedFilters.propertyType;
      });
    }

    // Price range filter
    if (debouncedFilters.priceRange) {
      const [min, max] = debouncedFilters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        if (!property?.price) return false;
        const price = Number(property.price);
        return price >= min && (max ? price <= max : true);
      });
    }

    // Bedrooms filter
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

    setFilteredProperties(filtered);
  };

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

  // ✅ PAGINATION CALCULATIONS
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  // ✅ SIMPLE PROPERTY CARD (No external dependencies)
  const SimplePropertyCard = ({ property }) => (
    <Card style={{ height: '100%', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <Card.Img 
          variant="top" 
          src={getImageUrl(property.images?.[0] || property.image)}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/e2e8f0/64748b?text=Property+Image';
          }}
          loading="lazy" // ✅ LAZY LOADING
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge bg="success" className="mb-2">Available</Badge>
          <Badge bg="primary">Verified</Badge>
        </div>
        
        <Card.Title style={{ fontSize: '1.1rem', fontWeight: '600' }}>
          {property.title || 'Property Title'}
        </Card.Title>
        
        <div className="mb-2">
          <small className="text-muted">
            📍 {property.address?.city || 'Location'}, {property.address?.state || 'State'}
          </small>
        </div>
        
        <Card.Text style={{ fontSize: '0.9rem', color: '#6b7280' }}>
          {property.description ? 
            property.description.substring(0, 100) + (property.description.length > 100 ? '...' : '') : 
            'Premium property with modern amenities and excellent location.'
          }
        </Card.Text>
        
        <div className="mb-3">
          {property.bedrooms > 0 && (
            <Badge bg="light" text="dark" className="me-2 mb-1">
              {property.bedrooms} BHK
            </Badge>
          )}
          {property.bathrooms > 0 && (
            <Badge bg="light" text="dark" className="me-2 mb-1">
              {property.bathrooms} Bath
            </Badge>
          )}
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#059669' }}>
              ₹{formatPrice(property.price) || '1,234'}/month
            </div>
            <small className="text-muted">Available for rental</small>
          </div>
          
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => navigate(`/property/${property._id}`)}
            >
              View
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => navigate(`/book/${property._id}`)}
            >
              Book
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" style={{ color: '#7c3aed' }} />
        <p className="mt-3">Loading properties...</p>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        padding: '50px 0 70px 0',
        color: 'white'
      }}>
        <Container>
          <div className="text-center">
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '25px',
              padding: '8px 20px',
              marginBottom: '20px',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              ✨ {filteredProperties.length} Premium Properties Available
            </div>
            
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>
              Find Your Perfect Property
            </h1>
            
            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
              Discover verified properties from our premium collection across India.
            </p>
          </div>
        </Container>
      </section>

      {/* ✅ FIXED LAYOUT */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 300px)' }}>
        
        {/* Sidebar */}
        <div style={{
          width: '350px',
          minWidth: '350px',
          background: 'white',
          boxShadow: '4px 0 20px rgba(0,0,0,0.06)',
          overflowY: 'auto',
          borderRight: '1px solid #e5e7eb',
          padding: '30px 25px'
        }}>
          
          {/* Search */}
          <div style={{ marginBottom: '25px' }}>
            <h6 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
              🔍 Search Properties
            </h6>
            <Form.Control
              type="text"
              placeholder="Search by location, type, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: '10px',
                border: '2px solid #f1f5f9',
                padding: '10px 14px',
                fontSize: '14px'
              }}
            />
            {searchQuery && (
              <small className="text-muted mt-2 d-block">
                <strong>{filteredProperties.length} results</strong> for "{searchQuery}"
              </small>
            )}
          </div>

          {/* Filters */}
          <div style={{ marginBottom: '25px' }}>
            <h6 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
              ⚙️ Smart Filters
            </h6>

            {/* Location Filter */}
            <div style={{ marginBottom: '20px' }}>
              <Form.Label style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                📍 LOCATION
              </Form.Label>
              <Form.Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  borderRadius: '10px',
                  border: '2px solid #f1f5f9',
                  padding: '10px 14px',
                  fontSize: '14px'
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
            <div style={{ marginBottom: '20px' }}>
              <Form.Label style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                🏠 PROPERTY TYPE
              </Form.Label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{
                  borderRadius: '10px',
                  border: '2px solid #f1f5f9',
                  padding: '10px 14px',
                  fontSize: '14px'
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
            <div style={{ marginBottom: '20px' }}>
              <Form.Label style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                💰 PRICE RANGE
              </Form.Label>
              <Form.Select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{
                  borderRadius: '10px',
                  border: '2px solid #f1f5f9',
                  padding: '10px 14px',
                  fontSize: '14px'
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
              <div style={{ marginBottom: '20px' }}>
                <Form.Label style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                  🛏️ BEDROOMS
                </Form.Label>
                <Form.Select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    borderRadius: '10px',
                    border: '2px solid #f1f5f9',
                    padding: '10px 14px',
                    fontSize: '14px'
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
              variant="outline-primary"
              style={{ width: '100%', borderRadius: '10px', padding: '10px' }}
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
            >
              ✕ Clear All Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>
          </div>

          {/* Stats */}
          <div style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h4 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
              {filteredProperties.length}
            </h4>
            <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
              Available
            </p>
          </div>

        </div>

        {/* Main Content */}
        <div style={{ 
          flex: 1,
          padding: '30px',
          overflowY: 'auto'
        }}>
          
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>
                {filteredProperties.length} Properties Found
              </h2>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                Browse our premium collection • Updated {new Date().toLocaleDateString()}
              </p>
            </div>

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
                style={{ border: 'none', borderRadius: '8px', padding: '8px 16px' }}
              >
                ⊞ Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'light'}
                onClick={() => setViewMode('list')}
                style={{ border: 'none', borderRadius: '8px', padding: '8px 16px' }}
              >
                ☰ List
              </Button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="danger" className="text-center">
              <Alert.Heading>⚠️ Error Loading Properties</Alert.Heading>
              <p>{error}</p>
              <Button onClick={fetchProperties} variant="primary">Try Again</Button>
            </Alert>
          )}

          {/* Properties */}
          {filteredProperties.length === 0 ? (
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
              <Button variant="primary" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              {/* ✅ PAGINATED PROPERTIES */}
              <Row className={viewMode === 'grid' ? 'row-cols-1 row-cols-md-2 row-cols-xl-3 g-4' : 'g-4'}>
                {currentProperties.map((property) => {
                  if (!property || !property._id) return null;
                  
                  return (
                    <Col key={property._id} className={viewMode === 'list' ? 'col-12' : ''}>
                      <SimplePropertyCard property={property} />
                    </Col>
                  );
                })}
              </Row>

              {/* ✅ PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <div className="d-flex gap-2">
                      {/* Previous Button */}
                      <Button
                        variant="outline-primary"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        ← Previous
                      </Button>

                      {/* Page Numbers */}
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? 'primary' : 'outline-primary'}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}

                      {/* Next Button */}
                      <Button
                        variant="outline-primary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next →
                      </Button>
                    </div>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ✅ PROFESSIONAL CSS */}
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.5;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          border: none !important;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
        }
        
        .btn-outline-primary:hover {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
          color: white !important;
          border-color: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
