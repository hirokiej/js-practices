import readline from "readline";
import enquirer from "enquirer";

const { Select } = enquirer;

export default class OperateInterface {
  constructor(memoOperation) {
    this.memoOperation = memoOperation;
  }

  async listMemos() {
    const memos = await this.memoOperation.fetchMemos();
    if (memos.length === 0) {
      console.error("No memos found.");
      return;
    }
    memos.forEach((memo) => {
      console.log(memo.content.split("\n")[0]);
    });
  }

  async readMemos() {
    const result = await this.#selectMemosFromList("see");
    if (result) {
      console.log(result);
    } else {
      return;
    }
  }

  async deleteMemo() {
    const result = await this.#selectMemosFromList("delete");
    if (result) {
      this.memoOperation.removeMemo(result);
      console.log("Memo deleted!");
    } else {
      return;
    }
  }

  async writeMemo() {
    const content = await this.#createMemoPrompt();
    await this.memoOperation.addMemo(content);
    console.log("Memo added.");
  }

  async #selectMemosFromList(action) {
    const memos = await this.memoOperation.fetchMemos();
    if (memos.length === 0) {
      console.error("No memos found.");
      return;
    }
    const choices = this.#extractFirstLineAndValue(memos, action);
    return this.#promptForMemo(choices, action);
  }

  #extractFirstLineAndValue(memos, action) {
    return memos.map((memo) => {
      const firstLine = memo.content.split("\n")[0] || " ";
      if (action === "delete") {
        return { name: firstLine, value: memo.id };
      } else {
        return { name: firstLine, value: memo.content };
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
