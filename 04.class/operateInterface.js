import readline from "readline";
import enquirer from "enquirer";
import { db } from "./memoOperation.js";

const { Select } = enquirer;
export default class OperateInterface {
  constructor(memoOperation) {
    this.memoOperation = memoOperation;
  }

  async listMemos() {
    try {
      const rows = await this.memoOperation.fetchMemos();
      rows.forEach((row) => {
        console.log(`${row.content.split("\n")[0]}`);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async readMemos() {
    try {
      const result = await this.#selectMemoFromList("see");
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteMemo() {
    try {
      const result = await this.#selectMemoFromList("delete");
      this.memoOperation.removeMemo(result);
    } catch (err) {
      console.error(err);
    }
  }

  async writeMemo() {
    try {
      const content = await this.#createMemoPrompt();
      await this.memoOperation.addMemo(content);
    } catch (err) {
      console.error(err);
    }
  }

  async #selectMemoFromList(action) {
    try {
      const rows = await this.memoOperation.fetchMemos();
      const memos = this.#extractFirstLine(rows, action);
      return this.#promptForMemo(memos, action);
    } catch (err) {
      console.error(err);
    }
  }

  #extractFirstLine(rows, action) {
    return rows.map((row) => {
      const firstLine = row.content.split("\n")[0];
      if (action === "delete") {
        return { name: firstLine, value: row.id };
      } else {
        return { name: firstLine, value: row.content };
      }
    });
  }

  #promptForMemo(memo, action) {
    const prompt = new Select({
      type: "select",
      name: "name",
      message: `Choose a memo you want to ${action}:`,
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
