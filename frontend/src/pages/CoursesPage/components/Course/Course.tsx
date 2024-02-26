import { UserPicture } from "../../../../components";
import { CourseProps } from "./Course.types";
import React from "react";

const Course = (props: CourseProps) => {
  return (
    <div
      className="course"
      onClick={() => {
        props.onClick();
      }}
    >
      <UserPicture size={4} name={props.name} />
      <p className="name">{props.name}</p>
      <p className="teacher">prof. {props.teacherName}</p>
    </div>
  );
};

export default Course;
