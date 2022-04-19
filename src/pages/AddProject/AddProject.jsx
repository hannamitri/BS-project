import React, { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { insertProject } from "../../api/api";
import { useForm } from "@mantine/form";
import "./AddProject.scss";
import Message from "../../components/UI/Message/Message";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IoIosCloseCircle, IoIosCheckbox } from "react-icons/io";
const AddProject = () => {
  const [dataImage, setDataImage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  let specialDate = new Date();
  const dtfUS = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

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
    if (values.category.length > 45) {
      setErrorStatus(true);
      setErrorMessage("Project's Category cannot exceed 45 characters.")
    }
    else if (values.name.length > 45) {
      setErrorStatus(true);
      setErrorMessage("Project's Name cannot exceed 45 characters.")
    }
    else {
      setErrorStatus(false);

      const project = {
        category: values.category,
        name: values.name,
        image: dataImage,
        date_created: dtfUS.format(specialDate),
      }
      try {
        if (insertProject(project)) {
          setSuccessStatus(true);
          values.category = "";
          values.name = "";
          setDataImage("");
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

  return (
    <div className="flex">
      <Sidebar />
      <div className="project__form--wrapper">
        {errorStatus && (
          <Message
            title={errormessage}
            setStatus={setErrorStatus}
            NotificationIcon={IoIosCloseCircle}
          />
        )}
        {successStatus && (
          <Message
            title="Project Added Successufully!!!"
            setStatus={setSuccessStatus}
            NotificationIcon={IoIosCheckbox}
          />
        )}
        <form className="project__form" onSubmit={form.onSubmit(trySubmit)}>
          <TextInput
            required
            icon={<HiOutlineAtSymbol size={16} />}
            label="Project Category"
            placeholder="Project Category"
            {...form.getInputProps("category")}
          />
          <TextInput
            required
            icon={<FaUserAlt size={16} />}
            label="Project name"
            placeholder="Project name"
            {...form.getInputProps("name")}
          />
          <input type="file" onChange={uploadImage} />
          <br />

          <img src={dataImage} alt="" />

          <Button type="submit" style={{ marginTop: 15 }}>
            Add Project
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
