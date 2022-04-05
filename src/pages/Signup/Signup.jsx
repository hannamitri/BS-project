import styles from "./Signup.module.scss";
import { useContext, useState, useMemo, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import supabase from "../../lib/supabase";
import { FaGlobeEurope, FaUserAlt } from "react-icons/fa";
import {
  TextInput,
  Loader,
  Button,
  Group,
  Box,
  PasswordInput,
  Select,
  Notification,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Lock, X } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { z } from "zod";
import { insertUser } from "../../api/api";
import { MdSettingsPhone } from "react-icons/md";
import LoginIllustration from "../../images/Login/wfh.svg";
import { Link } from "react-router-dom";
import countryList from "react-select-country-list";

export const Signup = () => {


  const { user, loading, setUser } = useContext(UserContext);
  const [userExists, setUserExists] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const schema = z.object({
    Email: z.string().email({ message: "Invalid email" }),
    Password: z
      .string()
      .min(6, { message: "Your password should have at least 6 characters" }),
    Name: z
      .string()
      .max(50, { message: "Name should be less than 50 characters" }),
    Location: z
      .string()
      .max(50, { message: "Location should be less than 50 characters" }),
    pn: z
      .string()
      .min(4, { message: "Phone number should be 4 digits or more" }),
  });

  const trySubmit = async ({ Password, Email, Name, Location, pn }) => {
    setUserExists(false);
    setLoadingState(true);
    console.log(Password);
    console.table([Password, Email, Name, Location, pn]);
    let { user, error } = await supabase.auth.signUp({
      email: Email,
      password: Password,
    });

    if (error) {
      if (error.message === "User already registered") {
        setUserExists(true);
        setLoadingState(false);
      } else {
        setLoadingState(false);
        throw new Error(error.message);
      }
    }
    setDisabled(true);

    let userOBJ = {
      Name,
      Email,
      Password,
      pn,
      isProfessional: 0,
      Location,
    };

    await insertUser(userOBJ)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
    if (user) {
      setUser(user);
      navigate("/");
    }
    setLoadingState(false);
  };

  const form = useForm({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      Location: "",
      pn: "",
    },
    schema: zodResolver(schema),
  });
  // selector
  const [disabled, setDisabled] = useState(false);
  const options = useMemo(() => {
    let data = countryList().getData();
    let changed = [];
    data.forEach(
      (thing) =>
        (changed = [...changed, { value: thing.label, label: thing.label }]),
    );
    return changed;
  }, []);
  const password = useRef();
  return (
    <main className={styles.container}>
      {userExists && (
        <Notification
          icon={<X size={18} />}
          color="red"
          title="Signup failed"
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
          onClose={() => setUserExists(false)}
        >
          A user with that email already exists!
        </Notification>
      )}
      <section className={styles.view}>
        <div className={styles.mainContent}>
          <article className={styles.leftview}>
            <img
              src={LoginIllustration}
              alt="Illustration"
              width={500}
              height={500}
            />
            <Link to="/signin">Already have an account? Sign in instead</Link>
          </article>
          <Box sx={{ maxWidth: 300 }} mx="auto" className={styles.rightview}>
            <h1>Sign up</h1>
            <form onSubmit={form.onSubmit(trySubmit)} disabled={disabled}>
              <TextInput
                required
                icon={<FaUserAlt size={16} />}
                label="Name"
                placeholder="Your name"
                {...form.getInputProps("Name")}
              />
              <TextInput
                required
                icon={<HiOutlineAtSymbol size={16} />}
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("Email")}
              />
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                icon={<Lock size={16} />}
                {...form.getInputProps("Password")}
              />
              <TextInput
                required
                label="Phone number"
                placeholder="Your phone number"
                type="number"
                icon={<MdSettingsPhone size={16} />}
                {...form.getInputProps("pn")}
              />
              <Select
                data={options}
                label="Country"
                required
                icon={<FaGlobeEurope size={16} />}
                placeholder={"Select a country"}
                {...form.getInputProps("Location")}
              />

              <Group position="left" mt="md" style={{ position: "relative" }}>
                {loadingState ? (
                  <span className={styles.loading}>
                    <Loader />
                  </span>
                ) : (
                  <Button type="submit">Login</Button>
                )}
              </Group>
              <span id="thingy" className={styles.thiny}>
                <Link to="/signin" id="thingy">
                  Already have an account? Sign in instead
                </Link>
              </span>
            </form>
          </Box>
        </div>
        <div className={styles.alternatives}>
          <div className={styles.leftalt}></div>
        </div>
      </section>
    </main>
  );
};
