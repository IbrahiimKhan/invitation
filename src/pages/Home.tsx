import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{ height: "100vh" }}
        className="home d-flex align-items-center justify-content-center "
      >
        <Button
          variant="primary"
          onClick={() => navigate("/task1")}
          className="me-4"
        >
          Task 1- Alert System
        </Button>
        <Button onClick={() => navigate("/task2")} variant="primary">
          Task 2- Account invitation system
        </Button>
      </div>
    </div>
  );
};

export default Home;
