#!/usr/bin/env node

import { db, dbRun, dbAll, dbClose } from "../db_functions.js";

try {
  await dbRun(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)",
  );
  console.log("Booksテーブルを作成しました");
  await dbRun(db, "INSERT INTO books(title) VALUES(?)", null);
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_CONSTRAINT") {
    console.error("データ追加エラー", err.message);
  } else {
    throw err;
  }
}
try {
  await dbAll(db, "SELECT * FROM members");
} catch (err) {
  if (err instanceof Error && err.code == "SQLITE_ERROR") {
    console.error("データ取得エラー", err.message);
  } else {
    throw err;
  }
}
await dbRun(db, "DROP TABLE books");
await dbClose(db);
console.log("Booksテーブルを削除しました");
