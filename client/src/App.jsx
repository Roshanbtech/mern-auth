import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AdminHome from "./pages/Admin/AdminHome";
import AddUser from "./pages/Admin/AddUser";
import EditUser from "./pages/Admin/EditUser";
import Login from "./pages/Admin/Login";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/edit/:id" element={<EditUser />} />
        </Route>
        <Route path="/admin/addUser" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
