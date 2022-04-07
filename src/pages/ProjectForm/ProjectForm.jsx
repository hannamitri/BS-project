import styles from "./ProjectForm.module.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Select, Box } from "@mantine/core";

import { useForm, zodResolver } from "@mantine/form";
import { getAll, getAllProjects } from "../../api/api";

export const ProjectForm = () => {
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

  useEffect(() => {
    getProjects();
    getUsers();
  }, []);

  const form = useForm({
    initialValues: {
      project: "",
      user: "",
    },
  });

  return (
    <div className={styles.container}>
      <Box sx={{ maxWidth: 300 }} mx="auto" className={styles.rightview}>
        <form action="">
          <Select
            data={getData()}
            label="Projects"
            required
            placeholder={"Select a Project"}
            {...form.getInputProps("project")}
          />
          <select className="form-control">
            {allProjects.data?.map((project, index) => (
              <option value={project.project_id} selected={project.project_id}>
                {project.name}
              </option>
            ))}
          </select>
          <select className="form-control">
            {allUsers.data?.map((user, index) => (
              <option value={user.user_id} selected={user.user_id}>
                {user.user_name}
              </option>
            ))}
          </select>
          <Select
            data={[
              {
                id: "1",
                label: "1",
              },
              {
                id: "2",
                label: "2",
              },
            ]}
            label="Users"
            required
            placeholder={"Select A User"}
            {...form.getInputProps("user")}
          />
        </form>
      </Box>
    </div>
  );
};
