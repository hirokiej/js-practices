#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)",
  () => {
    console.log("Booksテーブルを作成しました");
    db.run("INSERT INTO books(title) VALUES(?)", null, function (err) {
      if (err) {
        console.error("データ追加エラー", err.message);
      } else {
        console.log("本を追加しました。");
        console.log(`id:${this.lastID}を追加しました`);
      }
      db.all("SELECT * FROM members", (err, rows) => {
        if (err) {
          console.error("データ取得エラー", err.message);
        } else {
          rows.forEach((row) => {
            console.log(`id:${row.id}は${row.title}`);
          });
        }
        db.run("DROP TABLE books", () => {
          console.log("Booksテーブルを削除しました");

          db.close();
        });
      });
    });
  },
);
