const EventEmitter = require("events");
const fs = require("fs");

const emitter = new EventEmitter();

// 1. dataReceived
emitter.on("dataReceived", async (data) => {
  console.log("dataReceived →", data);

  if (data.value > 0) {
    emitter.emit("dataValid", data);
  } else {
    emitter.emit("dataInvalid");
  }
});

// 2. dataValid
emitter.on("dataValid", async (data) => {
  console.log("dataValid → validation passed");

  let processed = {
    id: data.id,
    value: data.value * 2
  };

  emitter.emit("dataProcessed", processed);
});

// 3. dataProcessed
emitter.on("dataProcessed", async (data) => {
  console.log("dataProcessed →", data);

  fs.writeFile("result.txt", JSON.stringify(data), (err) => {
    if (!err) {
      emitter.emit("dataSaved");
    }
  });
});

// 4. dataSaved
emitter.on("dataSaved", () => {
  console.log("dataSaved → written to result.txt");
});

// Start the pipeline
emitter.emit("dataReceived", { id: 1, value: 42 });