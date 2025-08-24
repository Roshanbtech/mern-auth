import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup,getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const result = await signInWithPopup(auth, provider);
        // console.log(result);
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            }),
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch');
        }
        const data = await res.json();
        console.log(data);
        dispatch(loginSuccess(data));
        navigate('/');
    } catch (error) {
      console.log("Something went wrong with Google OAuth:", error);
    }
  };
  return (
    <button
      type="button"
      className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-300 text-white p-3 rounded-lg uppercase hover:bg-gradient-to-l transition duration-300 shadow-lg"
      onClick={handleGoogle}
    >
      <FcGoogle className="mr-2 text-2xl" />
      <span className="text-lg text-black">Continue with Google</span>
    </button>
  );
};

export default OAuth;
