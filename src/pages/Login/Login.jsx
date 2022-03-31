import styles from "./Login.module.scss";
import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import supabase from "../../lib/supabase";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Lock } from "tabler-icons-react";
import { HiOutlineAtSymbol } from "react-icons/hi";

// import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import LoginIllustration from "../../images/Login/wfh_1.svg";

export const Login = () => {
  const { user, loading, setUser } = useContext(UserContext);
  const [userNotFound, setUserNotFound] = useState(false);

  async function trySignin(event) {
    event.preventDefault();

    const [email, password] = [
      event.target.email.value,
      event.target.password.value,
    ];

    console.log(email, password);

    let { user, error } = await supabase.auth.signIn({
      email,
      password,
      isProfessional: false,
    });

    if (error) {
      if (error.message !== "Invalid login credentials") {
        throw new Error(error.message);
      }
      setUserNotFound(true);
    }
    setUser(user);
  }

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value ? null : "Password is required"),
    },
  });

  return (
    <main className={styles.container}>
      <section className={styles.view}>
        <div className={styles.mainContent}>
          <article className={styles.leftview}>
            <img src={LoginIllustration} alt="Illustration" width={500} />
            <a href="#">Create an account</a>
          </article>
          <Box sx={{ maxWidth: 300 }} mx="auto" className={styles.rightview}>
            <h1>Log in</h1>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                required
                icon={<HiOutlineAtSymbol size={16} />}
                label="Email"
                placeholder="your@email.com"
                type="email"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                required
                label="Password"
                placeholder="your password"
                type="password"
                icon={<Lock size={16} />}
                {...form.getInputProps("password")}
              />

              <Group position="left" mt="md">
                <Button type="submit">Login</Button>
              </Group>
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
