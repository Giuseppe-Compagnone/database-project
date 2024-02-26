import React, { useState } from "react";
import { Course } from "./components";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHeading,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

const CoursesPage = () => {
  //Methods
  const getTomorrowDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //States
  const [newCourse, setNewCourse] = useState<string>("");
  const [startDate, setStartDate] = useState(getTomorrowDate());
  const [endDate, setDate] = useState(getTomorrowDate());

  //Hooks
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
        <div className="add">
          <input
            type="text"
            placeholder="Enter course name..."
            value={newCourse}
            onChange={(e) => {
              setNewCourse(e.target.value);
            }}
          />
          <Button text={"Add"} onClick={() => {}} />
        </div>
      </div>
      <h1 className="title">Create a Course</h1>
      <div className="create">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Submit");
          }}
        >
          <div className="field-wrapper">
            <div className="icon">
              <FontAwesomeIcon icon={faHeading} />
            </div>
            <label htmlFor="name">Name (unique)</label>
            <input type="text" placeholder="Course name..." name="name" />
          </div>
          <div className="field-wrapper">
            <div className="icon textarea">
              <FontAwesomeIcon icon={faFileLines} />
            </div>
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              placeholder="Course description..."
              required={false}
            />
          </div>
          <div className="field-wrapper">
            <label htmlFor="start">Start date</label>
            <input
              type="date"
              name="start"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              min={getTomorrowDate()}
            />
          </div>
          <div className="field-wrapper">
            <label htmlFor="end">End date</label>
            <input
              type="date"
              name="end"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              min={getTomorrowDate()}
            />
          </div>
          <Button text={"Create"} onClick={() => {}} />
        </form>
      </div>
    </div>
  );
};

export default CoursesPage;
