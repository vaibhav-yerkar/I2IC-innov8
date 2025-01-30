import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { router as groupsRouter } from "./routes/groups.js";
import { router as eventsRouter } from "./routes/events.js";
import { router as profilesRouter } from "./routes/profiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/groups", groupsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/profiles", profilesRouter);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
  });
}

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
