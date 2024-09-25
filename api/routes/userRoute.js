import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { test, updateUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/", test);
router.post('/update/:id', verifyToken, updateUser)

export default router