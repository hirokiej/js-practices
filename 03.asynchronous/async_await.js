#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTable = () => {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL)",
      () => {
        console.log("Booksテーブルを作成しました");
        resolve();
      },
    );
  });
};

const insertBook = (title) => {
  return new Promise((resolve) => {
    db.run("INSERT INTO books(title) VALUES(?)", title, () => {
      console.log("本を追加しました");
      resolve();
    });
  });
};

const outputBook = () => {
  return new Promise((resolve) => {
    db.each("SELECT * FROM BOOKS", (_, row) => {
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
  await insertBook("javascriptの本");
  await outputBook();
  await dropTable();
  await closeDatabase();
};

main();
