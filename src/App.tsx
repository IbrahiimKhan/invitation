import React from "react";
import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Task1 from "./pages/Task1";
import Task2 from "./pages/Task2";
import Invite from "./pages/Invite";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task1" element={<Task1 />} />
        <Route path="/task2" element={<Task2 />} />
        <Route path="/task2/invite" element={<Invite />} />
      </Routes>
    </div>
  );
};

export default App;
