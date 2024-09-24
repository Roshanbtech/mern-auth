import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import Button from "../components/Button";
import BubbleText from "../components/BubbleText";
// Import FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPeace } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            userProfilePic: downloadURL,
          });
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <div className="bg-gradient-to-r from-black to-gray-800 min-h-screen flex items-center justify-center pt-24">
      <div className="p-4 max-w-xs w-full bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold text-center text-blue-400 mb-4">
          Profile
        </h1>
        <form className="flex flex-col gap-2">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.userProfilePic || currentUser?.userProfilePic}
            alt="profile"
            className="h-16 w-16 self-center cursor-pointer rounded-full object-cover mt-2" // Adjusted image size
            onClick={() => fileRef.current.click()}
          />
          <div className="mt-2 flex justify-center">
            {imageError ? (
              <p className="text-red-500">Image upload failed</p>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <p className="text-blue-400">{imagePercent}% uploading...</p>
            ) : imagePercent === 100 ? (
              <p className="text-green-500">Image uploaded successfully</p>

            ) : null}
          </div>

          <div className="text-center mt-2 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faHandPeace}
              className="text-blue-400 mr-1"
            />
            <BubbleText text={`${currentUser?.userName || "User"}`} />
          </div>

          <input
            type="text"
            id="userName"
            placeholder="Username"
            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />

          <input
            type="email"
            id="userEmail"
            placeholder="Email"
            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />

          <input
            type="password"
            id="userPassword"
            placeholder="Password"
            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />

          <Button
            text="Update Profile"
            className="bg-gradient-to-r from-blue-500 to-white-400 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition duration-300"
          />
        </form>

        <div className="flex justify-between mt-2">
          <span className="text-red-700 cursor-pointer hover:underline">
            Delete Account
          </span>
          <span className="text-red-700 cursor-pointer hover:underline">
            Sign out
          </span>
        </div>

        <p className="text-red-700 mt-2">{/* Error message */}</p>
        <p className="text-green-700 mt-2">{/* Success message */}</p>
      </div>
    </div>
  );
};

export default Profile;
