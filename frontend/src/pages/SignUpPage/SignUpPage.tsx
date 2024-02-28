import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { NotificationHandler } from "../../../utils";
import axios from "axios";
import { md5 } from "js-md5";

export interface SignUpInfo {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirm: string;
  specialization: string;
  details: string;
}

const SignUpPage = () => {
  //States
  const [canSee, setCanSee] = useState<boolean>(false);
  const [type, setType] = useState<"teacher" | "student">("student");
  const [values, setValues] = useState<SignUpInfo>({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirm: "",
    specialization: "",
    details: "",
  });

  //Hooks
  const navigate = useNavigate();

  //Methods

  const handleSubmit = async () => {
    if (values.password !== values.confirm) {
      NotificationHandler.instance.error("Passwords doesn't match");
      return;
    }

    const password = md5.create();
    password.update(values.password);
    try {
      if (type === "student") {
        await axios.post(`${process.env.SERVER}/signup/student`, {
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: password.hex(),
          other_details: values.details,
        });
      } else {
        await axios.post(`${process.env.SERVER}/signup/teacher`, {
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: password.hex(),
          specialization: values.specialization,
        });
      }
      NotificationHandler.instance.success("Account created");
      navigate("/login");
    } catch (err) {
      NotificationHandler.instance.error("Error on signup");
    }
  };

  return (
    <div className="sign-up-page">
      <Card
        children={
          <>
            <h1 className="title">Create Account</h1>
            <form
              className="form"
              onSubmit={async (e) => {
                e.preventDefault();
                console.log("submit");
                await handleSubmit();
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
                  value={values.name}
                  onChange={(e) => {
                    setValues((old) => {
                      old.name = e.target.value;

                      return { ...old };
                    });
                  }}
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
                  value={values.surname}
                  onChange={(e) => {
                    setValues((old) => {
                      old.surname = e.target.value;

                      return { ...old };
                    });
                  }}
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
                  value={values.email}
                  onChange={(e) => {
                    setValues((old) => {
                      old.email = e.target.value;

                      return { ...old };
                    });
                  }}
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
                  value={values.password}
                  onChange={(e) => {
                    setValues((old) => {
                      old.password = e.target.value;

                      return { ...old };
                    });
                  }}
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
                  value={values.confirm}
                  onChange={(e) => {
                    setValues((old) => {
                      old.confirm = e.target.value;

                      return { ...old };
                    });
                  }}
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
                      value={values.details}
                      onChange={(e) => {
                        setValues((old) => {
                          old.details = e.target.value;

                          return { ...old };
                        });
                      }}
                      required={false}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="your specialization..."
                      name="optional"
                      value={values.specialization}
                      onChange={(e) => {
                        setValues((old) => {
                          old.specialization = e.target.value;

                          return { ...old };
                        });
                      }}
                      required
                    />
                  </>
                )}
              </div>
              <Button text={"Submit"} onClick={() => {}} />
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
