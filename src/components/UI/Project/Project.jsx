import React from "react";
import project from "./Project.module.scss";

const Project = ({ name, description, date, image }) => {
  return (
    <div>
      <div>name: {name}</div>
      <div>desc: {description}</div>
      <img src={image} alt="" />
      <div>date: {date}</div>
    </div>
  );
};

export default Project;
