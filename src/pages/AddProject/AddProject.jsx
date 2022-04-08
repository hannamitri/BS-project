import React, { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { insertProject } from "../../api/api";
import { useForm } from "@mantine/form";

const AddProject = () => {
  const [dataImage, setDataImage] = useState("");

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
    console.log(event.target.files);
    const base64 = await convertBase64(file);
    setDataImage(base64);
  };

  const trySubmit = async (values) => {
    console.table(dataImage);
    const project = {
      category: values.category,
      name: values.name,
      image: dataImage,
      date_created: dtfUS.format(specialDate),
    };
    try {
      insertProject(project);
    } catch (err) {
      console.log(err);
    }
  };

  const form = useForm({
    initialValues: {
      category: "",
      name: "",
    },
  });

  return (
    <div>
      <form onSubmit={form.onSubmit(trySubmit)}>
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

        <Button type="submit" style={{ marginTop: 15 }}>
          Add Project
        </Button>
      </form>
    </div>
  );
};

export default AddProject;