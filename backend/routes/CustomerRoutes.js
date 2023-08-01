const express = require("express");
const router = express.Router();

//controller
const { add } = require("../controllers/CustomerController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

const {
  customerAddValidation,
  userUpdateValidation,
  loginValidation,
} = require("../middlewares/customerValidations");

//Routes
router.post("/add", authGuard, customerAddValidation(), validate, add);

// router.post("/login", loginValidation(), validate, login);
// router.get("/profile", authGuard, getCurrentUser);
// router.put("/update", authGuard, userUpdateValidation(), validate, update);
// router.get("/:id", getUserById);

module.exports = router;
