const fs = require("fs");

fs.readFile("text.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file");
        return;
    }

    const words = data.trim().split(/\s+/);
    const unique = [...new Set(words)].join("\n");

    fs.writeFile("uniqueWords.txt", unique, (err) => {
        if (err) {
            console.log("Error writing file");
            return;
        }
        console.log("Unique words saved successfully");
    });
});