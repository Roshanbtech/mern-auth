// api/controllers/userController.js
import express from "express";
import errorHandler from "../utils/error.js"; 
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";

const test = async (req, res) => {
    res.json({ message: "API is working fine" });
};

// Update User
const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account!"));
    }

    try {
        if (req.body.password) {
            req.body.password = await bcryptjs.hash(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    userName: req.body.userName,
                    userEmail: req.body.userEmail,
                    userPassword: req.body.userPassword,
                    userProfilePic: req.body.userProfilePic,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, "User not found!"));
        }

        const { userPassword, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (error) {
        next(error);
    }
};

export { test, updateUser };
