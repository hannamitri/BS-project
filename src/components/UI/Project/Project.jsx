import React from "react";
import { Link } from "react-router-dom";
import project from "./Project.module.scss";

const Project = ({ name, category, date_created }) => {
  return (
    <div>
      <div>date_created: {date_created}</div>
      <div>category: {category}</div>
      <div className={project.project_button}>
        <Link to={`/${name.replace(/ /g, "-").toLowerCase()}`}>name</Link>
      </div>
    </div>
  );
};

export default Project;
