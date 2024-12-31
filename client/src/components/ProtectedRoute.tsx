import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { auth } from '../atom/useratom';


interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useRecoilValue(auth);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const ProtectedRoute2: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useRecoilValue(auth);

  return isAuthenticated ?  <Navigate to="/wallet" /> : children;
};

export default ProtectedRoute;
export {ProtectedRoute2};
