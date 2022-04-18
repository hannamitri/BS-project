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

  // const [value, setValue] =
  //   useState <
  //   [Date | null, Date | null] >
  //   [new Date(2021, 11, 1), new Date(2021, 11, 5)];

  return (
    <div className="main__container">
      <Sidebar />
      <div className="main__content--wrapper">
        {/* <DateRangePicker
          label="Book hotel"
          placeholder="Pick dates range"
          value={value}
          onChange={setValue}
        /> */}
        <HomeHeader />
        <Projects />
      </div>
    </div>
  );
};
