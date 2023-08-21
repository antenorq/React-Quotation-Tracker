const express = require("express");
const router = express.Router();

//controller
const {
  add,
  update,
  getAll,
  getQuotationById,
} = require("../controllers/QuotationController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const {
  quotationAddValidation,
  quotationUpdateValidation,
} = require("../middlewares/quotationValidations");

//Routes
router.post("/add", authGuard, quotationAddValidation(), validate, add);
router.get("/list", authGuard, getAll);
router.put(
  "/update/:id",
  authGuard,
  quotationUpdateValidation(),
  validate,
  update
);
router.get("/:id", getQuotationById);

module.exports = router;
