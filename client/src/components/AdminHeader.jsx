import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../redux/admin/adminSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AdminHeader(){
    const {admin} = useSelector((state)=>state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
      try {
          await fetch('/api/admin/logout', {
            method: 'POST',
            credentials: 'include',
          });
          dispatch(adminLogout());
          navigate('/admin');
          toast.success('Sign Out Successful', {
            className: 'text-green-600',
            autoClose: 1000,
            hideProgressBar: true
          });
      } catch(error) {
        console.log(error);
      }
    };

    return (
      <div className="bg-gradient-to-r from-black to-gray-900 shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
          <Link to="/">
            <h1 className="text-3xl font-bold text-blue-400 tracking-wide">
              User Management App
            </h1>
          </Link>
          <ul className="flex gap-8 text-lg">
            {admin ? (
              <li className="text-gray-300">
                {admin.userName}
              </li>
            ) : ''}
            {admin ? (
              <li 
                onClick={handleLogOut} 
                className="text-red-500 hover:text-blue-400 font-bold cursor-pointer transition duration-300"
              >
                Sign Out
              </li>
            ) : ''}
          </ul>
        </div>
      </div>
    );
}
