import home from "./Home.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
export const Home = () => {
  const { user } = useContext(UserContext);
  console.log("user:" + user);
  return (
    <main className={home.container}>
      <div>{user && <h1>Welcome {user.name}</h1>}</div>
    </main>
  );
};
