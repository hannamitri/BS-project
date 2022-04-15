import "./Home.scss";
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
    <div className="main__container">
      <Sidebar />
      <div className="main__content--wrapper">
        <HomeHeader />
        <Projects />
      </div>
    </div>
  );
};
