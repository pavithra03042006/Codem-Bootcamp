function createPromise(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, delay);
  });
}

// Timeout wrapper
function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("timeout");
    }, ms);

    promise
      .then(resolve)
      .catch(reject);
  });
}

// Create promises
const promises = [
  withTimeout(createPromise("fetch1", 400), 1000),
  withTimeout(createPromise("fetch2", 1200), 1000),
  withTimeout(createPromise("fetch3", 800), 1000),
  withTimeout(createPromise("fetch4", 2500), 1000),
  withTimeout(createPromise("fetch5", 600), 1000)
];

Promise.allSettled(promises).then(results => {
  let fulfilled = [];
  let timedOut = [];

  results.forEach((res, i) => {
    if (res.status === "fulfilled") {
      fulfilled.push(res.value);
    } else {
      timedOut.push(`fetch${i + 1}`);
    }
  });

  console.log("Fulfilled:", fulfilled.join(", "));
  console.log("Timed out:", timedOut.join(", "));
});