import MemoOperation, { db } from "./memoOperation.js";
import OperateInterface from "./operateInterface.js";

const memoOperation = new MemoOperation();
const operateInterface = new OperateInterface(memoOperation);

const firstArg = process.argv[2];

if (firstArg === "-l") {
  operateInterface.listMemos();
} else if (firstArg === "-r") {
  operateInterface.readMemos();
} else if (firstArg === "-d") {
  operateInterface.deleteMemo();
} else {
  operateInterface.writeMemoFromInterface();
}
