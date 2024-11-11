#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL)",
  () => {
    console.log("Booksテーブルを作成しました");
    db.run("INSERT INTO books(title) VALUES(?)", null, (err) => {
      if (err) {
        console.error("データ追加エラー");
      } else {
        console.log("本を追加しました。");
      }
      db.each("SELECT * FROM members", (err, row) => {
        if (err) {
          console.error("データ取得エラー");
        } else {
          console.log(`id:${row.id}は${row.title}`);
        }
        db.run("DROP TABLE books", (err) => {
          if (err) {
            console.log("Booksテーブルを削除できませんでした");
            return;
          }
          console.log("Booksテーブルを削除しました");

          db.close(() => {
            console.log("終了");
          });
        });
      });
    });
  },
);
