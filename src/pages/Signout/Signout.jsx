import React, { useEffect } from "react";

import supabase from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

export const Signout = () => {
  const nav = useNavigate();
  useEffect(() => {
    supabase.auth.signOut();
    nav("/");
  });
  return <div>Signout</div>;
};
