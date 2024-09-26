import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';

function AdminHome() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/admin/home")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete this user. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#94A3B8",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("adminToken");
        axios
          .get(`/api/admin/deleteUser/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            console.log(res);
            setData((prev) => prev + 1);
            Swal.fire("Deleted!", `User has been deleted.`, "success");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const filteredUsers = users.filter((val) =>
    val.userName.toLowerCase().includes(search.toLowerCase()) ||
    val.userEmail.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: 'Profile',
      selector: row => <img className="h-10 rounded-lg" src={row.userProfilePic} alt="" />,
      sortable: false,
    },
    {
      name: 'User Name',
      selector: row => row.userName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.userEmail,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <button
            onClick={() => handleEdit(row._id)}
            className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-1 px-2 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-1 px-2 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminHeader />
      <div className="h-screen overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center text-slate-700 mt-10">
            Users
          </h1>
          <div className="flex justify-between mb-4">
            <Link to='/admin/addUser'>
              <button className="flex justify-between bg-slate-900 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-80 max-w-xl px-8 py-2 my-2">
                Add User
              </button>
            </Link>
            
          </div>

          <DataTable
            columns={columns}
            data={filteredUsers}
            pagination
            searchable
            highlightOnHover
            fixedHeader
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </div>
    </>
  );
}

export default AdminHome;
