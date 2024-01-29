import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function AuthenticatedRoutes({ children }) {
  const token = localStorage.getItem('@gestora:token');

  return token !== null ? <Navigate to="/"/> : children; 
}