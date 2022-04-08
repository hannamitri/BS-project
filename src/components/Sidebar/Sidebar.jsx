import React, { useContext, useEffect, useState } from "react";
import { Accordion } from "@mantine/core";
import "./Sidebar.scss";
import { FaPagelines } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAll } from "../../api/api";
import { UserContext } from "../../context/UserContext";
import { MdOutlineAssignment } from "react-icons/md";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const { user, loading } = useContext(UserContext);

  const getUsers = async () => {
    const data = await getAll();
    setUsers(data);
  };

  const userLoggedIn = users?.data?.find(
    (item) => item?.email === user?.email
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

  console.log(userLoggedIn?.isProfessional, userLoggedIn);
  console.log(users);

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <div className="sidebar__links">
          <Link to="/">
            <MdOutlineAssignment /> Projects
          </Link>
        </div>
        {user && (
          <div className="sidebar__links">
            <Link to="/data-collected">
              <FiDatabase />
              Upload Data
            </Link>
          </div>
        )}

        {userLoggedIn?.isProfessional ? (
          <>
            <div className="sidebar__links">
              <Link to="/add-user">
                <AiOutlineUserAdd />
                Create User
              </Link>
            </div>
            <div className="sidebar__links">
              <Link to="/add-user">
                <AiOutlineUsergroupAdd />
                Include Users
              </Link>
            </div>
          </>
        ) : null}

        <div className="sidebar__links">
          <Link to="/contact">
            <MdAlternateEmail />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
