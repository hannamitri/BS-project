import styles from "./Login.module.scss";
import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import supabase from "../../lib/supabase";
import { useForm } from '@mantine/form';
// import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import login_bg from '../../images/Login/login_image.jpg';

export const Login = () => {
  const { user, loading } = useContext(UserContext);
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
  }

  return (
    <div className={styles.container}>

      <div className={styles.login_wrapper}>


        <div className={styles.form}>
          <h2>Citizen Science</h2>
          <h1>Web Portal</h1>
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

        <div className={styles.image}>
          <img src={login_bg} alt="" />
        </div>

      </div>
    </div>
  );
};
