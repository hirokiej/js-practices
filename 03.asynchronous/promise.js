#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL)",
  () => {
    console.log("Booksテーブルを作成しました");
    new Promise((resolve) => {
      db.run("INSERT INTO books(title) VALUES(?)", "javascriptの本", () => {
        console.log("本を追加しました。");
        resolve();
      });
    })
      .then(() => {
        new Promise((resolve) => {
          db.each("SELECT * FROM books", (_, row) => {
            console.log(`id:${row.id}は${row.title}`);
            resolve();
          });
        });
      })
      .then(() => {
        new Promise((resolve) => {
          db.run("DROP TABLE books", () => {
            console.log("Booksテーブルを削除しました");
            resolve();
          });
        });
      })
      .then(() => {
        new Promise((resolve) => {
          db.close();
          resolve();
        });
      });
  },
);
