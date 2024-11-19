import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

export const dbRun = (db, query, params) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const dbEach = (db, query, params) => {
  return new Promise((resolve, reject) => {
    db.each(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export const dbClose = (db) => {
  return new Promise((resolve) => {
    db.close();
    resolve();
  });
};
