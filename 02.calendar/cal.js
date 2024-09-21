#!/usr/bin/env node

const today = new Date();
const [month, day, year] = [
  today.getMonth() + 1,
  today.getDate(),
  today.getFullYear(),
];
