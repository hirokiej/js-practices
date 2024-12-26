import MemoOperation, { db } from "./memoOperation.js";
import OperateInterface from "./operateInterface.js";

const memoOperation = new MemoOperation();
const operateInterface = new OperateInterface(memoOperation);

const firstArg = process.argv[2];

if (firstArg === "-l") {
  operateInterface.listMemos();
} else if (firstArg === "-r") {
  operateInterface.selectMemoFromList((result) => {
    console.log(result);
  });
} else if (firstArg === "-d") {
  operateInterface.selectMemoFromList((result) => {
    memoOperation.deleteMemo(result);
  });
} else {
  operateInterface.writeMemoFromInterface();
}
