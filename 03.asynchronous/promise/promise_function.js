import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

export const dbRun = (query, params) => {
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

export const dbClose = () => {
  new Promise((resolve) => {
    db.close();
    resolve();
  });
};
