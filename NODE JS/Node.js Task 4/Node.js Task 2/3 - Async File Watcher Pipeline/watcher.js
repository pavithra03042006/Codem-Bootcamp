const fs = require("fs");

function readFile(filename) {
  return new Promise((resolve, reject) => {
    console.log("Reading file...");
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function parseContent(content) {
  return new Promise((resolve) => {
    let lines = content.split("\n");
    let filteredLines = lines.filter(line => line.trim() !== "");
    let removed = lines.length - filteredLines.length;

    console.log(`Parsing ${lines.length} lines, ${removed} empty removed`);
    resolve(filteredLines.join("\n"));
  });
}

function saveProcessed(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile("output.txt", data, (err) => {
      if (err) reject(err);
      else {
        console.log("Saved to output.txt");
        resolve();
      }
    });
  });
}

function watchAndProcess(filename) {
  fs.watch(filename, () => {
    console.log(`File changed: ${filename}`);

    readFile(filename)
      .then(parseContent)
      .then(saveProcessed)
      .catch(err => console.log("Error:", err.message));
  });
}

watchAndProcess("data.txt");
console.log("Watching data.txt for changes...");