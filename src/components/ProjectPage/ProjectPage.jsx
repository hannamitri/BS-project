import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllProjects,
  getProjectData,
  getUsersbyProject,
} from "../../api/api";
import "./ProjectPage.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { Skeleton } from "@mantine/core";
import DataCollectedSlide from "../UI/DataCollectedSlide/DataCollectedSlide";

const ProjectPage = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [users, setUsers] = useState([]);

  const id = useParams().id;
  const original_project = allProjects?.data?.find(
    (project) => project.name.replace(/ /g, "-").toLowerCase() === id
  );

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };

  const getDataByProjectId = async () => {
    let project = {
      project_id: original_project?.project_id,
    };
    const data_projects = await getProjectData(project);
    setProjectData(data_projects);
  };

  const getUsersByProjectID = async () => {
    let project = {
      project_id: original_project?.project_id,
    };

    const projectUsers = await getUsersbyProject(project);
    setUsers(projectUsers);
  };

  console.log(original_project?.project_id);

  useEffect(() => {
    getProjects();
    getDataByProjectId();
    getUsersByProjectID();
  }, [original_project?.project_id]);

  return (
    <div className="project__detail--wrapper">
      <h1>DATA COLLECTED BELONGS TO PROJECT: {original_project?.name}</h1>

      <Swiper
        slidesPerView={1}
        navigation={!!projectData?.data?.length}
        modules={[Navigation]}
        className="data-collected__slider"
      >
        <div className="projects__detail">
          {projectData?.data?.length ? (
            projectData?.data?.map((projectdata, index) => (
              <SwiperSlide>
                <DataCollectedSlide
                  dataCollectedImage={projectdata.image}
                  dataCollectedDate={projectdata.date_collected}
                  dataCollectedLocation={projectdata.location_collected}
                  dataCollectedTime={projectdata.time_collected}
                  dataCollectedDescription={projectdata.description}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Skeleton
                animate={false}
                height={700}
                width="90%"
                mb="md"
                mx="auto"
              />
              <Skeleton
                animate={false}
                height={20}
                width="80%"
                mb="md"
                mx="auto"
              />
              <Skeleton
                animate={false}
                height={20}
                width="80%"
                mb="md"
                mx="auto"
              />
              <Skeleton
                animate={false}
                height={20}
                width="60%"
                mb="md"
                mx="auto"
              />
              <Skeleton
                animate={false}
                height={20}
                width="80%"
                mb="md"
                mx="auto"
              />
            </SwiperSlide>
          )}
        </div>
      </Swiper>

      <div>
        <h1>LIST OF USERS BELONGS TO PROJECT: {original_project?.name}</h1>
        {users?.data ? (
          <div>
            {users?.data?.map((usersData, index) => (
              <div key={index}>
                <div>{usersData.user_name}</div>
                <div>{usersData.Location}</div>
                <br />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* <Skeleton
              animate={false}
              height={20}
              width="80%"
              mb="md"
              mx="auto"
            />
            <Skeleton
              animate={false}
              height={20}
              width="80%"
              mb="md"
              mx="auto"
            />
            <Skeleton
              animate={false}
              height={20}
              width="60%"
              mb="md"
              mx="auto"
            />
            <Skeleton
              animate={false}
              height={20}
              width="80%"
              mb="md"
              mx="auto"
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
