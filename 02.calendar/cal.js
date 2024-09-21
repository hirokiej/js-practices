#!/usr/bin/env node

const today = new Date();
const [month, day, year] = [
  today.getMonth() + 1,
  today.getDate(),
  today.getFullYear(),
];

const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month, 0);

console.log(" ".repeat(6) + `${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
for (let f = firstDay.getDate(); f <= lastDay.getDate(); f++) {
  console.log(f);
}
