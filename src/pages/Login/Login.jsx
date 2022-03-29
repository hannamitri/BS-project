import home from "./Login.module.scss";
import { useContext, useRef, useState, useEffect } from "react";
import { getAll } from "../../api/api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    async function test() {
      const users = await getAll();
      setUsers(users?.data);
    }
    test();
  }, []);
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const trySignin = () => {
    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    const check = users.find((u) => u.email === user.email);
    if (check.password === user.password) {
      setUser(check);
      navigate("/");
    }
  };
  return (
    <main className={home.container}>
      <div>
        <h1>Signup here...</h1>
        <form onSubmit={trySignin}>
          <fieldset>
            <div>
              <label htmlFor="name">Email</label>
              <input type="email" ref={email} />
            </div>
            <div>
              <label htmlFor="name">Password</label>
              <input type="password" ref={password} />
            </div>

            <button>Sign in</button>
          </fieldset>
        </form>
      </div>
    </main>
  );
};
