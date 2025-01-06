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
    const content = await this.#selectMemoFromList("see");
    if (!content) return;
    console.log(content);
  }

  async deleteMemo() {
    const id = await this.#selectMemoFromList("delete");
    if (!id) return;
    this.memoOperation.removeMemo(id);
    console.log("Memo deleted!");
  }

  async writeMemo() {
    const content = await this.#imputMemo();
    await this.memoOperation.addMemo(content);
    console.log("Memo added.");
  }

  async #selectMemoFromList(action) {
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
      const prop = action === "delete" ? "id" : "content";
      return { name: firstLine, value: memo[prop] };
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

  #imputMemo() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      let content = "";
      rl.on("line", (line) => {
        content += line + "\n";
      });
      rl.on("close", () => {
        resolve(content);
      });
    });
  }
}
