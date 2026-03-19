import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext(null);

const MOCK_USERS = [
  { email: 'user@test.com', password: '1234', role: 'user', name: 'Alex Johnson' },
  { email: 'admin@test.com', password: 'admin123', role: 'admin', name: 'Admin User' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = useCallback(async (email, password, expectedRole) => {
    setLoading(true);
    setError('');

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password && u.role === expectedRole
    );

    setLoading(false);

    if (found) {
      setUser(found);
      return { success: true, role: found.role };
    }

    setError('Invalid credentials. Please try again.');
    return { success: false };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
