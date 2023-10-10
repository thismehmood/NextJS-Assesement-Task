// utils/validationSchema.js

import * as yup from "yup";

const schema = yup.object().shape({
  carModel: yup.string().required(),
  price: yup
    .number()
    .required()
    .typeError("Number only.")
    .positive()
    .integer()
    .round(),
  phone: yup
    .string()
    .required()
    .matches(
      /^\+\d{1,}(\s\(\d{3}\))?(\s\d{3}-\d{4})?$/,
      "Invalid phone number format. Please use a valid format."
    ),
});

export default schema;
