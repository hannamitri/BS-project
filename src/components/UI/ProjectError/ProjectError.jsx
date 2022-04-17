import React from "react";
import { IoIosCloseCircle, IoIosClose } from "react-icons/io";
import "./ProjectError.scss";

const ProjectError = ({ setImageLimit, title }) => {
  return (
    <div className="project-image__limit--error">
      <IoIosCloseCircle />
      <div>{title}</div>
      <div
        className="project__close--icon"
        onClick={() => setImageLimit(false)}
      >
        <IoIosClose />
      </div>
    </div>
  );
};

export default ProjectError;
