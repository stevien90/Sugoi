import pkg from "pg";
const { Pool } = pkg;

//set up PostgresSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.MY_DB_PASSWORDS,
  port: process.env.DB_PORT,
});

const createLog = async (workoutId, setNumber, repsDone, weightUsed) => {
  try {
    const result = await pool.query(
      "INSERT INTO workout_log (workout_id, set_number, reps_completed, weight_used) VALUES ($1, $2, $3, $4) RETURNING *",
      [workoutId, setNumber, repsDone, weightUsed]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(
      "The createLog function is causing the error: " + err.message
    );
  }
};

const createLogsInBatch = async (workoutId, sets) => {
  try {
    const values = [];
    const placeholders = [];
    let index = 1;

    sets.forEach((set, setIndex) => {
      values.push(workoutId, setIndex + 1, set.reps, set.weight);
      placeholders.push(`($${index++}, $${index++}, $${index++}, $${index++})`);
    });

    const query = `INSERT INTO workout_log (workout_id, set_number, reps_completed, weight_used)
      VALUES ${placeholders.join(", ")}
      RETURNING *;
    `;

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error("CreateLogsInBatch error: " + err.message);
  }
};

const getAllLogs = async (workoutId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM workout_log WHERE workout_id = $1",
      [workoutId]
    );
    return result.rows;
  } catch (err) {
    throw new Error("getAllLogs function is causing the error: " + err.message);
  }
};

// Function to delete a workout by workout_id
const deleteLogs = async (logId) => {
  try {
    const result = await pool.query(
      "DELETE FROM workout_log WHERE log_id = $1 RETURNING log_id",
      [logId]
    );

    if (result.rowCount === 0) {
      throw new Error("Log not found for deletion");
    }

    return result.rows[0];
  } catch (err) {
    throw new Error("Error deleting workout: " + err.message);
  }
};

export { createLog, getAllLogs, deleteLogs, createLogsInBatch };
