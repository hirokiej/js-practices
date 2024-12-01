#!/usr/bin/env node

import { db, dbRun, dbAll, dbClose } from "../function.js";

const main = async () => {
  await dbRun(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)",
  );
  console.log("テーブルを作成しました");
  const result = await dbRun(
    db,
    "INSERT INTO books(title) VALUES(?)",
    "Javascriptの本",
  );
  console.log("本を追加しました");
  console.log(`idは${result.lastID}です`);
  const rows = await dbAll(db, "SELECT * FROM books");
  rows.forEach((row) => {
    console.log(`${row.id}は${row.title}です`);
  });
  await dbRun(db, "DROP TABLE books");
  await dbClose(db);
};

main();
