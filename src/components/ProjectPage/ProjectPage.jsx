import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllProjects,
  getProjectData,
  getUserById,
  getUsersbyProject,
} from "../../api/api";

import styles from "./ProjectPage.module.scss";

const ProjectPage = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [users, setUsers] = useState([]);

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };

  const getDataByProjectId = async () => {
    let project = {
      project_id: 1,
    };
    const data_projects = await getProjectData(project);
    setProjectData(data_projects);
  };



  const getUsersByProjectID = async () => {
    let project = {
      project_id: 1,
    };

    const projectUsers = await getUsersbyProject(project);

    setUsers(projectUsers);
  };


  const id = useParams().id;
  const original_project = allProjects?.data?.find(
    (project) => project.name.replace(/ /g, "-").toLowerCase() === id
  );

  console.log(original_project?.project_id)

  useEffect(() => {
    getProjects();
    getDataByProjectId();
    getUsersByProjectID();
  }, []);

  return (
    <div className={styles.container}>
      <h1>DATA COLLECTED BELONGS TO PROJECT: {original_project?.name}</h1>
      <div className={styles.projects_wrapper}>
        {projectData.data?.map((projectdata, index) => (
          <div key={index}>
            <img src={projectdata.image} alt="" />
            <div>date_created: {projectdata.date_collected}</div>
            <div>Location Collected: {projectdata.location_collected}</div>
            <div>Time Collected:{projectdata.time_collected}</div>
            <div>Description:{projectdata.description}</div>
          </div>
        ))}
      </div>
      <div>
        <h1>LIST OF USERS BELONGS TO PROJECT: {original_project?.name}</h1>
        {users.data?.map((usersData, index) => (
          <div key={index}>
            <div>{usersData.user_id}</div>
            <div>{usersData.user_name}</div>
            <div>{usersData.Location}</div>
            <div>{usersData.email}</div>
            <div>{usersData.isProfessional}</div>
            <div>{usersData.phone_number}</div>
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
