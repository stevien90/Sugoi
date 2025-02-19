import {
  createLog,
  getAllLogs,
  deleteLogs,
  createLogsInBatch,
} from "../models/workoutLog.js";

// Controller to create a log
const makeLogs = async (req, res) => {
  const { workoutId, setNumber, repsDone, weightUsed } = req.body;

  try {
    const newWorkouts = await createLog(
      workoutId,
      setNumber,
      repsDone,
      weightUsed
    );
    res
      .status(201)
      .json({ message: "Log created successfully", routine: newWorkouts });
  } catch (err) {
    res.status(500).json({ message: "Error creating Log: " + err.message });
  }
};

const makeLogsInBatch = async (req, res) => {
  const { workoutId, sets } = req.body;

  if (!Array.isArray(sets) || sets.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input: 'sets' must be a non-empty array" });
  }

  try {
    const newWorkouts = await createLogsInBatch(workoutId, sets);

    res.status(201).json({
      message: "Logs created successfully",
      routine: newWorkouts,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating logs: " + err.message });
  }
};

// Controller to get all routines
const retrieveAllLog = async (req, res) => {
  const { workoutId } = req.body;

  try {
    const allWorkouts = await getAllLogs(workoutId);

    res.status(200).json({
      message: "All workouts received successfully",
      routine: allWorkouts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving routines: " + err.message });
  }
};

// Controller to delete routine
const removeLog = async (req, res) => {
  const { logId } = req.body;

  try {
    await deleteLogs(logId);
    res.status(200).json({ message: "log deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting routine: " + err.message });
  }
};

export { makeLogs, retrieveAllLog, removeLog, makeLogsInBatch };
