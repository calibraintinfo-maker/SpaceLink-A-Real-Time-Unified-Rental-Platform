import React, { useState, useEffect, useRef } from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatPrice, getImageUrl } from '../utils/api';

const PropertyCard = ({ property, showOwner = false, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();

  // Get images array
  const images = property.images && property.images.length > 0 
    ? property.images 
    : [property.image];

  const residentialTypes = ["Villa", "Apartment", "House", "Studio", "Flat"];

  // ✅ SCROLL ANIMATION
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ✅ IMAGE CAROUSEL ON HOVER
  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setImageIndex(prev => (prev + 1) % images.length);
      }, 2000);
    } else {
      setImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const renderPropertyDetails = () => {
    const details = [];

    if (property.subtype && residentialTypes.includes(property.subtype)) {
      if (property.bedrooms > 0) {
        details.push(
          <Badge key="bedrooms" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.7rem' }}>
            🛏 {property.bedrooms} BHK
          </Badge>
        );
      }
      if (property.bathrooms > 0) {
        details.push(
          <Badge key="bathrooms" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.7rem' }}>
            🚿 {property.bathrooms} Bath
          </Badge>
        );
      }
    }

    if (property.size) {
      details.push(
        <Badge key="area" bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.7rem' }}>
          📐 {property.size}
        </Badge>
      );
    }

    return details;
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x240/e2e8f0/64748b?text=Property+Image';
  };

  // ✅ LIST VIEW LAYOUT
  if (viewMode === 'list') {
    return (
      <div
        ref={cardRef}
        className={`property-card-wrapper ${isVisible ? 'fade-in-up' : ''}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          animationDelay: '0.1s'
        }}
      >
        <Card
          style={{
            border: 'none',
            borderRadius: '20px',
            background: '#ffffff',
            boxShadow: isHovered 
              ? '0 25px 50px rgba(124, 58, 237, 0.15)' 
              : '0 8px 25px rgba(0,0,0,0.08)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            transform: isHovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
            overflow: 'hidden'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Row className="g-0 align-items-center">
            <Col md={4}>
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                {/* Image Carousel */}
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(img)}
                    alt={`${property.title} - ${idx + 1}`}
                    onError={handleImageError}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '20px 0 0 20px',
                      opacity: idx === imageIndex ? 1 : 0,
                      transition: 'all 0.5s ease-in-out',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                ))}

                {/* Professional Badges */}
                <div className="position-absolute top-0 start-0 p-3">
                  <Badge
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      borderRadius: '20px',
                      padding: '6px 12px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      marginRight: '8px',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    ✓ Available
                  </Badge>
                  <Badge
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      color: 'white',
                      borderRadius: '20px',
                      padding: '6px 12px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                    }}
                  >
                    🏆 Verified
                  </Badge>
                </div>

                {/* Image Indicators */}
                {images.length > 1 && (
                  <div className="position-absolute bottom-0 start-0 end-0 p-3">
                    <div className="d-flex justify-content-center gap-1">
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: idx === imageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Col>

            <Col md={8}>
              <Card.Body className="p-4" style={{ minHeight: '240px', display: 'flex', flexDirection: 'column' }}>
                {/* Location */}
                <div className="d-flex align-items-center mb-3">
                  <span className="me-2" style={{ color: '#7c3aed', fontSize: '1rem' }}>📍</span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: '#6b7280',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {property.address?.city || 'City'}, {property.address?.state || 'State'}
                  </span>
                </div>

                {/* ✅ PROFESSIONAL TITLE */}
                <Card.Title
                  style={{
                    color: '#1f2937',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    marginBottom: '12px',
                    lineHeight: '1.3',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '-0.01em'
                  }}
                >
                  {property.title}
                </Card.Title>

                {/* ✅ PROFESSIONAL DESCRIPTION */}
                <p
                  className="mb-3"
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: '#4b5563',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    flex: 1
                  }}
                >
                  {property.description
                    ? property.description.substring(0, 140) + '...'
                    : 'Premium property with modern amenities and excellent location.'}
                </p>

                {/* Property Details */}
                <div className="mb-3">
                  <div className="d-flex flex-wrap gap-1">{renderPropertyDetails()}</div>
                </div>

                {/* Price & Actions */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div>
                    <div
                      style={{
                        fontSize: '1.6rem',
                        fontWeight: 800,
                        color: '#059669',
                        marginBottom: '4px',
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      {formatPrice(property.price, Array.isArray(property.rentType) ? property.rentType[0] : property.rentType || 'monthly')}
                    </div>
                    <small
                      style={{
                        color: '#6b7280',
                        fontSize: '0.8rem',
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      Available for rental
                    </small>
                  </div>

                  <div className="d-flex gap-2">
                    <Link 
                      to={`/property/${property._id}`}
                      style={{
                        textDecoration: 'none'
                      }}
                    >
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={{
                          borderRadius: '8px',
                          border: '2px solid #7c3aed',
                          color: '#7c3aed',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          padding: '8px 16px',
                          transition: 'all 0.3s ease',
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                        View Details
                      </Button>
                    </Link>
                    <Link 
                      to={`/book/${property._id}`}
                      style={{
                        textDecoration: 'none'
                      }}
                    >
                      <Button
                        size="sm"
                        style={{
                          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          padding: '8px 16px',
                          transition: 'all 0.3s ease',
                          fontFamily: "'Inter', sans-serif",
                          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                        }}
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }

  // ✅ GRID VIEW LAYOUT
  return (
    <div
      ref={cardRef}
      className={`property-card-wrapper ${isVisible ? 'fade-in-up' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Card
        style={{
          border: 'none',
          borderRadius: '20px',
          background: '#ffffff',
          boxShadow: isHovered 
            ? '0 25px 50px rgba(124, 58, 237, 0.15)' 
            : '0 8px 25px rgba(0,0,0,0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
          {/* Image Carousel */}
          {images.map((img, idx) => (
            <img
              key={idx}
              src={getImageUrl(img)}
              alt={`${property.title} - ${idx + 1}`}
              onError={handleImageError}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px 20px 0 0',
                opacity: idx === imageIndex ? 1 : 0,
                transition: 'all 0.5s ease-in-out',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)'
              }}
            />
          ))}

          {/* Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
              opacity: isHovered ? 0.7 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />

          {/* Professional Badges */}
          <div className="position-absolute top-0 start-0 p-3">
            <Badge
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginRight: '8px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
            >
              ✓ Available
            </Badge>
            <Badge
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: 'white',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
              }}
            >
              🏆 Verified
            </Badge>
          </div>

          {/* Heart Icon */}
          <div className="position-absolute top-0 end-0 p-3">
            <div
              style={{
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <span style={{ fontSize: '16px', color: '#ef4444' }}>🤍</span>
            </div>
          </div>

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="position-absolute bottom-0 start-0 end-0 p-3">
              <div className="d-flex justify-content-center gap-1">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: idx === imageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <Card.Body className="p-4 d-flex flex-column" style={{ flex: 1 }}>
          {/* Location */}
          <div className="d-flex align-items-center mb-3">
            <span className="me-2" style={{ color: '#7c3aed', fontSize: '1rem' }}>📍</span>
            <span
              style={{
                fontSize: '0.85rem',
                color: '#6b7280',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {property.address?.city || 'City'}, {property.address?.state || 'State'}
            </span>
          </div>

          {/* ✅ PROFESSIONAL TITLE */}
          <Card.Title
            style={{
              color: '#1f2937',
              fontSize: '1.4rem',
              fontWeight: 800,
              marginBottom: '12px',
              lineHeight: '1.3',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.01em'
            }}
          >
            {property.title}
          </Card.Title>

          {/* ✅ PROFESSIONAL DESCRIPTION */}
          <p
            className="mb-3"
            style={{
              fontSize: '0.9rem',
              lineHeight: '1.6',
              color: '#4b5563',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              flex: 1
            }}
          >
            {property.description
              ? property.description.substring(0, 100) + '...'
              : 'Premium property with modern amenities and excellent location.'}
          </p>

          {/* Property Details */}
          <div className="mb-3">
            <div className="d-flex flex-wrap gap-1">{renderPropertyDetails()}</div>
          </div>

          {/* ✅ PROFESSIONAL PRICE & ACTIONS */}
          <div className="mt-auto">
            <Row className="align-items-end">
              <Col xs={6}>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#059669',
                    marginBottom: '4px',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {formatPrice(property.price, Array.isArray(property.rentType) ? property.rentType[0] : property.rentType || 'monthly')}
                </div>
                <small
                  style={{
                    color: '#6b7280',
                    fontSize: '0.75rem',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  Available for rental
                </small>
              </Col>
              <Col xs={6} className="text-end">
                <div className="d-flex flex-column gap-2">
                  <Link 
                    to={`/property/${property._id}`}
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <Button
                      variant="outline-primary"
                      size="sm"
                      style={{
                        borderRadius: '8px',
                        border: '2px solid #7c3aed',
                        color: '#7c3aed',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        padding: '6px 12px',
                        width: '100%',
                        transition: 'all 0.3s ease',
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      View Details
                    </Button>
                  </Link>
                  <Link 
                    to={`/book/${property._id}`}
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <Button
                      size="sm"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        padding: '6px 12px',
                        width: '100%',
                        transition: 'all 0.3s ease',
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                      }}
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>

        {/* ✅ PROFESSIONAL CSS */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }

          .btn-outline-primary:hover {
            background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important;
            color: white !important;
            border-color: transparent !important;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
          }

          .btn:not(.btn-outline-primary):hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 12px 25px rgba(124, 58, 237, 0.4);
          }
        `}</style>
      </Card>
    </div>
  );
};

export default PropertyCard;
