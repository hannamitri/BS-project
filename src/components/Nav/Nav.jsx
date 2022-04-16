import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaPagelines } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Group, Avatar, Text, Menu, Button } from "@mantine/core";
import AvatarImage from "../../images/Login/login_image.jpg";
import { ExternalLink } from "tabler-icons-react";
import { getAll } from "../../api/api";
import supabase from "../../lib/supabase";
import { FiLogOut } from "react-icons/fi";
import "./Nav.scss";
import { Login } from "../../pages/Login/Login";
import Logo from "../../images/intranet.png";

export const Nav = () => {
  const [users, setUsers] = useState([]);
  const { user, loading } = useContext(UserContext);

  const getUsers = async () => {
    const data = await getAll();
    setUsers(data);
  };

  const userLoggedIn = users?.data?.find(
    (item) => item?.email === (user?.email || user?.user?.email)
  );

  const openModal = () => {
    document.body.classList.add("login__open");
  };

  const closeModal = () => {
    document.body.classList.remove("login__open");
  };

  const navigate = useNavigate();

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
    <>
      <nav className="nav__wrapper">
        <div className="nav__logo">
          <img src={Logo} alt="" />
        </div>

        {!user && (
          <button className="button" onClick={() => openModal()}>
            Login
          </button>
        )}

        {userLoggedIn ? (
          <div className="nav__user--account">
            <Group>
              <Menu
                placement="center"
                control={
                  <div className="nav__profile--letter">
                    {userLoggedIn?.user_name.split(" ")[0][0].toUpperCase()}
                  </div>
                }
              >
                <Menu.Item
                  onClick={() => navigate("/Signout")}
                  icon={<FiLogOut size={18} />}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </Group>
          </div>
        ) : (
          <div
            className="skeleton__box"
            style={{ width: "100px", height: "40px" }}
          ></div>
        )}
      </nav>
      <Login />
    </>
  );
};
