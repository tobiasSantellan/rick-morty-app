import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setIsAuthenticated(true);
    navigate("/"); // Redirige al Home después de loguearse
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);
