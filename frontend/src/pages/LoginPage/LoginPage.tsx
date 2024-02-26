import React, { useState } from "react";
import { Button, Card } from "./../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoginPage = () => {
  //States
  const [canSee, setCanSee] = useState<boolean>(false);

  return (
    <div className="login-page">
      <Card
        children={
          <>
            <h1 className="title">Login</h1>
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
                <input type="email" placeholder="Your mail..." name="mail" />
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
                />
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
      <Link to={"/signup"} className="redirect">
        Do not have an account?? Signup!
      </Link>
    </div>
  );
};

export default LoginPage;
