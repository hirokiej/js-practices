#!/usr/bin/env node

import MemoOperation from "./memoOperation.js";
import OperateInterface from "./operateInterface.js";

const memoOperation = new MemoOperation();
const operateInterface = new OperateInterface(memoOperation);

const firstArg = process.argv[2];

async function main() {
  try {
    if (firstArg === "-l") {
      await operateInterface.listMemos();
    } else if (firstArg === "-r") {
      await operateInterface.readMemos();
    } else if (firstArg === "-d") {
      await operateInterface.deleteMemo();
    } else {
      await operateInterface.writeMemo();
    }
  } finally {
    memoOperation.dbClose();
  }
}

main();
