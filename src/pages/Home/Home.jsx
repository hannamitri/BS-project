import "./Home.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Projects from "../../components/Projects/Projects";
import Sidebar from "../../components/Sidebar/Sidebar";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import { DateRangePicker } from "@mantine/dates";
export const Home = () => {
  const { user, loading } = useContext(UserContext);
  if (user) {
    console.log(user);
  }

  // const trySignUpping = async () => {
  //   let { user } = await supabase.auth.signUp({
  //     email: "tttest12@hotmail.com",
  //     password: "123456789",
  //   });

  //   console.log(user);
  // };
  // useEffect(() => {
  //   trySignUpping();
  // }, []);

  return (
    <div className="main__container">
      <div className="main__content--wrapper">
        <div className="content__wrapper">
          <HomeHeader />
          <Projects />
        </div>
      </div>
    </div>
  );
};
