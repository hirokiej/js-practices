import readline from "readline";
import enquirer from "enquirer";
import { db } from "./memoOperation.js";
const { Select } = enquirer;

export default class OperateInterface {
  constructor() {}
  selectMemoFromList(result) {
    db.all("SELECT * FROM memo", (err, rows) => {
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
}
