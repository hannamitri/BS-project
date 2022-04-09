import styles from "./DataCollected.module.scss";
import {
  getAllProjects,
  getDataCollected,
  getProjectId,
} from "../../api/api";
import { insertDataCollected, getProjectsByUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Clock, Calendar } from 'tabler-icons-react';
import {
  TextInput,
  Text,
  Notification,
  Button,
  Group,
  Box,
  Loader,
  Textarea,
  Select,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { Lock, X } from "tabler-icons-react";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { z } from "zod";
import LoginIllustration from "../../images/Login/data.svg";
import { Link } from "react-router-dom";
import { MdOutlineDescription } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { FiDatabase } from "react-icons/fi";

export const DataCollected = () => {
  const { user, loading, setUser } = useContext(UserContext);
  const [userNotFound, setUserNotFound] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  const [allProjects, setAllProjects] = useState([]);
  const [totalprojects, setTotalProjects] = useState([]);
  const [singleProject, setSingleProject] = useState("");

  const getProjectsofUser = async () => {
    let user = {
      user_id: 4,
    };
    const data = await getProjectsByUser(user);
    setAllProjects(data);
  };

  const getAllProjectss = async () => {
    const data = await getAllProjects(user);
    setTotalProjects(data);
  };

  const schema = z.object({
    description: z.string().min(10),
    location_collected: z.string().min(1),
    time_collected: z.number().min(1),
    data_collected: z.string().min(1),
    image: z.string().min(1),
    project_id: z.string().min(1),
  });

  const [dataCollected, setDataCollected] = useState([]);

  const [dataImage, setDataImage] = useState("");

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

  const getCollectedResults = async () => {
    const data = await getDataCollected();
    setDataCollected(data);
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    console.log(event.target.files);
    const base64 = await convertBase64(file);
    setDataImage(base64);
  };

  const trySubmit = async (values) => {

    const project = {
      name: values.project_name,
    }

    const selected_project_id = allProjects?.data?.find(
      (item) => item?.name === project.name
    );

    console.log(selected_project_id);

    const dataCollected = {
      description: values.description,
      location_collected: values.location_collected,
      time_collected: values.time_collected,
      date_collected: values.date_collected,
      image: dataImage,
      project_id: selected_project_id?.project_id,
      user_id: 4,
    };
    try {
      insertDataCollected(dataCollected);
      console.log(dataCollected);
    } catch (err) {
      console.log(err);
    }
  };

  const form = useForm({
    initialValues: {
      description: "",
      location_collected: "",
      time_collected: "",
      date_collected: "",
      image: "",
      project_name: "",
    },
  });

  const formatDataProjects = () => {
    let newProjects = [];
    allProjects?.data?.map((project, index) => {
      newProjects.push(project.name);
    });
    return newProjects;
  };

  useEffect(() => {
    getCollectedResults();
    getProjectsofUser();
    getAllProjectss();
  }, []);

  return (
    <>
      <main className={styles.container}>
        {userNotFound && (
          <Notification
            icon={<X size={18} />}
            color="red"
            title="Signin failed"
            styles={{
              root: {
                backgroundColor: "#FB5D64",
                position: "absolute",
                zIndex: 3,
                opacity: 0.95,
                top: 90,
              },
              title: { color: "228BE6", fontWeight: "bold" },
              description: { color: "white" },
              icon: {
                color: "white",
              },
              closeButton: { color: "white", ":hover": { color: "black" } },
            }}
            onClose={() => setUserNotFound(false)}
          >
            A user was not found!
          </Notification>
        )}

        <section className={styles.view}>
          <div className={styles.mainContent}>
            <article className={styles.leftview}>
              <img src={LoginIllustration} alt="Illustration" width={500} />
              <Link to="/signup">View data</Link>
            </article>
            <Box sx={{ maxWidth: 300 }} mx="auto" className={styles.rightview}>
              <h1>Upload data</h1>
              <form onSubmit={form.onSubmit(trySubmit)}>
                <TextInput
                  required
                  label="Location Collected"
                  placeholder="Location"
                  {...form.getInputProps("location_collected")}
                />
                <DatePicker
                  placeholder="Pick date"
                  icon={<Calendar size={16} />}
                  label="Date Collected"
                  required
                  {...form.getInputProps("date_collected")}
                />
                <TimeInput
                  label="Time Collected"
                  format="12"
                  icon={<Clock size={16} />}
                  required
                  {...form.getInputProps("time_collected")}
                />

                <Select
                  data={formatDataProjects()}
                  label="Projects"
                  required
                  searchable
                  clearable
                  placeholder={"Select a Project"}
                  {...form.getInputProps("project_name")}

                />
                <Textarea
                  required
                  label="Description"
                  placeholder="your data"
                  icon={<FiDatabase size={16} />}
                  minRows={3}
                  autosize
                  maxRows={10}
                  {...form.getInputProps("description")}
                  styles={{
                    icon: {
                      alignItems: "flex-start",
                      marginTop: 16,
                    },
                  }}
                />
                <input type="file" onChange={uploadImage} />

                <Group position="left" mt="md" style={{ position: "relative" }}>
                  {loadingState ? (
                    <span className={styles.loading}>
                      <Loader />
                    </span>
                  ) : (
                    <Button type="submit">Submit data</Button>
                  )}
                </Group>
              </form>
            </Box>
          </div>
          <div className={styles.alternatives}>
            <div className={styles.leftalt}></div>
          </div>
        </section>
      </main>
    </>
  );
};
