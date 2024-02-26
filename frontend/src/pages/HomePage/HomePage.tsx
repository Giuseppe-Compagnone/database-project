import React from "react";
import { Button } from "../../components";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1 className="title">Welcome to Elearning System</h1>
      <img src="build/images/logo.jpg" alt="logo" className="logo" />
      <p className="text">Select a course to start</p>
      <Button
        text={"Courses"}
        onClick={() => {
          navigate("/courses");
        }}
      />
    </div>
  );
};

export default HomePage;
