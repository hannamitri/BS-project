import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../api/api";
import Project from "../UI/Project/Project";
import "./Projects.scss";

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };

  useEffect(() => {
    getProjects();
    // console.log()
  }, []);

  return (
    <div className="projects__wrapper">
      {allProjects?.data?.map((project, index) => (
        <Project
          key={index}
          name={project.name}
          category={project.category}
          date_created={project.date_created}
          projectImage={project.image}
          id={project.project_id}
        />
      ))}
    </div>
  );
};

export default Projects;
