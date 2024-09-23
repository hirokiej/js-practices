#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv.slice(2));

const today = dayjs();
const year = argv.y ?? today.year();
const month = argv.m ?? today.month() + 1;

const firstDay = dayjs(`"${year}-${month}"`).startOf("month");
const lastDay = dayjs(`"${year}-${month}"`).endOf("month");

const startOfWeek = firstDay.day();

console.log(" ".repeat(6) + `${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

process.stdout.write(" ".repeat(startOfWeek * 3)); //全角 + 半角で3スペース必要

for (let f = firstDay.date(); f <= lastDay.date(); f++) {
  if (f < 10) {
    process.stdout.write(` ${f} `);
  } else {
    process.stdout.write(`${f} `);
  }
  if ((startOfWeek + f) % 7 === 0) {
    console.log();
  }
}

console.log();
