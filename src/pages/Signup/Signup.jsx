import "./Signup.scss";
import { useContext, useState, useMemo, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import supabase from "../../lib/supabase";
import { FaGlobeEurope, FaUserAlt } from "react-icons/fa";
import { IoIosCheckbox } from "react-icons/io";
import {
  TextInput,
  Loader,
  Button,
  Group,
  Box,
  PasswordInput,
  Select,
  Notification,
  RadioGroup,
  Radio,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Lock, X } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { z } from "zod";
import { insertUser } from "../../api/api";
import { MdSettingsPhone } from "react-icons/md";
import LoginIllustration from "../../images/Login/wfh.svg";
import countryList from "react-select-country-list";
import Sidebar from "../../components/Sidebar/Sidebar";
import Message from "../../components/UI/Message/Message";

export const Signup = ({ userLoggedIn }) => {
  const { user, loading, setUser } = useContext(UserContext);
  const [userExists, setUserExists] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

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

  const trySubmit = async ({ Password, Email, Name, Location, pn, role }) => {
    setUserExists(false);
    setLoadingState(true);
    console.log(Password);
    console.table([Password, Email, Name, Location, pn, role]);
    let { user, error } = await supabase.auth.signUp({
      email: Email,
      password: Password,
    });

    let adminValue = 0;
    let professionalValue = 0;

    if (role === "admin") {
      adminValue = 1;
    } else if (role === "professional") {
      professionalValue = 1;
    }

    let userOBJ = {
      Name,
      Email,
      Password,
      pn,
      isProfessional: professionalValue,
      Location,
      isAdmin: adminValue,
      role,
    };

    if (error) {
      if (error.message === "User already registered") {
        setUserExists(true);
        setLoadingState(false);
      } else {
        setLoadingState(false);
        throw new Error(error.message);
      }
    } else {
      setDisabled(true);
      if (await insertUser(userOBJ)) {
        setSuccessStatus(true);
      }
      if (user) {
        setUser(userLoggedIn);
      }
      setLoadingState(false);
    }
  };

  const form = useForm({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      Location: "",
      pn: "",
      role: "",
    },
    schema: zodResolver(schema),
  });

  const [disabled, setDisabled] = useState(false);
  const options = useMemo(() => {
    let data = countryList().getData();
    let changed = [];
    data.forEach(
      (thing) =>
        (changed = [...changed, { value: thing.label, label: thing.label }])
    );
    return changed;
  }, []);
  const password = useRef();
  return (
    <div style={{ display: "flex" }}>
      <div className="sign-up__wrapper">
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
            title="User Added Successufully!!!"
            setStatus={setSuccessStatus}
            NotificationIcon={IoIosCheckbox}
          />
        )}
        <div className="sign-up__content--wrapper">
          <div className="sign-up__img">
            <img
              src={LoginIllustration}
              alt="Illustration"
              width={500}
              height={500}
            />
          </div>

          <Box sx={{ maxWidth: 350 }} mx="auto" className="sign-up__content">
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
              <RadioGroup
                label="Select User's Role"
                description="This is define a User's Role"
                required
                {...form.getInputProps("role")}
              >
                <Radio value="citizen" label="Citizen" />

                <Radio value="professional" label="Professional" />

                <Radio value="admin" label="Admin" />
              </RadioGroup>

              <Group position="left" mt="md" style={{ position: "relative" }}>
                {loadingState ? (
                  <span className="sign-up__loading">
                    <Loader />
                  </span>
                ) : (
                  <Button type="submit">Sign up</Button>
                )}
              </Group>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};
