import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Project.scss";

const Project = ({ name, category, date_created, projectImage, id }) => {
  const [img, setImg] = useState();

  const mountedRef = useRef(true);

  useEffect(() => {
    const image = new Image();
    image.src = projectImage;
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          console.log("heyyyyyyyyyyyyyyyyy");
          setImg(image);
        }
      }, 300);
    };
    return () => {
      setTimeout(() => {
        mountedRef.current = false;
      }, 400);
    };
  });

  return (
    <>
      {img ? (
        <div className="project__wrapper">
          <div className="project__image">
            <img src={img?.src} alt="" />
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
      ) : (
        <div className="project__skeleton">
          <div
            className="skeleton__box"
            style={{ width: "100%", height: "175px" }}
          ></div>
          <div className="skeleton__box" style={{ width: "150px" }}></div>
          <div className="skeleton__box" style={{ width: "100px" }}></div>
          <div className="skeleton__box" style={{ width: "100%" }}></div>
        </div>
      )}
    </>
  );
};

export default Project;
