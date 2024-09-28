import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is here
import AdminHeader from '../../components/AdminHeader';
import Swal from "sweetalert2";

function EditUser() {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user data to populate the form
    axios.get(`/api/admin/edit/${id}`)
      .then((res) => {
        setUserName(res.data.userName);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to fetch user data');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send only the updated userName in the request
    axios.post(`/api/admin/edit/${id}`, { userName })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
         Swal.fire({
          toast: true,
          position: 'top-end',
           icon: 'success',
           title: 'User updated successfully',
           text: 'User has been updated successfully',
           timer: 3000,
           showConfirmButton: false,  
         })
        }else {
          console.log(res.data);
          setError('Failed to update user');
        }
        navigate('/admin/home');
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to update user');
      });
  };

  return (
    <>
      <AdminHeader />
      <div className="bg-gradient-to-r from-black to-gray-800 min-h-screen flex items-center justify-center pt-24">
        <div className="p-8 max-w-lg w-full bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-3xl text-blue-400 font-semibold text-center my-7">Edit User</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              value={userName} // Changed from defaultValue to value
              type="text"
              id="userName"
              className="bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              onChange={(e) => setUserName(e.target.value)}
            />
            <button type='submit' className="bg-gradient-to-r from-blue-500 to-white-400 text-white p-3 rounded-lg uppercase hover:opacity-95 transition duration-300">
              Edit User
            </button>
          </form>
          {error && <p className="text-red-700 mt-5 text-center">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default EditUser;
