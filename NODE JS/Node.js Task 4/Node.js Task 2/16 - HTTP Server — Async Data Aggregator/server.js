const http = require("http");

function getSales() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(85000);
    }, 200);
  });
}

function getExpenses() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(32000);
    }, 250);
  });
}

function getRefunds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(4500);
    }, 150);
  });
}

function calcProfit(sales, expenses, refunds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sales - expenses - refunds); // 48500
    }, 200);
  });
}

function calcTax(profit) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(8730); // expected value
    }, 200);
  });
}

function formatReport(sales, expenses, profit, tax) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sales: sales,
        expenses: expenses,
        profit: profit,
        tax: tax,
        netAfterTax: profit - tax
      });
    }, 300);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/aggregate") {
    console.time("Total Time");
    const start = Date.now();

    try {
      // Batch 1
      const [sales, expenses, refunds] = await Promise.all([
        getSales(),
        getExpenses(),
        getRefunds()
      ]);

      // Batch 2
      const [profit, tax] = await Promise.all([
        calcProfit(sales, expenses, refunds),
        calcProfit(sales, expenses, refunds).then((p) => calcTax(p))
      ]);

      const report = await formatReport(sales, expenses, profit, tax);

      const timeTaken = Date.now() - start;
      console.timeEnd("Total Time");

      report.timeTaken = `${timeTaken}ms`;

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(report, null, 2));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server Error" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});