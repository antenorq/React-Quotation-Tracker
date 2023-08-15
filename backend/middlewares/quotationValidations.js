const { body } = require("express-validator");

const quotationAddValidation = () => {
  // customerId,
  // userId,
  // status,
  // quoteGiven,
  // date,
  // followUp,
  // quoteDetails,

  return [
    body("customerId").isMongoId().withMessage("Customer invalid"),
    body("userId").isMongoId().withMessage("User invalid"),
    body("status").isString().withMessage("The Status is mandatory"),
    body("quoteGiven")
      .isNumeric()
      .withMessage("Enter a valid Quote Given")
      .isLength({ min: 3 })
      .withMessage("Quote Given value needs minimum 03 number"),
    body("date").isDate().withMessage("Enter a valid Date (YYYY-MM-DD)"),
    body("followUp")
      .isDate()
      .withMessage("Enter a Follow Up valid Date (YYYY-MM-DD)"),
    body("quoteDetails")
      .isString()
      .withMessage("The Quote Detail is mandatory"),
  ];
};

const quotationUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name needs minimum 3 characters"),
    body("email").optional().isEmail().withMessage("Enter a valid email"),
    body("phone")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Phone needs minimum 10 numbers"),
    body("address")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Address needs minimum 10 caracteres"),
  ];
};

module.exports = {
  quotationAddValidation,
  quotationUpdateValidation,
};
