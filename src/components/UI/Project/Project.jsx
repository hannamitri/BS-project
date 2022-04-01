import React from "react";
import { Link } from "react-router-dom";
import project from "./Project.module.scss";

const Project = ({ name, description, date, image }) => {
  return (
    <div>
      <div>name: {name}</div>
      <div>desc: {description}</div>
      <img src={image} alt="" />
      <div>date: {date}</div>
      <div className={project.project_button}>
        <Link to="">View Project</Link>
      </div>
    </div>
  );
};

export default Project;
