import {
  createWorkOut,
  getAllWorkoutsbyRoutineId,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} from "../models/workout.js";

// Controller to create a routine
const createWorkouts = async (req, res) => {
  const { routineId, workoutName, sets, reps, breakTime, weights } = req.body;

  try {
    const newWorkouts = await createWorkOut(
      routineId,
      workoutName,
      sets,
      reps,
      breakTime,
      weights
    );
    res
      .status(201)
      .json({ message: "Wokrout created successfully", routine: newWorkouts });
  } catch (err) {
    res.status(500).json({ message: "Error creating routine: " + err.message });
  }
};

// Controller to get all routines
const retrieveWorkouts = async (req, res) => {
  const { routineId } = req.params;

  try {
    const allWorkouts = await getAllWorkoutsbyRoutineId(routineId);

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

// Controller to get routine by name
const retrieveWorkoutById = async (req, res) => {
  const { workOutId } = req.body;

  try {
    const workOutById = await getWorkoutById(workOutId);

    if (workOutById) {
      res.status(200).json({
        message: "Workout received successfully",
        routine: workOutById,
      });
    } else {
      res.status(404).json({ message: "Workout not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving routine: " + err.message });
  }
};

// Controller to edit routine
const editWorkout = async (req, res) => {
  const { workoutId, routineId, workoutName, sets, reps, weights, breakTime } =
    req.body;

  try {
    const updatedWorkout = await updateWorkout(
      workoutId,
      routineId,
      workoutName,
      sets,
      reps,
      breakTime
    );

    res.status(200).json({
      message: "Workout updated successfully",
      routine: updateWorkout,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating workout: " + err.message });
  }
};

// Controller to delete routine
const removeWorkout = async (req, res) => {
  const { workoutId } = req.body;

  try {
    const workOutRemoved = await deleteWorkout(workoutId);
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting routine: " + err.message });
  }
};

export {
  createWorkouts,
  retrieveWorkoutById,
  retrieveWorkouts,
  editWorkout,
  removeWorkout,
};
