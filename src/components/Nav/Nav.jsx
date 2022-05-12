import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Group, Menu, Modal, useMantineTheme } from "@mantine/core";
import { getAll, setProfile } from "../../api/api";
import { FiLogOut } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import "./Nav.scss";
import { Login } from "../../pages/Login/Login";
import Logo from "../../images/logo.png";
import { Skeleton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@mantine/core";
import { FaUserAlt } from "react-icons/fa";
import { useForm } from "@mantine/form";
import Message from "../UI/Message/Message";
import { IoIosCloseCircle, IoIosCheckbox } from "react-icons/io";

export const Nav = ({ loggedInUser }) => {
  const [users, setUsers] = useState([]);
  const { user, loading } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const [successStatus, setSuccessStatus] = useState(false);
  const theme = useMantineTheme();
  // const loggedInUser = JSON.parse(localStorage.getItem("userLogginIn"));

  const getUsers = async () => {
    const data = await getAll();
    setUsers(data);
  };

  // const userLoggedIn = users?.data?.find(
  //   (item) => item?.email === (user?.email || user?.user?.email)
  // );

  const openModal = () => {
    document.body.classList += " login__open";
  };

  const openSidebar = () => {
    document.body.classList.remove("sidebar__open");
    setSidebarOpen(false);
  };

  const closeSidebar = () => {
    document.body.classList += " sidebar__open";
    setSidebarOpen(true);
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userLogginIn");
    navigate("/");
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (file.size / 1024 > 1000) {
      setErrorStatus(true);
      setErrorMessage("Image size should be less than 1MB.");
    } else {
      setErrorStatus(false);
      const base64 = await convertBase64(file);
      console.log(base64);
      setProfileImage(base64);
    }
  };

  const trySubmit = async () => {
    const user = {
      profile: profileImage,
      user_id: loggedInUser?.user_id,
    };
    console.log(user);
    try {
      if (await setProfile(user)) {
        setProfileImage("");
        setSuccessStatus(true);
        setErrorStatus(false);
        document.getElementById("image__input--field").value = null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const form = useForm({
    initialValues: {
      category: "",
      name: "",
    },
  });

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
        <div className="nav__left">
          <div className="nav__burger">
            {sidebarOpen ? (
              <GiHamburgerMenu onClick={() => openSidebar()} />
            ) : (
              <GiHamburgerMenu onClick={() => closeSidebar()} />
              // <GrFormClose onClick={() => closeSidebar()} />
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
                    onClick={() => navigate("/account")}
                    icon={<FaUserAlt size={18} />}
                  >
                    Account
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => logout()}
                    icon={<FiLogOut size={18} />}
                  >
                    Logout
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => setViewProfile(true)}
                    icon={<IoIosAddCircleOutline size={18} />}
                  >
                    Upload Profile
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
      <Modal
        opened={viewProfile}
        onClose={() => setViewProfile(false)}
        size={650}
        overlayOpacity={0.85}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <div>
          {errorStatus && (
            <Message
              bgcolor="#f03e3e"
              title={errormessage}
              setStatus={setErrorStatus}
              NotificationIcon={IoIosCloseCircle}
            />
          )}
          {successStatus && (
            <Message
              bgcolor="#38b000"
              title="Profile Uploaded Successufully!!!"
              setStatus={setSuccessStatus}
              NotificationIcon={IoIosCheckbox}
            />
          )}
          <h1 className="profile__title"> Upload Profile Picture</h1>
          <form className="project__form" onSubmit={form.onSubmit(trySubmit)}>
            <input type="file"
              onChange={uploadImage}
              id="image__input--field"
            />
            <div className="profile__image">
              <img
                src={profileImage}
                alt=""
                className="user__profile" />
            </div>
            <button className="button" type="submit" style={{ marginTop: 15 }}>
              Save
            </button>
          </form>
        </div>
      </Modal>
      <Login />
    </>
  );
};
