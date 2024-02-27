import { useLocation } from "react-router";
import { NavbarProps } from "./Navbar.types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserPicture from "../UserPicture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import classNames from "classnames";

const Navbar = (props: NavbarProps) => {
  //States
  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true);

  //Hooks
  const { pathname } = useLocation();

  return (
    <>
      <>
        {!props.blacklist.includes(pathname) && (
          <nav className="navbar">
            <div
              className={classNames("hamburger", isSidebarOpened && "opened")}
              onClick={() => {
                setIsSidebarOpened(!isSidebarOpened);
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
            <Link className="logo" to={"/"}>
              <img src="build/images/logo.jpg" alt="logo" />
              Elearning System
            </Link>
            <div className="avatar">
              <UserPicture name={"Giuseppe Compagnone"} size={2.8} />
            </div>
          </nav>
        )}
        <div className="page-content">
          <Sidebar
            children={props.children}
            isOpened={isSidebarOpened}
            blackList={props.blacklist.includes(pathname)}
          />
        </div>
      </>
    </>
  );
};

export default Navbar;
