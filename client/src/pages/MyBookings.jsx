import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookingCard from '../components/BookingCard';
import { api, handleApiError } from '../utils/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.bookings.getUserBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const getBookingsByStatus = (status) => {
    return bookings.filter(booking => booking.status === status);
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your bookings...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>📋 My Bookings</h2>
              <p className="text-muted mb-0">
                Manage and track all your property bookings
              </p>
            </div>
            <Button as={Link} to="/find-property" variant="primary">
              🔍 Find More Properties
            </Button>
          </div>

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {bookings.length === 0 ? (
            <Card className="text-center py-5">
              <Card.Body>
                <div className="mb-4">
                  <i className="bi bi-calendar-x" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                </div>
                <h4>No Bookings Yet</h4>
                <p className="text-muted mb-4">
                  You haven't made any bookings yet. Start exploring properties to make your first booking!
                </p>
                <Button as={Link} to="/find-property" variant="primary" size="lg">
                  🔍 Browse Properties
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <>
              {/* Active Bookings */}
              {getBookingsByStatus('active').length > 0 && (
                <div className="mb-5">
                  <h4 className="mb-3">
                    🟢 Active Bookings ({getBookingsByStatus('active').length})
                  </h4>
                  {getBookingsByStatus('active').map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))}
                </div>
              )}

              {/* Expired Bookings */}
              {getBookingsByStatus('expired').length > 0 && (
                <div className="mb-5">
                  <h4 className="mb-3">
                    🔴 Expired Bookings ({getBookingsByStatus('expired').length})
                  </h4>
                  {getBookingsByStatus('expired').map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))}
                </div>
              )}

              {/* Cancelled Bookings */}
              {getBookingsByStatus('cancelled').length > 0 && (
                <div className="mb-5">
                  <h4 className="mb-3">
                    ⚫ Cancelled Bookings ({getBookingsByStatus('cancelled').length})
                  </h4>
                  {getBookingsByStatus('cancelled').map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))}
                </div>
              )}

              {/* Booking Summary */}
              <Card className="mt-4">
                <Card.Header>
                  <h5 className="mb-0">📊 Booking Summary</h5>
                </Card.Header>
                <Card.Body>
                  <Row className="text-center">
                    <Col md={3}>
                      <div className="mb-2">
                        <h3 className="text-primary">{bookings.length}</h3>
                        <p className="text-muted mb-0">Total Bookings</p>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-2">
                        <h3 className="text-success">{getBookingsByStatus('active').length}</h3>
                        <p className="text-muted mb-0">Active</p>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-2">
                        <h3 className="text-danger">{getBookingsByStatus('expired').length}</h3>
                        <p className="text-muted mb-0">Expired</p>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-2">
                        <h3 className="text-secondary">{getBookingsByStatus('cancelled').length}</h3>
                        <p className="text-muted mb-0">Cancelled</p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyBookings;
