import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("memo.db");

export default class MemoOperation {
  constructor() {
    db.run(
      `CREATE TABLE IF NOT EXISTS memo(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT)`,
    );
  }

  addMemo(memo) {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO memo(content) VALUES(?)", [memo], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  fetchMemos() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM memo", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  removeMemo(content) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM memo WHERE content = ?", [content], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}
