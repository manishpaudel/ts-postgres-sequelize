import { check, body, param, query } from "express-validator";

export const createUserValidator = [
  check("name", "Name is required")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Name must be atleast 2 characters"),

  check("password", "Password is required")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),

  check("confirmPassword", "Password is required")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Confirmation Password must be atleast 6 characters"),

  check("email", "Email is required")
    .notEmpty()
    .isEmail()
    .withMessage("Must be a valid email"),

  body("confirmPassword")
    .custom((value, { req }) => {
      const pw = req.body.password;
      if (pw !== value) return false;
      else return true;
    })
    .withMessage("Password and confirmation password doesn't match"),
];

// object({
//   body: object({
//     name: string({
//       required_error: "Name is required",
//     }),

//     password: string({
//       required_error: "Password is required",
//     }).min(6, "Password must be atleast 6 characters"),

//     confirmPassword: string({
//       required_error: "Confirm Password is required",
//     }).min(6, "Confirm Password must be atleast 6 characters"),

//     email: string({
//       required_error: "Email is required",
//     }).email("Enter a valid email"),
//   }).refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords donot match",
//   }),
// });
