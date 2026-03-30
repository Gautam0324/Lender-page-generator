<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/73678919-949f-40a9-bf36-ba2ffa2dd511

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
# Creating the MySQL schema

This repo includes `mysql-schema.sql` which will create the `lender_portal` database and its tables.

To execute the schema automatically, use the included Node script:

```
# install deps (if not already)
npm install

# Run the script (it reads DB connection from env or CLI args)
node scripts/create_database.js --host=109.123.243.102 --port=3306 --user=adminworkforholidays.com --password=passwordworkforholidays.com
```

Or set environment variables in `.env` and run without CLI args:

```
DB_HOST=109.123.243.102
DB_PORT=3306
DB_USER=adminworkforholidays.com
DB_PASSWORD=passwordworkforholidays.com

node scripts/create_database.js
```

The script executes `mysql-schema.sql` (which contains `CREATE DATABASE` and table creation statements).

Verification

After running the creation script, you can verify the database, tables, and columns with the included verification script:

```
# using .env values
node scripts/verify_database.js

# or override values
node scripts/verify_database.js --host=109.123.243.102 --port=3306 --user=adminworkforholidays.com --password=passwordworkforholidays.com --db=dbworkforholidays
```

The script will print a list of tables and their columns (type, nullability, default).
# Lender-page-generator
