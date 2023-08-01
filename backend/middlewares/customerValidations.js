const { body } = require("express-validator");

const customerAddValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("The name is mandatory")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 characters"),
    body("email")
      .isString()
      .withMessage("The email is mandatory")
      .isEmail()
      .withMessage("Enter a valid email"),
    body("phone")
      .isString()
      .withMessage("The phone is mandatory")
      .isLength({ min: 10 })
      .withMessage("phone needs minimum 10 numbers"),
    body("address")
      .isString()
      .withMessage("The address is mandatory")
      .isLength({ min: 10 })
      .withMessage("address needs minimum 10 caracteres"),
  ];
};

// const loginValidation = () => {
//   return [
//     body("email")
//       .isString()
//       .withMessage("The email is mandatory")
//       .isEmail()
//       .withMessage("Enter a valid email"),
//     body("password").isString().withMessage("The password is mandatory"),
//   ];
// };

// const userUpdateValidation = () => {
//   return [
//     body("name")
//       .optional()
//       .isLength({ min: 3 })
//       .withMessage("Minimum 3 characters"),
//     body("email").optional().isEmail().withMessage("Enter a valid email"),
//     body("password")
//       .optional()
//       .isLength({ min: 5 })
//       .withMessage("Password needs Minimum 5 characters"),
//   ];
// };

module.exports = {
  customerAddValidation,
};
