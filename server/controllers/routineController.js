import {
  createRoutine as createRoutineSQL,
  getAllRoutine,
  getRoutineById,
  getRoutineByName,
  editRoutine,
  deleteRoutine,
} from "../models/routine.js";

// Controller to create a routine
const createRoutine = async (req, res) => {
  const { userId, routineName } = req.body;

  try {
    const newRoutine = await createRoutineSQL(userId, routineName);
    res
      .status(201)
      .json({ message: "Routine created successfully", routine: newRoutine });
  } catch (err) {
    res.status(500).json({ message: "Error creating routine: " + err.message });
  }
};

// Controller for GET method
const retrieveRoutine = async (req, res) => {
  const { userId } = req.params; // Get userId from query parameter

  try {
    const allRoutine = await getAllRoutine(userId);

    res.status(200).json({
      message: "All routines received successfully",
      routine: allRoutine,
    });
    console.log(allRoutine);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving routines: " + err.message });
  }
};

// Controller to get routine by name
const retrieveRoutineByName = async (req, res) => {
  const { name } = req.body;

  try {
    const routineByName = await getRoutineByName(name);

    if (routineByName) {
      res.status(200).json({
        message: "Routine received successfully",
        routine: routineByName,
      });
    } else {
      res.status(404).json({ message: "Routine not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving routine: " + err.message });
  }
};

// Controller to get routine by Id
const retrieveRoutineById = async (req, res) => {
  const { routineId } = req.body;

  try {
    const routineById = await getRoutineById(routineId);

    if (routineById) {
      res.status(200).json({
        message: "Routine received successfully",
        routine: routineById,
      });
    } else {
      res.status(404).json({ message: "Routine not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving routine: " + err.message });
  }
};

// Controller to edit routine
const updateRoutine = async (req, res) => {
  const { userId, routineName } = req.body;

  try {
    const updatedRoutine = await editRoutine(userId, routineName);

    res.status(200).json({
      message: "Routine updated successfully",
      routine: updatedRoutine,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating routine: " + err.message });
  }
};

// Controller to delete routine
const removeRoutine = async (req, res) => {
  const { routineId } = req.body;

  try {
    const routineRemoved = await deleteRoutine(routineId);
    res.status(200).json({ message: "Routine deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting routine: " + err.message });
  }
};

export {
  createRoutine,
  retrieveRoutine,
  retrieveRoutineByName,
  retrieveRoutineById,
  updateRoutine,
  removeRoutine,
};
