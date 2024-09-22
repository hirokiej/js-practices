#!/usr/bin/env node

import dayjs from "dayjs";

const today = dayjs();
const [month, aday, year] = [today.month() + 1, today.date(), today.year()];

const firstDay = dayjs().startOf("month");
const lastDay = dayjs().endOf("month");

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
