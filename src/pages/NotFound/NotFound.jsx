import Styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className={Styles.container}>
      <div>
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link to={"/"}>Return to the homepage</Link>
      </div>
    </main>
  );
};
