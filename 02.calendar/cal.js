#!/usr/bin/env node

const today = new Date();
const [month, day, year] = [
  today.getMonth() + 1,
  today.getDate(),
  today.getFullYear(),
];

console.log(" ".repeat(6) + `${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
