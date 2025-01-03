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

  addMemo(content) {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO memo(content) VALUES(?)", [content], (err) => {
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
      db.all("SELECT * FROM memo ORDER BY id", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  removeMemo(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM memo WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}
