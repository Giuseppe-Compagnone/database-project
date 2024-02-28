import React, { useEffect, useState } from "react";
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
import { useSqlService } from "../../../services";
import { CourseModel, StudentModel, TeacherModel } from "../../../models";
import { NotificationHandler } from "../../../utils";
import axios from "axios";

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
  const [courses, setCourses] = useState<Array<CourseModel>>([]);

  //Hooks
  const navigate = useNavigate();
  const { type, user } = useSqlService();

  //Effects
  useEffect(() => {
    if (user) {
      fetchCourse();
    }
  }, [user]);

  //Methods

  const fetchCourse = async () => {
    if (type === "student") {
      try {
        const res = await axios.get(
          `${process.env.SERVER}/courses/student/${
            (user as StudentModel).student_id
          }`
        );
        setCourses(res.data || []);
      } catch (err) {
        console.log(err);
        NotificationHandler.instance.error("Error on getting courses");
      }
    } else {
      try {
        const res = await axios.get(
          `${process.env.SERVER}/courses/teacher/${
            (user as TeacherModel).teacher_id
          }`
        );
        setCourses(res.data || []);
      } catch (err) {
        console.log(err);
        NotificationHandler.instance.error("Error on getting courses");
      }
    }
  };

  return (
    <div className="courses-page">
      <h1 className="title">Select a Course</h1>
      <div className="courses-grid">
        {courses.map((course, i) => {
          return (
            <>
              <Course
                key={i}
                name={course.title}
                teacherName={course.responsible_teacher_id as string}
                onClick={() => {
                  navigate(`/course/${course.title}`);
                }}
              />
            </>
          );
        })}

        {type === "student" && (
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
        )}
      </div>
      {type == "teacher" && (
        <>
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
        </>
      )}
    </div>
  );
};

export default CoursesPage;
