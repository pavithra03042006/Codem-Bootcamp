const fs = require("fs");
const createGreeting = require("./greeting");

fs.readFile("names.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file");
        return;
    }

    const names = data.trim().split("\n");
    const greetings = names.map(name => createGreeting(name.trim())).join("\n");

    fs.writeFile("greetings.txt", greetings, (err) => {
        if (err) {
            console.log("Error writing file");
            return;
        }
        console.log("Greetings saved successfully");
    });
});