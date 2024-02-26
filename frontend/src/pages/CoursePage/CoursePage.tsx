import React from "react";
import { Material } from "./components";

const CoursePage = () => {
  return (
    <div className="course-page">
      <div className="header">
        <div className="teacher">prof. teacher</div>
        <h1 className="title">Course Name</h1>
        <p className="desc">description</p>
        <div className="enrolleds">enrolleds: 0</div>
      </div>
      <h1 className="title">Materials</h1>
      <div className="materials">
        <Material
          title={"title"}
          desc={"desc"}
          link={"https://www.google.com"}
          postDate={"2024/02/26"}
        />
        <Material
          title={"title"}
          desc={"desc"}
          link={"https://www.google.com"}
          postDate={"2024/02/26"}
        />
        <Material
          title={"title"}
          desc={"desc"}
          link={"https://www.google.com"}
          postDate={"2024/02/26"}
        />
      </div>
    </div>
  );
};

export default CoursePage;
