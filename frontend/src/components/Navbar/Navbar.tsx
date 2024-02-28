import { useLocation, useNavigate } from "react-router";
import { NavbarProps } from "./Navbar.types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserPicture from "../UserPicture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import classNames from "classnames";
import { useSqlService } from "../../../services";
import Button from "../Button";

const Navbar = (props: NavbarProps) => {
  //States
  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true);

  //Hooks

  const { pathname } = useLocation();
  const { user, setUser } = useSqlService();
  const navigate = useNavigate();

  //Effects

  useEffect(() => {
    if (user) {
      if (["/login", "/signup"].includes(pathname)) {
        navigate("/");
      }
    } else {
      if (!["/login", "/signup"].includes(pathname)) {
        navigate("/login");
      }
    }
  }, [pathname, user]);

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
            <div className="separator"></div>
            {user && (
              <Button
                text={"Logout"}
                onClick={() => {
                  setUser(null);
                }}
              />
            )}
            {user && (
              <div className="avatar">
                <UserPicture name={user.name + " " + user.surname} size={2.8} />
              </div>
            )}
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
