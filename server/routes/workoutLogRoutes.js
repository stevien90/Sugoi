import { Router } from "express";
import {
  makeLogs,
  retrieveAllLog,
  removeLog,
  makeLogsInBatch,
} from "../controllers/workoutLogController.js";

const router = Router();

router.post("/createLogs", makeLogs);

router.post("/createBatchLogs", makeLogsInBatch);

router.get("/logs", retrieveAllLog);

router.delete("/logs/:logId", removeLog);

export default router;
