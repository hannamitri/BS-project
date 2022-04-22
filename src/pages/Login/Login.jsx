import "./Login.scss";
import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import supabase from "../../lib/supabase";
import {
  TextInput,
  Notification,
  Button,
  Group,
  Box,
  PasswordInput,
  Loader,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Lock, X } from "tabler-icons-react";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { z } from "zod";
import LoginIllustration from "../../images/Login/wfh_1.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { getAll } from "../../api/api";

export const Login = ({ openModal, setOpenModal }) => {
  const { user, loading, setUser } = useContext(UserContext);
  const [userNotFound, setUserNotFound] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    const data = await getAll();
    setUsers(data);
  };

  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Your password is at least 6 characters" }),
  });

  async function trySignin({ email, password }) {
    const getSpecificUser = users?.data?.find((user) => user.email === email);
    console.log(getSpecificUser);
    setLoadingState(false);
    console.log(getSpecificUser.password === password);

    if (getSpecificUser.password === password) {
      navigate("/");
      localStorage.setItem("userLogginIn", JSON.stringify(getSpecificUser));
      document.body.classList.remove("login__open");
    }
  }

  const closeModal = () => {
    document.body.classList.remove("login__open");
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    schema: zodResolver(schema),
  });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={`login__wrapper ${openModal ? "showLogin" : ""}`}>
      <div className="login__content">
        <button className="login__close--button" onClick={() => closeModal()}>
          <FaTimes />
        </button>
        {userNotFound && (
          <Notification
            icon={<X size={18} />}
            color="red"
            title="Signin failed"
            styles={{
              root: {
                backgroundColor: "#FB5D64",
                position: "absolute",
                zIndex: 3,
                opacity: 0.95,
                top: 90,
              },
              title: { color: "228BE6", fontWeight: "bold" },
              description: { color: "white" },
              icon: { color: "white" },
              closeButton: { color: "white", ":hover": { color: "black" } },
            }}
            onClose={() => setUserNotFound(false)}
          >
            A user was not found!
          </Notification>
        )}
        <div className="mainContent">
          <div className="leftview">
            <div>
              <img src={LoginIllustration} alt="Illustration" width={600} />
            </div>
            <div>
              <Link to="/signup">Create an account</Link>
            </div>
          </div>
          <Box sx={{ maxWidth: 400 }} mx="auto" className="rightview">
            <h1>Log in</h1>
            <form onSubmit={form.onSubmit(trySignin)}>
              <TextInput
                required
                icon={<HiOutlineAtSymbol size={16} />}
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
                type="text"
              />
              <PasswordInput
                required
                label="Password"
                placeholder="your password"
                icon={<Lock size={16} />}
                {...form.getInputProps("password")}
              />

              <Group position="left" mt="md" style={{ position: "relative" }}>
                {loadingState ? (
                  <span className="loading">
                    <Loader />
                  </span>
                ) : (
                  <button type="submit" className="button">
                    Login
                  </button>
                )}
              </Group>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};
