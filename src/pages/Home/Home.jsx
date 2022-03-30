import home from "./Home.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
export const Home = () => {
  const { user, loading } = useContext(UserContext);
  if (user) {
    console.log(user);
  }
  return (
    <main className={home.container}>
      {user && (
        <div>
          <h1>Welcome {user.email}</h1>
        </div>
      )}
      <h1>hi</h1>
    </main>
  );
};
