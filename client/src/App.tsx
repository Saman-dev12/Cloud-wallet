import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Wallet from './components/Wallet';
import ProtectedRoute, { ProtectedRoute2 } from './components/ProtectedRoute'; // Adjust the import path as needed

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={
            <ProtectedRoute2>
            <Login />
            </ProtectedRoute2>
            } />
          <Route path="/signup" element={<ProtectedRoute2>
            <Signup />
            </ProtectedRoute2>} />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<div className="text-center text-red-500 mt-10">404: Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
