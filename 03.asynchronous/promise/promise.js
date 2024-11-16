#!/usr/bin/env node

import { dbRun, dbEach, dbClose } from "../function.js";

dbRun(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL)",
)
  .then(() => {
    console.log("Booksテーブルを作成しました");
    dbRun("INSERT INTO books(title) VALUES(?)", "javascriptの本");
  })
  .then(() => {
    console.log("本を追加しました。");
    return dbEach("SELECT * FROM books");
  })
  .then((row) => {
    console.log(`id:${row.id}は${row.title}`);
    return dbRun("DROP TABLE books");
  })
  .then(() => {
    console.log("テーブルを削除しました");
    return dbClose();
  });
