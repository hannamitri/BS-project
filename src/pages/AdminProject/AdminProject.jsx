import styles from "./AdminProject.css";
import { Table, Pagination } from "@mantine/core";
import Sidebar from "../../components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import {
  getAll,
  deleteUser,
  getProjectsByUser,
  getAllProjects,
  deleteProject,
  updateProject,
  getProjectsBetweenDates,
  getDataBetweenDates,
} from "../../api/api";
import { DatePicker, DateRangePicker } from "@mantine/dates";

export const AdminProject = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [dateProjects, setDateProjects] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const [value, setValue] = useState([new Date(), new Date()]);
  const [activePage, setPage] = useState(1);
  const numberOfRowsInPaginaton = 10;
  const dtfUS = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "2-digit",
  });

  const [projectId, setProjectId] = useState("");

  // console.log(dtfUS.format(value[0]));
  // console.log(dateValue);

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };

  const getUsers = async () => {
    const systemusers = await getAll();
    setAllUsers(systemusers);
  };

  const getProjectsOfUsers = async (id) => {
    let user = {
      user_id: id,
    };
    const projects = await getProjectsByUser(user);
    return projects;
  };

  const getProjectsBetweenTwoDates = async (startDate, endDate) => {
    let dates = {
      startDate,
      endDate,
    };
    const projects = await getProjectsBetweenDates(dates);
    setDateProjects(projects);
  };

  const getDataBetweenTwoDates = async () => {
    let dates = {
      startDate: "April 15",
      endDate: "April 16",
    };
    const data_collected = await getDataBetweenDates(dates);
    return data_collected;
  };

  const deleteUserById = async (user_id) => {
    let user = {
      id: user_id,
    };
    await deleteUser(user)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  const deleteProjectById = async (project_id) => {
    setProjectId(project_id);
    let project = {
      id: project_id,
    };
    await deleteProject(project)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  const updateProjectData = async () => {
    let project = {
      category: "Agriculture in Koura",
      name: "Batroun",
      image: "dedeqdewf",
      date_created: "April 23, 11:16 AM",
      project_id: 4,
    };

    await updateProject(project)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  const rows = allProjects?.data
    ?.slice(
      activePage * numberOfRowsInPaginaton - numberOfRowsInPaginaton,
      activePage * numberOfRowsInPaginaton
    )
    .map((project) => (
      <tr key={project.project_id}>
        <td>{project.project_id}</td>
        <td>{project.name}</td>
        <td>{project.category}</td>
        <td>{project.date_created}</td>
        <td>
          <button onClick={() => deleteProjectById(project.project_id)}>
            Delete
          </button>
        </td>
      </tr>
    ));

  useEffect(() => {
    getUsers();
    getProjects();
    getProjectsBetweenTwoDates(dtfUS.format(value[0]), dtfUS.format(value[1]));
  }, [projectId]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main className={styles.container}>
        <div className={styles.wrapper}></div>
        <div>
          <h1 className={styles.title}>List of Projects</h1>
          <div className={styles.wrapper}>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>CATEGORY</th>
                  <th>DATE CREATED</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Pagination
              page={activePage}
              onChange={setPage}
              total={Math.ceil(
                allProjects?.data?.length / numberOfRowsInPaginaton
              )}
            />
          </div>
        </div>
        <div>
          <DateRangePicker
            label="Book hotel"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
            onDropdownOpen={() => setValue([])}
            onDropdownClose={() =>
              getProjectsBetweenTwoDates(
                dtfUS.format(value[0]),
                dtfUS.format(value[1])
              )
            }
          />
        </div>
        {dateProjects?.data?.map((project, index) => (
          <div>{project.name}</div>
        ))}
      </main>
    </div>
  );
};
