const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validateUser = require("../middleware/validate").validateUser;
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.post("/", validateUser, userController.createUser);
router.get("/profile", auth, userController.getProfile);

module.exports = router;