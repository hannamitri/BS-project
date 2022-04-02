import styles from "./DataCollected.module.scss";
import { getDataCollected } from "../../api/api";
import { insertDataCollected } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import {
  TextInput,
  Text,
  Notification,
  Button,
  Group,
  Box,
  Loader,
  Textarea,
} from "@mantine/core";
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
  const navigate = useNavigate();

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

  useEffect(() => {
    getCollectedResults();
  }, []);

  const uploadImage = async (event) => {
    console.log("TEST");
    const file = event.target.files[0];
    console.log(event.target.files);
    const base64 = await convertBase64(file);
    setDataImage(base64);
  };

  const trySubmit = async (values) => {
    console.table(dataImage);
    const dataCollected = {
      description: values.description,
      location_collected: values.location_collected,
      time_collected: values.time_collected,
      date_collected: values.date_collected,
      image: dataImage,
    };
    try {
      insertDataCollected(dataCollected);
    } catch (err) {
      console.log(err);
    }
  };

  const form = useForm({
    initialValues: {
      description: "",
      location_collected: "",
      time_collected: "",
      data_collected: "",
      image: "",
      project_id: "",
    },
  });

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
              {/* description: "",
              location_collected: "",
              time_collected: "",
              data_collected: "",
              image: "",
              project_id: "", */}
              <form onSubmit={form.onSubmit(trySubmit)}>
                <TextInput
                  required
                  icon={<MdOutlineDescription size={16} />}
                  label="Description"
                  placeholder="description"
                  {...form.getInputProps("description")}
                />
                <TextInput
                  required
                  label="Project"
                  placeholder="name of the project"
                  icon={<IoDocumentsOutline size={16} />}
                  {...form.getInputProps("project_id")}
                />
                <Textarea
                  required
                  label="Data"
                  placeholder="your data"
                  icon={<FiDatabase size={16} />}
                  minRows={3}
                  autosize
                  maxRows={10}
                  {...form.getInputProps("data_collected")}
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
