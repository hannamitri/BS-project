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
} from "./pages";
import { Nav } from "./components";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import AddProject from "./pages/AddProject/AddProject";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import { getAll } from "./api/api";

function App() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

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
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/data-collected"
          element={<DataCollected userLoggedIn={userLoggedIn} />}
        />
        {userLoggedIn?.isAdmin && (
          <Route path="/signup" element={<Signup />} />
        )}
        <Route path="/*" element={<NotFound />} />
        <Route path="/Signout" element={<Signout />} />
        <Route path="/Contact" element={<Contact />} />
        <Route
          path="/add-user-project"
          element={<ProjectForm userLoggedIn={userLoggedIn} />}
        />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/:id" element={<ProjectPage />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/manage-projects" element={<AdminProject />} />

      </Routes>
    </>
  );
}

export default App;
