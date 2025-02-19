import "./styles/styles.css";
import "./styles/navBar.css";
import "./styles/Home.css";
import "./styles/User.css";
import "./styles/Login.css";

import WorkoutLog from "./components/WorkoutLog";
import User from "./components/User";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />

          <Route path="/Home" element={<Home />} />

          <Route path="/LogWorkout" element={<WorkoutLog />} />
        </Routes>
      </Router>
    </div>
  );
}
