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
