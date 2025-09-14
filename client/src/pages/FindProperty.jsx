import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert, Badge } from 'react-bootstrap';
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
      let props = [];
      if (Array.isArray(response)) props = response;
      else if (Array.isArray(response?.data)) props = response.data;
      else if (Array.isArray(response?.data?.properties)) props = response.data.properties;
      else if (response?.data && typeof response.data === 'object')
        for (const key in response.data)
          if (Array.isArray(response.data[key])) props = response.data[key];
      setProperties(props);
      setFilteredProperties(props);
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
        const fields = [
          property.title, property.description, property.address?.city,
          property.address?.state, property.address?.street, property.category, property.subtype
        ].filter(Boolean);
        return fields.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      });
    }
    if (filters.location && filters.location !== "" && filters.location !== "All Locations") {
      filtered = filtered.filter(property => {
        if (!property?.address) return false;
        const locationFields = [property.address.city, property.address.state, property.address.street].filter(Boolean);
        return locationFields.some(f => f.toLowerCase().includes(filters.location.toLowerCase()));
      });
    }
    if (filters.propertyType && filters.propertyType !== "" && filters.propertyType !== "All Categories") {
      filtered = filtered.filter(property =>
        property.category === filters.propertyType || property.subtype === filters.propertyType
      );
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        const price = Number(property.price);
        return price >= min && (max ? price <= max : true);
      });
    }
    if (filters.bedrooms) {
      const minBedrooms = parseInt(filters.bedrooms, 10);
      filtered = filtered.filter(property =>
        residentialTypes.includes(property.subtype || "") ? property.bedrooms >= minBedrooms : true
      );
    }
    setFilteredProperties(filtered);
  }, [searchQuery, filters, properties]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const clearFilters = () => {
    setFilters({ location: '', propertyType: '', priceRange: '', bedrooms: '' });
    setSearchQuery('');
  };

  const shouldShowBedrooms = () => {
    if (!filters.propertyType || filters.propertyType === '' || filters.propertyType === 'All Categories') return false;
    return filters.propertyType === 'Property Rentals' || residentialTypes.includes(filters.propertyType);
  };

  if (loading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" /> <div>Loading properties...</div>
    </Container>
  );

  if (error) return (
    <Container className="py-5">
      <Alert variant="danger" className="text-center">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
        <Button onClick={fetchProperties}>Retry</Button>
      </Alert>
    </Container>
  );

  return (
    <div style={{ display: 'flex', background: '#FAFAFA' }}>
      {/* Sidebar */}
      <aside style={{ minWidth: 340, background: '#fff', padding: 32, borderRight: '1px solid #f0f0f0', height: '100vh' }}>
        <h5 className="mb-2 d-flex align-items-center">
          <span role="img" aria-label="filters" style={{ marginRight: 6 }}>✨</span>
          Smart Property Filters <Badge bg="info" style={{ marginLeft: 6 }}>{filteredProperties.length} found</Badge>
        </h5>
        <Form.Group className="mb-3">
          <Form.Label>Search Properties</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search location, keywords..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Select value={filters.location} onChange={e => handleFilterChange('location', e.target.value)}>
            {indianLocations.map(loc => <option key={loc} value={loc === 'All Locations' ? '' : loc}>{loc}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Property Type</Form.Label>
          <Form.Select value={filters.propertyType} onChange={e => handleFilterChange('propertyType', e.target.value)}>
            {propertyTypes.map(type => <option key={type} value={type === 'All Categories' ? '' : type}>{type}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price Range (per month)</Form.Label>
          <Form.Select value={filters.priceRange} onChange={e => handleFilterChange('priceRange', e.target.value)}>
            <option value="">All</option>
            <option value="0-1000">₹0 - ₹1,000</option>
            <option value="1000-2500">₹1,000 - ₹2,500</option>
            <option value="2500-5000">₹2,500 - ₹5,000</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000-25000">₹10,000 - ₹25,000</option>
            <option value="25000-50000">₹25,000 - ₹50,000</option>
            <option value="50000-999999">₹50,000+</option>
          </Form.Select>
        </Form.Group>
        {shouldShowBedrooms() && (
          <Form.Group className="mb-4">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Select value={filters.bedrooms} onChange={e => handleFilterChange('bedrooms', e.target.value)}>
              <option value="">Any</option>
              <option value="1">1+ BHK</option>
              <option value="2">2+ BHK</option>
              <option value="3">3+ BHK</option>
              <option value="4">4+ BHK</option>
              <option value="5">5+ BHK</option>
            </Form.Select>
          </Form.Group>
        )}
        <Button variant="outline-primary" className="w-100 mb-3" onClick={clearFilters} disabled={!searchQuery && !Object.values(filters).some(Boolean)}>Clear Filters</Button>
        <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', borderRadius: 12, color: 'white', textAlign: 'center', padding: '1.5rem', fontWeight: 700 }}>
          <div style={{ fontSize: 45 }}>{filteredProperties.length}</div>
          <div>Available</div>
        </div>
      </aside>
      {/* Main Content */}
      <main style={{ flex: 1, padding: 40 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 style={{ fontWeight: 700 }}>{filteredProperties.length} Properties Found</h2>
            <p className="text-muted mb-0" style={{ fontWeight: 400 }}>Browse our premium collection • Updated {new Date().toLocaleDateString()} • All verified listings</p>
          </div>
          <div>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
              className="me-2"
              onClick={() => setViewMode('grid')}
            >Grid View</Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
              onClick={() => setViewMode('list')}
            >List View</Button>
          </div>
        </div>
        {filteredProperties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <h3>No properties found.</h3>
            <Button variant="primary" onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : viewMode === 'grid' ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredProperties.map(property => (
              <Col key={property._id}>
                <PropertyCard 
                  property={property}
                  viewMode="grid"
                  onViewDetails={() => navigate(`/property/${property._id}`)}
                  onBookNow={() => navigate(`/book/${property._id}`)}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div>
            {filteredProperties.map(property => (
              <PropertyCard 
                key={property._id}
                property={property}
                viewMode="list"
                onViewDetails={() => navigate(`/property/${property._id}`)}
                onBookNow={() => navigate(`/book/${property._id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FindProperty;
