import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api, handleApiError, formatPrice, getImageUrl } from '../utils/api';

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

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200/e2e8f0/64748b?text=Property+Image';
  };

  // Simple Property Card Component (inline to avoid import issues)
  const SimplePropertyCard = ({ property }) => (
    <Card style={{ height: '100%', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <Card.Img 
          variant="top" 
          src={getImageUrl(property.images?.[0] || property.image)}
          onError={handleImageError}
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
            property.description.substring(0, 100) + '...' : 
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
              View Details
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => navigate(`/book/${property._id}`)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <section style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
          padding: '50px 0 70px 0',
          color: 'white'
        }}>
          <Container>
            <div className="text-center">
              <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>
                Find Your Perfect Property
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                Discover verified properties from our premium collection across India
              </p>
            </div>
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
          <Button onClick={fetchProperties} variant="primary">Try Again</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section - ONLY ONE */}
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

      {/* Main Layout */}
      <Container fluid style={{ padding: '0' }}>
        <Row style={{ margin: '0' }}>
          
          {/* Sidebar */}
          <Col xl={3} lg={4} style={{
            background: 'white',
            boxShadow: '4px 0 20px rgba(0,0,0,0.04)',
            padding: '30px 25px',
            minHeight: 'calc(100vh - 200px)'
          }}>
            
            {/* Search */}
            <div className="mb-4">
              <h6 className="mb-3">🔍 Search Properties</h6>
              <Form.Control
                type="text"
                placeholder="Search by location, type, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderRadius: '8px' }}
              />
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <Form.Label>📍 Location</Form.Label>
              <Form.Select
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
            <div className="mb-4">
              <Form.Label>🏠 Property Type</Form.Label>
              <Form.Select
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
            <div className="mb-4">
              <Form.Label>💰 Price Range</Form.Label>
              <Form.Select
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
              <div className="mb-4">
                <Form.Label>🛏️ Bedrooms</Form.Label>
                <Form.Select
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
              variant="outline-primary"
              className="w-100"
              onClick={clearFilters}
              disabled={getActiveFiltersCount() === 0}
            >
              ✕ Clear All Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>

            {/* Stats */}
            <div className="mt-4 text-center">
              <div style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: 'white',
                padding: '15px',
                borderRadius: '10px'
              }}>
                <h4 style={{ margin: 0 }}>{filteredProperties.length}</h4>
                <small>Properties Available</small>
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col xl={9} lg={8} style={{ padding: '30px', background: '#f8fafc' }}>
            
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="text-muted mb-0">
                  Browse our premium collection • Updated {new Date().toLocaleDateString()}
                </p>
              </div>

              {/* View Toggle */}
              <div className="btn-group">
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

            {/* Properties */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-5">
                <div style={{ fontSize: '4rem', opacity: 0.6, marginBottom: '20px' }}>
                  🏠
                </div>
                <h3>No Properties Found</h3>
                <p className="text-muted">Try adjusting your search criteria.</p>
                <Button onClick={clearFilters} variant="primary">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <Row className={viewMode === 'grid' ? 'row-cols-1 row-cols-md-2 row-cols-lg-3 g-4' : 'g-4'}>
                {filteredProperties.map((property) => {
                  if (!property || !property._id) return null;
                  
                  return (
                    <Col key={property._id} className={viewMode === 'list' ? 'col-12' : ''}>
                      <SimplePropertyCard property={property} />
                    </Col>
                  );
                })}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindProperty;
