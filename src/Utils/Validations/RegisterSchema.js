import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  fullname: yup.string().required("Input your name"),
  email: yup
    .string()
    .email()
    .required()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address"
    ),
  password: yup
    .string()
    .min(8)
    .required("Password must contain at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});