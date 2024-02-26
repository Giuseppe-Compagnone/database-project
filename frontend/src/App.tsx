import React from "react";
import "./../styles/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CoursePage,
  CoursesPage,
  HomePage,
  LoginPage,
  PerformancesPage,
  SignUpPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components";

const App = () => {
  //States
  const blacklist = ["/login", "/signup"];

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar blacklist={blacklist}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/course" element={<CoursePage />}></Route>
            <Route path="/courses" element={<CoursesPage />}></Route>
            <Route path="/performances" element={<PerformancesPage />}></Route>
          </Routes>
        </Navbar>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
