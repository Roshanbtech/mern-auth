import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, adminLoginFailure } from "../../redux/admin/adminSlice.js";
import { toast } from "react-toastify";
import AdminHeader from "../../components/AdminHeader.jsx"; // Uncomment if needed

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isLogged) {
      navigate("/admin/home");
    }
  }, [isLogged, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(adminLogin(data));

      if (data.success === false) {
        dispatch(adminLoginFailure(data));
        navigate("/admin");
        toast.error(data.message, {
          autoClose: 500,
          hideProgressBar: true,
        });
        return;
      }
      navigate("/admin/home", { replace: true });
      toast.success("Login Successful", {
        autoClose: 500,
        className: "text-green-600",
        hideProgressBar: true,
      });
    } catch (error) {
      dispatch(adminLoginFailure(error));
      console.error("Login Error:", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="bg-gradient-to-r from-black to-gray-800 min-h-screen flex items-center justify-center pt-24">
        <TiltCard
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
        />
      </div>
    </>
  );
};

const TiltCard = ({ handleChange, handleSubmit, formData }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-gray-900 shadow-lg p-6"
      >
        <h1 className="text-2xl text-blue-400 font-semibold text-center mb-4">
          Admin Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            id="userName"
            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="userPassword"
            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg uppercase hover:opacity-90 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
