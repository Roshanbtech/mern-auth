import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    const hashedPassword = await bcryptjs.hash(userPassword, 10);
    await new User({ userName, userEmail, userPassword: hashedPassword }).save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  try {
    const validUser = await User.findOne({ userEmail });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = await bcryptjs.compare(
      userPassword,
      validUser.userPassword
    );
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { userPassword: _pwd, ...others } = validUser._doc;

    const expiryDate = new Date(Date.now() + 3600000); // 1h
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: expiryDate,
      })
      .status(200)
      .json({ message: "Logged in successfully", ...others });
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    // client sends { name, email, photo }
    const existing = await User.findOne({ userEmail: req.body.email });

    const token = jwt.sign(
      { id: (existing?._id) },
      process.env.JWT_SECRET
    );

    if (existing) {
      const { userPassword: _pwd, ...others } = existing._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          expires: expiryDate,
        })
        .status(200)
        .json({ message: "Logged in successfully", ...others });
    }

    const generatePassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await bcryptjs.hash(generatePassword, 10);

    const newUser = await new User({
      userName:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-5),
      userEmail: req.body.email,
      userPassword: hashedPassword,
      userProfilePic: req.body.photo,
    }).save();

    const token2 = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { userPassword: _pwd2, ...others } = newUser._doc;

    const expiryDate = new Date(Date.now() + 3600000);
    return res
      .cookie("access_token", token2, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: expiryDate,
      })
      .status(200)
      .json({ message: "Logged in successfully", ...others });
  } catch (error) {
    next(error);
  }
};

const signOut = (_req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export { signUp, signIn, google, signOut };
