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
  return new Promise((resolve, reject) => {
    db.each("SELECT * FROM members", (err, row) => {
      if (err) {
        return reject(err);
      }
      console.log(`id:${row.id}は${row.title}`);
      resolve();
    });
  });
};

const dropTable = () => {
  return new Promise((resolve) => {
    db.run("DROP TABLE books", () => {
      console.log("Booksテーブルを削除しました");
      resolve();
    });
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
  try {
    await outputBook();
  } catch (err) {
    console.error("データ取得エラー", err.message);
  }
  await dropTable();
  await closeDatabase();
};

main();
