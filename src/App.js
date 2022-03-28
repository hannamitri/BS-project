import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
