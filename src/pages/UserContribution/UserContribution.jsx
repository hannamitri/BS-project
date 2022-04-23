import React, { useState, useEffect } from "react";
import { Select } from "@mantine/core";
import {
  getAll,
  getAllProjects,
  getDataCollectedByUser,
  getProjectsByUser,
} from "../../api/api";
import { useForm } from "@mantine/form";
import { Skeleton } from "@mantine/core";
import Project from "../../components/UI/Project/Project";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import DataCollectedSlide from "../../components/UI/DataCollectedSlide/DataCollectedSlide";
import "./UserContribution.scss";

export const UserContribution = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [projectsOfUser, setProjectsOfUser] = useState([]);
  const [dataOfUser, setDataOfUser] = useState([]);
  const [user, setUser] = useState();
  const [showMore, setShowMore] = useState(8);
  const [userId, setUserId] = useState(0);
  const [displayProjects, setDisplayProjects] = useState(false);
  const [displayData, setDisplayData] = useState(false);

  const getUsers = async () => {
    const users_data = await getAll();
    setAllUsers(users_data);
  };

  const formatDataUsers = () => {
    let newUsers = [];
    allUsers?.data?.map((user) => {
      let obj = {
        value: user.email,
        label: user.email,
      };
      newUsers.push(obj);
    });
    return newUsers;
  };

  const form = useForm({
    initialValues: {
      category: "",
      name: "",
    },
  });

  const getUser = async (event) => {
    const user = {
      email: event?.target?.value,
    };
    if (user.email === "") {
      setDisplayProjects(false);
      setDisplayData(false);
    }
    const selected = allUsers?.data?.find((item) => item?.email === user.email);

    setUserId(selected?.user_id);

    console.log(selected);

    let user_data = {
      user_id: selected?.user_id,
    };
    console.log(user_data);
    setUser(user_data);
  };

  const getContributionType = async (event) => {
    let type = event?.target?.value;

    if (type === "") {
      setDisplayProjects(false);
      setDisplayData(false);
    } else {
      if (type === "Data Collected") {
        let datas = await getDataCollectedByUser(user);
        setDataOfUser(datas);
        setDisplayData(true);
        setDisplayProjects(false);
        console.log(dataOfUser?.data);
      } else {
        let projects = await getProjectsByUser(user);
        console.log(projects?.data);
        setProjectsOfUser(projects);
        setDisplayProjects(true);
        setDisplayData(false);
      }
    }
  };
  const hideData = () => {
    setDisplayProjects(false);
    setDisplayData(false);
  };
  useEffect(() => {
    getUsers();
    setUserId(0);
  }, [userId]);

  return (
    <div className="main__content--wrapper">
      <div className="project__form--wrapper" style={{ marginBottom: "50px" }}>
        <h1>View Contribution of Users</h1>
        <form className="project__form">
          <Select
            data={formatDataUsers()}
            label="User"
            required
            searchable
            clearable
            placeholder={"Select User"}
            {...form.getInputProps("user")}
            onSelect={getUser}
            onDropdownClose={() => hideData()}
          />
          <Select
            data={[
              { value: "Data Collected", label: "Data Collected" },
              { value: "Projects", label: "Projects" },
            ]}
            label="Contribution"
            required
            searchable
            clearable
            placeholder={"Select contribution type"}
            {...form.getInputProps("project")}
            onSelect={getContributionType}
            onDropdownClose={() => hideData()}
          />
        </form>
      </div>
      <>
        {displayProjects && (
          <div className="content__wrapper">
            <div className="projects__wrapper">
              {projectsOfUser.data ? (
                projectsOfUser?.data
                  ?.slice(0, showMore)
                  .map((project, index) => (
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
                      <Skeleton animate={false} height={175} mb="md" />
                      <Skeleton
                        animate={false}
                        height={20}
                        width={150}
                        mb="md"
                      />
                      <Skeleton
                        animate={false}
                        height={20}
                        width={100}
                        mb="md"
                      />
                      <Skeleton animate={false} height={35} width="85%" />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="project__show-more--button">
              {console.log(projectsOfUser?.data)}
              {projectsOfUser.data?.length > 8 &&
                (showMore === 8 ? (
                  projectsOfUser.data && (
                    <button
                      className="button"
                      onClick={() => setShowMore(projectsOfUser.data?.length)}
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
          </div>
        )}
      </>
      {displayData && (
        <div className="project__detail--wrapper">
          {/* <h1>DATA COLLECTED BELONGS TO PROJECT: {original_project?.name}</h1> */}

          <Swiper
            slidesPerView={1}
            navigation={!!dataOfUser?.data?.length}
            modules={[Navigation]}
            className="data-collected__slider"
          >
            <div className="projects__detail">
              {dataOfUser?.data?.length ? (
                dataOfUser?.data?.map(
                  (projectdata, index) =>
                    projectdata.image && (
                      <SwiperSlide>
                        <DataCollectedSlide
                          dataCollectedImage={projectdata.image}
                          dataCollectedDate={projectdata.date_collected}
                          dataCollectedLocation={projectdata.location_collected}
                          dataCollectedTime={projectdata.time_collected}
                          dataCollectedDescription={projectdata.description}
                        />
                      </SwiperSlide>
                    )
                )
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
        </div>
      )}
    </div>
  );
};
