import styles from "./ProjectForm.module.scss";
import React, { useEffect, useState } from "react";
import { MultiSelect, Box, Button, Group, Select, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  getAll,
  getAllProjects,
  getProjectId,
  insertUsersProjects,
} from "../../api/api";
import LoginIllustration from "../../images/Login/data.svg";

export const ProjectForm = ({ userLoggedIn }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

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
    allUsers?.data?.map((user, index) => {
      newUsers.push(user.email);
    });

    return newUsers;
  };

  const formatDataProjects = () => {
    let newProjects = [];
    allProjects?.data?.map((project, index) => {
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

      const userLoggedIn = allUsers?.data?.find(
        (item) => item?.email === user_obj?.email
      );

      console.log(userLoggedIn?.user_id);

      const user_projects = {
        project_id: selected_project_id?.project_id,
        user_id: userLoggedIn?.user_id,
      };

      try {
        insertUsersProjects(user_projects);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getProjects();
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
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <article className={styles.leftview}>
          <img src={LoginIllustration} alt="Illustration" width={500} />
        </article>
        <Box sx={{ maxWidth: 400 }} mx="auto" className={styles.rightview}>
          <h1>Add Users to Projects</h1>
          <form onSubmit={form.onSubmit(trySubmit)}>
            <MultiSelect
              data={formatDataUsers()}
              label="Users"
              required
              searchable
              clearable
              placeholder={"Select user/users"}
              {...form.getInputProps("user")}
            />

            <Select
              data={formatDataProjects()}
              label="Projects"
              required
              searchable
              clearable
              placeholder={"Select project/projects"}
              {...form.getInputProps("project")}
            />
            <Group position="left" mt="md" style={{ position: "relative" }}>
              <Button type="submit">Submit data</Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};
