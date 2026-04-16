const fs = require('fs');

const stream = fs.createWriteStream('output.txt');

console.log("Writing line 1...");
stream.write("Name: Arun\n");

console.log("Writing line 2...");
stream.write("Age: 25\n");

console.log("Writing line 3...");
stream.write("City: Chennai\n");

console.log("Writing line 4...");
stream.write("Role: Developer\n");

stream.end();

stream.on('finish', () => {
    console.log("All data written to output.txt");
});