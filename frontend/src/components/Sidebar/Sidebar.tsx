import React, { useState } from "react";
import { SidebarProps } from "./Sidebar.types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp19,
  faChalkboard,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router";
import { useSqlService } from "../../../services";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Sidebar = (props: SidebarProps) => {
  //Hooks
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { type } = useSqlService();

  return (
    <>
      {!props.blackList ? (
        <div className="sidebar">
          <div
            className={classNames("sidebar-col", props.isOpened && "opened")}
          >
            {props.isOpened && (
              <>
                <div
                  className={classNames("page", pathname === "/" && "active")}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <FontAwesomeIcon icon={faHouse} /> Home page
                </div>
                <div
                  className={classNames(
                    "page",
                    pathname === "/courses" && "active"
                  )}
                  onClick={() => navigate("/courses")}
                >
                  <FontAwesomeIcon icon={faChalkboard} /> Courses
                </div>
                {type === "student" && (
                  <div
                    className={classNames(
                      "page",
                      pathname === "/performances" && "active"
                    )}
                    onClick={() => navigate("/performances")}
                  >
                    <FontAwesomeIcon icon={faArrowUp19} /> Performances
                  </div>
                )}
                <div className="sidebar-footer">
                  <p className="text">
                    Author: Giuseppe Compagnone{" "}
                    <a
                      href="https://github.com/Giuseppe-Compagnone"
                      target="_blank"
                      className="github"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="content">{props.children}</div>
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default Sidebar;
