import readline from "readline";
import enquirer from "enquirer";

import MemoOperation, { db } from "./memoOperation.js";
import OperateInterface from "./operateInterface.js";

const { Select } = enquirer;

const memoOperation = new MemoOperation();
const operateInterface = new OperateInterface();

const firstArg = process.argv[2];

if (firstArg === "-l") {
  memoOperation.listMemo().then((rows) => {
    rows.forEach((row) => {
      console.log(`${row.content.split("\n")[0]}`);
    });
  });
} else if (firstArg === "-r") {
  operateInterface.selectMemoFromList((result) => {
    console.log(result);
  });
} else if (firstArg === "-d") {
  db.all("SELECT * FROM memo", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    const memo = rows.map((row) => {
      const firstLine = row.content.split("\n")[0];
      return { name: firstLine, value: row.content };
    });
    const prompt = new Select({
      type: "select",
      name: "name",
      message: "choose your memo",
      choices: memo,
      result() {
        return this.focused.value;
      },
    });
    prompt
      .run()
      .then((content) => {
        memoOperation.deleteMemo(content);
      })
      .catch(console.error);
  });
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let memo = "";
  rl.on("line", (content) => {
    memo += content + "\n";
  });
  rl.on("close", () => {
    memoOperation.addMemo(memo).then(() => {
      db.close();
    });
  });
}
