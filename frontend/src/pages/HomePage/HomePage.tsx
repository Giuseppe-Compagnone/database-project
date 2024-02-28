import React, { useEffect } from "react";
import { Button } from "../../components";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER);
  }, []);
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
