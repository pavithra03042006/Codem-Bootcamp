const getUsers = (req, res) => {
  console.log("Fetching users");
  res.status(200).json([
    { id: 1, name: "Sai" },
    { id: 2, name: "Anu" },
    { id: 3, name: "Rahul" }
  ]);
};

const getMessage = (req, res) => {
  console.log("Sending controller message");
  res.status(200).json({
    message: "Users controller working"
  });
};

module.exports = {
  getUsers,
  getMessage
};