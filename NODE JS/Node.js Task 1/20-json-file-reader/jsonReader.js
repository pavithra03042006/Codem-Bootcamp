const fs = require("fs");

fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading JSON file");
        return;
    }

    const products = JSON.parse(data);

    console.log("Product List");
    products.forEach(product => {
        console.log(`${product.name} - $${product.price}`);
    });
});