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
  return dbRun("INSERT INTO books(title) VALUES(?)", title).then(() => {
    console.log("本を追加しました。");
  });
};

const outputBook = () => {
  return dbEach("SELECT * FROM BOOKS").then((row) => {
    console.log(`id:${row.id}は${row.title}`);
  });
};

const dropTable = () => {
  return dbRun("DROP TABLE books").then(() => {
    console.log("Booksテーブルを削除しました");
  });
};

const closeDatabase = () => {
  dbClose();
};

const main = async () => {
  await createTable();
  await insertBook("javascriptの本");
  await outputBook();
  await dropTable();
  await closeDatabase();
};

main();
