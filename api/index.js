// api/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoute.js";

dotenv.config();

// ---- DB ----
const MONGO_URI = process.env.MONGO_URI || process.env.MONGO; // support old var name
if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI (or MONGO) env");
  process.exit(1);
}
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });

const app = express();

app.set("trust proxy", 1);

// ---- CORS ----
const allowed = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://*.vercel.app",
  "https://your-frontend-domain.com",
  "https://www.your-frontend-domain.com",
];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (
        allowed.some((o) =>
          o.includes("*") ? origin.endsWith(o.replace("*", "")) : origin === o
        )
      ) {
        return cb(null, true);
      }
      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ---- Healthcheck for Render ----
app.get("/health", (_req, res) => res.send("OK"));

// ---- Routes ----
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, message, statusCode });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API running on ${PORT}`));
