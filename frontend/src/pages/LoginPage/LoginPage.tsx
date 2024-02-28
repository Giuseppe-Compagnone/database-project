import React, { useEffect, useState } from "react";
import { Button, Card } from "./../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { md5 } from "js-md5";
import { NotificationHandler } from "../../../utils";
import axios from "axios";
import { useSqlService } from "../../../services";

export interface LoginInfo {
  mail: string;
  password: string;
}

const LoginPage = () => {
  //States
  const [canSee, setCanSee] = useState<boolean>(false);
  const [info, setInfo] = useState<LoginInfo>({
    mail: "",
    password: "",
  });

  //Hooks
  const { setUser } = useSqlService();

  //Methods
  const handleSubmit = async () => {
    const hasher = md5.create();
    hasher.update(info.password);

    const password = hasher.hex();

    try {
      const res = await axios.post(`${process.env.SERVER}/login`, {
        email: info.mail,
        password: password,
      });
      setUser(res.data);
      NotificationHandler.instance.success("Logged in");
    } catch (err) {
      console.log(err);
      NotificationHandler.instance.error("Incorrenct username or password");
    }
  };

  useEffect(() => {
    (async () => {
      const hasher = md5.create();
      hasher.update("Password");

      const password = hasher.hex();

      try {
        const res = await axios.post(`${process.env.SERVER}/login`, {
          email: "compagnonegiuseppe04@gmail.com",
          password: password,
        });
        setUser(res.data);
        NotificationHandler.instance.success("Logged in");
      } catch (err) {
        console.log(err);
        NotificationHandler.instance.error("Incorrenct username or password");
      }
    })();
  }, []);

  return (
    <div className="login-page">
      <Card
        children={
          <>
            <h1 className="title">Login</h1>
            <form
              className="form"
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSubmit();
              }}
            >
              <div className="field-wrapper">
                <div className="icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <label htmlFor="mail">Email</label>
                <input
                  type="email"
                  placeholder="Your mail..."
                  name="mail"
                  value={info.mail}
                  onChange={(e) => {
                    setInfo((old) => {
                      old.mail = e.target.value;

                      return { ...old };
                    });
                  }}
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
                  value={info.password}
                  onChange={(e) => {
                    setInfo((old) => {
                      old.password = e.target.value;

                      return { ...old };
                    });
                  }}
                />
              </div>
              <Button text={"Submit"} onClick={() => {}} />
            </form>
          </>
        }
      />
      <Link to={"/signup"} className="redirect">
        Do not have an account? Signup!
      </Link>
    </div>
  );
};

export default LoginPage;
