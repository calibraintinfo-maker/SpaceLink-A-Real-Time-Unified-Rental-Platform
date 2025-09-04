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
      {/* CRITICAL: Global CSS to fix navbar overlap and provide professional layout */}
      <style>
        {`
          /* Reset and base styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #0f172a;
            overflow-x: hidden;
          }

          /* CRITICAL FIX: Prevent navbar overlap */
          .app-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          /* CRITICAL: Add top padding for fixed navbar */
          .main-content {
            flex: 1;
            padding-top: 80px; /* MUST match navbar height */
            background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
            min-height: calc(100vh - 80px);
          }

          /* Ensure navbar stays fixed and on top */
          .app-navbar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 1050 !important; /* Higher than Bootstrap modal */
            height: 80px !important;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) saturate(180%) !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
          }

          /* Footer styling */
          .app-footer {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            margin-top: auto;
          }

          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }

          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .main-content {
              padding-top: 70px !important; /* Smaller navbar on mobile */
            }
            
            .app-navbar {
              height: 70px !important;
            }
          }

          /* Page transitions */
          .page-fade-enter {
            opacity: 0;
            transform: translateY(10px);
          }

          .page-fade-enter-active {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
          }

          .page-fade-exit {
            opacity: 1;
            transform: translateY(0);
          }

          .page-fade-exit-active {
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
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

          /* Professional button resets */
          button, .btn {
            font-family: inherit;
            font-weight: 600;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Professional form inputs */
          input, select, textarea {
            font-family: inherit;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }

          input:focus, select:focus, textarea:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            border-color: #6366f1;
          }

          /* Professional link styling */
          a {
            color: #6366f1;
            text-decoration: none;
            transition: color 0.2s ease;
          }

          a:hover {
            color: #4f46e5;
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
            {/* Fixed Navbar */}
            <div className="app-navbar">
              <Navbar />
            </div>

            {/* Main Content Area with proper spacing */}
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
                        marginTop: '16px'
                      }}>
                        Go Home
                      </a>
                    </div>
                  } 
                />
              </Routes>
            </main>

            {/* Footer */}
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
