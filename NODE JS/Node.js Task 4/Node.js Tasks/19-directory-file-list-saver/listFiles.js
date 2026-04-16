const fs = require("fs");

fs.readdir("assets", (err, files) => {
    if (err) {
        console.log("Error reading directory");
        return;
    }

    const content = files.join("\n");

    fs.writeFile("fileList.txt", content, (err) => {
        if (err) {
            console.log("Error writing file");
            return;
        }
        console.log("File list saved successfully");
    });
});