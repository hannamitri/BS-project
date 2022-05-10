import React, { useState, useEffect } from "react";
import { Button, TextInput, InputWrapper } from "@mantine/core";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { insertProject, insertUsersProjects } from "../../api/api";
import { useForm } from "@mantine/form";
import "./AddProject.scss";
import Message from "../../components/UI/Message/Message";
import { getAllProjects } from "../../api/api";
import { IoIosCloseCircle, IoIosCheckbox } from "react-icons/io";

const AddProject = ({ userLoggedIn }) => {
  const [dataImage, setDataImage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allProjects, setAllProjects] = useState([]);

  let specialDate = new Date();
  const dtfUS = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (file.size / 1024 > 1000) {
      setErrorStatus(true);
      setErrorMessage("Image size should be less than 1MB.");
    } else {
      setErrorStatus(false);
      const base64 = await convertBase64(file);
      setDataImage(base64);
    }
  };

  const trySubmit = async (values) => {
    const project = {
      name: values.name,
    };

    const selected_project = allProjects?.data?.find(
      (item) => item?.name === project.name
    );

    if (values.category.length > 45) {
      setErrorStatus(true);
      setErrorMessage("Project's Category cannot exceed 45 characters.");
    } else if (values.name.length > 45) {
      setErrorStatus(true);
      setErrorMessage("Project's Name cannot exceed 45 characters.");
    } else if (selected_project) {
      setErrorStatus(true);
      setErrorMessage(
        "Project's Name already exists. Please enter a different One."
      );
    } else {
      setErrorStatus(false);

      const project = {
        category: values.category,
        name: values.name,
        image: dataImage,
        date_created: dtfUS.format(specialDate),
        user_id: userLoggedIn?.user_id,
      };
      try {
        if (insertProject(project)) {
          setSuccessStatus(true);
          values.category = "";
          values.name = "";
          setDataImage(null);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const form = useForm({
    initialValues: {
      category: "",
      name: "",
    },
  });

  (errorMessage || successStatus) &&
    setTimeout(() => {
      setSuccessStatus(false);
      setErrorStatus(false);
    }, 10000);

  useEffect(() => {
    getProjects();
    console.log(errorMessage, successStatus);
  }, []);

  return (
    <div className="main__content--wrapper">
      <div className="project__form--wrapper">
        <h1>Create Project</h1>
        {errorStatus && (
          <Message
            bgcolor="#f03e3e"
            title={errorMessage}
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
        <form className="project__form" onSubmit={form.onSubmit(trySubmit)}>
          <TextInput
            required
            icon={<HiOutlineAtSymbol size={16} />}
            placeholder="Project Category"
            className="add__project--input"
            {...form.getInputProps("category")}
          />
          <TextInput
            required
            icon={<FaUserAlt size={16} />}
            className="add__project--input"
            placeholder="Project name"
            {...form.getInputProps("name")}
          />
          <InputWrapper id="data-file" label="Upload Project's Image">
            <div class="">
              <input
                type="file"
                onChange={uploadImage}
                className="file__upload_button"
                name="data-file"
              />
            </div>
          </InputWrapper>

          {dataImage && (
            <div className="project__picture">
              <img src={dataImage} alt="" />
            </div>
          )}

          <div>
            <button className="button" type="submit">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
