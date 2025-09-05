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
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh", "Guwahati", "Solapur", "Hubli-Dharwad", "Bareilly", "Moradabad", "Mysore", "Gurgaon", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Mira-Bhayandar", "Warangal", "Thiruvananthapuram", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai Nagar", "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer", "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Jammu", "Sangli-Miraj & Kupwad", "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala"
  ];

  // All Property Categories
  const propertyTypes = [
    "All Categories",
    "Property Rentals",
    "Commercial", 
    "Land",
    "Parking",
    "Event Venues",
    "Villa",
    "Apartment",
    "House",
    "Studio",
    "Office Space",
    "Warehouse",
    "Shop",
    "Agricultural Land",
    "Residential Plot"
  ];

  // Sample property data - expanded with all categories
  const sampleProperties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Cozy Studio',
      location: 'Bangalore, Karnataka',
      price: 1800,
      priceType: 'month',
      features: ['1 BHK', '600 sq ft'],
      type: 'Studio',
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Commercial Space',
      location: 'Mumbai, Maharashtra',
      price: 5000,
      priceType: 'month',
      features: ['2 Bath', '3,000 sq ft'],
      type: 'Commercial',
      bedrooms: 0,
      bathrooms: 2,
      area: 3000,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Family House',
      location: 'Pune, Maharashtra',
      price: 3200,
      priceType: 'month',
      features: ['2 BHK', '1,200 sq ft'],
      type: 'House',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  ];

  useEffect(() => {
    setProperties(sampleProperties);
    setFilteredProperties(sampleProperties);
  }, []);

  // Filter properties based on search and filters
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

    if (filters.bedrooms) {
      filtered = filtered.filter(property =>
        property.bedrooms >= parseInt(filters.bedrooms)
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
      {/* HERO SEARCH SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '100px 0 80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>

        <Container>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '20px'
            }}>Find Your Perfect Property</h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover amazing properties tailored to your needs from our premium collection
            </p>
          </div>

          {/* IMPROVED SEARCH BAR */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px', // Increased padding
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
            maxWidth: '1000px', // Increased width
            margin: '0 auto'
          }}>
            <Row>
              <Col lg={6} className="mb-4"> {/* Increased margin bottom */}
                <input
                  type="text"
                  placeholder="Search by location, property type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px', // Increased padding
                    border: '2px solid #f1f5f9',
                    borderRadius: '12px',
                    fontSize: '1.1rem', // Increased font size
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#f1f5f9'}
                />
              </Col>
              <Col lg={6} className="mb-4">
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px', // Increased padding
                    border: '2px solid #f1f5f9',
                    borderRadius: '12px',
                    fontSize: '1.1rem', // Increased font size
                    outline: 'none',
                    backgroundColor: 'white'
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
              <Col lg={3} md={6} className="mb-4"> {/* Increased margin */}
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    outline: 'none',
                    backgroundColor: 'white'
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
                    padding: '16px 20px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    outline: 'none',
                    backgroundColor: 'white'
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
                    padding: '16px 20px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    outline: 'none',
                    backgroundColor: 'white'
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
                    padding: '16px 20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Clear Filters
                </button>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* RESULTS SECTION - IMPROVED SPACING */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        minHeight: '100vh'
      }}>
        <Container>
          {/* RESULTS HEADER */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '50px', // Increased margin
            flexWrap: 'wrap',
            gap: '30px' // Increased gap
          }}>
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#1e293b',
                marginBottom: '12px' // Increased margin
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
              </p>
            </div>
            
            {/* VIEW MODE TOGGLE */}
            <div style={{
              display: 'flex',
              background: 'white',
              borderRadius: '12px',
              padding: '6px', // Increased padding
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              border: '1px solid #f1f5f9'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '14px 24px', // Increased padding
                  border: 'none',
                  borderRadius: '10px',
                  background: viewMode === 'grid' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : '#64748b',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginRight: '6px' // Added margin between buttons
                }}
              >
                🔲 Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '14px 24px', // Increased padding
                  border: 'none',
                  borderRadius: '10px',
                  background: viewMode === 'list' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#64748b',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                📋 List
              </button>
            </div>
          </div>

          {/* PROPERTIES GRID/LIST - IMPROVED SPACING */}
          {filteredProperties.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏠</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: '12px'
              }}>No Properties Found</h3>
              <p style={{
                color: '#64748b',
                fontSize: '1rem',
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
                <Col lg={viewMode === 'grid' ? 4 : 12} md={viewMode === 'grid' ? 6 : 12} className="mb-5" key={property.id}> {/* Increased margin */}
                  <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #f1f5f9',
                    transition: 'all 0.3s ease',
                    height: viewMode === 'grid' ? '540px' : 'auto', // Increased height
                    display: viewMode === 'list' ? 'flex' : 'block',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                  }}>
                    {/* IMAGE */}
                    <div style={{
                      position: 'relative',
                      height: viewMode === 'grid' ? '250px' : '220px', // Increased height
                      width: viewMode === 'list' ? '320px' : '100%', // Increased width
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
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: property.gradient,
                        color: 'white',
                        padding: '8px 16px', // Increased padding
                        borderRadius: '12px',
                        fontSize: '0.8rem', // Increased font size
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}>
                        {property.status}
                      </div>
                    </div>
                    
                    {/* CONTENT - IMPROVED SPACING */}
                    <div style={{ 
                      padding: '32px', // Increased padding
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px', // Increased gap
                          color: '#64748b',
                          fontSize: '0.9rem', // Increased font size
                          marginBottom: '16px' // Increased margin
                        }}>
                          <span>📍</span>
                          {property.location}
                        </div>
                        
                        <h3 style={{
                          fontSize: '1.4rem', // Increased font size
                          fontWeight: 800,
                          color: '#1e293b',
                          marginBottom: '16px' // Increased margin
                        }}>{property.title}</h3>
                        
                        <div style={{
                          display: 'flex',
                          gap: '20px', // Increased gap
                          marginBottom: '24px', // Increased margin
                          fontSize: '0.85rem', // Increased font size
                          color: '#64748b',
                          flexWrap: 'wrap'
                        }}>
                          {property.bedrooms > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>🛏️</span>
                              {property.bedrooms} BHK
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>🚿</span>
                              {property.bathrooms} Bath
                            </div>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>📐</span>
                            {property.area.toLocaleString()} sq ft
                          </div>
                        </div>
                      </div>
                      
                      {/* IMPROVED BUTTON LAYOUT - LESS CONGESTED */}
                      <div style={{
                        paddingTop: '24px', // Increased padding
                        borderTop: '2px solid #f1f5f9'
                      }}>
                        {/* Price with more breathing room */}
                        <div style={{
                          fontSize: '1.6rem', // Increased size
                          fontWeight: 900,
                          color: '#10b981',
                          marginBottom: '20px' // Added significant margin
                        }}>
                          ₹{property.price.toLocaleString()}/{property.priceType}
                        </div>
                        
                        {/* Button row with better spacing */}
                        <div style={{ 
                          display: 'flex', 
                          gap: '16px', // Increased gap
                          justifyContent: 'space-between'
                        }}>
                          <button style={{
                            background: 'transparent',
                            border: '2px solid #e5e7eb',
                            color: '#64748b',
                            padding: '14px 20px', // Increased padding
                            borderRadius: '10px',
                            fontSize: '0.9rem', // Increased font size
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            flex: '1',
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
                            background: property.gradient,
                            border: 'none',
                            color: 'white',
                            padding: '14px 20px', // Increased padding
                            borderRadius: '10px',
                            fontSize: '0.9rem', // Increased font size
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            flex: '1',
                            maxWidth: '140px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                          }}>
                            Contact
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
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '18px 45px', // Increased padding
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}>
                Load More Properties
              </button>
            </div>
          )}
        </Container>
      </section>

      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          
          h2 {
            font-size: 2rem !important;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 2rem !important;
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
