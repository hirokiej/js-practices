#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv.slice(2));

const today = dayjs();
const year = argv.y ?? today.year();
const month = argv.m ?? today.month() + 1;

const firstDay = dayjs(`"${year}-${month}"`).startOf("month");
const lastDay = dayjs(`"${year}-${month}"`).endOf("month");

console.log(`${" ".repeat(6)}${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

process.stdout.write(" ".repeat(firstDay.day() * 3)); // 1日分のスペースとして3つの半角空白が必要

for (
  let monthDay = firstDay;
  monthDay <= lastDay;
  monthDay = monthDay.add(1, "day")
) {
  const isSaturday = monthDay.day() === 6;
  const isLastDay = monthDay.isSame(lastDay, "day");

  process.stdout.write(`${monthDay.date() < 10 ? " " : ""}${monthDay.date()}`);

  if (isLastDay || isSaturday) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}
