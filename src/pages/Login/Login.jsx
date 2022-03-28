import home from "./Login.module.scss";
import { useContext, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const ex = () => {
    setUser({ name: cool.current.value });
    navigate("/");
  };
  const cool = useRef();
  return (
    <main className={home.container}>
      <form>
        <fieldset>
          <label htmlFor="name"></label>
          <input type="text" ref={cool} />
          <button onClick={ex}>test</button>
        </fieldset>
      </form>
    </main>
  );
};
