import Database from 'better-sqlite3';
import fs from 'fs';
const db = new Database('./database/db.sqlite', { verbose: console.log });
const schema = fs.readFileSync('./database/schema.sql', 'utf8');
// create table
db.exec(schema);
export default db;
