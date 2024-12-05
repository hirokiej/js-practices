#!/usr/bin/env node

import { db, dbRun, dbAll, dbClose } from "../db_functions.js";

dbRun(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)",
)
  .then(() => {
    console.log("Booksテーブルを作成しました");
    return dbRun(db, "INSERT INTO books(title) VALUES(?)", "JavaScriptの本");
  })
  .then((result) => {
    console.log("本を追加しました。");
    console.log(`id:${result.lastID}を追加しました`);
    return dbAll(db, "SELECT * FROM books");
  })
  .then((row) => {
    row.forEach((row) => {
      console.log(`id:${row.id}は${row.title}`);
    });
    return dbRun(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("テーブルを削除しました");
    return dbClose(db);
  });
