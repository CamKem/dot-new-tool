import Database from 'better-sqlite3';
const db = new Database('./database/db.sqlite', { verbose: console.log });
export default db;
