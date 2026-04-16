const fs = require("fs");

function logTime(message) {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const timeStamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} - ${message}\n`;

    fs.appendFile("timeLog.txt", timeStamp, (err) => {
        if (err) {
            console.log("Error writing log");
            return;
        }
        console.log("Message logged");
    });
}

module.exports = logTime;