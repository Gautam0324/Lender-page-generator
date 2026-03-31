import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import crypto from "crypto";

type DbPool = mysql.Pool;

let dbPool: DbPool | null = null;
let dbReady = false;
let dbError: string | null = null;

const DB_CONFIG = {
  host: process.env.DB_HOST || process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || process.env.MYSQL_PORT || 3306),
  user: process.env.DB_USER || process.env.MYSQL_USER || "root",
  password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || "",
  database: process.env.DB_NAME || process.env.MYSQL_DATABASE || "lender_portal",
};

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function initializeDatabase() {
  if (dbPool && dbReady) return dbPool;

  try {
    const setupConnection = await mysql.createConnection({
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
      multipleStatements: true,
    });

    await setupConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\`;`
    );
    await setupConnection.end();

    dbPool = mysql.createPool({
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
      database: DB_CONFIG.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(120) NOT NULL,
        username VARCHAR(60) NOT NULL UNIQUE,
        email VARCHAR(190) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS lenders (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        admin_user_id BIGINT UNSIGNED NOT NULL,
        lender_name VARCHAR(150) NOT NULL,
        website VARCHAR(255) DEFAULT '',
        contact_email VARCHAR(190) DEFAULT '',
        contact_phone VARCHAR(40) DEFAULT '',
        status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_lenders_admin_user
          FOREIGN KEY (admin_user_id)
          REFERENCES admin_users(id)
          ON DELETE CASCADE
      );
    `);

    await dbPool.query(
      `INSERT IGNORE INTO admin_users (id, full_name, username, email, password_hash)
       VALUES (1, 'Admin User', 'admin', 'admin@lendflow.com', ?)`,
      [hashPassword("admin")]
    );

    dbReady = true;
    dbError = null;
    console.log(
      `[${new Date().toISOString()}] MySQL ready at ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`
    );

    return dbPool;
  } catch (error: any) {
    dbReady = false;
    dbError = error?.message || "Failed to initialize MySQL";
    console.warn(
      `[${new Date().toISOString()}] MySQL initialization failed: ${dbError}`
    );
    throw error;
  }
}

export function getDb(): DbPool | null {
  return dbPool;
}

export function isDbReady(): boolean {
  return dbReady;
}

export function getDbError(): string | null {
  return dbError;
}

export function getDbConfig() {
  return DB_CONFIG;
}
