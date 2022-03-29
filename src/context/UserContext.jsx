import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    setLoading(false);
  };

  const login = (user) => setUser(user);

  const properties = {
    user,
    setUser,
    login,
    logout,
    loading,
  };

  return (
    <UserContext.Provider value={properties}>{children}</UserContext.Provider>
  );
};
