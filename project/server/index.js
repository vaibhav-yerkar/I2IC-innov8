import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import groupsRouter from "./routes/groups.js";
import eventsRouter from "./routes/events.js";
import profilesRouter from "./routes/profiles.js";
import registerRouter from "./routes/register.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/groups", groupsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api", registerRouter);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
  });
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
