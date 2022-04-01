import nav from "./Nav.module.scss";
import { Link } from "react-router-dom";

import { FaPagelines } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  UnstyledButtonProps,
} from "@mantine/core";
import AvatarImage from "../../images/Login/login_image.jpg";
import { ExternalLink } from "tabler-icons-react";

export const Nav = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <nav className={nav.container}>
      <h1>
        <FaPagelines />
        <p>Final Project</p>
      </h1>
      <ul>
        <li>
          <Link to={`/`}>Example</Link>
        </li>
        <li>
          <Link to={`/data-collected`}>Data upload</Link>
        </li>
        {user == null ? (
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
      <div></div>

      <div className={nav.user_account}>
        <Group>
          <Avatar src={AvatarImage} radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Hanna
            </Text>

            <Text color="dimmed" size="xs">
              hannamitri@gmail.com
            </Text>
          </div>

          {/* {icon || <ChevronRight size={16} />} */}
        </Group>

        <Group position="center">
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
        </Group>
      </div>
    </nav>
  );
};
