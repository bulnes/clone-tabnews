import { Client } from "pg";

async function query(querySQL) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    });
    
    await client.connect();
    
    try {
      const result = await client.query(querySQL);
      return result;
    } catch(error) {
      console.error(error);
    } finally {
      await client.end();
    }
}

export default {
    query
}