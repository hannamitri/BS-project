import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  NotFound,
  DataCollected,
  Signout,
  Contact,
} from "./pages";
import { Nav } from "./components";
import ProjectPage from "./components/ProjectPage/ProjectPage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/data-collected" element={<DataCollected />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Signout" element={<Signout />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/:id" element={<ProjectPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
