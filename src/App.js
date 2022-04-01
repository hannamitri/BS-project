import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, NotFound, DataCollected, Signout } from "./pages";
import { Nav } from "./components";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Nav />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/data-collected" element={<DataCollected />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Signout" element={<Signout />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
