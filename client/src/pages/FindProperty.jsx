import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FindProperty = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: ''
  });
  const [viewMode, setViewMode] = useState('grid');

  // All Indian Locations
  const indianLocations = [
    "All Locations",
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh", "Guwahati", "Solapur", "Hubli-Dharwad", "Bareilly", "Moradabad", "Mysore", "Gurgaon", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Mira-Bhayandar", "Warangal", "Thiruvananthapuram", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai Nagar", "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer", "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Jammu", "Sangli-Miraj & Kupwad", "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala"
  ];

  const propertyTypes = [
    "All Categories",
    "Properties",
    "Event Venues",
    "Turf",
    "Parking",
    "Villa",
    "Apartment", 
    "House",
    "Studio",
    "Commercial",
    "Office Space",
    "Shop",
    "Land",
    "Agricultural Land",
    "Residential Plot"
  ];

  const residentialTypes = ["Villa", "Apartment", "House", "Studio"];

  const sampleProperties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Cozy Studio Apartment',
      location: 'Bangalore, Karnataka',
      price: 1800,
      priceType: 'month',
      type: 'Studio',
      category: 'Properties',
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      status: 'For Rent',
      isResidential: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Premium Commercial Space',
      location: 'Mumbai, Maharashtra',
      price: 5000,
      priceType: 'month',
      type: 'Commercial',
      category: 'Properties',
      bedrooms: 0,
      bathrooms: 2,
      area: 3000,
      status: 'For Rent',
      isResidential: false
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Modern Family House',
      location: 'Pune, Maharashtra',
      price: 3200,
      priceType: 'month',
      type: 'House',
      category: 'Properties',
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      status: 'For Rent',
      isResidential: true
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Wedding Hall Venue',
      location: 'Chennai, Tamil Nadu',
      price: 15000,
      priceType: 'day',
      type: 'Event Venues',
      category: 'Event Venues',
      bedrooms: 0,
      bathrooms: 4,
      area: 5000,
      status: 'For Rent',
      isResidential: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Football Turf Ground',
      location: 'Delhi, India',
      price: 2500,
      priceType: 'hour',
      type: 'Turf',
      category: 'Turf',
      bedrooms: 0,
      bathrooms: 2,
      area: 8000,
      status: 'For Rent',
      isResidential: false
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Secure Parking Space',
      location: 'Gurgaon, Haryana',
      price: 1500,
      priceType: 'month',
      type: 'Parking',
      category: 'Parking',
      bedrooms: 0,
      bathrooms: 0,
      area: 200,
      status: 'For Rent',
      isResidential: false
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Luxury Villa',
      location: 'Goa, India',
      price: 8500,
      priceType: 'month',
      type: 'Villa',
      category: 'Properties',
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      status: 'For Sale',
      isResidential: true
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Cricket Turf Academy',
      location: 'Hyderabad, Telangana',
      price: 3000,
      priceType: 'hour',
      type: 'Turf',
      category: 'Turf',
      bedrooms: 0,
      bathrooms: 3,
      area: 10000,
      status: 'For Rent',
      isResidential: false
    }
  ];

  useEffect(() => {
    setProperties(sampleProperties);
    setFilteredProperties(sampleProperties);
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property =>
        property.type === filters.propertyType || property.category === filters.propertyType
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property =>
        property.price >= min && property.price <= max
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property =>
        property.isResidential && property.bedrooms >= parseInt(filters.bedrooms)
      );
    }

    setFilteredProperties(filtered);
  }, [searchQuery, filters, properties]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      priceRange: '',
      bedrooms: ''
    });
    setSearchQuery('');
  };

  const shouldShowBedroomFilter = () => {
    if (!filters.propertyType) return false;
    return residentialTypes.includes(filters.propertyType) || filters.propertyType === 'Properties';
  };

  return (
    <>
      {/* COMPACT HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 0 40px 0',
        position: 'relative'
      }}>
        <Container>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: '2.8rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '12px'
            }}>Find Your Perfect Property</h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Discover amazing properties from our premium collection across India
            </p>
          </div>
        </Container>
      </section>

      {/* MAIN LAYOUT - IMPROVED COLOR HARMONY */}
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
        
        {/* HARMONIOUS SIDEBAR - LIGHTER GREY FOR BETTER HARMONY */}
        <div style={{
          position: 'fixed',
          left: 0,
          top: '0',
          width: '280px',
          height: '100vh',
          background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)', // MUCH LIGHTER GREY
          overflowY: 'auto',
          zIndex: 1000,
          borderRight: '2px solid #cbd5e1', // Softer border
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)' // Subtle shadow
        }}>
          
          {/* SIDEBAR HEADER */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #cbd5e1',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Brand color header
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🔍 Filters
            </h3>
            <p style={{
              fontSize: '0.9rem',
              margin: '0',
              opacity: 0.9
            }}>Refine your search</p>
          </div>

          {/* SIDEBAR CONTENT - DARK TEXT ON LIGHT BACKGROUND */}
          <div style={{ padding: '24px' }}>
            
            {/* Search Input */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                color: '#1e293b',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '8px',
                display: 'block'
              }}>Search</label>
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #cbd5e1',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  color: '#1e293b'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            {/* Location Filter */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                color: '#1e293b',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '8px',
                display: 'block'
              }}>Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #cbd5e1',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  background: 'white',
                  color: '#1e293b',
                  cursor: 'pointer'
                }}
              >
                {indianLocations.map((location, index) => (
                  <option key={index} value={location === "All Locations" ? "" : location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Filter */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                color: '#1e293b',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '8px',
                display: 'block'
              }}>Property Type</label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #cbd5e1',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  background: 'white',
                  color: '#1e293b',
                  cursor: 'pointer'
                }}
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                color: '#1e293b',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '8px',
                display: 'block'
              }}>Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #cbd5e1',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  background: 'white',
                  color: '#1e293b',
                  cursor: 'pointer'
                }}
              >
                <option value="">All Prices</option>
                <option value="0-2000">₹0 - ₹2,000</option>
                <option value="2000-5000">₹2,000 - ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-999999">₹10,000+</option>
              </select>
            </div>

            {/* Bedrooms Filter - Conditional */}
            {shouldShowBedroomFilter() && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  color: '#1e293b',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  display: 'block'
                }}>Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #cbd5e1',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    background: 'white',
                    color: '#1e293b',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1+ BHK</option>
                  <option value="2">2+ BHK</option>
                  <option value="3">3+ BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
              </div>
            )}

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
              }}
            >
              Clear All Filters
            </button>

            {/* Filter Status */}
            <div style={{ 
              marginTop: '24px',
              padding: '16px',
              background: 'white',
              borderRadius: '10px',
              border: '2px solid #cbd5e1'
            }}>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '8px' }}>
                Active Filters:
              </div>
              <div style={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 600 }}>
                {Object.values(filters).filter(f => f).length || searchQuery ? 
                  `${Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)} active` : 
                  'None'
                }
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - HARMONIOUS WHITE WITH SUBTLE BACKGROUND */}
        <div style={{ 
          marginLeft: '280px',
          flex: 1,
          padding: '40px',
          paddingBottom: '120px', // FOOTER OVERLAP FIX
          background: 'white', // Clean white background
          minHeight: '100vh'
        }}>
          
          {/* Results Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#1e293b',
                marginBottom: '12px'
              }}>
                {filteredProperties.length} Properties Found
              </h2>
              <p style={{
                color: '#64748b',
                fontSize: '1.1rem',
                marginBottom: '0'
              }}>
                {searchQuery && `Results for "${searchQuery}"`}
                {Object.values(filters).some(f => f) && ' with filters applied'}
                {!searchQuery && !Object.values(filters).some(f => f) && 'Browse our premium collection'}
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div style={{
              display: 'flex',
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '6px',
              border: '2px solid #e2e8f0'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  background: viewMode === 'grid' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginRight: '4px'
                }}
              >
                🔲 Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  background: viewMode === 'list' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                📋 List
              </button>
            </div>
          </div>

          {/* Property Cards */}
          {filteredProperties.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 40px',
              background: '#f8fafc',
              borderRadius: '16px',
              border: '2px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏠</div>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: '12px'
              }}>No Properties Found</h3>
              <p style={{
                color: '#64748b',
                fontSize: '1.1rem',
                marginBottom: '24px'
              }}>
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearFilters}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <Row>
              {filteredProperties.map((property) => (
                <Col 
                  lg={viewMode === 'grid' ? 4 : 12} 
                  md={viewMode === 'grid' ? 6 : 12} 
                  className="mb-4" 
                  key={property.id}
                >
                  <div style={{
                    background: '#f8fafc', // Subtle background for cards
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '2px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    height: viewMode === 'grid' ? '520px' : 'auto',
                    display: viewMode === 'list' ? 'flex' : 'block',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}>
                    
                    {/* Image Section */}
                    <div style={{
                      position: 'relative',
                      height: viewMode === 'grid' ? '220px' : '180px',
                      width: viewMode === 'list' ? '300px' : '100%',
                      flexShrink: 0,
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={property.image}
                        alt={property.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      
                      {/* Status Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: property.status === 'For Sale' ? '#f59e0b' : '#10b981',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}>
                        {property.status}
                      </div>

                      {/* Property Type Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#1e293b',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)'
                      }}>
                        {property.type}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div style={{ 
                      padding: '28px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: 'white' // White card content
                    }}>
                      <div>
                        {/* Location */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#64748b',
                          fontSize: '0.9rem',
                          marginBottom: '16px',
                          fontWeight: 500
                        }}>
                          <span>📍</span>
                          {property.location}
                        </div>
                        
                        {/* Title */}
                        <h3 style={{
                          fontSize: '1.4rem',
                          fontWeight: 800,
                          color: '#1e293b',
                          marginBottom: '18px',
                          lineHeight: '1.3'
                        }}>{property.title}</h3>
                        
                        {/* Property Details */}
                        <div style={{
                          display: 'flex',
                          gap: '16px',
                          marginBottom: '24px',
                          fontSize: '0.85rem',
                          color: '#64748b',
                          flexWrap: 'wrap'
                        }}>
                          {property.isResidential && property.bedrooms > 0 && (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '6px',
                              background: '#f1f5f9',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontWeight: 500
                            }}>
                              <span>🛏️</span>
                              <span>{property.bedrooms} BHK</span>
                            </div>
                          )}
                          
                          {property.bathrooms > 0 && property.type !== 'Parking' && (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '6px',
                              background: '#f1f5f9',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontWeight: 500
                            }}>
                              <span>🚿</span>
                              <span>{property.bathrooms} Bath</span>
                            </div>
                          )}
                          
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '6px',
                            background: '#f1f5f9',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontWeight: 500
                          }}>
                            <span>📐</span>
                            <span>{property.area.toLocaleString()} sq ft</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Pricing & Buttons */}
                      <div style={{
                        paddingTop: '24px',
                        borderTop: '2px solid #f1f5f9'
                      }}>
                        <div style={{
                          fontSize: '1.7rem',
                          fontWeight: 900,
                          color: '#10b981',
                          marginBottom: '24px'
                        }}>
                          ₹{property.price.toLocaleString()}/{property.priceType}
                        </div>
                        
                        {/* Buttons - FULLY VISIBLE */}
                        <div style={{ 
                          display: 'flex', 
                          gap: '12px',
                          alignItems: 'center'
                        }}>
                          <button style={{
                            background: 'transparent',
                            border: '2px solid #e2e8f0',
                            color: '#64748b',
                            padding: '14px 20px',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            flex: '1',
                            minWidth: '130px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.borderColor = '#cbd5e1';
                            e.target.style.color = '#475569';
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.color = '#64748b';
                            e.target.style.transform = 'translateY(0)';
                          }}>
                            View Details
                          </button>
                          
                          <button style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            color: 'white',
                            padding: '14px 20px',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            flex: '1',
                            minWidth: '130px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
                          }}>
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}

          {/* Load More Button */}
          {filteredProperties.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '16px 40px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.2)';
              }}>
                Load More Properties
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0 !important;
          }
          
          .sidebar {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default FindProperty;
