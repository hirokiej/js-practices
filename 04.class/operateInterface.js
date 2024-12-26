import readline from "readline";
import enquirer from "enquirer";
import MemoOperation, { db } from "./memoOperation.js";

const { Select } = enquirer;
export default class OperateInterface {
  constructor(memoOperation) {
    this.memoOperation = memoOperation;
  }

  listMemos() {
    this.memoOperation.fetchMemos().then((rows) => {
      rows.forEach((row) => {
        console.log(`${row.content.split("\n")[0]}`);
      });
    });
  }

  readMemos() {
    this.#selectMemoFromList()
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  }

  deleteMemo() {
    this.#selectMemoFromList().then((result) => {
      this.memoOperation.removeMemo(result);
    });
  }

  #selectMemoFromList() {
    return this.memoOperation.fetchMemos().then((rows) => {
      const memo = this.#extractFirstLine(rows);
      return this.#promptForMemo(memo);
    });
  }

  writeMemoFromInterface() {
    this.#createMemoPrompt().then((memo) => {
      this.memoOperation.addMemo(memo).then(() => {
        db.close();
      });
    });
  }

  #extractFirstLine(rows) {
    return rows.map((row) => {
      const firstLine = row.content.split("\n")[0];
      return { name: firstLine, value: row.content };
    });
  }
  #promptForMemo(memo) {
    const prompt = new Select({
      type: "select",
      name: "name",
      message: "choose your memo",
      choices: memo,
      result() {
        return this.focused.value;
      },
    });
    return prompt.run();
  }

  #createMemoPrompt() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      let memo = "";
      rl.on("line", (content) => {
        memo += content + "\n";
      });
      rl.on("close", () => {
        resolve(memo);
      });
    });
  }
}
