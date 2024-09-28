import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";

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
      confirmButtonColor: "#38BDF8",
      cancelButtonColor: "#94A3B8",
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

  const filteredUsers = users.filter(
    (val) =>
      val.userName.toLowerCase().includes(search.toLowerCase()) ||
      val.userEmail.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Profile",
      selector: (row) => (
        <img className="h-10 w-10 rounded-full object-cover" src={row.userProfilePic} alt="" />
      ),
      sortable: false,
    },
    {
      name: "User Name",
      selector: (row) => row.userName,
      sortable: true,
      cell: (row) => <span className="text-blue-400">{row.userName}</span>,
    },
    {
      name: "Email",
      selector: (row) => row.userEmail,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-2">
          <button
            onClick={() => handleEdit(row._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded transition-all duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded transition-all duration-300"
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
      <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="p-6 bg-gray-800 rounded-lg text-center">
              <h2 className="text-lg font-semibold text-gray-200">Total Users</h2>
              <p className="text-3xl font-bold text-blue-500">{users.length}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <Link to="/admin/addUser">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md">
                Add User
              </button>
            </Link>
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300 w-full max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* DataTable */}
          <div className="bg-transparent">
            <DataTable
              columns={columns}
              data={filteredUsers}
              pagination
              highlightOnHover
              customStyles={{
                rows: {
                  style: {
                    minHeight: "56px",
                    backgroundColor: "#1F2937",
                    "&:hover": {
                      backgroundColor: "#374151",
                      transition: "background-color 0.3s ease",
                    },
                  },
                },
                headCells: {
                  style: {
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#38BDF8",
                    backgroundColor: "#111827",
                  },
                },
                cells: {
                  style: {
                    fontSize: "15px",
                    color: "#E5E7EB",
                    backgroundColor: "#1F2937",
                  },
                },
                pagination: {
                  style: {
                    backgroundColor: "#111827",
                    color: "#E5E7EB",
                  },
                  button: {
                    style: {
                      backgroundColor: "#1F2937",
                      color: "#E5E7EB",
                      border: "none",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      "&:hover": {
                        backgroundColor: "#374151",
                      },
                    },
                  },
                },
              }}
              fixedHeader
              subHeader
              paginationComponentOptions={{
                rowsPerPageText: "Rows per page:",
                rangeSeparatorText: "of",
                selectAllRowsItem: true,
                selectAllRowsItemText: "All",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
