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

  const nav = useNavigate();
  const logout = () => {
    supabase.auth.signOut();
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
        <div className="nav__logo">
          <img src={Logo} alt="" />
        </div>

        {!user && (
          <button className="button" onClick={() => openModal()}>
            Login
          </button>
        )}

        {user &&
          (userLoggedIn ? (
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
