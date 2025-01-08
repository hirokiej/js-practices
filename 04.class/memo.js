#!/usr/bin/env node

import MemoOperation from "./memoOperation.js";
import OperationInterface from "./operationInterface.js";

main();

async function main() {
  const memoOperation = new MemoOperation();
  const operationInterface = new OperationInterface(memoOperation);

  const validOptions = ["-l", "-r", "-d"];
  const firstArg = process.argv[2];

  try {
    if (!firstArg) {
      await operationInterface.writeMemo();
    } else if (firstArg === "-l") {
      await operationInterface.listMemos();
    } else if (firstArg === "-r") {
      await operationInterface.readMemos();
    } else if (firstArg === "-d") {
      await operationInterface.deleteMemo();
    } else if (!validOptions.includes(firstArg)) {
      console.error(
        "Invalid option: Please use -l(list), -r(read) or -d(delete)",
      );
    }
  } finally {
    memoOperation.dbClose();
  }
}
