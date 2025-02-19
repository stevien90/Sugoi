import pkg from "pg";
const { Pool } = pkg; // make quick query to the database no slow down
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); //loads the .env file

//set up PostgresSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER, // process - global built in object in Node.js that gives you access to various aspects of the current Node.js process
  host: process.env.DB_HOST, // process.env to access environment variables
  database: process.env.DB_NAME,
  password: process.env.MY_DB_PASSWORDS,
  port: process.env.DB_PORT,
});

//function to create a user
const createUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

//Function to find a user by username
const findUserByUsername = async (username) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

//Function to compare passwords
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
  // compare method performs comparison by hashing the plain text password and checking if the
  // result matches the stored hash
  // The database query to fetch the hashed password happens in the findByUsername function above. The function returns the username and password.
};

export { createUser, findUserByUsername, comparePassword };
