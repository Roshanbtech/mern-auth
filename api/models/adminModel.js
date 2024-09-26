import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true  
    }
    });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;