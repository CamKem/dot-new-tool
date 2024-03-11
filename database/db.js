import Database from 'better-sqlite3';
import fs from 'fs';
const db = new Database('./database/db.sqlite', { verbose: console.log });

// check if the records table exists
const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='records';").get();

if (!tableExists) {
  // if the records table does not exist, create it
  const schema = fs.readFileSync('./database/schema.sql', 'utf8');
  // create table
  db.exec(schema);
}


export default db;
