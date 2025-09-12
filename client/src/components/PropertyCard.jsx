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

  const getCategoryIcon = (category) => {
    const icons = {
      'Property Rentals': '🏠', 'Commercial': '🏢', 'Land': '🌾',
      'Parking': '🚗', 'Event': '🎉', 'Turf': '⚽'
    };
    return icons[category] || '🏷️';
  };

  if (loading) {
    return (
      <div className="find-property-page">
        <div className="hero-section">
          <Container>
            <div className="text-center">
              <h1>Find Your Perfect Property</h1>
              <p>Discover verified properties from our premium collection across India</p>
            </div>
          </Container>
        </div>
        <Container className="py-5 text-center">
          <Spinner animation="border" style={{ color: '#7c3aed' }} />
          <p className="mt-3">Loading properties...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="find-property-page">
        <div className="hero-section">
          <Container>
            <div className="text-center">
              <h1>Find Your Perfect Property</h1>
              <p>Discover verified properties from our premium collection across India</p>
            </div>
          </Container>
        </div>
        <Container className="py-5">
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Error Loading Properties</Alert.Heading>
            <p>{error}</p>
            <Button onClick={fetchProperties} variant="primary">Try Again</Button>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="find-property-page">
      {/* ✅ SINGLE HERO SECTION */}
      <div className="hero-section">
        <Container>
          <div className="text-center">
            <div className="hero-badge">
              ✨ {filteredProperties.length} Premium Properties Available
            </div>
            <h1>Find Your Perfect Property</h1>
            <p>Discover verified properties from our premium collection across India.<br />From luxury apartments to commercial spaces.</p>
          </div>
        </Container>
      </div>

      {/* ✅ FIXED LAYOUT - NO MORE OVERLAPPING! */}
      <div className="main-layout">
        
        {/* ✅ SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-content">
            
            {/* Search */}
            <div className="search-section">
              <h6>🔍 Search Properties</h6>
              <Form.Control
                type="text"
                placeholder="Search by location, type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <small className="search-results">
                  <strong>{filteredProperties.length} results</strong> for "{searchQuery}"
                </small>
              )}
            </div>

            {/* Filters */}
            <div className="filters-section">
              <h6>⚙️ Smart Filters</h6>

              {/* Location */}
              <div className="filter-group">
                <Form.Label>📍 Location</Form.Label>
                <Form.Select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="filter-select"
                >
                  {indianLocations.map((location, index) => (
                    <option key={index} value={location === "All Locations" ? "" : location}>
                      {location}
                    </option>
                  ))}
                </Form.Select>
              </div>

              {/* Property Type */}
              <div className="filter-group">
                <Form.Label>🏠 Property Type</Form.Label>
                <Form.Select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="filter-select"
                >
                  {propertyTypes.map((type, index) => (
                    <option key={index} value={type === "All Categories" ? "" : type}>
                      {getCategoryIcon(type)} {type}
                    </option>
                  ))}
                </Form.Select>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <Form.Label>💰 Price Range</Form.Label>
                <Form.Select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="filter-select"
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
                <div className="filter-group">
                  <Form.Label>🛏️ Bedrooms</Form.Label>
                  <Form.Select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    className="filter-select"
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
                className="clear-filters-btn"
                onClick={clearFilters}
                disabled={getActiveFiltersCount() === 0}
              >
                ✕ Clear All Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
              </Button>
            </div>

            {/* Stats */}
            <div className="stats-section">
              <div className="stats-card">
                <h4>{filteredProperties.length}</h4>
                <p>Available</p>
              </div>
            </div>

          </div>
        </div>

        {/* ✅ MAIN CONTENT */}
        <div className="main-content">
          
          {/* Header */}
          <div className="content-header">
            <div>
              <h2>{filteredProperties.length} Properties Found</h2>
              <p>Browse our premium collection • Updated {new Date().toLocaleDateString()}</p>
            </div>

            <div className="view-toggle">
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

          {/* Featured Properties */}
          {filteredProperties.length > 0 && filteredProperties.length < 5 && (
            <div className="featured-section">
              <h4>💎 Featured Properties</h4>
              <p>Handpicked premium properties that match your search criteria</p>
              <div className="featured-tags">
                {['Luxury Villas in Mumbai', 'Modern Apartments in Bangalore', 'Commercial Spaces in Delhi'].map((item, index) => (
                  <Badge key={index} bg="light" text="dark">{item}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Properties */}
          {filteredProperties.length === 0 ? (
            <div className="no-properties">
              <div className="no-properties-icon">🏠</div>
              <h3>No Properties Found</h3>
              <p>Try adjusting your search criteria or clear filters to see more results.</p>
              <Button variant="primary" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <Row className={viewMode === 'grid' ? 'row-cols-1 row-cols-md-2 row-cols-xl-3 g-4' : 'g-4'}>
              {filteredProperties.map((property) => {
                if (!property || !property._id) return null;
                
                return (
                  <Col key={property._id} className={viewMode === 'list' ? 'col-12' : ''}>
                    <PropertyCard 
                      property={property} 
                      showOwner={false}
                      viewMode={viewMode}
                    />
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      </div>

      {/* ✅ PERFECT CSS - NO MORE CONFLICTS! */}
      <style>{`
        .find-property-page {
          font-family: 'Inter', sans-serif;
          background-color: #f8fafc;
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
          padding: 60px 0;
          text-align: center;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 25px;
          padding: 8px 20px;
          margin-bottom: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-section h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .hero-section p {
          font-size: 1.1rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .main-layout {
          display: flex;
          min-height: calc(100vh - 200px);
        }

        .sidebar {
          width: 350px;
          min-width: 350px;
          background: white;
          box-shadow: 4px 0 20px rgba(0,0,0,0.06);
          border-right: 1px solid #e5e7eb;
          overflow-y: auto;
        }

        .sidebar-content {
          padding: 30px 25px;
        }

        .search-section, .filters-section {
          margin-bottom: 25px;
        }

        .search-section h6, .filters-section h6 {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
        }

        .search-input, .filter-select {
          border-radius: 10px;
          border: 2px solid #f1f5f9;
          padding: 10px 14px;
          font-size: 14px;
          width: 100%;
        }

        .search-results {
          color: #6b7280;
          font-size: 12px;
          margin-top: 8px;
          display: block;
        }

        .filter-group {
          margin-bottom: 20px;
        }

        .filter-group label {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
        }

        .clear-filters-btn {
          width: 100%;
          border-radius: 10px;
          padding: 10px;
          border: 2px solid #7c3aed;
          color: #7c3aed;
          font-weight: 600;
          font-size: 14px;
        }

        .clear-filters-btn:hover {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
          border-color: transparent;
        }

        .stats-section {
          margin-top: 20px;
        }

        .stats-card {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
        }

        .stats-card h4 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 4px;
          margin: 0;
        }

        .stats-card p {
          font-size: 12px;
          opacity: 0.9;
          margin: 0;
        }

        .main-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .content-header h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .content-header p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        .view-toggle {
          display: flex;
          gap: 8px;
          background: white;
          padding: 4px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .view-toggle button {
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
        }

        .featured-section {
          background: white;
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 30px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          border: 1px solid #e2e8f0;
        }

        .featured-section h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
        }

        .featured-section p {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .featured-tags {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .featured-tags .badge {
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .no-properties {
          text-align: center;
          padding: 60px 40px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .no-properties-icon {
          font-size: 4rem;
          opacity: 0.6;
          margin-bottom: 20px;
        }

        .no-properties h3 {
          font-weight: 800;
          color: #1f2937;
          font-size: 1.8rem;
          margin-bottom: 12px;
        }

        .no-properties p {
          color: #6b7280;
          font-size: 16px;
          margin-bottom: 24px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
        }

        .form-control:focus, .form-select:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }

        .card-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          color: #1f2937;
          line-height: 1.3;
          font-size: 1.15rem;
        }

        .card-text {
          font-family: 'Inter', sans-serif;
          color: #6b7280;
          font-weight: 400;
          line-height: 1.5;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .main-layout {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            min-width: auto;
          }
          
          .content-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default FindProperty;
