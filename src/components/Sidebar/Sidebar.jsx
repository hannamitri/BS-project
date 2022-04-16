import React, { useContext, useEffect, useState } from "react";
import { Accordion, Skeleton } from "@mantine/core";
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
    (item) => item?.email === (user?.email || user?.user?.email)
  );

  useEffect(() => {
    getUsers();
    console.log(userLoggedIn);
    if (loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <div className="sidebar__links">
          <Link to="/">
            <MdOutlineAssignment /> Projects
          </Link>
        </div>
        {user &&
          (userLoggedIn ? (
            <div className="sidebar__links">
              <Link to="/data-collected">
                <FiDatabase />
                Upload Data
              </Link>
            </div>
          ) : (
            <Skeleton animate={false} height={35} width="90%" mb="md" mx="auto" />
          ))}

        {user &&
          (userLoggedIn?.isAdmin ? (
            <>
              <div className="sidebar__links">
                <Link to="/add-user-project">
                  <AiOutlineUsergroupAdd />
                  Include Users
                </Link>
              </div>
            </>
          ) : (
            <Skeleton animate={false} height={35} width="90%" mb="md" mx="auto" />
          ))}

        {user &&
          (userLoggedIn?.isAdmin ? (
            <>
              <div className="sidebar__links">
                <Link to="/signup">
                  <AiOutlineUserAdd />
                  Create User
                </Link>
              </div>
              <div className="sidebar__links">
                <Link to="/admin-page">
                  <AiOutlineUserAdd />
                  Manage
                  <br />
                  Accounts
                </Link>
              </div>
              <div className="sidebar__links">
                <Link to="/manage-projects">
                  <AiOutlineUserAdd />
                  Manage
                  <br />
                  Projects
                </Link>
              </div>
            </>
          ) : (
            <>
              <Skeleton animate={false} height={35} width="90%" mb="md" mx="auto" />
              <Skeleton animate={false} height={35} width="90%" mb="md" mx="auto" />
              <Skeleton animate={false} height={35} width="90%" mb="md" mx="auto" />
            </>
          ))}

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
