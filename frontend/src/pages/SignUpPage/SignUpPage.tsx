import React, { useState } from "react";
import { Button, Card } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faEye,
  faEyeSlash,
  faGraduationCap,
  faHouse,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  //States
  const [canSee, setCanSee] = useState<boolean>(false);
  const [type, setType] = useState<"teacher" | "student">("student");

  return (
    <div className="sign-up-page">
      <Card
        children={
          <>
            <h1 className="title">Create Account</h1>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Submit");
              }}
            >
              <div className="field-wrapper">
                <div className="icon">
                  <FontAwesomeIcon icon={faSchool} />
                </div>
                <label htmlFor="type">User type</label>
                <select
                  name="type"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value as "student" | "teacher");
                  }}
                  required
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className="field-wrapper">
                <div className="icon">
                  <FontAwesomeIcon icon={faFaceSmile} />
                </div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Your name..."
                  name="name"
                  required
                />
              </div>
              <div className="field-wrapper">
                <div className="icon">
                  <FontAwesomeIcon icon={faHouse} />
                </div>
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  placeholder="Your surname..."
                  name="surname"
                  required
                />
              </div>
              <div className="field-wrapper">
                <div className="icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <label htmlFor="mail">Email</label>
                <input
                  type="email"
                  placeholder="Your mail..."
                  name="mail"
                  required
                />
              </div>
              <div className="field-wrapper">
                <div
                  className="icon eye"
                  onClick={() => {
                    setCanSee(!canSee);
                  }}
                >
                  <FontAwesomeIcon icon={canSee ? faEyeSlash : faEye} />
                </div>
                <label htmlFor="pass">Password</label>
                <input
                  type={canSee ? "text" : "password"}
                  placeholder="Your Password..."
                  name="pass"
                  required
                />
              </div>
              <div className="field-wrapper">
                <div
                  className="icon eye"
                  onClick={() => {
                    setCanSee(!canSee);
                  }}
                >
                  <FontAwesomeIcon icon={canSee ? faEyeSlash : faEye} />
                </div>
                <label htmlFor="confirm">Confirm</label>
                <input
                  type={canSee ? "text" : "password"}
                  placeholder="Confirm your Password..."
                  name="confirm"
                  required
                />
              </div>
              <div className="field-wrapper">
                <div
                  className={classNames(
                    "icon",
                    type === "student" && "textarea"
                  )}
                >
                  <FontAwesomeIcon
                    icon={type === "student" ? faCircleInfo : faGraduationCap}
                  />
                </div>
                <label htmlFor="optional">
                  {type === "student"
                    ? "Other details (Optional)"
                    : "Specialization"}
                </label>
                {type === "student" ? (
                  <>
                    <textarea
                      name="optional"
                      placeholder="Other info..."
                      required={false}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="your specialization..."
                      name="optional"
                      required
                    />
                  </>
                )}
              </div>
              <Button
                text={"Submit"}
                onClick={() => {
                  console.log("login");
                }}
              />
            </form>
          </>
        }
      />
      <Link to={"/login"} className="redirect">
        Already have an account? Login!
      </Link>
    </div>
  );
};

export default SignUpPage;
