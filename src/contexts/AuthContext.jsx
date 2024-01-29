import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  function Logout() {
    localStorage.removeItem('@gestora:token')
    window.location.href = '/login'
  }

  async function Login({ email, password }) {
    try {
      const response = await api.post('/auth', { email, password });
      const token = response.data.token; 
  
      localStorage.setItem('@gestora:token', token);
      alert('Autenticado(a) com sucesso!');
      window.location.href = '/';
    } catch (err) {
      return alert('ERRO AUTENTICAÇÃO: Verifique se as credenciais estão corretas!')
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  )
}