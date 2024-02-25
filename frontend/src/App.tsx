import React from "react";
import "./../styles/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, SignUpPage } from "./pages";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
