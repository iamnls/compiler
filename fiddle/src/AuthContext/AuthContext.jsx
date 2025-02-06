import { createContext, useContext, useState, useEffect } from "react";

// Initialize the context
const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    role: null,
  });

  // On component mount, check localStorage for token and role
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setAuthState({
        isAuthenticated: true,
        role,
      });
    }
  }, []);

  const login = (role, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuthState({
      isAuthenticated: true,
      role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthState({
      isAuthenticated: false,
      role: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
