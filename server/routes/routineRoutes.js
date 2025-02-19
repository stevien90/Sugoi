import { Router } from "express";
import {
  createRoutine,
  retrieveRoutine,
  retrieveRoutineByName,
  retrieveRoutineById,
  updateRoutine,
  removeRoutine,
} from "../controllers/routineController.js";

const router = Router();

// Create a new routine (POST is appropriate here)
router.post("/create", createRoutine);

// Get all routines for a user (GET should be used for fetching resources)
router.get("/retrieve/:userId", retrieveRoutine);

// Get a routine by name (GET for fetching a specific resource)
router.get("/routines/name/:name", retrieveRoutineByName);

// Get a routine by ID (GET for fetching a specific resource)
router.get("/routines/:routineId", retrieveRoutineById);

// Update a routine (PATCH for partial updates or PUT for full updates)
router.patch("/routines/name/:name", updateRoutine);

// Delete a routine (DELETE is correct for deletion)
router.delete("/routines/:routineId", removeRoutine);

export default router;
