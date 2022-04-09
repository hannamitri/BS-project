import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllProjects,
  getProjectData,
  getUserById,
  getUsersbyProject,
} from "../../api/api";

import "./ProjectPage.scss";

const ProjectPage = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [users, setUsers] = useState([]);

  const id = useParams().id;
  const original_project = allProjects?.data?.find(
    (project) => project.name.replace(/ /g, "-").toLowerCase() === id
  );

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };

  const getDataByProjectId = async () => {
    let project = {
      project_id: original_project?.project_id,
    };
    const data_projects = await getProjectData(project);
    setProjectData(data_projects);
  };

  const getUsersByProjectID = async () => {
    let project = {
      project_id: original_project?.project_id,
    };

    const projectUsers = await getUsersbyProject(project);
    setUsers(projectUsers);
  };

  console.log(original_project?.project_id);

  useEffect(() => {
    getProjects();
    getDataByProjectId();
    getUsersByProjectID();
  }, [original_project?.project_id]);

  return (
    <div className="project__detail--wrapper">
      <h1>DATA COLLECTED BELONGS TO PROJECT: {original_project?.name}</h1>
      {projectData?.data ? (
        <div className="projects__detail">
          {projectData?.data?.map((projectdata, index) => (
            <div key={index}>
              <img src={projectdata.image} alt="" />
              <div>date_created: {projectdata.date_collected}</div>
              <div>Location Collected: {projectdata.location_collected}</div>
              <div>Time Collected:{projectdata.time_collected}</div>
              <div>Description:{projectdata.description}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div
            className="skeleton__box"
            style={{ width: "300px", height: "300px" }}
          ></div>
          <div className="skeleton__box" style={{ width: "200px" }}></div>
          <div className="skeleton__box" style={{ width: "250px" }}></div>
          <div className="skeleton__box" style={{ width: "150px" }}></div>
        </div>
      )}

      <div>
        <h1>LIST OF USERS BELONGS TO PROJECT: {original_project?.name}</h1>
        {users?.data ? (
          <div>
            {users?.data?.map((usersData, index) => (
              <div key={index}>
                <div>{usersData.user_id}</div>
                <div>{usersData.user_name}</div>
                <div>{usersData.Location}</div>
                <div>{usersData.email}</div>
                <div>{}</div>
                <div>{usersData.phone_number}</div>
                <br />
                <br />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div
              className="skeleton__box"
              style={{ width: "200px" }}
            ></div>
            <div
              className="skeleton__box"
              style={{ width: "250px" }}
            ></div>
            <div
              className="skeleton__box"
              style={{ width: "150px" }}
            ></div>
            <div
              className="skeleton__box"
              style={{ width: "100px" }}
            ></div>
            <div
              className="skeleton__box"
              style={{ width: "150px" }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
