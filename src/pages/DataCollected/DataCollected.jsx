import "./DataCollected.scss";
import { getAllProjects, getDataCollected, getProjectId } from "../../api/api";
import { insertDataCollected, getProjectsByUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Clock, Calendar } from "tabler-icons-react";
import Message from "../../components/UI/Message/Message";
import {
  TextInput,
  Notification,
  Button,
  Group,
  Box,
  Loader,
  Textarea,
  Select,
  InputWrapper,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { Lock, X } from "tabler-icons-react";
import { z } from "zod";
import LoginIllustration from "../../images/Login/data.svg";
import { Link } from "react-router-dom";
import { FiDatabase } from "react-icons/fi";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IoIosCloseCircle, IoIosCheckbox } from "react-icons/io";

export const DataCollected = ({ userLoggedIn }) => {
  const { user, loading, setUser } = useContext(UserContext);
  const [userNotFound, setUserNotFound] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [totalprojects, setTotalProjects] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const [successStatus, setSuccessStatus] = useState(false);

  const getProjectsofUser = async () => {
    let user = {
      user_id: +userLoggedIn?.user_id,
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
    if (file.size / 1024 > 1000) {
      setErrorStatus(true);
      setErrorMessage("Image size should be less than 1MB.");
      console.log("nope nope");
    } else {
      setErrorStatus(false);
      const base64 = await convertBase64(file);
      setDataImage(base64);
      console.log("yes yes");
    }
  };

  const trySubmit = async (values) => {
    const project = {
      name: values.project_name,
    };

    const selected_project_id = allProjects?.data?.find(
      (item) => item?.name === project.name
    );

    console.log(selected_project_id);

    if (values.location_collected.length > 45) {
      setErrorStatus(true);
      setErrorMessage("Location Collected cannot exceed 45 characters");
    } else if (values.description.length > 255) {
      setErrorStatus(true);
      setErrorMessage("Description cannot exceed 255 characters");
    } else {
      setErrorStatus(false);
      const dataCollected = {
        description: values.description,
        title: values.title,
        location_collected: values.location_collected,
        time_collected: values.time_collected,
        date_collected: values.date_collected,
        image: dataImage,
        project_id: selected_project_id?.project_id,
        user_id: +userLoggedIn?.user_id,
      };
      try {
        if (await insertDataCollected(dataCollected)) {
          setSuccessStatus(true);
          setErrorStatus(false);
          values.description = "";
          values.title = "";
          values.location_collected = "";
          values.time_collected = null;
          values.date_collected = null;
          values.project_name = "";
          setDataImage("");
        } else {
          // setErrorStatus(true)
          // setErrorMessage("An error occured! Try uploading data again.")
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const form = useForm({
    initialValues: {
      title: "",
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

  console.log(userLoggedIn);

  useEffect(() => {
    getCollectedResults();
    getProjectsofUser();
    getAllProjectss();
  }, [userLoggedIn?.user_id]);

  return (
    <div className="main__content--wrapper">
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

      <div className="data__collected--wrapper">
        <div className="data__collected--image-wrapper">
          <img src={LoginIllustration} alt="Illustration" width={300} />
        </div>
        <div>
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
              title="Data Collected Uploaded Successufully!!!"
              setStatus={setSuccessStatus}
              NotificationIcon={IoIosCheckbox}
            />
          )}

          <h1>Upload data</h1>
          <form
            className="data__collected--form"
            onSubmit={form.onSubmit(trySubmit)}
          >
            <TextInput
              required
              placeholder="Title"
              {...form.getInputProps("title")}
            />
            <TextInput
              required
              placeholder="Location Collected"
              {...form.getInputProps("location_collected")}
            />
            <DatePicker
              placeholder="Date Collected"
              icon={<Calendar size={16} />}
              required
              {...form.getInputProps("date_collected")}
            />
            <TimeInput
              placeholder="Time Collected"
              hoursLabel="Hours"
              minutesLabel="Minutes"
              seconds="Seconds"
              format="12"
              icon={<Clock size={16} />}
              required
              {...form.getInputProps("time_collected")}
            />

            <Select
              data={formatDataProjects()}
              required
              searchable
              clearable
              placeholder={"Select a Project"}
              {...form.getInputProps("project_name")}
            />
            <Textarea
              required
              placeholder="Description of data"
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

            <InputWrapper id="data-file" label="Upload Data Image">
              <div>
                <input
                  type="file"
                  onChange={uploadImage}
                  className="file__upload_button"
                  name="data-file"
                />
              </div>
            </InputWrapper>

            {dataImage && (
              <div className="input__image">
                <img src={dataImage} alt="" />
              </div>
            )}

            {loadingState ? (
              <span className="loading">
                <Loader />
              </span>
            ) : (
              <button className="button data__collected--button" type="submit">
                Submit data
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
