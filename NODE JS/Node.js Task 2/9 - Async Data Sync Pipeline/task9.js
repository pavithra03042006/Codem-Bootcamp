const fs = require("fs");

function fetchRemoteData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const remote = [
        { id: 1, name: "A" },
        { id: 2, name: "B" }
      ];
      console.log("Remote fetched: 2 records");
      resolve(remote);
    }, 600);
  });
}

function fetchLocalData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const local = [
        { id: 2, name: "Old B" },
        { id: 3, name: "C" }
      ];
      console.log("Local fetched: 2 records");
      resolve(local);
    }, 400);
  });
}

function syncData(remote, local) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const map = {};

      local.forEach(item => {
        map[item.id] = item;
      });

      remote.forEach(item => {
        map[item.id] = item; // remote wins
      });

      const result = Object.values(map);
      console.log("Synced: 3 records (1 conflict resolved)");
      resolve(result);
    }, 300);
  });
}

function saveResult(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.writeFile("sync.json", JSON.stringify(data, null, 2), (err) => {
        if (err) reject(err);
        else {
          console.log("Saved to sync.json");
          resolve();
        }
      });
    }, 200);
  });
}

Promise.all([fetchRemoteData(), fetchLocalData()])
  .then(([remote, local]) => syncData(remote, local))
  .then((data) => saveResult(data))
  .catch((err) => console.log("Error:", err));