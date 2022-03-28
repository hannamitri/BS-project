import home from "./Signup.module.scss";
import { useContext, useRef } from "react";
import { UserContext } from "../../context/UserContext";
export const Signup = () => {
  const { user, setUser } = useContext(UserContext);
  const cool = useRef();
  return (
    <main className={home.container}>
      <h1>Signup here...</h1>
    </main>
  );
};
