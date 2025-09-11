import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { api, formatPrice, getImageUrl, handleApiError } from '../utils/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.properties.getById(id);
      setProperty(response.data || response);
    } catch (err) {
      setError('Failed to load property details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/800x400/f1f5f9/64748b?text=Property+Image';
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
      <div style={{ 
        minHeight: '50vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8fafc'
      }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: '#7c3aed', width: '2.5rem', height: '2.5rem' }} />
          <p className="mt-3" style={{ color: '#64748b', fontSize: '1rem' }}>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error Loading Property</Alert.Heading>
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
          <Alert.Heading>Property Not Found</Alert.Heading>
          <p>The property you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/find-property')} style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}>
            Back to Properties
          </Button>
        </Alert>
      </Container>
    );
  }

  const images = property.images || (property.image ? [property.image] : []);
  const currentImage = images[imageIndex] || '';

  return (
    <>
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          
          {/* ✅ PROFESSIONAL: Back Button */}
          <div className="mb-4">
            <Button
              variant="outline-primary"
              onClick={() => navigate('/find-property')}
              style={{
                backgroundColor: 'white',
                border: '2px solid #7c3aed',
                borderRadius: '12px',
                padding: '10px 20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#7c3aed',
                fontFamily: "'Inter', system-ui, sans-serif",
                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.1)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#7c3aed';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#7c3aed';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.1)';
              }}
            >
              <span style={{ fontSize: '1rem' }}>←</span>
              <span>Back to Properties</span>
            </Button>
          </div>

          <Row className="g-4">
            <Col lg={8}>
              
              {/* ✅ PROFESSIONAL: Image Gallery */}
              <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '350px', backgroundColor: '#f1f5f9' }}>
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
                          onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)}
                          style={{ 
                            borderRadius: '50%', 
                            width: '40px', 
                            height: '40px',
                            marginLeft: '10px',
                            border: 'none',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                            fontSize: '1.2rem'
                          }}
                        >
                          ‹
                        </Button>
                      </div>
                      <div className="position-absolute top-50 end-0 translate-middle-y">
                        <Button
                          variant="light"
                          onClick={() => setImageIndex((imageIndex + 1) % images.length)}
                          style={{ 
                            borderRadius: '50%', 
                            width: '40px', 
                            height: '40px',
                            marginRight: '10px',
                            border: 'none',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                            fontSize: '1.2rem'
                          }}
                        >
                          ›
                        </Button>
                      </div>
                      
                      <div className="position-absolute bottom-0 start-50 translate-middle-x p-3">
                        <div style={{
                          background: 'rgba(0, 0, 0, 0.7)',
                          borderRadius: '16px',
                          padding: '6px 12px',
                          color: 'white',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {imageIndex + 1} of {images.length}
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
                      fontSize: '0.75rem',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: '500'
                    }}
                  >
                    🏷️ {property.category || 'Land'}
                  </Badge>
                  <Badge 
                    bg="secondary" 
                    style={{ 
                      fontSize: '0.75rem',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: '500'
                    }}
                  >
                    📐 {property.subtype || 'Agricultural Land'}
                  </Badge>
                  <Badge 
                    bg="info" 
                    style={{ 
                      fontSize: '0.75rem',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: '500'
                    }}
                  >
                    🕒 {Array.isArray(property.rentType) ? property.rentType.join(', ') : (property.rentType || 'yearly')}
                  </Badge>
                </div>
              </div>

              {/* ✅ PROFESSIONAL: Title and Price */}
              <div className="mb-4">
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '8px',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  lineHeight: '1.2'
                }}>
                  {property.title || 'Premium Property'}
                </h1>
                
                <div className="d-flex align-items-center mb-3">
                  <span className="me-2" style={{ color: '#7c3aed', fontSize: '1rem' }}>📍</span>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: '500'
                  }}>
                    {property.address?.street && `${property.address.street}, `}
                    {property.address?.city || 'namakkal'}, {property.address?.state || 'Tamil nadu'} - {property.address?.zipCode || '123456'}
                  </span>
                </div>

                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#059669',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  marginBottom: '4px'
                }}>
                  {formatPrice(property.price, Array.isArray(property.rentType) ? property.rentType[0] : property.rentType)}
                </div>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  margin: 0,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: '500'
                }}>
                  Available for {Array.isArray(property.rentType) ? property.rentType.join(', ') : (property.rentType || 'yearly')} rental
                </p>
              </div>

              {/* ✅ PROFESSIONAL: Property Information */}
              <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
                <Card.Body style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#7c3aed' }}>📊</span>
                    Property Information
                  </h3>
                  
                  <Row className="g-3">
                    <Col md={6}>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '4px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '0.9rem', marginRight: '6px' }}>📐</span>
                          <span style={{
                            fontSize: '0.8rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Size
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {property.size || '10000'} sq ft
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '4px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '0.9rem', marginRight: '6px' }}>📞</span>
                          <span style={{
                            fontSize: '0.8rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Contact
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {property.contact || '9087654321'}
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '4px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '0.9rem', marginRight: '6px' }}>🏷️</span>
                          <span style={{
                            fontSize: '0.8rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Category
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {property.category || 'Land'}
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '4px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '0.9rem', marginRight: '6px' }}>🔧</span>
                          <span style={{
                            fontSize: '0.8rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Type
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {property.subtype || 'Agricultural Land'}
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '4px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '0.9rem', marginRight: '6px' }}>🕒</span>
                          <span style={{
                            fontSize: '0.8rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Rent Types
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#111827',
                          fontFamily: "'Inter', system-ui, sans-serif"
                        }}>
                          {Array.isArray(property.rentType) ? property.rentType.join(', ') : (property.rentType || 'yearly')}
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '4px'
                        }}>
                          <span style={{ color: '#7c3aed', fontSize: '0.9rem', marginRight: '6px' }}>📅</span>
                          <span style={{
                            fontSize: '0.8rem',
                            color: '#6b7280',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Added
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
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
              <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
                <Card.Body style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#7c3aed' }}>📝</span>
                    Description
                  </h3>
                  
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: '#374151',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: '400',
                    margin: 0
                  }}>
                    {property.description || 'This is a prime agricultural land located in a strategic location, perfect for farming and cultivation. The property offers excellent accessibility and is ideal for various agricultural activities.'}
                  </p>
                </Card.Body>
              </Card>

              {/* ✅ PROFESSIONAL: Property Owner */}
              <Card className="border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <Card.Body style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem',
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
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)'
                    }}>
                      <span style={{
                        color: 'white',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        fontFamily: "'Inter', system-ui, sans-serif"
                      }}>
                        {(property.owner?.name || 'BHARANEEDHARAN K').charAt(0)}
                      </span>
                    </div>
                    
                    <div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '2px',
                        fontFamily: "'Inter', system-ui, sans-serif"
                      }}>
                        {property.owner?.name || 'BHARANEEDHARAN K'}
                      </h4>
                      
                      <div className="d-flex align-items-center mb-1">
                        <span style={{ color: '#7c3aed', fontSize: '0.8rem', marginRight: '6px' }}>✉️</span>
                        <span style={{
                          fontSize: '0.85rem',
                          color: '#6b7280',
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: '500'
                        }}>
                          {property.owner?.email || 'bharaneedharan.cb22@bitsathy.ac.in'}
                        </span>
                      </div>
                      
                      <div className="d-flex align-items-center">
                        <span style={{ color: '#7c3aed', fontSize: '0.8rem', marginRight: '6px' }}>📞</span>
                        <span style={{
                          fontSize: '0.85rem',
                          color: '#6b7280',
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: '500'
                        }}>
                          {property.owner?.phone || property.contact || '9087654321'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

            </Col>

            {/* Right Column - Booking */}
            <Col lg={4}>
              
              {/* ✅ PROFESSIONAL: Booking Card */}
              <Card className="border-0 shadow-lg mb-4" style={{ 
                borderRadius: '16px',
                position: 'sticky',
                top: '20px'
              }}>
                <Card.Body style={{ padding: '1.5rem' }}>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem',
                    fontFamily: "'Inter', system-ui, sans-serif"
                  }}>
                    Book This Property
                  </h4>
                  
                  <div style={{
                    fontSize: '1.6rem',
                    fontWeight: '700',
                    color: '#059669',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    marginBottom: '4px'
                  }}>
                    {formatPrice(property.price, Array.isArray(property.rentType) ? property.rentType[0] : property.rentType)}
                  </div>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: '500'
                  }}>
                    Available for {Array.isArray(property.rentType) ? property.rentType.join(', ') : (property.rentType || 'yearly')} rental
                  </p>

                  <Button
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 20px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      width: '100%',
                      boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                      marginBottom: '1rem'
                    }}
                  >
                    📅 Book Now
                  </Button>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    color: '#6b7280',
                    fontSize: '0.8rem',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    marginBottom: '1rem'
                  }}>
                    <span>💳</span>
                    <span>Payment: On Spot Only</span>
                  </div>

                  {/* ✅ PROFESSIONAL: Features */}
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1'
                  }}>
                    <h5 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.75rem',
                      fontFamily: "'Inter', system-ui, sans-serif"
                    }}>
                      Property Features
                    </h5>
                    
                    <div className="feature-list">
                      {[
                        { icon: '🌾', text: 'Land Space' },
                        { icon: '📐', text: `${property.size || '10000'} Area` },
                        { icon: '🕒', text: `${Array.isArray(property.rentType) ? property.rentType.join(', ') : (property.rentType || 'yearly')} Rental` },
                        { icon: '📞', text: 'Direct Owner Contact' }
                      ].map((feature, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '8px'
                        }}>
                          <span style={{ fontSize: '1rem' }}>{feature.icon}</span>
                          <span style={{
                            fontSize: '0.85rem',
                            color: '#374151',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: '500'
                          }}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Alert variant="warning" className="mt-3" style={{ 
                    fontSize: '0.8rem',
                    padding: '0.75rem',
                    borderRadius: '8px'
                  }}>
                    ⚠️ Complete your profile before booking
                  </Alert>
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
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          background-color: #f8fafc !important;
        }
        
        .btn {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          transition: all 0.2s ease !important;
        }
        
        .btn:hover {
          transform: translateY(-1px);
        }
        
        .card {
          border: none !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
        }
        
        .feature-list {
          border-left: 3px solid #7c3aed;
          padding-left: 12px;
        }
        
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default PropertyDetails;
