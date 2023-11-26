import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  const login = (userData) => {
    console.log(userData)
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Also remove user data from localStorage
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check for user data in localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      login(userData);
    }
    
    // Mark the loading process as complete
    setLoading(false);
  }, []);

  if (loading) {
    // Return a loading indicator or null during the initialization process
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
