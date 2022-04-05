import React, { useEffect, useState } from "react";
import { getAllProjects, getUsersbyProject } from "../../api/api";
import Project from "../UI/Project/Project";
import projects from "./Projects.module.scss";

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };

  const getUsersByProjectID = async () => {
    let project = {
      project_id: 1,
    };

    await getUsersbyProject(project)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProjects();
    console.log(
      `USER BY PROJECT ID:"
        ${getUsersByProjectID()}`
    );
  }, []);

  return (
    <div className={projects.container}>
      <div className={projects.projects_wrapper}>
        {allProjects.data?.map((project, index) => (
          <Project
            key={index}
            name={project.name}
            category={project.category}
            date_created={project.date_created}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
