import * as Yup from "yup"

// utils.js
export const PASSWORD_CHANGE_TEXTS = {
  disclaimerText:
    'Welcome to SuperKey Modern Insurance. This system is for the use of authorized users of SuperKey only. Individuals using this service without authority, or in excess of their authority, are subject to having all of their activities on this system monitored and recorded by system personnel.',
  credentialHeading: 'Reset Password',
  buttonText: 'Reset'
};

export const CREDENTIAL_ERRORS = {
  currentPasswordRequired: 'Please enter current password',
  passwordInvalid:
    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character',
  newPasswordRequired: 'Please enter new password',
  confirmPasswordRequired: 'Please confirm your password',
  passwordsDoNotMatch: 'Passwords do not match',
  emailRequired: 'Email ID is required',
  emailInvalid: 'Invalid email format',
  token:"Token is required"
};
// Regular expression for password validation
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

export const PASSWORD_VALIDATION = ({ name }) => {
  return Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must be at most 15 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .matches(/^\S*$/, 'password must not contain any spaces')
    .required(`${name} Password is required`);
};

export const CONFIRM_PASSWORD= Yup.string()
.oneOf([Yup.ref('newPassword'), null], 'New Password and Confirm password not matched')
.required('Confirm password is required')

export const EMAIL_VALIDATION=Yup.string().email('Must be a valid email').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[com]{3}$/, 'Must be a valid email')
.max(255).required('Email is required')

export const PASSWORD_NOTE="Ensure the password is 8-15 characters long, containing at least one uppercase letter, one lowercase letter, one digit, and one special character."

  // Form fields configuration
export const LOGIN_CONFIG = [
    {
      id: 'email-login',
      name: 'email',
      type: 'email',
      label: 'Email ID',
      placeholder: 'Enter Your Email ID',
      validation: EMAIL_VALIDATION,
      
    },
    {
      id: 'password-login',
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter Your Password',
      validation: Yup.string()
      .max(255).required('Password is required')
      .matches(/^\S*$/, 'password must not contain any spaces')
      .min(8, 'Password must be at least 8 characters')
      .max(15, 'Password must be at most 15 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one digit')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    }
];

// Dynamic validation schema
export const createValidationSchema = (fields) => {
  const schema = {};
  fields.forEach(({ name, validation }) => {
    schema[name] = validation;
  });
  return Yup.object().shape(schema);
};