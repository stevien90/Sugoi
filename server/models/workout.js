import pkg from "pg";
const { Pool } = pkg;

//set up PostgresSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER, // process - global built in object in Node.js that gives you access to various aspects of the current Node.js process
  host: process.env.DB_HOST, // process.env to access environment variables
  database: process.env.DB_NAME,
  password: process.env.MY_DB_PASSWORDS,
  port: process.env.DB_PORT,
});

const createWorkOut = async (
  routineId,
  name,
  sets,
  reps,
  breakTime,
  weights
) => {
  try {
    const result = await pool.query(
      "INSERT INTO workouts (routine_id, workout_name, sets, reps, break_time, weights) VALUES ($1, $2, $3, $4, $5, $6)",
      [routineId, name, sets, reps, breakTime, weights]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(
      "The createWorkOut function is causing the error: " + err.message
    );
  }
};

// Get all workouts for a specific routineId
const getAllWorkoutsbyRoutineId = async (routineId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM workouts WHERE routine_id = $1",
      [routineId]
    );
    return result.rows;
  } catch (err) {
    throw new Error(
      "getAllworkoutbyroutinid function is causing the error: " + err.message
    );
  }
};

const getWorkoutById = async (workoutId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM workouts WHERE workout_id = $1",
      [workoutId]
    );
    return result.rows[0]; // Returning the first matching routine
  } catch (err) {
    throw new Error(
      "The getWorkoutById function is causing the error: " + err.message
    );
  }
};

// Function to update a workout by workout_id
const updateWorkout = async (
  workoutId,
  routineId,
  workoutName,
  sets,
  reps,
  weights,
  breakTime
) => {
  try {
    const result = await pool.query(
      "UPDATE workouts SET routineId = $1, workout_name = $2, sets = $3, reps = $4, weights = $5, break_Time = $6 WHERE workout_id = $7 RETURNING *",
      [routineId, workoutName, sets, reps, weights, breakTime, workoutId]
    );

    // Return the updated workout data
    return result.rows[0]; // returns the updated workout record
  } catch (err) {
    throw new Error("Error updating workout: " + err.message);
  }
};

// Function to delete a workout by workout_id
const deleteWorkout = async (workoutId) => {
  try {
    // Delete the workout record
    const result = await pool.query(
      "DELETE FROM workouts WHERE workout_id = $1 RETURNING workout_id",
      [workoutId]
    );

    // If no rows are affected, it means the workout was not found
    if (result.rowCount === 0) {
      throw new Error("Workout not found for deletion");
    }

    // Return the deleted workout ID
    return result.rows[0]; // returns the deleted workout's ID
  } catch (err) {
    throw new Error("Error deleting workout: " + err.message);
  }
};

export {
  createWorkOut,
  getAllWorkoutsbyRoutineId,
  updateWorkout,
  deleteWorkout,
  getWorkoutById,
};
