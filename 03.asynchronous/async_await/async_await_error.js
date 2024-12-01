#!/usr/bin/env node

import { db, dbRun, dbAll, dbClose } from "../function.js";

const main = async () => {
  try {
    await dbRun(
      db,
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)",
    );
    console.log("テーブルを作成しました");
    await dbRun(db, "INSERT INTO books(title) VALUES(?)' null");
  } catch {
    console.error("データ追加エラー");
  }
  try {
    await dbAll(db, "SELECT * FROM members");
  } catch {
    console.error("データ取得エラー");
  }
  await dbRun(db, "DROP TABLE books");
  await dbClose(db);
  console.log("テーブルを削除しました");
};

main();
