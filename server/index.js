import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path"; //Were using this to make custom file path
import userRoutes from "./routes/userRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import workoutLogRoutes from "./routes/workoutLogRoutes.js";
import routineProgRoutes from "./routes/routineProgRoutes.js";

dotenv.config();
//This is where you get your directory path currently going to server folder
const __dirname = dirname(fileURLToPath(import.meta.url));

//middleware
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/users", userRoutes);
app.use("/api/routines", routineRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/logs", workoutLogRoutes);
app.use("/api/routineProgress", routineProgRoutes);
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
