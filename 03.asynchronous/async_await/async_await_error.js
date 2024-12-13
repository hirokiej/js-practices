#!/usr/bin/env node

import { db, dbRun, dbAll, dbClose } from "../db_functions.js";

await dbRun(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)",
);
console.log("Booksテーブルを作成しました");
try {
  const result = await dbRun(db, "INSERT INTO books(title) VALUES(?)", null);
  console.log("本を追加しました");
  console.log(`id:${result.lastID}を追加しました`);
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_CONSTRAINT") {
    console.error("データ追加エラー", err.message);
  } else {
    throw err;
  }
}
try {
  const rows = await dbAll(db, "SELECT * FROM members");
  rows.forEach((row) => {
    console.log(`id:${row.id}は${row.title}`);
  });
} catch (err) {
  if (err instanceof Error && err.code == "SQLITE_ERROR") {
    console.error("データ取得エラー", err.message);
  } else {
    throw err;
  }
}
await dbRun(db, "DROP TABLE books");
console.log("Booksテーブルを削除しました");
await dbClose(db);
