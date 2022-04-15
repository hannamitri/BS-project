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

export const Login = () => {
  const { user, loading, setUser } = useContext(UserContext);
  const [userNotFound, setUserNotFound] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Your password is at least 6 characters" }),
  });

  async function trySignin({ email, password }) {
    setUserNotFound(false);
    setLoadingState(true);

    let { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      setLoadingState(false);
      if (error.message !== "Invalid login credentials") {
        throw new Error(error.message);
      }
      setUserNotFound(true);
    }
    setLoadingState(false);
    if (user) {
      setUser(user);
      navigate("/");
    }
  }

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    schema: zodResolver(schema),
  });

  return (
    <div className="login__wrapper">
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
            <img src={LoginIllustration} alt="Illustration" width={500} />
          </div>
          <div>
            <Link to="/signup">Create an account</Link>
          </div>
        </div>
        <Box sx={{ maxWidth: 300 }} mx="auto" className="rightview">
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
                <Button type="submit">Login</Button>
              )}
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};
