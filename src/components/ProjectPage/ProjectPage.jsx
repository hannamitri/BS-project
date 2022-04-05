import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProjects, getUsersbyProject } from "../../api/api";
import projectPage from "./ProjectPage.module.scss";

const ProjectPage = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };

  const getUsersByProjectID = async () => {
    let project = {
      project_id: 1,
    };

    await getUsersbyProject(project)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProjects();
    console.log(
      `USER BY PROJECT ID:"
        ${getUsersByProjectID()}`
    );
  }, []);

  const id = useParams().id;

  const project = allProjects.data?.find(
    (project) => project.name.replace(/ /g, "-").toLowerCase() === id
  );

  console.log(allProjects);
  console.log(project);

  return (
    <div>
      <div>{project?.name}</div>
      <div>{project?.category}</div>
      <div>{project?.date_created}</div>
    </div>
  );
};

export default ProjectPage;
