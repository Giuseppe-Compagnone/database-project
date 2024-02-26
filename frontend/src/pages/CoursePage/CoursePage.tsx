import React, { useState } from "react";
import { Material } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHeading,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { Button } from "../../components";

const CoursePage = () => {
  //States
  const [evaluation, setEvaluation] = useState<string>("");

  return (
    <div className="course-page">
      <div className="header">
        <div className="teacher">prof. teacher</div>
        <h1 className="title">Course Name</h1>
        <p className="desc">description</p>
        <div className="enrolleds">Enrolleds: 0</div>
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
      <h1 className="title">Upload Material</h1>
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
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Material name..." name="name" />
        </div>
        <div className="field-wrapper">
          <div className="icon textarea">
            <FontAwesomeIcon icon={faFileLines} />
          </div>
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            placeholder="Material description..."
            required={false}
          />
        </div>
        <div className="field-wrapper">
          <div className="icon">
            <FontAwesomeIcon icon={faLink} />
          </div>
          <label htmlFor="link">Link</label>
          <input type="text" placeholder="Material link..." name="link" />
        </div>
        <Button text={"Upload"} onClick={() => {}} />
      </form>
      <h1 className="title" style={{ margin: "2rem 0" }}>
        Upload Student Performance
      </h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Submit");
        }}
      >
        <div className="field-wrapper">
          <div className="icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <label htmlFor="mail">Email</label>
          <input type="email" placeholder="Student email..." name="mail" />
        </div>

        <div className="field-wrapper">
          <div className="icon">
            <FontAwesomeIcon icon={faLink} />
          </div>
          <label htmlFor="eval">Evaluation</label>
          <input
            type="text"
            placeholder="Student Evaluation"
            name="eval"
            value={evaluation}
            onChange={(e) => {
              if (e.target.value === "") {
                setEvaluation("");
                return;
              }
              if (!/^-?\d*$/.test(e.target.value)) return;
              const evaluation = parseInt(e.target.value);
              if (evaluation > 30) {
                setEvaluation("30");
              } else {
                setEvaluation(evaluation.toString());
              }
            }}
          />
        </div>
        <Button text={"Upload"} onClick={() => {}} />
      </form>
    </div>
  );
};

export default CoursePage;
