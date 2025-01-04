#!/usr/bin/env node

import MemoOperation from "./memoOperation.js";
import OperateInterface from "./operateInterface.js";

const memoOperation = new MemoOperation();
const operateInterface = new OperateInterface(memoOperation);

const validOptions = ["-l", "-r", "-d"];
const firstArg = process.argv[2];

async function main() {
  try {
    if (!firstArg) {
      await operateInterface.writeMemo();
    } else if (!validOptions.includes(firstArg)) {
      console.error(
        "Invalid option: Please use -l(list), -r(read) or -d(delete)",
      );
    } else if (firstArg === "-l") {
      await operateInterface.listMemos();
    } else if (firstArg === "-r") {
      await operateInterface.readMemos();
    } else if (firstArg === "-d") {
      await operateInterface.deleteMemo();
    }
  } finally {
    memoOperation.dbClose();
  }
}

main();
