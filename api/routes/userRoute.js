import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { test, updateUser, deleteUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/", test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
export default router