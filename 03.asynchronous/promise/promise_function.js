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

export const dbEach = (query, params) => {
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

export const dbClose = () => {
  new Promise((resolve) => {
    db.close();
    resolve();
  });
};
