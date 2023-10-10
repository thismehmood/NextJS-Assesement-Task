export const UNAUTHORIZED = {
  INVALID_JWT: `Invalid token! Please Login Again`,
  EXPIRED_JWT: `Your token has expired! please login again`,
  INVALID_EXPIRED: `Token is invalid or has been Expired`,
  UNAUTHORIZE: "You are not authorize to perform this action",
};

export const PROGRAMMING = {
  SOME_ERROR: `Something went wrong`,
};

export const REQUIRED = {
  EMAIL_REQUIRED: `Email is required`,
  FIRSTNAME_REQUIRED: `FirstName is required`,
  LASTNAME_REQUIRED: `LastName is required`,
  USERNAME_REQUIRED: "Username is Required",
  PASSWORD_REQUIRED: `Password is required`,
  PHONE_REQUIRED: `Phone Number is required`,
  IMAGE_REQUIRED: `Image is required`,
};

export const INVALID = {
  INVALID_LOGIN_CREDENTIALS: "Email or Password is Incorrect",
  WRONG_CREDENTIAL_ERROR_EMAIL: `Email or password is incorrect`,
  WRONG_CREDENTIAL_ERROR_PHONE: `Phone or password is incorrect`,
  NO_CREDENTIALS_EMAIL: `Please provide email and password`,
  NO_CREDENTIALS_PHONE: `Please provide Phone Number and password`,
  INVALID_EMAIL: `Please Enter Valid Email`,
  INVALID_PHONE: `Please Enter Valid Phone(a)`,
  INVALID_FIRSTNAME: `FirstName must only contain characters between A-Z`,
  INVALID_LASTNAME: `lastName must only contain characters between A-Z`,
  INVALID_PHONE_NUM: `Please Enter Valid Phone Number`,
  PASSWORD_LENGTH: `Enter Password with 8 or more characters`,
  PASSWORD_MISMATCH: `Password and ConfirmPassword are not equal`,
  INVALID_PASSWORD: "Invalid Password",
  NOT_FOUND: "Not Found",
  UNABLE_TO_DELETE: "Unable to delete",
  INVALID_VERIFICATION_TOKEN:
    "Verification Code is invalid or has been expired",
  VERIFY_EMAIL: "Please verify your email address first",
  INVALID_CODE: "Invalid Code",
};
