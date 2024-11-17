#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL)",
  () => {
    console.log("Booksテーブルを作成しました");
    db.run("INSERT INTO books(title) VALUES(?)", "JavaScriptの本", () => {
      console.log("本を追加しました。");
      db.each("SELECT * FROM books", (_, row) => {
        console.log(`id:${row.id}は${row.title}`);

        db.run("DROP TABLE books", () => {
          console.log("Booksテーブルを削除しました");
          db.close();
        });
      });
    });
  },
);
