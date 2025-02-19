import { Router } from "express";
import {
  createWorkouts,
  removeWorkout,
  retrieveWorkoutById,
  retrieveWorkouts,
  editWorkout,
} from "../controllers/workoutsController.js";

const router = Router();

router.post("/create", createWorkouts);

router.get("/retrieve/:routineId", retrieveWorkouts);

router.get("/workout/:workoutId", retrieveWorkoutById);

router.put("/workout/:workoutId/:routineId", editWorkout);

router.delete("/workout/:workoutId", removeWorkout);

export default router;
