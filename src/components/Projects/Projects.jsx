import { Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../api/api";
import Project from "../UI/Project/Project";
import "./Projects.scss";

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [showMore, setShowMore] = useState(8);

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="projects__wrapper">
        {allProjects.data ? (
          allProjects?.data?.slice(0, showMore).map((project, index) => (
            <>
              <Project
                key={index}
                name={project.name}
                category={project.category}
                date_created={project.date_created}
                projectImage={project.image}
                id={project.project_id}
              />
            </>
          ))
        ) : (
          <>
            {new Array(8).fill(0).map((_) => (
              <div>
                <Skeleton height={175} mb="md" />
                <Skeleton height={20} width={150} mb="md" />
                <Skeleton height={20} width={100} mb="md" />
                <Skeleton height={35} width="85%" />
              </div>
            ))}
          </>
        )}
      </div>
      <div className="project__show-more--button">
        {console.log(allProjects?.data)}
        {allProjects.data?.length > 8 &&
          (showMore === 8 ? (
            allProjects.data && (
              <button
                className="button"
                onClick={() => setShowMore(allProjects.data?.length)}
              >
                Show All
              </button>
            )
          ) : (
            <button className="button" onClick={() => setShowMore(8)}>
              Show Less
            </button>
          ))}
      </div>
    </>
  );
};

export default Projects;
