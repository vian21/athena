import * as mysql2 from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * MYSQL2 Database connection plugin
 */
const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default db;
