import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminHeader from '../../components/AdminHeader';

function EditUser() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
 

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/admin/edit/${id}`)
      .then((res) => {
        setUserName(res.data.username);
        setEmail(res.data.email);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to fetch user data');
      });
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/admin/edit/${id}`, { userName, email })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          navigate("/admin/home");
          toast.success('User updated successfully',{
            autoClose: 700,
            className:'text-green-600',
            hideProgressBar: true
          })
        } else {
          setError('Failed to update user');
        }
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to update user');
      });
  };


  return (
    <>
    <AdminHeader/>
    <div className="p-3 max-w-lg mx-auto mt-14">
      <h1 className="text-3xl text-slate-700 font-semibold text-center my-7">Edit User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          defaultValue={userName}
          type="text"
          id="username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={(e) => setUserName(e.target.value)}
          />
        {/* <input
          defaultValue={email}
          type="email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        
        <button type='submit' className="bg-slate-600 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-80 max-w-lg p-2 my-2">
          Edit User
        </button>
      </form>
    </div>
    </>
  );
}

export default EditUser;