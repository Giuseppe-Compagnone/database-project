import React, { useEffect, useState } from "react";
import { Course } from "./components";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHeading,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button, LoadingScreen } from "../../components";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { useSqlService } from "../../../services";
import { CourseModel, StudentModel, TeacherModel } from "../../../models";
import { NotificationHandler } from "../../../utils";
import axios from "axios";

export interface CreateCourseInfo {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const CoursesPage = () => {
  //Methods
  const getTomorrowDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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

  const handleSubmit = async () => {
    console.log(info);
    const start = new Date(info.startDate);
    const end = new Date(info.endDate);
    if (end <= start) {
      NotificationHandler.instance.error(
        "The end of the course must be after the beginning"
      );
      return;
    }
    try {
      await axios.post(`${process.env.SERVER}/create-course`, {
        title: info.name,
        description: info.description,
        responsibleTeacherId: (user as TeacherModel).teacher_id,
        startDate: info.startDate,
        endDate: info.endDate,
      });
      NotificationHandler.instance.success("Course created");
      setCourses(null);
      await fetchCourse();
    } catch (err) {
      console.log(err);
      NotificationHandler.instance.error("Error on create course");
    }

    return;
  };

  const handleEnroll = async () => {
    if (!newCourse) {
      NotificationHandler.instance.error("Insert course title");
      return;
    }

    try {
      await axios.post(`${process.env.SERVER}/enroll`, {
        studentId: (user as StudentModel).student_id,
        courseName: newCourse,
        date: new Date().toISOString().substring(0, 10),
      });
      NotificationHandler.instance.success("Enrolled to " + newCourse);
      setCourses(null);
      await fetchCourse();
    } catch (err) {
      console.log(err);
      NotificationHandler.instance.error("Error on enroll");
    }
  };

  //States
  const [newCourse, setNewCourse] = useState<string>("");
  const [courses, setCourses] = useState<Array<CourseModel> | null>(null);
  const [info, setInfo] = useState<CreateCourseInfo>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  //Hooks
  const navigate = useNavigate();
  const { type, user } = useSqlService();

  //Effects
  useEffect(() => {
    if (user) {
      fetchCourse();
    }
  }, [user]);

  return (
    <LoadingScreen isLoaded={courses != null}>
      <div className="courses-page">
        <h1 className="title">Select a Course</h1>
        <div className="courses-grid">
          {courses?.map((course, i) => {
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
              <Button
                text={"Add"}
                onClick={async () => {
                  await handleEnroll();
                }}
              />
            </div>
          )}
          {type === "teacher" && courses?.length <= 0 && (
            <p className="no-items">You haven't created courses yet</p>
          )}
        </div>
        {type == "teacher" && (
          <>
            <h1 className="title">Create a Course</h1>
            <div className="create">
              <form
                className="form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleSubmit();
                }}
              >
                <div className="field-wrapper">
                  <div className="icon">
                    <FontAwesomeIcon icon={faHeading} />
                  </div>
                  <label htmlFor="name">Name (unique)</label>
                  <input
                    type="text"
                    placeholder="Course name..."
                    name="name"
                    value={info.name}
                    required
                    onChange={(e) => {
                      setInfo((old) => {
                        old.name = e.target.value;

                        return { ...old };
                      });
                    }}
                  />
                </div>
                <div className="field-wrapper">
                  <div className="icon textarea">
                    <FontAwesomeIcon icon={faFileLines} />
                  </div>
                  <label htmlFor="desc">Description</label>
                  <textarea
                    name="desc"
                    placeholder="Course description..."
                    required
                    value={info.description}
                    onChange={(e) => {
                      setInfo((old) => {
                        old.description = e.target.value;

                        return { ...old };
                      });
                    }}
                  />
                </div>
                <div className="field-wrapper">
                  <label htmlFor="start">Start date</label>
                  <input
                    type="date"
                    name="start"
                    value={info.startDate}
                    required
                    onChange={(e) => {
                      setInfo((old) => {
                        old.startDate = e.target.value;

                        return { ...old };
                      });
                    }}
                    min={getTomorrowDate()}
                  />
                </div>
                <div className="field-wrapper">
                  <label htmlFor="end">End date</label>
                  <input
                    type="date"
                    name="end"
                    value={info.endDate}
                    required
                    onChange={(e) => {
                      setInfo((old) => {
                        old.endDate = e.target.value;

                        return { ...old };
                      });
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
    </LoadingScreen>
  );
};

export default CoursesPage;
