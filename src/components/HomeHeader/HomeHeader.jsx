import React, { useEffect, useState } from "react";
import { getAll, getAllProjects } from "../../api/api";
import { FaLayerGroup } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import "./HomeHeader.scss";

const HomeHeader = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const getTotalProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
  };

  const getUsers = async () => {
    const data = await getAll();
    setUsers(data);
  };

  useEffect(() => {
    getTotalProjects();
    getUsers();
  }, []);

  return (
    <div className="header__wrapper">
      <div>
        <h2>Welcome to web portal</h2>
        <div>Feel free to browse any of the below projects</div>
      </div>

      <div className="header__contact--wrapper">
        <div>
          <div>
            <FaLayerGroup />
          </div>
          <div>
            <div>{allProjects?.data?.length}</div>
            <div>Projects</div>
          </div>
        </div>

        <div>
          <div>
            <ImUsers />
          </div>
          <div>
            <div>{users?.data?.length}</div>
            <div>Users Contributed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
