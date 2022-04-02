import home from "./Home.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Projects from "../../components/Projects/Projects";
import Sidebar from "../../components/Sidebar/Sidebar";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
export const Home = () => {
  const { user, loading } = useContext(UserContext);
  if (user) {
    console.log(user);
  }
  return (
    <div className={home.container}>
      <Sidebar />
      <div className={home.content_wrapper}>
        <HomeHeader />
        <Projects />
      </div>
    </div>
  );
};
