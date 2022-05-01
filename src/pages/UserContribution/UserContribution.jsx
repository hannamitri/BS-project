import React, { useState, useEffect } from "react";
import { Select } from "@mantine/core";
import {
  getAll,
  getDataCollectedByUser,
  getProjectsByUser,
} from "../../api/api";
import { useForm } from "@mantine/form";
import Project from "../../components/UI/Project/Project";
import "swiper/css";
import "swiper/css/navigation";
import DataCollectedCard from "../../components/UI/DataCollectedCard/DataCollectedCard";
import "./UserContribution.scss";
import Message from "../../components/UI/Message/Message";
import { IoIosCloseCircle, IoIosCheckbox } from "react-icons/io";

export const UserContribution = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [projectsOfUser, setProjectsOfUser] = useState([]);
  const [dataOfUser, setDataOfUser] = useState([]);
  const [user, setUser] = useState();
  const [showMore, setShowMore] = useState(8);
  const [userId, setUserId] = useState(0);
  const [displayProjects, setDisplayProjects] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [hideProjects, setHideProjects] = useState(false);

  const getUsers = async () => {
    const data = await getAll();
    setAllUsers(data);
  };
  const getUserName = (id) => {
    const username = allUsers?.data?.find((item) => item?.user_id === id);
    return username?.user_name;
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
        let data = await getDataCollectedByUser(user);
        setDataOfUser(data);
        setDisplayData(true);
        setDisplayProjects(false);
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
      <div>
        <div className="project__form--wrapper">
          <h2>View Contribution of Users</h2>
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
              onDropdownClose={() => {
                hideData();
                setHideProjects(true);
              }}
            />
            {hideProjects && (
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
            )}
          </form>
        </div>
        <>
          {displayProjects && (
            <div className="content__wrapper">
              <div className="projects__wrapper">
                {projectsOfUser?.data?.length ? (
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
                  <Message
                    bgcolor="#f03e3e"
                    title="No Data Collected Found"
                    setStatus={true}
                    NotificationIcon={IoIosCloseCircle}
                  />
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
          <div className="data-collected__wrapper">
            <div className="data-collected__card--wrapper">
              {dataOfUser?.data?.length ? (
                dataOfUser?.data.map(
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
                <Message
                  bgcolor="#f03e3e"
                  title="No Data Collected Found"
                  setStatus={true}
                  NotificationIcon={IoIosCloseCircle}
                />
              )}
            </div>
            {/* <div className="data-collected__users--list-wrapper">
              {user?.data ? (
                user?.data?.map((usersData, index) => (
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
                ))
              ) : (
                <div></div>
              )}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};
