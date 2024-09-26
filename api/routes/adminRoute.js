import express from "express";
import { verifyToken } from "../utils/verifyAdmin.js";
import { adminLogin, adminHome ,addUser,adminLogout,userEdit,editUserData,deleteUser} from '../controllers/adminController.js'

const router = express.Router();

router.post('/login',adminLogin)
router.post('logout',adminLogout)
router.get('/home',verifyToken, adminHome)
router.post('/addUser',verifyToken, addUser)
router.get('/edit/:id',editUserData)
router.post('/edit/:id',userEdit)
router.get('/deleteUser/:id',verifyToken, deleteUser)

export default router