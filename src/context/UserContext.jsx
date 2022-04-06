import { createContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { isProfessional } from "../api/api";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getUser = () => supabase.auth.user();
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const supaUser = getUser();
    setUser(supaUser);

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") console.log("SIGNED_IN", session);
      if (event === "SIGNED_OUT") console.log("SIGNED_OUT", session);
      if (event === "TOKEN_REFRESHED") console.log("TOKEN_REFRESHED", session);
      if (event === "USER_UPDATED") console.log("USER_UPDATED", session);
      if (event === "USER_DELETED") console.log("USER_DELETED", session);
      if (event === "PASSWORD_RECOVERY")
        console.log("PASSWORD_RECOVERY", session);
      if (session) {
        setUser(session);
      } else {
        setUser(null);
      }
      navigate("/");
      setLoading(false);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    async function checkIfPro() {
      var data = await isProfessional(user);
      // console.log(data);
    }
    checkIfPro();
  }, [user]);

  let properties = {
    user,
    loading,
    setUser,
  };

  return (
    <UserContext.Provider value={properties}>{children}</UserContext.Provider>
  );
};
