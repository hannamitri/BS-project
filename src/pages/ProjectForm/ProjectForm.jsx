import "./ProjectForm.scss";
import React, { useEffect, useState } from "react";
import { MultiSelect, Box, Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  getAll,
  getAllProjects,
  getUsersbyProject,
  insertUsersProjects,
} from "../../api/api";
import LoginIllustration from "../../images/Login/data.svg";
import Message from "../../components/UI/Message/Message";
import { IoIosCloseCircle, IoIosCheckbox } from "react-icons/io";

export const ProjectForm = ({ userLoggedIn }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [projectUsers, setProjectUsers] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };
  const getUsers = async () => {
    const users_data = await getAll();
    setAllUsers(users_data);
  };

  const formatDataUsers = () => {
    let newUsers = [];
    console.log(projectUsers);
    allUsers?.data?.map((user) => {
      let obj = {
        value: user.email,
        label: user.email,
      };
      newUsers.push(obj);
      projectUsers.forEach((element) => {
        if (element?.user_id === user?.user_id) {
          let obj = {
            value: user.email,
            label: user.email,
          };
          newUsers.pop(obj);
          let disabled_obj = {
            value: element.email,
            label: element.email,
            disabled: true,
          };
          newUsers.push(disabled_obj);
        }
      });
    });
    return newUsers;
  };

  const formatDataProjects = () => {
    let newProjects = [];
    allProjects?.data?.map((project) => {
      newProjects.push(project.name);
    });
    return newProjects;
  };

  const trySubmit = async (values) => {
    const project = {
      name: values.project,
    };

    const selected_project_id = allProjects?.data?.find(
      (item) => item?.name === project.name
    );

    for (const user of values.user) {
      let user_obj = {
        email: user,
      };
      const userLogged = allUsers?.data?.find(
        (item) => item?.email === user_obj?.email
      );
      const user_projects = {
        project_id: selected_project_id?.project_id,
        user_id: userLogged?.user_id,
      };

      try {
        if (await insertUsersProjects(user_projects)) {
          setSuccessStatus(true);
        } else {
          setErrorStatus(true);
          setErrorMessage(
            "An errorr ocuured while including users. Please Try Again!"
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getDataofproj = async (event) => {
    const project = {
      name: event?.target?.value,
    };
    const selected = allProjects?.data?.find(
      (item) => item?.name === project.name
    );
    console.log(selected?.project_id);
    let project_database = {
      project_id: selected?.project_id,
    };
    let project_users = await getUsersbyProject(project_database);

    setProjectUsers(project_users?.data);
  };
  useEffect(() => {
    getProjects();
    getDataofproj();
    getUsers();
    formatDataUsers();
    formatDataProjects();
  }, []);

  const form = useForm({
    initialValues: {
      project: "",
      user: "",
    },
  });

  return (
    <div className="flex">
      <div className="add__users-project--wrapper">
        <div className="add__users-project--image">
          <img src={LoginIllustration} alt="Illustration" width={500} />
        </div>
        <Box sx={{ maxWidth: 400 }} mx="auto">
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
              title="User/s Added Successufully!!!"
              setStatus={setSuccessStatus}
              NotificationIcon={IoIosCheckbox}
            />
          )}
          <h1>Add Users to Projects</h1>
          <form onSubmit={form.onSubmit(trySubmit)}>
            <Select
              data={formatDataProjects()}
              label="Projects"
              required
              searchable
              clearable
              placeholder={"Select project/projects"}
              {...form.getInputProps("project")}
              onSelect={getDataofproj}
            />
            <MultiSelect
              data={formatDataUsers()}
              label="Users"
              required
              searchable
              clearable
              placeholder={"Select user/users"}
              {...form.getInputProps("user")}
            />
            <Group position="left" mt="md" style={{ position: "relative" }}>
              <button className="button" type="submit">
                Submit data
              </button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};
