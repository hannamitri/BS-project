import React, { useContext, useEffect, useState } from "react";
import { Accordion } from "@mantine/core";
import sidebar from "./Sidebar.module.scss";
import { FaPagelines } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAll } from "../../api/api";
import { UserContext } from "../../context/UserContext";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const { user, loading } = useContext(UserContext);

  const getUsers = async () => {
    const data = await getAll();
    setUsers(data);
  };

  const userLoggedIn = users?.data?.find(
    (item) => item?.email === user?.user?.email
  );

  useEffect(() => {
    getUsers();

    if (loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
  }, []);

  return (
    <div className={sidebar.sidebar}>
      <div>
        <div>
          <Link to="/">Projects</Link>
        </div>
        <div>
          <Link to="/data-collected">Upload Data</Link>
        </div>
        <div>
          <Link to="/add-user">Create User</Link>
        </div>
        <div>
          <Link to="/add-user">Include User</Link>
        </div>
        <div>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
