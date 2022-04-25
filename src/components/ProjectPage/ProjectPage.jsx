import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllProjects,
  getProjectData,
  getUsersbyProject,
} from "../../api/api";
import "./ProjectPage.scss";
import "swiper/css";
import "swiper/css/navigation";

import { Skeleton } from "@mantine/core";
import DataCollectedCard from "../UI/DataCollectedCard/DataCollectedCard";
import deafultAvatar from "../../images/default-avatar.png";

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
  const getUserName = (id) => {
    const username = users?.data?.find((item) => item?.user_id === id);
    return username?.user_name;
  };
  useEffect(() => {
    getProjects();
    getDataByProjectId();
    getUsersByProjectID();
  }, [original_project?.project_id]);
  console.log(projectData?.data);
  return (
    <div className="main__content--wrapper">
      <h1>DATA COLLECTED BELONGS TO PROJECT: {original_project?.name}</h1>
      <div className="data-collected__wrapper">
        <div className="data-collected__card--wrapper">
          {projectData?.data?.length ? (
            projectData?.data.map(
              (item, index) =>
                item.image && (
                  <>
                    <DataCollectedCard
                      key={index}
                      dataCollectedImage={item.image}
                      dataCollectedDate={item.date_collected}
                      dataCollectedLocation={item.location_collected}
                      dataCollectedTime={item.time_collected}
                      dataCollectedDescription={item.description}
                      dataCollectedUser={getUserName(item.user_id)}
                      dataCollectedTitle={item.Title}
                    />
                  </>
                )
            )
          ) : (
            <>
              {new Array(8).fill(0).map((_) => (
                <div>
                  <Skeleton animate={false} height={175} mb="md" />
                  <Skeleton animate={false} height={20} width={150} mb="md" />
                  <Skeleton animate={false} height={20} width={100} mb="md" />
                  <Skeleton animate={false} height={35} width="85%" />
                </div>
              ))}
            </>
          )}
        </div>
        <div className="users__list">
          <div className="data-collected__users--list-wrapper">
            <h4>List of Professioals</h4>
            {users?.data ? (
              users?.data?.map((usersData, index) => (
                <div>
                  {usersData?.isProfessional ? (
                    <div key={index} className="data-collected__users--list">
                      <div className="data-collected__users--image">
                        {usersData?.profile ? (
                          <img src={usersData?.profile} alt="" />
                        ) : (
                          <img src={deafultAvatar} alt="" />
                        )}
                      </div>
                      <div>
                        <div>{usersData.user_name}</div>
                        <div>{usersData.Location}</div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ))
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
          <br />

          <br />
          <div className="data-collected__users--list-wrapper">
            <h4>List of Citizens</h4>
            {users?.data ? (
              users?.data?.map((usersData, index) => (
                <div>
                  {!usersData?.isProfessional && !usersData?.isAdmin ? (
                    <div key={index} className="data-collected__users--list">
                      <div className="data-collected__users--image">
                        {usersData?.profile ? (
                          <img src={usersData?.profile} alt="" />
                        ) : (
                          <img src={deafultAvatar} alt="" />
                        )}
                      </div>
                      <div>
                        <div>{usersData.user_name}</div>
                        <div>{usersData.Location}</div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ))
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
      </div>
    </div>
  );
};

export default ProjectPage;
