import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Pagination, Alert, Spinner, Badge } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { api, handleApiError, categories } from '../utils/api';

const FindProperty = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    fromDate: searchParams.get('fromDate') || '',
    toDate: searchParams.get('toDate') || ''
  });

  useEffect(() => {
    fetchProperties();
  }, [pagination.page]);

  useEffect(() => {
    const newFilters = {
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      city: searchParams.get('city') || '',
      state: searchParams.get('state') || '',
      fromDate: searchParams.get('fromDate') || '',
      toDate: searchParams.get('toDate') || ''
    };
    
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [searchParams]);

  useEffect(() => {
    if (Object.values(filters).some(value => value !== '')) {
      fetchProperties();
    }
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const queryParams = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      };
      
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] === '') {
          delete queryParams[key];
        }
      });

      const response = await api.properties.getAll(queryParams);
      setProperties(response.data.properties);
      setPagination(response.data.pagination);
      setError('');
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    
    setFilters(newFilters);
    
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      }
    });
    setSearchParams(newSearchParams);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchProperties();
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      city: '',
      state: '',
      fromDate: '',
      toDate: ''
    };
    
    setFilters(clearedFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
    setSearchParams({});
  };

  const handlePageChange = (pageNumber) => {
    setPagination(prev => ({ ...prev, page: pageNumber }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Property Rentals': '🏠',
      'Commercial': '🏢',
      'Land': '🌾',
      'Parking': '🚗',
      'Event': '🎉'
    };
    return icons[category] || '🏠';
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  const styles = {
    // Main container with perfect dark background
    pageContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      paddingTop: '2rem',
      paddingBottom: '3rem'
    },

    // Hero section with better contrast
    heroSection: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '24px',
      padding: '3rem 2rem',
      marginBottom: '3rem',
      textAlign: 'center',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)'
    },

    heroTitle: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem'
    },

    heroSubtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1.1rem',
      marginBottom: '0'
    },

    // Category banner with better styling
    categoryBanner: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2rem',
      color: 'white',
      textAlign: 'center',
      boxShadow: '0 16px 40px rgba(59, 130, 246, 0.3)'
    },

    categoryTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },

    categoryDesc: {
      fontSize: '1rem',
      opacity: 0.9,
      marginBottom: '0'
    },

    // Main content layout
    contentContainer: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'flex-start',
      maxWidth: '1400px',
      margin: '0 auto'
    },

    // FIXED: Sidebar filters with proper contrast
    filterSidebar: {
      width: '350px',
      minWidth: '350px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '20px',
      padding: '0',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
      position: 'sticky',
      top: '2rem'
    },

    filterHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    filterTitle: {
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: '700',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    filterCount: {
      background: 'rgba(59, 130, 246, 0.2)',
      color: '#60a5fa',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '700',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },

    filterBody: {
      padding: '1.5rem'
    },

    filterGroup: {
      marginBottom: '1.5rem'
    },

    filterLabel: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.9rem',
      fontWeight: '600',
      marginBottom: '8px',
      display: 'block'
    },

    // FIXED: Perfect form inputs with high contrast
    filterInput: {
      background: '#1f2937', // Dark gray background
      border: '1px solid #4a5568', // Visible border
      borderRadius: '10px',
      padding: '12px 16px',
      color: '#e0e6f5', // Light text
      fontSize: '0.9rem',
      width: '100%',
      outline: 'none',
      transition: 'all 0.3s ease'
    },

    // FIXED: Perfect select dropdown with high contrast
    filterSelect: {
      background: '#1f2937', // Dark gray background  
      border: '1px solid #4a5568', // Visible border
      borderRadius: '10px',
      padding: '12px 16px',
      color: '#e0e6f5', // Light text
      fontSize: '0.9rem',
      width: '100%',
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },

    priceRow: {
      display: 'flex',
      gap: '10px'
    },

    filterButtons: {
      display: 'flex',
      gap: '10px',
      marginTop: '1rem'
    },

    applyButton: {
      flex: 1,
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      border: 'none',
      borderRadius: '10px',
      padding: '12px 20px',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },

    clearButton: {
      flex: 1,
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      padding: '12px 20px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },

    // Results section
    resultsSection: {
      flex: 1,
      minWidth: 0
    },

    resultsHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },

    resultsTitle: {
      color: 'white',
      fontSize: '1.8rem',
      fontWeight: '700',
      margin: '0'
    },

    resultsCount: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '1rem',
      margin: '0'
    },

    mobileFilterToggle: {
      display: 'none',
      background: 'rgba(59, 130, 246, 0.2)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '10px',
      padding: '10px 16px',
      color: '#60a5fa',
      fontSize: '0.9rem',
      fontWeight: '600'
    },

    // Properties grid
    propertiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem'
    },

    // Loading state
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem 2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },

    loadingSpinner: {
      marginBottom: '1rem'
    },

    loadingText: {
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: '500'
    },

    // Empty state
    emptyState: {
      textAlign: 'center',
      padding: '4rem 2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },

    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '1rem'
    },

    emptyTitle: {
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '0.5rem'
    },

    emptyText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '1rem',
      marginBottom: '2rem'
    },

    emptyButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      border: 'none',
      borderRadius: '10px',
      padding: '12px 24px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '600'
    },

    // Pagination
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '1.5rem'
    },

    // Error alert
    errorAlert: {
      background: 'rgba(239, 68, 68, 0.15)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '16px',
      color: '#fca5a5',
      padding: '16px 20px',
      marginBottom: '2rem'
    }
  };

  return (
    <>
      {/* FIXED: Enhanced CSS with perfect dark mode styling */}
      <style>
        {`
          /* FIXED: Perfect form input styling */
          .filter-input:focus, .filter-select:focus {
            border-color: #60a5fa !important;
            box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2) !important;
            background: #2d3748 !important;
          }
          
          .filter-input::placeholder {
            color: #9ca3af !important;
          }
          
          /* FIXED: Perfect dropdown styling */
          .filter-select option {
            background-color: #1f2937 !important;
            color: #e0e6f5 !important;
            padding: 8px !important;
          }
          
          .filter-select option:hover {
            background-color: #374151 !important;
          }
          
          .filter-select option:checked {
            background-color: #60a5fa !important;
            color: white !important;
          }
          
          /* Button hover effects */
          .apply-btn:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
            transform: translateY(-1px) !important;
          }
          
          .clear-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            color: white !important;
          }
          
          .mobile-filter-toggle:hover {
            background: rgba(59, 130, 246, 0.3) !important;
          }
          
          /* Perfect responsive design */
          @media (max-width: 768px) {
            .content-container {
              flex-direction: column !important;
            }
            
            .filter-sidebar {
              width: 100% !important;
              min-width: unset !important;
              position: static !important;
            }
            
            .mobile-filter-toggle {
              display: block !important;
            }
            
            .properties-grid {
              grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
              gap: 1.5rem !important;
            }
          }
          
          /* Perfect pagination styling */
          .pagination .page-link {
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: rgba(255, 255, 255, 0.8) !important;
            border-radius: 8px !important;
            margin: 0 2px !important;
            padding: 8px 12px !important;
          }
          
          .pagination .page-link:hover {
            background: rgba(59, 130, 246, 0.2) !important;
            color: #60a5fa !important;
            border-color: rgba(59, 130, 246, 0.3) !important;
          }
          
          .pagination .page-item.active .page-link {
            background: #3b82f6 !important;
            border-color: #3b82f6 !important;
            color: white !important;
          }
        `}
      </style>

      <div style={styles.pageContainer}>
        <Container>
          {/* Hero Section */}
          <div style={styles.heroSection}>
            <h1 style={styles.heroTitle}>Find Your Perfect Property</h1>
            <p style={styles.heroSubtitle}>
              Discover amazing properties tailored to your needs from our premium collection
            </p>
          </div>

          {/* Category Banner */}
          {filters.category && (
            <div style={styles.categoryBanner}>
              <h3 style={styles.categoryTitle}>
                <span>{getCategoryIcon(filters.category)}</span>
                <span>{filters.category}</span>
              </h3>
              <p style={styles.categoryDesc}>
                {filters.category === 'Property Rentals' && 'Apartments, Flats, Houses & More'}
                {filters.category === 'Commercial' && 'Offices, Shops, Warehouses & Business Spaces'}
                {filters.category === 'Land' && 'Agricultural & Commercial Plots'}
                {filters.category === 'Parking' && 'Car, Bike & Garage Spaces'}
                {filters.category === 'Event' && 'Banquet Halls, Gardens & Event Venues'}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={styles.errorAlert}>
              <strong>⚠️ Error:</strong> {error}
            </div>
          )}

          {/* Main Content */}
          <div style={styles.contentContainer} className="content-container">
            {/* FIXED: Filter Sidebar with perfect contrast */}
            <div style={styles.filterSidebar} className="filter-sidebar">
              <div style={styles.filterHeader}>
                <h5 style={styles.filterTitle}>
                  <span>🔍</span>
                  <span>Filters</span>
                </h5>
                {getActiveFilterCount() > 0 && (
                  <span style={styles.filterCount}>
                    {getActiveFilterCount()} active
                  </span>
                )}
              </div>

              <div style={styles.filterBody}>
                <Form onSubmit={handleFilterSubmit}>
                  <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>Category</label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      style={styles.filterSelect}
                      className="filter-select"
                    >
                      <option value="">All Categories</option>
                      {Object.keys(categories).map(category => (
                        <option key={category} value={category}>
                          {getCategoryIcon(category)} {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>Price Range</label>
                    <div style={styles.priceRow}>
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="Min Price"
                        style={styles.filterInput}
                        className="filter-input"
                      />
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Max Price"
                        style={styles.filterInput}
                        className="filter-input"
                      />
                    </div>
                  </div>

                  <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>📍 Location</label>
                    <input
                      type="text"
                      name="city"
                      value={filters.city}
                      onChange={handleFilterChange}
                      placeholder="City"
                      style={{ ...styles.filterInput, marginBottom: '10px' }}
                      className="filter-input"
                    />
                    <input
                      type="text"
                      name="state"
                      value={filters.state}
                      onChange={handleFilterChange}
                      placeholder="State"
                      style={styles.filterInput}
                      className="filter-input"
                    />
                  </div>

                  <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>📅 Availability</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={filters.fromDate}
                      onChange={handleFilterChange}
                      style={{ ...styles.filterInput, marginBottom: '10px' }}
                      className="filter-input"
                    />
                    <input
                      type="date"
                      name="toDate"
                      value={filters.toDate}
                      onChange={handleFilterChange}
                      style={styles.filterInput}
                      className="filter-input"
                    />
                  </div>

                  <div style={styles.filterButtons}>
                    <button
                      type="submit"
                      style={styles.applyButton}
                      className="apply-btn"
                    >
                      Apply Filters
                    </button>
                    <button
                      type="button"
                      onClick={clearFilters}
                      style={styles.clearButton}
                      className="clear-btn"
                    >
                      Clear All
                    </button>
                  </div>
                </Form>
              </div>
            </div>

            {/* Results Section */}
            <div style={styles.resultsSection}>
              {/* Results Header */}
              <div style={styles.resultsHeader}>
                <div>
                  <h2 style={styles.resultsTitle}>Properties</h2>
                  {pagination.total > 0 && (
                    <p style={styles.resultsCount}>
                      {pagination.total} properties found
                    </p>
                  )}
                </div>
                
                <button
                  style={styles.mobileFilterToggle}
                  className="mobile-filter-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  🔍 Filters ({getActiveFilterCount()})
                </button>
              </div>

              {/* Loading State */}
              {loading ? (
                <div style={styles.loadingContainer}>
                  <Spinner animation="border" style={styles.loadingSpinner} />
                  <p style={styles.loadingText}>Finding perfect properties...</p>
                </div>
              ) : (
                <>
                  {/* Properties Grid */}
                  {properties.length > 0 ? (
                    <>
                      <div style={styles.propertiesGrid} className="properties-grid">
                        {properties.map((property) => (
                          <PropertyCard key={property._id} property={property} showOwner={true} />
                        ))}
                      </div>

                      {/* Pagination */}
                      {pagination.pages > 1 && (
                        <div style={styles.paginationContainer}>
                          <Pagination>
                            <Pagination.First 
                              onClick={() => handlePageChange(1)}
                              disabled={pagination.page === 1}
                            />
                            <Pagination.Prev 
                              onClick={() => handlePageChange(pagination.page - 1)}
                              disabled={pagination.page === 1}
                            />
                            
                            {[...Array(pagination.pages)].map((_, index) => {
                              const pageNumber = index + 1;
                              if (
                                pageNumber === 1 ||
                                pageNumber === pagination.pages ||
                                (pageNumber >= pagination.page - 2 && pageNumber <= pagination.page + 2)
                              ) {
                                return (
                                  <Pagination.Item
                                    key={pageNumber}
                                    active={pageNumber === pagination.page}
                                    onClick={() => handlePageChange(pageNumber)}
                                  >
                                    {pageNumber}
                                  </Pagination.Item>
                                );
                              }
                              return null;
                            })}
                            
                            <Pagination.Next 
                              onClick={() => handlePageChange(pagination.page + 1)}
                              disabled={pagination.page === pagination.pages}
                            />
                            <Pagination.Last 
                              onClick={() => handlePageChange(pagination.pages)}
                              disabled={pagination.page === pagination.pages}
                            />
                          </Pagination>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Empty State */
                    <div style={styles.emptyState}>
                      <div style={styles.emptyIcon}>🏠</div>
                      <h4 style={styles.emptyTitle}>No Properties Found</h4>
                      <p style={styles.emptyText}>
                        We couldn't find any properties matching your criteria. Try adjusting your filters or search in a different area.
                      </p>
                      <button
                        onClick={clearFilters}
                        style={styles.emptyButton}
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default FindProperty;
