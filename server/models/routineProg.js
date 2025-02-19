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

const createRoutineLog = async (
  userId,
  routineId,
  totalSets,
  totalReps,
  weightUsed
) => {
  try {
    const result = await pool.query(
      "INSERT INTO routine_progress (user_id, routine_id, total_sets, total_reps) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
      [userId, routineId, totalSets, totalReps, weightUsed]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(
      "The createRoutineLog function is causing the error: " + err.message
    );
  }
};

const getAllRoutineLogs = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM routine_progress WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  } catch (err) {
    throw new Error(
      "getAllRoutineLogs function is causing the error: " + err.message
    );
  }
};

export { createRoutineLog, getAllRoutineLogs };
