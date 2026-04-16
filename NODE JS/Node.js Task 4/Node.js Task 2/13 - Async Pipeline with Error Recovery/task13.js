const fs = require("fs");

function fetchUserData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Fetching user ${id}...`);

      if (id > 10) {
        reject("User not found");
      } else {
        resolve({
          id: id,
          name: "Arun",
          email: "arun@mail.com"
        });
      }
    }, 400);
  });
}

function validateUser(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Validating email...");

      if (user.email && user.email.includes("@")) {
        resolve(user);
      } else {
        reject("Invalid email");
      }
    }, 200);
  });
}

function enrichUser(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Enriching user data...");

      user.role = "admin";
      user.joinedAt = new Date().toISOString();

      resolve(user);
    }, 300);
  });
}

function saveUser(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Saving to users.json...");

      fs.writeFile("users.json", JSON.stringify(user, null, 2), (err) => {
        if (err) {
          reject("Save failed");
        } else {
          resolve(user);
        }
      });
    }, 200);
  });
}

function saveUserWithRetry(user) {
  return saveUser(user).catch(() => {
    console.log("Retrying save...");
    return saveUser(user);
  });
}

fetchUserData(5)
  .then((user) => {
    return validateUser(user).catch(() => {
      console.log("Invalid email, using default user...");
      return {
        id: user.id,
        name: "Default User",
        email: "default@mail.com"
      };
    });
  })
  .then(enrichUser)
  .then(saveUserWithRetry)
  .then((user) => {
    console.log("Done:", {
      id: user.id,
      name: user.name,
      role: user.role
    });
  })
  .catch((err) => {
    console.log("Error:", err);
  });