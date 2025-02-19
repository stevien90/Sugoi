import { Router } from "express";
import {
  makeRoutineLogs,
  retrieveAllRoutineLog,
} from "../controllers/routineProgController.js";

const router = Router();

router.post("/routineProgress", makeRoutineLogs);

router.get("/routineProgress", retrieveAllRoutineLog);

export default router;
