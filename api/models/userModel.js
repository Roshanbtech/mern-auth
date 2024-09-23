import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    userEmail:{
        type: String,
        required: true,
        unique: true
    },
    userPassword:{
        type: String,
        required: true
    },
    userProfilePic:{
        type: String,
        default: "https://img.icons8.com/?size=100&id=ScJCfhkd77yD&format=png&color=000000"
    }

    },{timestamps: true}); 

const User = mongoose.model("User", userSchema);
export default User