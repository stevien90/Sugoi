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

const createRoutine = async (userId, routineName) => {
  try {
    const result = await pool.query(
      "INSERT INTO workout_routines (user_id, routine_name) VALUES ($1, $2) RETURNING user_id, routine_id, routine_name",
      [userId, routineName]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(
      "The createRoutine function is causing the error: " + err.message
    );
  }
};

// Get all routines for a specific user
const getAllRoutine = async (userId) => {
  try {
    // Query to get routines for a specific user
    const result = await pool.query(
      "SELECT * FROM workout_routines WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  } catch (err) {
    console.error("Error fetching routines:", err.message);
    throw new Error("Error fetching routines: " + err.message);
  }
};

const getRoutineByName = async (name) => {
  try {
    const result = await pool.query(
      "SELECT * FROM workout_routines WHERE routine_name = $1",
      [name]
    );
    return result.rows[0]; // Returning the first matching routine
  } catch (err) {
    throw new Error(
      "The getRoutineByName function is causing the error: " + err.message
    );
  }
};

const getRoutineById = async (routineId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM workout_routines WHERE routine_id = $1",
      [routineId]
    );
    return result.rows[0]; // Returning the routine by id
  } catch (err) {
    throw new Error(
      "The getRoutineById function is causing the error: " + err.message
    );
  }
};

const editRoutine = async (userId, routineName) => {
  try {
    const routine = await getRoutineByName(routineName);
    if (routine) {
      const updatedRoutine = await pool.query(
        "UPDATE workout_routines SET routine_name = $1 WHERE user_id = $2 AND routine_name = $3 RETURNING *",
        [routineName, userId, routineName]
      );
      return updatedRoutine.rows[0]; // Return the updated routine
    } else {
      throw new Error("Routine not found");
    }
  } catch (err) {
    throw new Error(
      "The editRoutine function is causing the error: " + err.message
    );
  }
};

const deleteRoutine = async (routineId) => {
  try {
    await pool.query("DELETE FROM workout_routines WHERE routine_id = $1", [
      routineId,
    ]);
    return true; // Return true to indicate success
  } catch (err) {
    throw new Error(
      "The deleteRoutine function is causing the error: " + err.message
    );
  }
};

export {
  createRoutine,
  getAllRoutine,
  getRoutineById,
  getRoutineByName,
  deleteRoutine,
  editRoutine,
};
