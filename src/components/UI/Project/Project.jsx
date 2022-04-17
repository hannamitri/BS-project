import { Skeleton } from "@mantine/core";
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
          <div className="project__button">
            <Link to={`project/${name.replace(/ /g, "-").toLowerCase()}`}>
              View Details
            </Link>
          </div>
        </div>
      ) : (
        <div className="project__skeleton">
          <Skeleton animate={false} height={175} mb="md" />
          <Skeleton animate={false} height={20} width={150} mb="md" />
          <Skeleton animate={false} height={20} width={100} mb="md" />
          <Skeleton animate={false} height={35} width="85%" />
        </div>
      )}
    </>
  );
};

export default Project;
