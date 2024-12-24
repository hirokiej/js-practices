import readline from "readline";
import enquirer from "enquirer";
import MemoOperation, { db } from "./memoOperation.js";
const { Select } = enquirer;

export default class OperateInterface {
  constructor() {
    this.memoOperation = new MemoOperation();
  }
  selectMemoFromList(result) {
    this.memoOperation.listMemo().then((rows) => {
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
      prompt.run().then(result).catch(console.error);
    });
  }

  writeMemoFromInterface() {
    this.#createMemoPrompt().then((memo) => {
      this.memoOperation.addMemo(memo).then(() => {
        db.close();
      });
    });
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
