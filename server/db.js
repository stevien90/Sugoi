import { Client } from "pg";

const client = new Client({
  connectionString: process.env.SCHEMATOGO_URL,
  ssl: { rejectUnauthorized: false },
});

client.connect();

export default client;
