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

  // All Property Categories
  const propertyTypes = [
    "All Categories",
    "Villa",
    "Apartment", 
    "House",
    "Studio",
    "Commercial",
    "Office Space",
    "Warehouse",
    "Shop",
    "Land",
    "Agricultural Land",
    "Residential Plot",
    "Parking",
    "Event Venues"
  ];

  // Enhanced property data with proper categorization
  const sampleProperties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Cozy Studio Apartment',
      location: 'Bangalore, Karnataka',
      price: 1800,
      priceType: 'month',
      type: 'Studio',
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
      bedrooms: 0,
      bathrooms: 2,
      area: 3000,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      isResidential: true
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Agricultural Land',
      location: 'Nashik, Maharashtra',
      price: 25000,
      priceType: 'year',
      type: 'Land',
      bedrooms: 0,
      bathrooms: 0,
      area: 5000,
      status: 'For Sale',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      isResidential: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Luxury Villa',
      location: 'Goa, India',
      price: 8500,
      priceType: 'month',
      type: 'Villa',
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      isResidential: true
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Secure Parking Space',
      location: 'Delhi, India',
      price: 1500,
      priceType: 'month',
      type: 'Parking',
      bedrooms: 0,
      bathrooms: 0,
      area: 200,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)',
      isResidential: false
    }
  ];

  useEffect(() => {
    setProperties(sampleProperties);
    setFilteredProperties(sampleProperties);
  }, []);

  // Enhanced filter logic
  useEffect(() => {
    let filtered = properties;

    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property =>
        property.type === filters.propertyType
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property =>
        property.price >= min && property.price <= max
      );
    }

    // Only apply bedroom filter to residential properties
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

  return (
    <>
      {/* STUNNING HERO SEARCH SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '120px 0 100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Enhanced Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 15s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 12s ease-in-out infinite reverse'
        }}></div>

        <Container>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              padding: '8px 24px',
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '30px'
            }}>
              Premium Property Search
            </div>
            
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '24px',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}>Find Your Perfect Property</h1>
            <p style={{
              fontSize: '1.3rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Discover amazing properties tailored to your needs from our premium collection across India
            </p>
          </div>

          {/* WORLD-CLASS SEARCH BAR */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '50px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
            maxWidth: '1100px',
            margin: '0 auto',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Row>
              <Col lg={8} className="mb-4">
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="🔍 Search by location, property type, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      border: '2px solid #f1f5f9',
                      borderRadius: '16px',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#fafbfc'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                      e.target.style.backgroundColor = 'white';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#f1f5f9';
                      e.target.style.boxShadow = 'none';
                      e.target.style.backgroundColor = '#fafbfc';
                    }}
                  />
                </div>
              </Col>
              <Col lg={4} className="mb-4">
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '16px',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    outline: 'none',
                    backgroundColor: '#fafbfc',
                    cursor: 'pointer'
                  }}
                >
                  {indianLocations.map((location, index) => (
                    <option key={index} value={location === "All Locations" ? "" : location}>
                      {location}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row>
              <Col lg={3} md={6} className="mb-4">
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '14px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    outline: 'none',
                    backgroundColor: '#fafbfc',
                    cursor: 'pointer'
                  }}
                >
                  {propertyTypes.map((type, index) => (
                    <option key={index} value={type === "All Categories" ? "" : type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '14px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    outline: 'none',
                    backgroundColor: '#fafbfc',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Price Range</option>
                  <option value="0-2000">₹0 - ₹2,000</option>
                  <option value="2000-5000">₹2,000 - ₹5,000</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000-999999">₹10,000+</option>
                </select>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '14px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    outline: 'none',
                    backgroundColor: '#fafbfc',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Bedrooms</option>
                  <option value="1">1+ BHK</option>
                  <option value="2">2+ BHK</option>
                  <option value="3">3+ BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
              </Col>
              <Col lg={3} md={6} className="mb-4">
                <button
                  onClick={clearFilters}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  Clear All Filters
                </button>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* WORLD-CLASS RESULTS SECTION */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)',
        minHeight: '100vh',
        position: 'relative'
      }}>
        {/* Subtle Background Elements */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(116, 75, 162, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '8%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.05) 0%, rgba(56, 249, 215, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>

        <Container>
          {/* ENHANCED RESULTS HEADER */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '30px'
          }}>
            <div>
              <h2 style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: '#1e293b',
                marginBottom: '16px',
                lineHeight: '1.2'
              }}>
                {filteredProperties.length} Properties Found
              </h2>
              <p style={{
                color: '#64748b',
                fontSize: '1.2rem',
                marginBottom: '0',
                fontWeight: 500
              }}>
                {searchQuery && `Results for "${searchQuery}"`}
                {Object.values(filters).some(f => f) && ' with filters applied'}
                {!searchQuery && !Object.values(filters).some(f => f) && 'Browse our premium collection'}
              </p>
            </div>
            
            {/* ENHANCED VIEW MODE TOGGLE */}
            <div style={{
              display: 'flex',
              background: 'white',
              borderRadius: '16px',
              padding: '8px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              border: '2px solid #f1f5f9'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '16px 28px',
                  border: 'none',
                  borderRadius: '12px',
                  background: viewMode === 'grid' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : '#64748b',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginRight: '4px',
                  boxShadow: viewMode === 'grid' ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none'
                }}
              >
                🔲 Grid View
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '16px 28px',
                  border: 'none',
                  borderRadius: '12px',
                  background: viewMode === 'list' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#64748b',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: viewMode === 'list' ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none'
                }}
              >
                📋 List View
              </button>
            </div>
          </div>

          {/* WORLD-CLASS PROPERTY CARDS */}
          {filteredProperties.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '100px 40px',
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
              border: '1px solid #f1f5f9'
            }}>
              <div style={{ 
                fontSize: '5rem', 
                marginBottom: '30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>🏠</div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#1e293b',
                marginBottom: '16px'
              }}>No Properties Found</h3>
              <p style={{
                color: '#64748b',
                fontSize: '1.2rem',
                marginBottom: '32px',
                maxWidth: '400px',
                margin: '0 auto 32px auto'
              }}>
                Try adjusting your search criteria or filters to find more properties
              </p>
              <button
                onClick={clearFilters}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
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
                  className="mb-5" 
                  key={property.id}
                >
                  <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    border: '2px solid #f8fafc',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    height: viewMode === 'grid' ? '580px' : 'auto',
                    display: viewMode === 'list' ? 'flex' : 'block',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.borderColor = '#f8fafc';
                  }}>
                    
                    {/* PREMIUM IMAGE SECTION */}
                    <div style={{
                      position: 'relative',
                      height: viewMode === 'grid' ? '280px' : '240px',
                      width: viewMode === 'list' ? '350px' : '100%',
                      flexShrink: 0,
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={property.image}
                        alt={property.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                      
                      {/* PREMIUM STATUS BADGE */}
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: property.gradient,
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '15px',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                        {property.status}
                      </div>
                      
                      {/* FAVORITE BUTTON */}
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#f87171';
                        e.target.style.transform = 'scale(1.1)';
                        e.target.innerHTML = '❤️';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                        e.target.style.transform = 'scale(1)';
                        e.target.innerHTML = '🤍';
                      }}>
                        🤍
                      </div>
                    </div>
                    
                    {/* PREMIUM CONTENT SECTION */}
                    <div style={{ 
                      padding: '36px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        {/* LOCATION */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          color: '#64748b',
                          fontSize: '0.95rem',
                          marginBottom: '20px',
                          fontWeight: 500
                        }}>
                          <span style={{ fontSize: '1.1rem' }}>📍</span>
                          {property.location}
                        </div>
                        
                        {/* TITLE */}
                        <h3 style={{
                          fontSize: '1.6rem',
                          fontWeight: 800,
                          color: '#1e293b',
                          marginBottom: '20px',
                          lineHeight: '1.3'
                        }}>{property.title}</h3>
                        
                        {/* SMART PROPERTY DETAILS - CONDITIONAL LOGIC */}
                        <div style={{
                          display: 'flex',
                          gap: '24px',
                          marginBottom: '28px',
                          fontSize: '0.9rem',
                          color: '#64748b',
                          flexWrap: 'wrap'
                        }}>
                          {/* ONLY SHOW BEDROOMS/BATHROOMS FOR RESIDENTIAL PROPERTIES */}
                          {property.isResidential && property.bedrooms > 0 && (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px',
                              background: '#f1f5f9',
                              padding: '6px 12px',
                              borderRadius: '8px'
                            }}>
                              <span style={{ fontSize: '1.1rem' }}>🛏️</span>
                              <span style={{ fontWeight: 600 }}>{property.bedrooms} BHK</span>
                            </div>
                          )}
                          
                          {property.isResidential && property.bathrooms > 0 && (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px',
                              background: '#f1f5f9',
                              padding: '6px 12px',
                              borderRadius: '8px'
                            }}>
                              <span style={{ fontSize: '1.1rem' }}>🚿</span>
                              <span style={{ fontWeight: 600 }}>{property.bathrooms} Bath</span>
                            </div>
                          )}
                          
                          {/* ALWAYS SHOW AREA */}
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            background: '#f1f5f9',
                            padding: '6px 12px',
                            borderRadius: '8px'
                          }}>
                            <span style={{ fontSize: '1.1rem' }}>📐</span>
                            <span style={{ fontWeight: 600 }}>{property.area.toLocaleString()} sq ft</span>
                          </div>
                          
                          {/* PROPERTY TYPE */}
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            background: property.gradient,
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 700
                          }}>
                            {property.type}
                          </div>
                        </div>
                      </div>
                      
                      {/* PREMIUM PRICING & BUTTONS SECTION */}
                      <div style={{
                        paddingTop: '24px',
                        borderTop: '2px solid #f8fafc'
                      }}>
                        {/* ENHANCED PRICING */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '24px'
                        }}>
                          <div>
                            <div style={{
                              fontSize: '2rem',
                              fontWeight: 900,
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              lineHeight: '1'
                            }}>
                              ₹{property.price.toLocaleString()}
                            </div>
                            <div style={{
                              fontSize: '0.9rem',
                              color: '#64748b',
                              fontWeight: 500,
                              marginTop: '4px'
                            }}>
                              per {property.priceType}
                            </div>
                          </div>
                          
                          {/* RATING STARS */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {'⭐'.repeat(Math.floor(Math.random() * 2) + 4)}
                            <span style={{
                              fontSize: '0.85rem',
                              color: '#64748b',
                              fontWeight: 600,
                              marginLeft: '6px'
                            }}>
                              {(4.0 + Math.random() * 1.0).toFixed(1)}
                            </span>
                          </div>
                        </div>
                        
                        {/* WORLD-CLASS BUTTON LAYOUT - FULLY VISIBLE */}
                        <div style={{ 
                          display: 'flex', 
                          gap: '16px',
                          justifyContent: 'space-between'
                        }}>
                          <button style={{
                            background: 'transparent',
                            border: '2px solid #e5e7eb',
                            color: '#64748b',
                            padding: '16px 24px', // PERFECT PADDING
                            borderRadius: '12px',
                            fontSize: '0.95rem', // PERFECT FONT SIZE
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            flex: '1',
                            minWidth: '140px', // ENSURES VISIBILITY
                            maxWidth: '160px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.color = '#667eea';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.color = '#64748b';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}>
                            View Details
                          </button>
                          
                          <button style={{
                            background: property.gradient,
                            border: 'none',
                            color: 'white',
                            padding: '16px 24px', // PERFECT PADDING
                            borderRadius: '12px',
                            fontSize: '0.95rem', // PERFECT FONT SIZE
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            flex: '1',
                            minWidth: '140px', // ENSURES VISIBILITY
                            maxWidth: '160px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                          }}>
                            Contact Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}

          {/* ENHANCED LOAD MORE BUTTON */}
          {filteredProperties.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
              <button style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '20px 50px',
                border: 'none',
                borderRadius: '16px',
                fontSize: '1.2rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
              }}>
                Load More Amazing Properties
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* FLOATING ANIMATIONS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 2.8rem !important;
          }
          
          h2 {
            font-size: 2.2rem !important;
          }
          
          .property-card {
            height: auto !important;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 2.2rem !important;
          }
          
          h2 {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default FindProperty;
