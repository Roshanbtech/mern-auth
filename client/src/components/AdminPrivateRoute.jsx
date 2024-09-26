import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"

function AdminPrivateRoute() {
    const {admin} = useSelector(state=>state.admin)
    // console.log(admin)
  return admin ? <Outlet/> : <Navigate to='/admin'/>
  
}

export default AdminPrivateRoute