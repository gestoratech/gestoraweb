import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function PrivateRoutes({ children }) {
  const token = localStorage.getItem('@gestora:token');

  return token !== null ? children : <Navigate to="/login"/> 
}