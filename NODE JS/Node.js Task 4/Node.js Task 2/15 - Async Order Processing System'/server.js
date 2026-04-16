const http = require("http");

function validateOrder(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.item && order.qty && order.userId) {
        resolve(order);
      } else {
        reject({ status: 400, message: "Invalid order data" });
      }
    }, 200);
  });
}

function checkInventory(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.qty <= 5) {
        resolve({ available: true });
      } else {
        reject({ status: 409, message: "Insufficient inventory" });
      }
    }, 300);
  });
}

function chargePayment(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.userId > 0) {
        resolve({ paid: true });
      } else {
        reject({ status: 402, message: "Payment failed" });
      }
    }, 300);
  });
}

function createShipment() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ trackingId: "TRK-8821" });
    }, 300);
  });
}

function sendConfirmation() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ emailSent: true });
    }, 300);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/orders") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      let order;

      try {
        order = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Invalid JSON" }));
      }

      validateOrder(order)
        .then(validOrder => {
          return Promise.all([
            checkInventory(validOrder),
            chargePayment(validOrder)
          ]);
        })
        .then(() => {
          return Promise.all([
            createShipment(),
            sendConfirmation()
          ]);
        })
        .then(([shipment, confirmation]) => {
          const result = {
            orderId: "ORD-1042",
            status: "confirmed",
            trackingId: shipment.trackingId,
            emailSent: confirmation.emailSent
          };

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result, null, 2));
        })
        .catch(err => {
          res.writeHead(err.status || 500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: err.message || "Server Error" }, null, 2));
        });
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});