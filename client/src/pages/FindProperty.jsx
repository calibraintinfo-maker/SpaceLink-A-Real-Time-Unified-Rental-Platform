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
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Sample property data - replace with API call
  const sampleProperties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Modern Villa',
      location: 'Namakkal, Tamil Nadu',
      price: 1234,
      priceType: 'month',
      features: ['4 BHK', '2,500 sq ft'],
      type: 'Villa',
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Premium Land',
      location: 'Namakkal, Tamil Nadu',
      price: 122345,
      priceType: 'year',
      features: ['Agricultural', '10,000 sq ft'],
      type: 'Land',
      bedrooms: 0,
      bathrooms: 0,
      area: 10000,
      status: 'For Sale',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Luxury Apartment',
      location: 'Chennai, Tamil Nadu',
      price: 2500,
      priceType: 'month',
      features: ['3 BHK', '1,800 sq ft'],
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      id: 5,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Commercial Space',
      location: 'Mumbai, Maharashtra',
      price: 5000,
      priceType: 'month',
      features: ['Commercial', '3,000 sq ft'],
      type: 'Commercial',
      bedrooms: 0,
      bathrooms: 2,
      area: 3000,
      status: 'For Rent',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  ];

  useEffect(() => {
    setProperties(sampleProperties);
    setFilteredProperties(sampleProperties);
  }, []);

  // Filter properties based on search and filters
  useEffect(() => {
    let filtered = properties;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(property =>
        property.type === filters.propertyType
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property =>
        property.price >= min && property.price <= max
      );
    }

    // Bedrooms filter
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
              Discover thousands of verified properties across India
            </p>
          </div>

          {/* SEARCH BAR */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <Row>
              <Col lg={6} className="mb-3">
                <input
                  type="text"
                  placeholder="Search by location, property type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#f1f5f9'}
                />
              </Col>
              <Col lg={6} className="mb-3">
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">All Locations</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Namakkal">Namakkal</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col lg={3} md={6} className="mb-3">
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Property Type</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Studio">Studio</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                </select>
              </Col>
              <Col lg={3} md={6} className="mb-3">
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '10px',
                    fontSize: '1rem',
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
              <Col lg={3} md={6} className="mb-3">
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #f1f5f9',
                    borderRadius: '10px',
                    fontSize: '1rem',
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
              <Col lg={3} md={6} className="mb-3">
                <button
                  onClick={clearFilters}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
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

      {/* RESULTS SECTION */}
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
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#1e293b',
                marginBottom: '8px'
              }}>
                {filteredProperties.length} Properties Found
              </h2>
              <p style={{
                color: '#64748b',
                fontSize: '1.1rem'
              }}>
                {searchQuery && `Results for "${searchQuery}"`}
                {Object.values(filters).some(f => f) && ' with filters applied'}
              </p>
            </div>
            
            {/* VIEW MODE TOGGLE */}
            <div style={{
              display: 'flex',
              background: 'white',
              borderRadius: '10px',
              padding: '4px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
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
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
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
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                📋 List
              </button>
            </div>
          </div>

          {/* PROPERTIES GRID/LIST */}
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
                <Col lg={viewMode === 'grid' ? 4 : 12} md={viewMode === 'grid' ? 6 : 12} className="mb-4" key={property.id}>
                  <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #f1f5f9',
                    transition: 'all 0.3s ease',
                    height: viewMode === 'grid' ? '500px' : 'auto',
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
                      height: viewMode === 'grid' ? '240px' : '200px',
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
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: property.gradient,
                        color: 'white',
                        padding: '6px 14px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}>
                        {property.status}
                      </div>
                    </div>
                    
                    {/* CONTENT */}
                    <div style={{ 
                      padding: '24px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#64748b',
                          fontSize: '0.85rem',
                          marginBottom: '12px'
                        }}>
                          <span>📍</span>
                          {property.location}
                        </div>
                        
                        <h3 style={{
                          fontSize: '1.3rem',
                          fontWeight: 800,
                          color: '#1e293b',
                          marginBottom: '12px'
                        }}>{property.title}</h3>
                        
                        <div style={{
                          display: 'flex',
                          gap: '16px',
                          marginBottom: '16px',
                          fontSize: '0.8rem',
                          color: '#64748b',
                          flexWrap: 'wrap'
                        }}>
                          {property.bedrooms > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span>🛏️</span>
                              {property.bedrooms} BHK
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span>🚿</span>
                              {property.bathrooms} Bath
                            </div>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>📐</span>
                            {property.area.toLocaleString()} sq ft
                          </div>
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '16px',
                        borderTop: '1px solid #f1f5f9'
                      }}>
                        <div style={{
                          fontSize: '1.4rem',
                          fontWeight: 900,
                          color: '#10b981'
                        }}>
                          ₹{property.price.toLocaleString()}/{property.priceType}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={{
                            background: 'transparent',
                            border: '2px solid #e5e7eb',
                            color: '#64748b',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.color = '#667eea';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.color = '#64748b';
                          }}>
                            View Details
                          </button>
                          
                          <button style={{
                            background: property.gradient,
                            border: 'none',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.3s ease'
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
                padding: '16px 40px',
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
