const fs = require("fs");

const start = Date.now();

// Function to print phase name with time
function log(phase, message) {
  const time = Date.now() - start;
  console.log(`[${time}ms] ${phase} — ${message}`);
}

// 1. Synchronous code runs first in call stack
log("Sync", "call stack");

// 2. nextTick runs before Promise microtasks
process.nextTick(() => {
  log("nextTick", "microtask queue");
});

// 3. Promise then runs after nextTick
Promise.resolve().then(() => {
  log("Promise", "microtask queue");
});

// 4. setTimeout runs in timers phase
setTimeout(() => {
  log("setTimeout", "timers phase");
}, 0);

// 5. setImmediate runs in check phase
setImmediate(() => {
  log("setImmediate", "check phase");
});

// 6. fs.readFile callback runs in I/O callbacks phase
fs.readFile("task10.js", "utf8", () => {
  log("fs.readFile", "I/O callbacks phase");
});