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
  const user = args.user || process.env.DB_USER || 'root';
  const password = args.password || process.env.DB_PASSWORD || '';
  const database = args.db || process.env.DB_NAME || process.env.MYSQL_DATABASE;

  if (!database) {
    console.error('No database selected. Set DB_NAME in .env or pass --db=...');
    process.exit(2);
  }

  let conn;
  try {
    conn = await mysql.createConnection({ host, port, user, password });
    console.log(`Connected to MySQL ${host}:${port} as ${user}`);

    // ensure database exists
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await conn.query(`USE \`${database}\`;`);

    const [tables] = await conn.query(
      `SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = ? ORDER BY TABLE_NAME;`,
      [database]
    );

    if (tables.length === 0) {
      console.log('No tables found in', database);
    } else {
      console.log(`Tables in ${database}:`);
      for (const row of tables) {
        console.log('-', row.TABLE_NAME);
        const [cols] = await conn.query(
          `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT FROM information_schema.columns WHERE table_schema = ? AND table_name = ? ORDER BY ORDINAL_POSITION;`,
          [database, row.TABLE_NAME]
        );
        for (const c of cols) {
          console.log(`   • ${c.COLUMN_NAME} : ${c.COLUMN_TYPE} nullable=${c.IS_NULLABLE} default=${c.COLUMN_DEFAULT}`);
        }
      }
    }
  } catch (err) {
    console.error('Error verifying database:', err.message);
    process.exitCode = 3;
  } finally {
    if (conn) await conn.end();
  }
}

main();
