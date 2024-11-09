#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL)",
  () => {
    console.log("Booksテーブルを作成しました");
    new Promise((resolve, reject) => {
      db.run("INSERT INTO books(title) VALUES(?)", null, (err) => {
        if (err) {
          console.log("データ追加エラー");
          reject(err);
        } else {
          console.log("本を追加しました。");
          resolve();
        }
      });
    })
      .catch(() => {
        return new Promise((resolve) => {
          db.each("SELECT * FROM members", (err, row) => {
            if (err) {
              console.log("データ取得エラー");
              resolve();
            } else {
              console.log(`id:${row.id}は${row.title}`);
              resolve();
            }
          });
        });
      })
      .then(() => {
        return new Promise((resolve) => {
          db.run("DROP TABLE books", () => {
            console.log("Booksテーブルを削除しました");
            resolve();
          });
        });
      })
      .then(() => {
        return new Promise((resolve) => {
          db.close();
          resolve();
        });
      });
  },
);
