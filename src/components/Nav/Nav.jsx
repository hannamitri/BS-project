import nav from "./Nav.module.scss";
import { Link } from "react-router-dom";
import { FaPagelines } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Group, Avatar, Text, Menu, Button } from "@mantine/core";
import AvatarImage from "../../images/Login/login_image.jpg";
import { ExternalLink } from "tabler-icons-react";
import { getAll } from "../../api/api";

export const Nav = () => {
  const [users, setUsers] = useState([]);
  const { user, loading } = useContext(UserContext);

  const getUsers = async () => {
    const data = await getAll();
    setUsers(data);
  };

  const userLoggedIn = users?.data?.find((item) => item?.email === user?.email);

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
  console.log(userLoggedIn?.isProfessional);

  return (
    <nav className={nav.container}>
      <h1>
        <FaPagelines />
        <p>Final Project</p>
      </h1>
      <ul>
        {!user ? (
          <>
            <li className={nav.button}>
              <Link to="/signup">Sign up</Link>
            </li>
            <li className={nav.button}>
              <Link to="/signin">Sign in</Link>
            </li>
          </>
        ) : (
          <>
            <li className={nav.button}>
              <Link to={`/signout`}>Logout</Link>
            </li>
          </>
        )}
      </ul>
      <div>EMAIL: {userLoggedIn?.email}</div>

      <div className={nav.user_account}>
        <Group>
          <div className={nav.profile_letter}>
            {userLoggedIn?.user_name[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {userLoggedIn?.user_name}
            </Text>

            <Text color="dimmed" size="xs">
              {userLoggedIn?.email}
            </Text>
          </div>

          {/* <Avatar src={AvatarImage} radius="xl" /> */}
        </Group>

        {/* <Group position="center">
          <Menu withArrow placement="center">
            <Menu.Item component="a" href="https://mantine.dev">
              Mantine website
            </Menu.Item>

            <Menu.Item
              icon={<ExternalLink size={14} />}
              component="a"
              href="https://mantine.dev"
              target="_blank"
            >
              External link
            </Menu.Item>
          </Menu>
        </Group> */}
      </div>
    </nav>
  );
};
