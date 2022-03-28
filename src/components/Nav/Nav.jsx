import nav from "./Nav.module.scss";
import { Link } from "react-router-dom";

import { FaPagelines } from "react-icons/fa";

import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

export const Nav = () => {
  const { user, setUser, logout, loading } = useContext(UserContext);

  console.log(user);

  useEffect(() => {
    console.log(user);
  }, [user]);
  if (loading) {
    return (
      <div>
        <h1>loading shit</h1>
      </div>
    );
  }

  return (
    <header>
      <nav>
        <h1>
          <FaPagelines />
          <p>Final Project</p>
        </h1>
        <ul>
          <li>
            <Link to={`/`}>Example</Link>
          </li>
          <li>
            <Link to={`/`}>Example</Link>
          </li>
          {user?.name == null ? (
            <>
              <li className={nav.button}>
                <Link to={`/signup`}>Sign up</Link>
              </li>
              <li className={nav.button}>
                <Link to={`/signin`}>Sign in</Link>
              </li>
            </>
          ) : (
            <>
              <li className={nav.button}>
                <Link to={`/`} onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
