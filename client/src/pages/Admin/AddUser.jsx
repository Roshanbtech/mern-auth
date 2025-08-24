import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure to import the CSS for toastify
import AdminHeader from "../../components/AdminHeader";
function AddUser() {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.userName.trim() === "") {
        setError("Please enter a valid name");
        toast.error("Please enter a valid name");
        return;
      }
      if (formData.userEmail.trim() === "") {
        setError("Please enter a valid email");
        toast.error("Please enter a valid email");
        return;
      }
      if (formData.userPassword.trim() === "" || formData.userPassword.length < 8) {
        setError("Please enter a valid password");
        toast.error("Please enter a valid password (minimum 8 characters)");
        return;
      }

      setError("");
      const res = await fetch('/api/admin/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setError(true);
        return;
      }
      toast.success('User added successfully', {
        autoClose: 700,
        className: 'text-green-600',
        hideProgressBar: true
      });
      navigate('/admin/home');
    } catch (err) {
      console.log(err);
      setError('Failed to add user');
      toast.error('Failed to add user');
    }
  };

  return (
    <>
    <AdminHeader />
    <div className="bg-gradient-to-r from-black to-gray-800 min-h-screen flex items-center justify-center pt-24">
      <div className="p-8 max-w-lg w-full bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl text-blue-400 font-semibold text-center my-7">Add User</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="User Name"
            type="text"
            id="userName"
            className="bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            onChange={handleChange}
            autoComplete="username"
          />
          <input
            placeholder="Email"
            type="email"
            id="userEmail"
            className="bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            onChange={handleChange}
            autoComplete="email"
          />
          <input
            placeholder="Password"
            type="password"
            id="userPassword"
            className="bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-white-400 text-white p-3 rounded-lg uppercase hover:opacity-95 transition duration-300"
          >
            Add User
          </button>
        </form>
        {error && <p className="text-red-700 mt-5">{error}</p>}
      </div>
    </div>
    </>
  );
}

export default AddUser;
