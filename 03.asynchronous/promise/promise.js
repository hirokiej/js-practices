#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { dbRun, dbEach, dbClose } from "../function.js";

const db = new sqlite3.Database(":memory:");

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
