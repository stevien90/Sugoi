import { createRoutineLog, getAllRoutineLogs } from "../models/routineProg.js";

// Controller to create a log
const makeRoutineLogs = async (req, res) => {
  const { userId, routineId, setNumber, repsDone, weightUsed } = req.body;

  try {
    const newRoutineProgressLog = await createRoutineLog(
      userId,
      routineId,
      setNumber,
      repsDone,
      weightUsed
    );
    res.status(201).json({
      message: "Routine Progress Log created successfully",
      routine: newRoutineProgressLog,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating Routine Log: " + err.message });
  }
};

// Controller to get all routines
const retrieveAllRoutineLog = async (req, res) => {
  const { userId } = req.body;

  try {
    const allRoutineProgressLog = await getAllRoutineLogs(userId);

    res.status(200).json({
      message: "All routine progess log received successfully",
      routine: allRoutineProgressLog,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving routines: " + err.message });
  }
};

export { makeRoutineLogs, retrieveAllRoutineLog };
