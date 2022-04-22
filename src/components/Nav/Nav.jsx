import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Group, Menu } from "@mantine/core";
import { getAll } from "../../api/api";
import { FiLogOut } from "react-icons/fi";
import "./Nav.scss";
import { Login } from "../../pages/Login/Login";
import Logo from "../../images/intranet.png";
import { Skeleton } from "@mantine/core";
import supabase from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";

export const Nav = ({ loggedInUser }) => {
  const [users, setUsers] = useState([]);
  const { user, loading } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const loggedInUser = JSON.parse(localStorage.getItem("userLogginIn"));

  const getUsers = async () => {
    const data = await getAll();
    setUsers(data);
  };

  // const userLoggedIn = users?.data?.find(
  //   (item) => item?.email === (user?.email || user?.user?.email)
  // );

  const openModal = () => {
    document.body.classList.add(" modal__open");
  };

  const openSidebar = () => {
    document.body.classList.remove("sidebar__open");
    setSidebarOpen(false);
  };

  const closeSidebar = () => {
    document.body.classList += " sidebar__open";
    setSidebarOpen(true);
  };

  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("userLogginIn");
    nav("/");
  };

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

  console.log(user);

  return (
    <>
      <nav className="nav__wrapper">
        <div className="nav__left">
          <div className="nav__burger">
            {sidebarOpen ? (
              <GiHamburgerMenu onClick={() => openSidebar()} />
            ) : (
              <GrFormClose onClick={() => closeSidebar()} />
            )}
          </div>
          <div className="nav__logo">
            <img src={Logo} alt="" />
          </div>
        </div>

        {!loggedInUser && (
          <button className="button" onClick={() => openModal()}>
            Login
          </button>
        )}

        {loggedInUser &&
          (loggedInUser ? (
            <div className="nav__user--account">
              <Group>
                <Menu
                  placement="center"
                  control={
                    <div className="nav__profile--letter">
                      {loggedInUser?.user_name.split(" ")[0][0].toUpperCase()}
                    </div>
                  }
                >
                  <Menu.Item
                    onClick={() => logout()}
                    icon={<FiLogOut size={18} />}
                  >
                    Logout
                  </Menu.Item>
                </Menu>
              </Group>
            </div>
          ) : (
            <div className="nav__skeleton">
              <Skeleton animate={false} height={50} width="100px" />
              <Skeleton animate={false} height={50} circle />
            </div>
          ))}
      </nav>
      <Login />
    </>
  );
};
