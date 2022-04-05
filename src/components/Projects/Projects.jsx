import React, { useEffect, useState } from "react";
import { getDataCollected, getUsersbyProject } from "../../api/api";
import Project from "../UI/Project/Project";
import projects from "./Projects.module.scss";

const Projects = () => {


  const [dataCollected, setDataCollected] = useState([]);
  const [users, setUsers] = useState([]);


  const getCollectedResults = async () => {
    const data = await getDataCollected();
    setDataCollected(data);
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
    getCollectedResults();
    console.log(
      `USER BY PROJECT ID:"
        ${getUsersByProjectID()}`);

  }, []);

  return (
    <div className={projects.container}>
      <div className={projects.projects_wrapper}>
        {dataCollected.data?.map((project, index) => (
          <Project
            key={index}
            name={project.data_id}
            image={project.image}
            description={project.description}
            date={project.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
