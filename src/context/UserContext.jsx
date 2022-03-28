import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("userthing"));
    setUser(storage?.name ? storage : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("userthing", JSON.stringify(user));

    console.log(user);

    if (user === null) {
      localStorage.removeItem("userthing");
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
