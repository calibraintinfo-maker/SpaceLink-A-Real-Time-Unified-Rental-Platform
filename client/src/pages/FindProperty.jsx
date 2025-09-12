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
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* ✅ SINGLE HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        color: 'white',
        padding: '60px 0'
      }}>
        <Container>
          <div className="text-center">
            <div className="badge bg-light bg-opacity-20 text-white mb-3 px-3 py-2">
              ✨ {filteredProperties.length} Properties Available
            </div>
            <h1 className="display-4 fw-bold mb-3">Find Your Perfect Property</h1>
            <p className="lead opacity-90">Discover verified properties from our premium collection across India</p>
          </div>
        </Container>
      </section>

      {/* ✅ OPTIMIZED MAIN LAYOUT */}
      <Container fluid className="py-4">
        <Row>
          {/* ✅ SIDEBAR */}
          <Col lg={3} className="mb-4">
            <div className="bg-white rounded-3 shadow-sm p-4 sticky-top" style={{ top: '20px' }}>
              
              {/* Search */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">🔍 Search Properties</h6>
                <Form.Control
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="sm"
                />
                {searchQuery && (
                  <small className="text-muted mt-1 d-block">
                    <strong>{filteredProperties.length} results</strong> for "{searchQuery}"
                  </small>
                )}
              </div>

              {/* Filters */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">⚙️ Smart Filters</h6>
                
                {/* Location Filter */}
                <div className="mb-3">
                  <Form.Label className="fw-semibold small">📍 LOCATION</Form.Label>
                  <Form.Select
                    size="sm"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
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
                  <Form.Label className="fw-semibold small">🏠 PROPERTY TYPE</Form.Label>
                  <Form.Select
                    size="sm"
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  >
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type === "All Categories" ? "" : type}>
                        {getCategoryIcon(type)} {type}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-3">
                  <Form.Label className="fw-semibold small">💰 PRICE RANGE</Form.Label>
                  <Form.Select
                    size="sm"
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
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
                    <Form.Label className="fw-semibold small">🛏️ BEDROOMS</Form.Label>
                    <Form.Select
                      size="sm"
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
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
                  size="sm"
                  className="w-100"
                  onClick={clearFilters}
                  disabled={getActiveFiltersCount() === 0}
                >
                  ✕ Clear Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
                </Button>
              </div>

              {/* Stats */}
              <div className="text-center bg-primary bg-opacity-10 rounded-3 p-3">
                <h4 className="text-primary mb-1">{filteredProperties.length}</h4>
                <small className="text-muted">Properties Found</small>
              </div>
            </div>
          </Col>

          {/* ✅ MAIN CONTENT */}
          <Col lg={9}>
            
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold mb-1">{filteredProperties.length} Properties Found</h3>
                <small className="text-muted">Browse our premium collection • Updated {new Date().toLocaleDateString()}</small>
              </div>

              {/* View Toggle */}
              <div className="btn-group btn-group-sm">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                >
                  ⊞ Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
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
                <Button onClick={() => window.location.reload()} variant="primary">
                  Retry
                </Button>
              </Alert>
            )}

            {/* No Results */}
            {filteredProperties.length === 0 && !loading && !error && (
              <div className="text-center py-5">
                <div className="display-1 text-muted mb-3">🏠</div>
                <h4>No Properties Found</h4>
                <p className="text-muted">Try adjusting your search criteria or clear filters</p>
                <Button onClick={clearFilters} variant="primary">Clear All Filters</Button>
              </div>
            )}

            {/* ✅ OPTIMIZED PROPERTIES DISPLAY */}
            {filteredProperties.length > 0 && (
              <>
                {viewMode === 'grid' ? (
                  <Row className="g-4">
                    {paginatedProperties.map(property => (
                      <Col key={property._id} md={6} xl={4}>
                        <PropertyCard property={property} viewMode="grid" />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div>
                    {paginatedProperties.map(property => (
                      <PropertyCard key={property._id} property={property} viewMode="list" />
                    ))}
                  </div>
                )}

                {/* ✅ SIMPLE PAGINATION */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-5">
                    <div className="btn-group">
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
                      
                      <Button
                        variant="outline-primary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next →
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>

      {/* ✅ GLOBAL STYLES */}
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

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
