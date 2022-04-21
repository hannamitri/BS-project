import React, { useState, useEffect } from "react";
import { Button, TextInput, Select } from "@mantine/core";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineAtSymbol } from "react-icons/hi";
import {
  getAll,
  getAllProjects,
  getDataCollectedByUser,
  getProjectsByUser,
} from "../../api/api";
import { useForm } from "@mantine/form";
import "./UserContribution.css";
import Message from "../../components/UI/Message/Message";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IoIosCloseCircle, IoIosCheckbox } from "react-icons/io";

export const UserContribution = () => {
  const [dataImage, setDataImage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const [allProjects, setAllProjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState();
  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };
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

  // const trySubmit = async (values) => {

  //     const project = {
  //         name: values.name,
  //     };

  //     const selected_project_id = allProjects?.data?.find(
  //         (item) => item?.name === project.name
  //     );

  //     if (values.category.length > 45) {
  //         setErrorStatus(true);
  //         setErrorMessage("Project's Category cannot exceed 45 characters.")
  //     }
  //     else if (values.name.length > 45) {
  //         setErrorStatus(true);
  //         setErrorMessage("Project's Name cannot exceed 45 characters.")
  //     }
  //     else if (selected_project_id) {
  //         setErrorStatus(true);
  //         setErrorMessage("Project's Name already exists. Please enter a different One.")
  //     }
  //     else {
  //         setErrorStatus(false);

  //         const project = {
  //             category: values.category,
  //             name: values.name,
  //             image: dataImage,
  //             date_created: dtfUS.format(specialDate),
  //         }
  //         try {
  //             // if (insertProject(project)) {
  //             //     setSuccessStatus(true);
  //             //     values.category = "";
  //             //     values.name = "";
  //             //     setDataImage("");
  //             // }

  //         } catch (err) {
  //             console.log(err);
  //         }
  //     }
  // };

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
    const selected = allUsers?.data?.find((item) => item?.email === user.email);

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
      console.log("Type cannot be empty");
    } else {
      if (type === "Data Collected") {
        let dataOfUser = await getDataCollectedByUser(user);
        console.log(dataOfUser?.data);
      } else {
        let projectsOfUser = await getProjectsByUser(user);
        console.log(projectsOfUser?.data);
      }
    }
  };

  useEffect(() => {
    getProjects();
    getUsers();
  }, []);

  return (
    <div className="flex">
      <div className="project__form--wrapper">
        <h1>View Contribution of Users</h1>
        {errorStatus && (
          <Message
            bgcolor="#f03e3e"
            title={errormessage}
            setStatus={setErrorStatus}
            NotificationIcon={IoIosCloseCircle}
          />
        )}
        {successStatus && (
          <Message
            bgcolor="#38b000"
            title="Project Added Successufully!!!"
            setStatus={setSuccessStatus}
            NotificationIcon={IoIosCheckbox}
          />
        )}
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
          />
        </form>
      </div>
    </div>
  );
};
