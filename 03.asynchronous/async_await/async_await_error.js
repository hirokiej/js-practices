#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { dbRun, dbEach, dbClose } from "../function.js";

const db = new sqlite3.Database(":memory:");

const createTable = () => {
  return dbRun(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL)",
  ).then(() => {
    console.log("Booksテーブルを作成しました");
  });
};

const insertBook = (title) => {
  return dbRun("INSERT INTO books(title) VALUES(?)", title)
    .then(() => {
      console.log("本を追加しました。");
    })
    .catch(() => {
      console.error("データ追加エラー");
    });
};

const outputBook = () => {
  dbEach("SELECT * FROM members")
    .then(() => {
      console.log(`id:${row.id}は${row.title}`);
    })
    .catch(() => {
      console.error("データ取得エラー");
    });
};

const dropTable = () => {
  dbRun("DROP TABLE books").then(() => {
    console.log("Booksテーブルを削除しました");
  });
};

const closeDatabase = () => {
  return new Promise((resolve) => {
    db.close();
    resolve();
  });
};

const main = async () => {
  await createTable();
  await insertBook(null);
  await outputBook();
  await dropTable();
  await closeDatabase();
};

main();
