import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { api, handleApiError, formatPrice, getImageUrl } from '../utils/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.properties.getById(id);
      setProperty(response.data || response);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/800x400/e2e8f0/64748b?text=Property+Image';
  };

  const formatRentTypes = (rentTypes) => {
    if (!rentTypes) return 'rental';
    return Array.isArray(rentTypes) ? rentTypes.join(', ') : rentTypes;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: '#7c3aed', width: '3rem', height: '3rem' }} />
          <p className="mt-3 fs-5 fw-semibold" style={{ color: '#374151' }}>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>⚠️ Error Loading Property</Alert.Heading>
          <p>{error}</p>
          <Button onClick={fetchProperty} style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <Alert.Heading>🔍 Property Not Found</Alert.Heading>
          <p>The property you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/find-property')} style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}>
            Back to Properties
          </Button>
        </Alert>
      </Container>
    );
  }

  const images = property.images || [property.image] || [];
  const currentImage = images[currentImageIndex] || 'https://via.placeholder.com/800x400/e2e8f0/64748b?text=Property+Image';

  return (
    <>
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <Container className="py-4">
          
          {/* ✅ PROFESSIONAL: Enhanced Back Button */}
          <div className="mb-4">
            <Button
              variant="outline-primary"
              onClick={() => navigate('/find-property')}
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                border: '2px solid #7c3aed',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#7c3aed',
                fontFamily: "'Inter', system-ui, sans-serif",
                textTransform: 'none',
                letterSpacing: '0.025em',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.1)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)';
                e.target.style.color = 'white';
                e.target.style.borderColor = '#7c3aed';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)';
                e.target.style.color = '#7c3aed';
                e.target.style.borderColor = '#7c3aed';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.1)';
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>←</span>
              <span>Back to Properties</span>
            </Button>
          </div>

          <Row className="g-4">
            {/* Left Column - Property Details */}
            <Col lg={8}>
              
              {/* ✅ PROFESSIONAL: Image Gallery */}
              <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '400px', background: '#f1f5f9' }}>
                  <img
                    src={getImageUrl(currentImage)}
                    alt={property.title || 'Property'}
                    onError={handleImageError}
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {images.length > 1 && (
                    <>
                      <div className="position-absolute top-50 start-0 translate-middle-y">
                        <Button
                          variant="light"
                          onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                          style={{ 
                            borderRadius: '50%', 
                            width: '50px', 
                            height: '50px',
                            marginLeft: '10px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          ‹
                        </Button>
                      </div>
                      <div className="position-absolute top-50 end-0 translate-middle-y">
                        <Button
                          variant="light"
                          onClick={() => setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                          style={{ 
                            borderRadius: '50%', 
                            width: '50px', 
                            height: '50px',
                            marginRight: '10px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          ›
                        </Button>
                      </div>
                      
                      <div className="position-absolute bottom-0 start-50 translate-middle-x p-3">
                        <div style={{
                          background: 'rgba(0, 0, 0, 0.7)',
                          borderRadius: '20px',
                          padding: '8px 16px',
                          color: 'white',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          Image {currentImageIndex + 1} of {images.length}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>

              {/* ✅ PROFESSIONAL: Property Tags */}
              <div className="mb-4">
                <div className="d-flex flex-wrap gap-2">
                  <Badge 
                    bg="primary" 
                    style={{ 
                      fontSize: '0.85rem',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    🏷️ {property.category || 'Land'}
                  </Badge>
                  <Badge 
                    bg="secondary" 
                    style={{ 
                      fontSize: '0.85rem',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    📐 {property.subtype || 'Agricultural Land'}
                  </Badge>
                  <Badge 
                    bg="info" 
                    style={{ 
                      fontSize: '0.85rem',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    🕒 {formatRentTypes(property.rentType) || 'yearly'}
                  </Badge>
                </div>
              </div>

              {/* ✅ PROFESSIONAL: Property Title and Price */}
              <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <h1 style={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: '#111827',
                      marginBottom: '8px',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      letterSpacing: '-0.025em',
                      lineHeight: '1.2'
                    }}>
                      {property.title || 'Premium Property'}
                    </h1>
                    
                    <div className="d-flex align-items-center mb-3">
                      <span className="me-2" style={{ color: '#7c3aed', fontSize: '1.2rem' }}>📍</span>
                      <span style={{
                        fontSize: '1.1rem',
                        color: '#64748b',
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 500
                      }}>
                        {property.address?.street && `${property.address.street}, `}
                        {property.address?.city || 'namakkal'}, {property.address?.state || 'Tamil nadu'} - {property.address?.zipCode || '123456'}
                      </span>
                    </div>

                    <div style={{
                      fontSize: '2.2rem',
                      fontWeight: 800,
                      color: '#059669',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      letterSpacing: '-0.02em'
                    }}>
                      {formatPrice(property.price, Array.isArray(property.rentType) ? property.rentType[0] : property.rentType)}
                    </div>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.95rem',
                      marginTop: '4px',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 500
                    }}>
                      Available for {formatRentTypes(property.rentType)} rental
                    </p>
                  </div>
                </Card.Body>
              </Card>

              {/* ✅ PROFESSIONAL: Property Details Grid */}
              <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
                <Card.Body className="p-4">
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '24px',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#7c3aed' }}>📊</span>
                    Property Information
                  </h3>
                  
                  <Row className="g-4">
                    <Col md={6}>
                      <div className="detail-item">
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '1.1rem', marginRight: '8px' }}>📐</span>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Size
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {property.size || '10000'} sq ft
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div className="detail-item">
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '1.1rem', marginRight: '8px' }}>📞</span>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Contact
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {property.contact || '9087654321'}
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div className="detail-item">
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '1.1rem', marginRight: '8px' }}>🏷️</span>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Category
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {property.category || 'Land'}
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div className="detail-item">
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '1.1rem', marginRight: '8px' }}>🔧</span>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Type
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {property.subtype || 'Agricultural Land'}
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div className="detail-item">
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '1.1rem', marginRight: '8px' }}>🕒</span>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Rent Types
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {formatRentTypes(property.rentType) || 'yearly'}
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div className="detail-item">
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '1.1rem', marginRight: '8px' }}>📅</span>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Added
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {formatDate(property.createdAt || property.dateAdded) || 'August 12, 2025'}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* ✅ PROFESSIONAL: Description */}
              <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
                <Card.Body className="p-4">
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '16px',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#7c3aed' }}>📝</span>
                    Description
                  </h3>
                  
                  <p style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.7',
                    color: '#374151',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 400,
                    margin: 0
                  }}>
                    {property.description || 'This is a prime agricultural land located in a strategic location, perfect for farming and cultivation. The property offers excellent accessibility and is ideal for various agricultural activities.'}
                  </p>
                </Card.Body>
              </Card>

              {/* ✅ PROFESSIONAL: Property Owner */}
              <Card className="border-0 shadow-sm" style={{ borderRadius: '20px' }}>
                <Card.Body className="p-4">
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '20px',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#7c3aed' }}>👤</span>
                    Property Owner
                  </h3>
                  
                  <div className="d-flex align-items-center">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '16px',
                      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                    }}>
                      <span style={{
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        fontFamily: "'Inter', system-ui, sans-serif"
                      }}>
                        {(property.owner?.name || 'BHARANEEDHARAN K').charAt(0)}
                      </span>
                    </div>
                    
                    <div>
                      <h4 style={{
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        color: '#111827',
                        marginBottom: '4px',
                        fontFamily: "'Inter', system-ui, sans-serif"
                      }}>
                        {property.owner?.name || 'BHARANEEDHARAN K'}
                      </h4>
                      
                      <div className="d-flex align-items-center mb-2">
                        <span style={{ color: '#7c3aed', fontSize: '1rem', marginRight: '8px' }}>✉️</span>
                        <span style={{
                          fontSize: '0.95rem',
                          color: '#6b7280',
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: 500
                        }}>
                          {property.owner?.email || 'bharaneedharan.cb22@bitsathy.ac.in'}
                        </span>
                      </div>
                      
                      <div className="d-flex align-items-center">
                        <span style={{ color: '#7c3aed', fontSize: '1rem', marginRight: '8px' }}>📞</span>
                        <span style={{
                          fontSize: '0.95rem',
                          color: '#6b7280',
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: 500
                        }}>
                          {property.owner?.phone || property.contact || '9087654321'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

            </Col>

            {/* Right Column - Booking & Features */}
            <Col lg={4}>
              
              {/* ✅ PROFESSIONAL: Booking Card */}
              <Card className="border-0 shadow-lg mb-4" style={{ 
                borderRadius: '20px',
                position: 'sticky',
                top: '20px'
              }}>
                <Card.Body className="p-4">
                  <div className="text-center mb-3">
                    <Button
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px 24px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textTransform: 'uppercase',
                        letterSpacing: '0.025em',
                        width: '100%',
                        marginBottom: '16px',
                        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      📅 Book This Property
                    </Button>
                  </div>
                  
                  <div className="text-center mb-3">
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: '#059669',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      letterSpacing: '-0.02em'
                    }}>
                      {formatPrice(property.price, Array.isArray(property.rentType) ? property.rentType[0] : property.rentType)}
                    </div>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      margin: 0,
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 500
                    }}>
                      Available for {formatRentTypes(property.rentType)} rental
                    </p>
                  </div>

                  <Button
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px 24px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      fontFamily: "'Inter', system-ui, sans-serif",
                      textTransform: 'uppercase',
                      letterSpacing: '0.025em',
                      width: '100%',
                      boxShadow: '0 4px 16px rgba(5, 150, 105, 0.3)'
                    }}
                  >
                    🔄 Book Now
                  </Button>

                  <div className="text-center mt-3">
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: '#6b7280',
                      fontSize: '0.85rem',
                      fontFamily: "'Inter', system-ui, sans-serif"
                    }}>
                      <span>💳</span>
                      <span>Payment: On Spot Only</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* ✅ PROFESSIONAL: Property Features */}
              <Card className="border-0 shadow-sm" style={{ borderRadius: '20px' }}>
                <Card.Body className="p-4">
                  <h4 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '20px',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#7c3aed' }}>✨</span>
                    Property Features
                  </h4>
                  
                  <div className="feature-list">
                    {[
                      { icon: '🌾', text: 'Land Space' },
                      { icon: '📐', text: `${property.size || '10000'} Area` },
                      { icon: '🕒', text: `${formatRentTypes(property.rentType)} Rental` },
                      { icon: '📞', text: 'Direct Owner Contact' }
                    ].map((feature, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px',
                        padding: '8px 0'
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>{feature.icon}</span>
                        <span style={{
                          fontSize: '0.95rem',
                          color: '#374151',
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: 500
                        }}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 20%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>⚠️</span>
                    <span style={{
                      fontSize: '0.85rem',
                      color: '#92400e',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 500
                    }}>
                      Complete your profile before booking
                    </span>
                  </div>
                </Card.Body>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>

      {/* ✅ PROFESSIONAL: Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #f8fafc;
        }
        
        .detail-item {
          padding: 16px;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        
        .detail-item:hover {
          box-shadow: 0 4px 16px rgba(124, 58, 237, 0.1);
          transform: translateY(-2px);
        }
        
        .feature-list {
          border-left: 3px solid #7c3aed;
          padding-left: 16px;
        }
        
        .btn {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          transition: all 0.3s ease !important;
        }
        
        .btn:hover {
          transform: translateY(-2px);
        }
        
        .card {
          border: none !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
        }
        
        .card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
        }
      `}</style>
    </>
  );
};

export default PropertyDetails;
