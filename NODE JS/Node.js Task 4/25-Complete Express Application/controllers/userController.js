let users = [
  { id: 1, name: "Sai", email: "sai@mail.com" },
  { id: 2, name: "Anu", email: "anu@mail.com" }
];

const getUsers = (req, res) => {
  console.log("Fetching users");
  res.status(200).json({
    success: true,
    data: users
  });
};

const createUser = (req, res) => {
  const { id, name, email } = req.body;

  users.push({ id, name, email });
  console.log("User created");

  res.status(201).json({
    success: true,
    message: "User created successfully"
  });
};

const getProfile = (req, res) => {
  console.log("Protected profile accessed");
  res.status(200).json({
    success: true,
    message: "Authorized user profile"
  });
};

module.exports = {
  getUsers,
  createUser,
  getProfile
};