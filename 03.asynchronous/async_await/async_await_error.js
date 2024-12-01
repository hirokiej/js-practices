#!/usr/bin/env node

import { db, dbRun, dbAll, dbClose } from "../function.js";

const createTable = () => {
  return dbRun(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)",
  ).then(() => {
    console.log("Booksテーブルを作成しました");
  });
};

const insertBook = (title) => {
  return dbRun(db, "INSERT INTO books(title) VALUES(?)", title).then(() => {
    console.log("本を追加しました。");
  });
};

const outputBook = () => {
  return dbAll(db, "SELECT * FROM members").then((row) => {
    console.log(`id:${row.id}は${row.title}`);
  });
};

const dropTable = () => {
  return dbRun(db, "DROP TABLE books").then(() => {
    console.log("Booksテーブルを削除しました");
  });
};

const closeDatabase = () => {
  dbClose(db);
};

const main = async () => {
  try {
    await createTable();
    await insertBook(null);
  } catch {
    console.error("データ追加エラー");
  }
  try {
    await outputBook();
  } catch {
    console.error("データ取得エラー");
  }
  await dropTable();
  await closeDatabase();
};

main();
