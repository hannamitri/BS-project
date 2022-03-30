import nav from "./Nav.module.scss";
import { Link } from "react-router-dom";

import { FaPagelines } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const Nav = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
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
            <Link to={`/data-collected`}>Data upload</Link>
          </li>
          {user == null ? (
            <>
              <li className={nav.button}>
                <Link to="/signup">Sign up</Link>
              </li>
              <li className={nav.button}>
                <Link to="/signin">Sign in</Link>
              </li>
            </>
          ) : (
            <>
              <li className={nav.button}>
                <Link to={`/signout`}>Logout</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
