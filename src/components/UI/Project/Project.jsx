import React from "react";
import { Link } from "react-router-dom";
import project from "./Project.module.scss";

const Project = ({ name, category, date_created, image, id }) => {
  return (
    <div>
      <div>ID: {id}</div>
      <div>date_created: {date_created}</div>
      <div>category: {category}</div>
      <img src={image} alt="" />
      <div className={project.project_button}>
        <Link to={`/${name.replace(/ /g, "-").toLowerCase()}`}>name</Link>
      </div>
    </div>
  );
};

export default Project;
