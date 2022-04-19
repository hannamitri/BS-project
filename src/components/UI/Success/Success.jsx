import React from "react";
import { IoIosClose, IoIosCheckbox } from "react-icons/io";
import "./Success.scss";

const Success = ({ setSuccessStatus, title }) => {
  return (
    <div className="project-image__limit--error">
      <IoIosCheckbox />
      <div>{title}</div>
      <div
        className="project__close--icon"
      // onClick={() => setSuccessStatus(false)}
      >
        <IoIosClose />
      </div>
    </div>
  );
};

export default ProjectError;
