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

  // ALL CATEGORIES WITH PROPER GROUPING
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

  // RESIDENTIAL PROPERTY TYPES (for bedroom filter logic)
  const residentialTypes = ["Villa", "Apartment", "House", "Studio"];

  // PROFESSIONAL SAMPLE DATA WITH CONSISTENT COLORS
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
      statusColor: '#10b981',
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
      statusColor: '#10b981',
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
      statusColor: '#10b981',
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
      statusColor: '#10b981',
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
      statusColor: '#10b981',
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
      statusColor: '#10b981',
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
      statusColor: '#f59e0b',
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
      statusColor: '#10b981',
      isResidential: false
    }
  ];

  useEffect(() => {
    setProperties(sampleProperties);
    setFilteredProperties(sampleProperties);
  }, []);

  // PERFECT FILTER LOGIC
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

    // BEDROOM FILTER ONLY FOR RESIDENTIAL PROPERTIES
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

  // CHECK IF BEDROOM FILTER SHOULD BE SHOWN
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

      {/* MAIN LAYOUT WITH FIXED LEFT SIDEBAR */}
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        
        {/* FIXED LEFT SIDEBAR */}
        <div style={{
          position: 'fixed',
          left: 0,
          top: '0',
          width: '280px', // Slightly reduced width
          height: '100vh',
          background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
          overflowY: 'auto',
          zIndex: 1000,
          borderRight: '3px solid #e5e7eb'
        }}>
          
          {/* SIDEBAR HEADER */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{
              color: 'white',
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
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.9rem',
              margin: '0'
            }}>Refine your search</p>
          </div>

          {/* SIDEBAR CONTENT */}
          <div style={{ padding: '24px' }}>
            
            {/* SEARCH INPUT */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                color: 'rgba(255, 255, 255, 0.9)',
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
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>

            {/* LOCATION FILTER */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                color: 'rgba(255, 255, 255, 0.9)',
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
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                {indianLocations.map((location, index) => (
                  <option key={index} value={location === "All Locations" ? "" : location} style={{color: 'black'}}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* PROPERTY TYPE FILTER */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                color: 'rgba(255, 255, 255, 0.9)',
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
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type === "All Categories" ? "" : type} style={{color: 'black'}}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* PRICE RANGE FILTER */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                color: 'rgba(255, 255, 255, 0.9)',
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
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="" style={{color: 'black'}}>All Prices</option>
                <option value="0-2000" style={{color: 'black'}}>₹0 - ₹2,000</option>
                <option value="2000-5000" style={{color: 'black'}}>₹2,000 - ₹5,000</option>
                <option value="5000-10000" style={{color: 'black'}}>₹5,000 - ₹10,000</option>
                <option value="10000-999999" style={{color: 'black'}}>₹10,000+</option>
              </select>
            </div>

            {/* BEDROOMS FILTER - CONDITIONAL RENDERING */}
            {shouldShowBedroomFilter() && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  color: 'rgba(255, 255, 255, 0.9)',
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
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <option value="" style={{color: 'black'}}>Any Bedrooms</option>
                  <option value="1" style={{color: 'black'}}>1+ BHK</option>
                  <option value="2" style={{color: 'black'}}>2+ BHK</option>
                  <option value="3" style={{color: 'black'}}>3+ BHK</option>
                  <option value="4" style={{color: 'black'}}>4+ BHK</option>
                </select>
              </div>
            )}

            {/* CLEAR FILTERS BUTTON */}
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

            {/* FILTER STATUS */}
            <div style={{ 
              marginTop: '24px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem', marginBottom: '8px' }}>
                Active Filters:
              </div>
              <div style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                {Object.values(filters).filter(f => f).length || searchQuery ? 
                  `${Object.values(filters).filter(f => f).length + (searchQuery ? 1 : 0)} active` : 
                  'None'
                }
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ 
          marginLeft: '280px', // Same as sidebar width
          flex: 1,
          padding: '40px 40px',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          minHeight: '100vh'
        }}>
          
          {/* RESULTS HEADER */}
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
            
            {/* VIEW MODE TOGGLE */}
            <div style={{
              display: 'flex',
              background: 'white',
              borderRadius: '12px',
              padding: '6px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #f1f5f9'
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

          {/* PROFESSIONAL PROPERTY CARDS */}
          {filteredProperties.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 40px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
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
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #f1f5f9',
                    transition: 'all 0.3s ease',
                    height: viewMode === 'grid' ? '480px' : 'auto', // INCREASED HEIGHT
                    display: viewMode === 'list' ? 'flex' : 'block',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                  }}>
                    
                    {/* IMAGE SECTION */}
                    <div style={{
                      position: 'relative',
                      height: viewMode === 'grid' ? '200px' : '180px', // INCREASED HEIGHT
                      width: viewMode === 'list' ? '280px' : '100%',
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
                      
                      {/* PROFESSIONAL STATUS BADGE - CONSISTENT COLOR */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: property.statusColor,
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}>
                        {property.status}
                      </div>

                      {/* PROPERTY TYPE BADGE */}
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
                    
                    {/* CONTENT SECTION - IMPROVED SPACING */}
                    <div style={{ 
                      padding: '24px', // INCREASED PADDING
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
                          gap: '8px',
                          color: '#64748b',
                          fontSize: '0.9rem',
                          marginBottom: '16px', // INCREASED MARGIN
                          fontWeight: 500
                        }}>
                          <span>📍</span>
                          {property.location}
                        </div>
                        
                        {/* TITLE */}
                        <h3 style={{
                          fontSize: '1.3rem', // INCREASED SIZE
                          fontWeight: 800,
                          color: '#1e293b',
                          marginBottom: '16px', // INCREASED MARGIN
                          lineHeight: '1.3'
                        }}>{property.title}</h3>
                        
                        {/* PERFECT CONDITIONAL PROPERTY DETAILS */}
                        <div style={{
                          display: 'flex',
                          gap: '16px', // INCREASED GAP
                          marginBottom: '20px', // INCREASED MARGIN
                          fontSize: '0.85rem',
                          color: '#64748b',
                          flexWrap: 'wrap'
                        }}>
                          {/* ONLY SHOW BEDROOMS FOR RESIDENTIAL PROPERTIES */}
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
                          
                          {/* SHOW BATHROOMS FOR ALL EXCEPT PARKING */}
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
                          
                          {/* ALWAYS SHOW AREA */}
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
                      
                      {/* PRICING & BUTTONS - GUARANTEED SPACE */}
                      <div style={{
                        paddingTop: '20px', // INCREASED PADDING
                        borderTop: '2px solid #f1f5f9'
                      }}>
                        <div style={{
                          fontSize: '1.6rem', // INCREASED SIZE
                          fontWeight: 900,
                          color: '#10b981',
                          marginBottom: '20px' // INCREASED MARGIN
                        }}>
                          ₹{property.price.toLocaleString()}/{property.priceType}
                        </div>
                        
                        {/* PERFECT BUTTONS - ALWAYS FULLY VISIBLE */}
                        <div style={{ 
                          display: 'flex', 
                          gap: '12px' // PERFECT GAP
                        }}>
                          <button style={{
                            background: 'transparent',
                            border: '2px solid #e5e7eb',
                            color: '#64748b',
                            padding: '12px 20px', // PERFECT PADDING
                            borderRadius: '10px',
                            fontSize: '0.9rem', // PERFECT FONT SIZE
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            flex: '1',
                            minWidth: '120px', // ENSURES VISIBILITY
                            maxWidth: '140px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.color = '#667eea';
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.color = '#64748b';
                            e.target.style.transform = 'translateY(0)';
                          }}>
                            View Details
                          </button>
                          
                          <button style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // CONSISTENT COLOR
                            border: 'none',
                            color: 'white',
                            padding: '12px 20px', // PERFECT PADDING
                            borderRadius: '10px',
                            fontSize: '0.9rem', // PERFECT FONT SIZE
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            flex: '1',
                            minWidth: '120px', // ENSURES VISIBILITY
                            maxWidth: '140px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
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

          {/* LOAD MORE BUTTON */}
          {filteredProperties.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <button style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '14px 32px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.2)';
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
