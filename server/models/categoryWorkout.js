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

const retrieveCategory = async () => {
  try {
    const result = await pool.query("SELECT * FROM workout_categories");
    return result.rows;
  } catch (err) {
    throw new Error(
      "The retrieve Category function is causing the error: " + err.message
    );
  }
};

export default retrieveCategory;
retrieveCategory;
