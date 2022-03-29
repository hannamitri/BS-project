import styles from "./Signup.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getAll } from "../../api/api";
import { insertUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
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

  useEffect(() => {
    console.log(users);
  }, [users]);

  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const location = useRef();
  const professional = useRef();
  const phonenumber = useRef();
  const trySubmit = async (e) => {
    e.preventDefault();
    const user = {
      Name: name.current.value,
      Email: email.current.value,
      Password: password.current.value,
      Location: location.current.value,
      isProfessional: professional.current.options.selectedIndex,
      pn: phonenumber.current.value,
    };
    const check = users?.find((u) => u.email === user.Email);
    if (check) {
      alert("Email already exists");
    } else {
      insertUser(user)
        .then((th) => console.log(th))
        .catch((err) => console.log(err));
      navigate("/");
    }
  };
  return (
    <main className={styles.container}>
      <div>
        <h1>Signup here...</h1>
        <form onSubmit={trySubmit}>
          <fieldset>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" ref={name} autoFocus />
            </div>
            <div>
              <label htmlFor="name">Email</label>
              <input type="email" ref={email} />
            </div>
            <div>
              <label htmlFor="name">Password</label>
              <input type="password" ref={password} />
            </div>
            <div>
              <label htmlFor="name">Location</label>
              <input type="text" ref={location} />
            </div>
            <div>
              <label htmlFor="name">Are you professional?</label>
              <select name="cars" ref={professional} id="">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div>
              <label htmlFor="name">Phone number</label>
              <input type="phonenumber" ref={phonenumber} />
            </div>
            <button>Sign up</button>
          </fieldset>
        </form>
      </div>
    </main>
  );
};
