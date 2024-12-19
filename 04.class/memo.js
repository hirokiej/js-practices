import sqlite3 from "sqlite3";
import readline from "readline";

const db = new sqlite3.Database("memo.db");

db.run(
  "CREATE TABLE IF NOT EXISTS memo(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)",
);

const firstArg = process.argv[2];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let memo = "";
rl.on("line", (content) => {
  memo += content + "\n";
});
rl.on("close", () => {
  db.run("INSERT INTO memo(content) VALUES(?)", [memo], (err) => {
    if (err) {
      console.error(err.message);
    } else {
      db.close();
    }
  });
});
