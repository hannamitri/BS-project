import styles from "./DataCollected.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getDataCollected } from "../../api/api";
import { insertDataCollected } from "../../api/api";
import { useNavigate } from "react-router-dom";
export const DataCollected = () => {
  const { user, setUser } = useContext(UserContext);
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
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setDataImage(base64);
  };

  const description = useRef();
  const location_collected = useRef();
  const time_collected = useRef();
  const data_collected = useRef();

  const trySubmit = async (e) => {
    e.preventDefault();
    const dataCollected = {
      description: description.current.value,
      location_collected: location_collected.current.value,
      time_collected: time_collected.current.value,
      data_collected: data_collected.current.value,
      image: dataImage,
    };

    insertDataCollected(dataCollected)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  return (
    <main className={styles.container}>
      <div>
        <h1>Upload data here...</h1>
        <form onSubmit={trySubmit}>
          <fieldset>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" ref={description} autoFocus />
            </div>
            <div>
              <label htmlFor="name">Email</label>
              <input type="email" ref={location_collected} />
            </div>
            <div>
              <label htmlFor="name">Password</label>
              <input type="password" ref={time_collected} />
            </div>
            <div>
              <label htmlFor="name">Location</label>
              <input type="text" ref={data_collected} />
            </div>
            <div>
              <label>Upload image</label>
            </div>
            <input type="file" onChange={(e) => uploadImage(e)} />
            <button>upload data</button>
          </fieldset>
        </form>

        {dataCollected?.data?.map((data) => (
          <div key={data.id}>
            <h2>{data.description}</h2>
            <h2>{data.location_collected}</h2>
            <h2>{data.time_collected}</h2>
            <h2>{data.data_collected}</h2>
            <img src={data.image} alt="data collected" />
            <br />
            <br />
            <br />
            <br />
          </div>
        ))}
      </div>
    </main>
  );
};
