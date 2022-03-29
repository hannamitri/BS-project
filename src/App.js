import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, NotFound } from "./pages";
import { Nav } from "./components";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
