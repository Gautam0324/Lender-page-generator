import fs from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

function parseArgs() {
  const args = {};
  for (const raw of process.argv.slice(2)) {
    const [k, v] = raw.split('=');
    args[k.replace(/^--/, '')] = v ?? true;
  }
  return args;
}

async function main() {
  const args = parseArgs();

  const host = args.host || process.env.DB_HOST || '127.0.0.1';
  const port = parseInt(args.port || process.env.DB_PORT || '3306', 10);
  const user = args.user || process.env.DB_USER || process.env.MYSQL_USER || 'root';
  const password = args.password || process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';

  const schemaPath = path.resolve(process.cwd(), 'mysql-schema.sql');
  let sql;
  try {
    sql = await fs.readFile(schemaPath, 'utf8');
  } catch (err) {
    console.error('Failed to read mysql-schema.sql at', schemaPath);
    console.error(err.message);
    process.exit(2);
  }

  let conn;
  try {
    conn = await mysql.createConnection({ host, port, user, password, multipleStatements: true });
    console.log(`Connected to MySQL on ${host}:${port} as ${user}`);
    // If a DB name was provided via env or args, substitute or inject CREATE/USE statements.
    const dbName = args.db || process.env.DB_NAME || process.env.MYSQL_DATABASE;
    if (dbName) {
      // Replace any existing CREATE DATABASE ...; with the provided name
      if (/CREATE\s+DATABASE/i.test(sql)) {
        sql = sql.replace(/CREATE\s+DATABASE[^;]*;/i, `CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
      } else {
        sql = `CREATE DATABASE IF NOT EXISTS \`${dbName}\`;\n` + sql;
      }

      // Replace or insert USE statement so subsequent table creation uses the chosen DB
      if (/USE\s+[^;]+;/i.test(sql)) {
        sql = sql.replace(/USE\s+[^;]+;/i, `USE \`${dbName}\`;`);
      } else {
        sql = `USE \`${dbName}\`;\n` + sql;
      }
    }

    // Execute the full schema. This file should include CREATE TABLE statements etc.
    const [result] = await conn.query(sql);
    console.log('Schema executed successfully.');
  } catch (err) {
    console.error('Error executing schema:', err.message);
    process.exitCode = 3;
  } finally {
    if (conn) await conn.end();
  }
}

main();
