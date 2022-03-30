import home from "./Login.module.scss";
import { useContext, useRef, useState, useEffect } from "react";
import { getAll } from "../../api/api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";
export const Login = () => {
  const { user, loading, setUser } = useContext(UserContext);
  const [userNotFound, setUserNotFound] = useState(false);

  async function trySignin(event) {
    event.preventDefault();

    const [email, password] = [
      event.target.email.value,
      event.target.password.value,
    ];

    console.log(email, password);

    let { user, error } = await supabase.auth.signIn({
      email,
      password,
      isProfessional: false,
    });

    if (error) {
      if (error.message !== "Invalid login credentials") {
        throw new Error(error.message);
      }
      setUserNotFound(true);
    }
    setUser(user);
  }

  return (
    <main className={home.container}>
      <div>
        <h1>Signup here...</h1>
        <form onSubmit={trySignin}>
          <fieldset>
            <div>
              <label htmlFor="name">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div>
              <label htmlFor="name">Password</label>
              <input type="password" id="password" name="password" />
            </div>

            <button>Sign in</button>
          </fieldset>
          {userNotFound && <p>User not found</p>}
        </form>
      </div>
    </main>
  );
};
