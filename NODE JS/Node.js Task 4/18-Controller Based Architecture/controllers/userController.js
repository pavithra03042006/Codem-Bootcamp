const getMessage = (req, res) => {
  console.log("Controller message function called");
  res.status(200).json({
    message: "Controller executed successfully"
  });
};

const getUsers = (req, res) => {
  console.log("Get users controller called");
  res.status(200).json([
    { id: 1, name: "Sai" },
    { id: 2, name: "Anu" },
    { id: 3, name: "Rahul" }
  ]);
};

module.exports = {
  getMessage,
  getUsers
};