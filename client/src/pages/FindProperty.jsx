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
      <div className="loading-container">
        <div className="loading-spinner">
          <Spinner animation="border" />
          <p>Finding your perfect properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={fetchProperties} className="retry-button">Try Again</Button>
      </div>
    );
  }

  return (
    <>
      {/* 🌟 WORLD-CLASS LAYOUT */}
      <div className="app-layout">
        
        {/* 🎯 ULTRA-PROFESSIONAL SIDEBAR */}
        <div className="sidebar-container">
          
          {/* Search Section */}
          <div className="filter-section">
            <div className="section-header">
              <span className="section-icon">🔍</span>
              <h3>Search Properties</h3>
            </div>
            <div className="search-input-container">
              <Form.Control
                type="text"
                placeholder="Search by location, type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Filters Section */}
          <div className="filter-section">
            <div className="section-header">
              <span className="section-icon">✨</span>
              <h3>Smart Filters</h3>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <span className="label-icon">📍</span>
                LOCATION
              </label>
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

            <div className="filter-group">
              <label className="filter-label">
                <span className="label-icon">🏠</span>
                PROPERTY TYPE
              </label>
              <Form.Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="filter-select"
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <span className="label-icon">💰</span>
                PRICE RANGE
                <span className="label-suffix">per month</span>
              </label>
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

            {shouldShowBedroomFilter() && (
              <div className="filter-group">
                <label className="filter-label">
                  <span className="label-icon">🛏️</span>
                  BEDROOMS
                </label>
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

            <Button
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
              className="clear-filters-btn"
            >
              ✕ Clear All Filters
            </Button>
          </div>

          {/* Results Counter */}
          <div className="results-counter">
            <div className="counter-number">{filteredProperties.length}</div>
            <div className="counter-label">Available</div>
          </div>
        </div>

        {/* 🎯 MAIN CONTENT AREA */}
        <div className="main-content">
          <div className="content-header">
            <div className="header-info">
              <h1 className="page-title">{filteredProperties.length} Properties Found</h1>
              <p className="page-subtitle">
                Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings
              </p>
            </div>

            <div className="view-toggle">
              <Button
                onClick={() => setViewMode('grid')}
                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                ⊞ Grid
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              >
                ☰ List
              </Button>
            </div>
          </div>

          {/* Properties Display */}
          <div className="properties-container">
            {filteredProperties.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🏠</div>
                <h3>No Properties Found</h3>
                <p>Try adjusting your search criteria or clear all filters</p>
                <Button onClick={clearFilters} className="empty-action-btn">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <Row className="properties-grid">
                    {filteredProperties.map((property) => {
                      if (!property || !property._id) return null;
                      return (
                        <Col key={property._id} lg={4} md={6} sm={12} className="property-col">
                          <PropertyCard property={property} viewMode="grid" />
                        </Col>
                      );
                    })}
                  </Row>
                ) : (
                  <div className="properties-list">
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

      {/* 🎨 WORLD-CLASS STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f8fafc;
          color: #1e293b;
        }

        .app-layout {
          display: flex;
          min-height: 100vh;
        }

        /* 🎯 ULTRA-PROFESSIONAL SIDEBAR */
        .sidebar-container {
          width: 320px;
          min-width: 320px;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          padding: 32px 24px;
          height: 100vh;
          overflow-y: auto;
          position: sticky;
          top: 0;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
        }

        .filter-section {
          margin-bottom: 32px;
        }

        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-icon {
          font-size: 18px;
          margin-right: 12px;
        }

        .section-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .search-input-container {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: #ffffff;
        }

        .search-input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
          outline: none;
        }

        .filter-group {
          margin-bottom: 20px;
        }

        .filter-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .label-icon {
          margin-right: 8px;
          font-size: 14px;
        }

        .label-suffix {
          font-size: 10px;
          color: #94a3b8;
          font-weight: 500;
        }

        .filter-select {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          background: #ffffff;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
          outline: none;
        }

        .clear-filters-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          color: white;
          font-weight: 700;
          font-size: 14px;
          border-radius: 12px;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .clear-filters-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.3);
        }

        .clear-filters-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .results-counter {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          color: white;
          margin-top: 24px;
        }

        .counter-number {
          font-size: 36px;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 4px;
        }

        .counter-label {
          font-size: 14px;
          font-weight: 600;
          opacity: 0.9;
        }

        /* 🎯 MAIN CONTENT */
        .main-content {
          flex: 1;
          background: #ffffff;
          padding: 32px 40px;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 24px;
        }

        .header-info {
          flex: 1;
        }

        .page-title {
          font-size: 36px;
          font-weight: 900;
          color: #1e293b;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .page-subtitle {
          font-size: 16px;
          color: #64748b;
          margin: 0;
        }

        .view-toggle {
          display: flex;
          background: #f1f5f9;
          padding: 6px;
          border-radius: 12px;
          gap: 4px;
        }

        .toggle-btn {
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #64748b;
          transition: all 0.3s ease;
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .toggle-btn:hover:not(.active) {
          background: #e2e8f0;
          color: #1e293b;
        }

        /* 🎯 PROPERTIES CONTAINER */
        .properties-container {
          min-height: 400px;
        }

        .properties-grid {
          gap: 24px;
        }

        .property-col {
          margin-bottom: 24px;
        }

        .properties-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* 🎯 EMPTY STATE */
        .empty-state {
          text-align: center;
          padding: 80px 40px;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          border-radius: 24px;
          border: 1px solid #e2e8f0;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 24px;
          opacity: 0.7;
        }

        .empty-state h3 {
          font-size: 24px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .empty-state p {
          font-size: 16px;
          color: #64748b;
          margin-bottom: 32px;
        }

        .empty-action-btn {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          color: white;
          font-weight: 700;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .empty-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(124, 58, 237, 0.3);
        }

        /* 🎯 LOADING STATE */
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #f8fafc;
        }

        .loading-spinner {
          text-align: center;
          padding: 40px;
        }

        .loading-spinner .spinner-border {
          color: #7c3aed;
          width: 3rem;
          height: 3rem;
        }

        .loading-spinner p {
          margin-top: 20px;
          font-size: 16px;
          color: #64748b;
        }

        /* 🎯 ERROR STATE */
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 40px;
        }

        .retry-button {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          color: white;
          font-weight: 700;
          padding: 12px 24px;
          border-radius: 8px;
          margin-top: 16px;
        }

        /* 🎯 RESPONSIVE */
        @media (max-width: 768px) {
          .app-layout {
            flex-direction: column;
          }

          .sidebar-container {
            width: 100%;
            height: auto;
            position: static;
            padding: 20px;
          }

          .main-content {
            padding: 20px;
          }

          .page-title {
            font-size: 28px;
          }

          .content-header {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default FindProperty;
