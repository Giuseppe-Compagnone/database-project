import React from "react";
import { Course } from "./components";
import { Link, useNavigate } from "react-router-dom";

const CoursesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="courses-page">
      <h1 className="title">Select a Course</h1>
      <div className="courses-grid">
        <Course
          name={"italiano"}
          teacherName={"Giuseppe Compagnone"}
          onClick={() => {
            navigate("/course/italiano");
          }}
        />
        <Course
          name={"matematica"}
          teacherName={"Giuseppe Aiello"}
          onClick={() => {
            navigate("/course/matematica");
          }}
        />
      </div>
    </div>
  );
};

export default CoursesPage;
