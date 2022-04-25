import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  NotFound,
  DataCollected,
  Signout,
  Contact,
  ProjectForm,
  AdminPage,
  AdminProject,
  UserContribution,
  ProfessionalProjects,
} from "./pages";
import { Nav } from "./components";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import AddProject from "./pages/AddProject/AddProject";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import { getAll } from "./api/api";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(UserContext);
  const loggedInUser = JSON.parse(localStorage.getItem("userLogginIn"));

  const getUsers = async () => {
    const data = await getAll();
    setUsers(data);
  };

  const userLoggedIn = users?.data?.find(
    (item) => item?.email === (user?.email || user?.user?.email)
  );

  useEffect(() => {
    getUsers();
  }, []);

  console.log(userLoggedIn);

  return (
    <>
      <Nav
        openModal={openModal}
        setOpenModal={setOpenModal}
        loggedInUser={loggedInUser}
      />
      <div className="main__container">
        <Sidebar loggedInUser={loggedInUser} />
        <Routes>
          <Route
            path="/"
            element={<Home openModal={openModal} setOpenModal={setOpenModal} />}
          />
          <Route path="/signin" element={<Login />} />
          <Route
            path="/data-collected"
            element={<DataCollected userLoggedIn={loggedInUser} />}
          />
          {loggedInUser?.isAdmin && (
            <Route
              path="/signup"
              element={<Signup userLoggedIn={userLoggedIn} />}
            />
          )}
          <Route path="/*" element={<NotFound />} />
          <Route path="/Signout" element={<Signout />} />
          <Route path="/Contact" element={<Contact />} />
          {loggedInUser?.isAdmin && (
            <Route
              path="/add-user-project"
              element={<ProjectForm userLoggedIn={userLoggedIn} />}
            />
          )}
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route
            path="user-contribution/project/:id"
            element={<ProjectPage />}
          />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/manage-projects" element={<AdminProject />} />
          <Route path="/user-contribution" element={<UserContribution />} />
          <Route
            path="/my-projects"
            element={<ProfessionalProjects userLoggedIn={loggedInUser} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
