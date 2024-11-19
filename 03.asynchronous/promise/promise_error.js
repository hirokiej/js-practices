#!/usr/bin/env node

import { db, dbRun, dbEach, dbClose } from "../function.js";

dbRun(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)",
)
  .then(() => {
    console.log("Booksテーブルを作成しました");
    return dbRun(db, "INSERT INTO books(title) VALUES(?)", null);
  })
  .then(() => {
    console.log("本を追加しました。");
    return dbEach(db, "SELECT * FROM books");
  })
  .catch(() => {
    console.error("データ追加エラー");
    return dbEach(db, "SELECT * FROM members");
  })
  .then((row) => {
    console.log(`id:${row.id}は${row.title}`);
    return dbRun(db, "DROP TABLE books");
  })
  .catch(() => {
    console.error("データ取得エラー");
    return dbRun(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("テーブルを削除しました");
    return dbClose(db);
  });
