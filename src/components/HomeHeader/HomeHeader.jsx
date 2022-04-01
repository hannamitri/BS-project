import React, { useEffect, useState } from "react";
import { getAll, getDataCollected } from "../../api/api";
import header from "./HomeHeader.module.scss";
import { FaLayerGroup } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";

const HomeHeader = () => {
  const [dataCollected, setDataCollected] = useState([]);
  const [users, setUsers] = useState([]);
  const getCollectedResults = async () => {
    const data = await getDataCollected();
    setDataCollected(data);
  };

  const getUsers = async () => {
    const data = await getAll();
    setUsers(data);
  };

  useEffect(() => {
    getCollectedResults();
    getUsers();
  }, []);

  return (
    <div className={header.header_wrapper}>
      <div>
        <div>Welcome to web portal</div>
        <div>Feel free to browse any of the below projects</div>
      </div>

      <div className={header.header_content_wrapper}>
        <div>
          <div>
            <FaLayerGroup />
          </div>
          <div>
            <div>{dataCollected.data?.length}</div>
            <div>Projects</div>
          </div>
        </div>

        <div>
          <div>
            <GrGroup />
          </div>
          <div>
            <div>{users.data?.length}</div>
            <div>Users Contributed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
