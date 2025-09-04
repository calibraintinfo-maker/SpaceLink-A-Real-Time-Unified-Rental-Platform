import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FindProperty from './pages/FindProperty';
import PropertyDetails from './pages/PropertyDetails';
import BookProperty from './pages/BookProperty';
import MyBookings from './pages/MyBookings';
import AddProperty from './pages/AddProperty';
import ManageProperties from './pages/ManageProperties';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          {/* Fixed Navbar */}
          <Navbar />
          
          {/* Main Content Area */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/find-property" element={<FindProperty />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route 
                path="/book/:propertyId" 
                element={
                  <ProtectedRoute>
                    <BookProperty />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-bookings" 
                element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/add-property" 
                element={
                  <ProtectedRoute>
                    <AddProperty />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/manage-properties" 
                element={
                  <ProtectedRoute>
                    <ManageProperties />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="*" 
                element={
                  <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    margin: '20px'
                  }}>
                    <h2 style={{ color: '#dc2626', marginBottom: '16px' }}>Page Not Found</h2>
                    <p style={{ color: '#991b1b' }}>The page you're looking for doesn't exist.</p>
                    <a href="/" style={{ 
                      background: '#6366f1', 
                      color: 'white', 
                      padding: '12px 24px', 
                      borderRadius: '8px',
                      display: 'inline-block',
                      marginTop: '16px',
                      textDecoration: 'none'
                    }}>
                      Go Home
                    </a>
                  </div>
                } 
              />
            </Routes>
          </main>
          
          {/* Footer - Naturally positioned at bottom */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
