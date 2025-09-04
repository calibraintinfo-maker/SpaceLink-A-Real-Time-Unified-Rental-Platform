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
    <>
      {/* CRITICAL: Fixed CSS to prevent overlapping and proper layout */}
      <style>
        {`
          /* Reset and base styles */
          *, *::before, *::after {
            box-sizing: border-box;
          }

          html, body, #root {
            height: 100%;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #0f172a;
            overflow-x: hidden;
          }

          /* CRITICAL: Proper layout structure to prevent footer overlap */
          .app-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            position: relative;
          }

          /* CRITICAL: Fixed navbar positioning */
          .app-navbar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 1050 !important; /* Highest priority - above everything */
            height: 80px !important;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) saturate(180%) !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
          }

          /* CRITICAL: Main content with proper spacing */
          .main-content {
            flex: 1 0 auto; /* Grow to fill space, don't shrink */
            padding-top: 80px; /* Space for fixed navbar */
            padding-bottom: 60px; /* Space for footer */
            background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
            min-height: calc(100vh - 80px); /* Minimum height minus navbar */
          }

          /* CRITICAL: Footer positioning to prevent overlap */
          .app-footer {
            flex-shrink: 0; /* Don't shrink */
            background: #ffffff !important; /* Light theme footer */
            border-top: 1px solid #e2e8f0 !important;
            z-index: 10 !important; /* Below navbar but above content */
            position: relative !important;
            margin-top: auto; /* Push to bottom */
          }

          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }

          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .app-navbar {
              height: 70px !important;
            }
            
            .main-content {
              padding-top: 70px !important;
            }
          }

          /* Loading states */
          .loading-spinner {
            display: inline-block;
            width: 32px;
            height: 32px;
            border: 3px solid #f3f4f6;
            border-top: 3px solid #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f5f9;
          }

          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }

          /* Focus styles for accessibility */
          *:focus-visible {
            outline: 2px solid #6366f1;
            outline-offset: 2px;
            border-radius: 4px;
          }

          /* Error handling styles */
          .error-boundary {
            padding: 40px;
            text-align: center;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            margin: 20px;
          }

          .error-boundary h2 {
            color: #dc2626;
            margin-bottom: 16px;
          }

          .error-boundary p {
            color: #991b1b;
          }
        `}
      </style>

      <AuthProvider>
        <Router>
          <div className="app-container">
            {/* Fixed Navbar - Highest Z-Index */}
            <div className="app-navbar">
              <Navbar />
            </div>

            {/* Main Content Area - Proper Spacing */}
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
                {/* 404 Error Route */}
                <Route 
                  path="*" 
                  element={
                    <div className="error-boundary">
                      <h2>Page Not Found</h2>
                      <p>The page you're looking for doesn't exist.</p>
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

            {/* Footer - Below Content */}
            <div className="app-footer">
              <Footer />
            </div>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
