import React from "react";
import { Link } from "react-router-dom";
import "./Project.scss";

const Project = ({ name, category, date_created, image, id }) => {
  return (
    <div className="project__wrapper">
      <div className="project__image">
        <img src={image} alt="" />
      </div>
      <div className="project__content--wrapper">
        <div className="project__name">{name}</div>
        <div className="project__date">{date_created}</div>
      </div>
      <div>
        <Link
          className="project__button"
          to={`/${name.replace(/ /g, "-").toLowerCase()}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Project;
