const http = require("http");
const fs = require("fs");

function receiveChunks(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    let totalSize = 0;

    req.on("data", (chunk) => {
      chunks.push(chunk);
      totalSize += chunk.length;
    });

    req.on("end", () => {
      resolve({
        buffer: Buffer.concat(chunks),
        size: totalSize
      });
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

function validateFile(file) {
  return new Promise((resolve, reject) => {
    const maxSize = 1024 * 1024; // 1MB

    if (file.size > maxSize) {
      reject({ status: 400, message: "File too large" });
    } else {
      resolve(file);
    }
  });
}

function scanFile(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(file);
    }, 500);
  });
}

function saveFile(file) {
  return new Promise((resolve, reject) => {
    fs.writeFile("photo.jpg", file.buffer, (err) => {
      if (err) {
        reject({ status: 500, message: "File save failed" });
      } else {
        resolve("photo.jpg");
      }
    });
  });
}

function generateThumbnail() {
  return new Promise((resolve, reject) => {
    fs.writeFile("thumb_photo.jpg", "thumbnail file", (err) => {
      if (err) {
        reject({ status: 500, message: "Thumbnail generation failed" });
      } else {
        resolve("thumb_photo.jpg");
      }
    });
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
    receiveChunks(req)
      .then(validateFile)
      .then(scanFile)
      .then((file) => {
        return Promise.all([
          saveFile(file),
          generateThumbnail()
        ]).then(([filename, thumbnail]) => {
          return {
            success: true,
            filename: filename,
            size: `${Math.ceil(file.size / 1024)}KB`,
            thumbnail: thumbnail
          };
        });
      })
      .then((result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result, null, 2));
      })
      .catch((err) => {
        res.writeHead(err.status || 500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: err.message || "Upload failed" }, null, 2));
      });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }, null, 2));
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});