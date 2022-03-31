import styles from "./Signup.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { insertUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";
export const Signup = () => {
  const navigate = useNavigate();

  const { userobj } = useContext(UserContext);

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const location = useRef();
  const professional = useRef();
  const phonenumber = useRef();



  const trySubmit = async (e) => {
    e.preventDefault();

    let { user, error } = await supabase.auth.signUp({
      email: email.current.value,
      password: password.current.value,
    });

    if (error) {
      throw error;
    }

    console.log("NAME:");
    console.log(e.target.name);
    console.log(e.target.name.value);

    const userOBJ = {
      Name: e.target.name.value,
      Email: e.target.email.value,
      Password: e.target.password.value,
      Location: e.target.location.value,
      isProfessional: e.target.cars.selectedIndex,
      pn: e.target.phonenum.value,
    };

    await insertUser(userOBJ)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
    navigate(-1);
  };

  return (
    <main className={styles.container}>
      <div>
        <h1>Signup here...</h1>
        <form onSubmit={trySubmit}>
          <fieldset>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" ref={name} autoFocus />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" ref={email} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                ref={password}
              />
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <input id="location" name="location" type="text" ref={location} />
            </div>
            <div>
              <label htmlFor="cars">Are you professional?</label>
              <select name="cars" id="cars" ref={professional}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div>
              <label htmlFor="phonenum">Phone number</label>
              <input
                type="phonenumber"
                name="phonenum"
                id="phonenum"
                ref={phonenumber}
              />
            </div>
            <button>Sign up</button>
          </fieldset>
        </form>
      </div>
    </main>
  );
};
