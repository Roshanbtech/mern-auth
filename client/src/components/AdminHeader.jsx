import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../redux/admin/adminSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AdminHeader(){
    const {admin} = useSelector((state)=>state.admin);
    const navigate = useNavigate();
    const dispatch= useDispatch()

    
    const handleLogOut =async ()=>{
      try{
          await fetch('/api/admin/logout');
          dispatch(adminLogout())
          navigate('/admin')
          toast.success('Sign Out Successfull',{
           className:'text-green-600',
           autoClose: 1000,
           hideProgressBar: true
         })
         }catch(error){
       console.log(error)
         }
       }

    
         return (
            <div className="bg-slate-200">
              <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/">
                  <h1 className="font-bold text-slate-700">User Management App</h1>
                </Link>
                <ul className="flex gap-4">
                  {admin?
                  (<li className="text-slate-600">{admin.userName}</li>):''
                  }
                 
                 {admin?
                    (<li onClick={handleLogOut} className="text-red-600 font-bold cursor-pointer">Sign Out</li>):''
                    }
                
                </ul>
              </div>
            </div>
          );
    }