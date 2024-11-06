import LoginLogo from 'assets/images/login/login.png';
import CompanyLogo from 'assets/images/login/loginLogo.svg';
import LoginWrapper from 'pages/login/LoginWrapper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CREDENTIAL_ERRORS,
  PASSWORD_CHANGE_TEXTS,
  PASSWORD_REGEX
} from '../../utils/loginUtils'; // Import constants
import Login from '../login/login';

import { useGetQuery } from 'hooks/useLogin';

const LoginPage = () => {
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    mailId: '',
    password: '',
    resetPassword: false,
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    mailId: '',
    password: '',
    newPassword: CREDENTIAL_ERRORS.passwordInvalid,
    confirmPassword: ''
  });

  const [next, setNext] = useState(false);

  const mailValidation = () => {
    let isValid = true;
    const newErrors = {};

    if (!userCredentials.mailId.trim()) {
      newErrors.mailId = CREDENTIAL_ERRORS.emailRequired;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userCredentials.mailId)) {
      newErrors.mailId = CREDENTIAL_ERRORS.emailInvalid;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const passwordValidation = () => {
    let isValid = true;
    const newErrors = {};

    if (!userCredentials.password.trim()) {
      newErrors.password = CREDENTIAL_ERRORS.currentPasswordRequired; // Use imported error message
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onChangeCredential = (event) => {
    const { name, value } = event.target;
    setUserCredentials((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '' // Clear the error message when the user types
    }));
  };

  const onClickBack = () => {
    setNext(false);
    setUserCredentials((prevData) => ({
      ...prevData,
      password: ''
    }));
  };

  const validatePasswords = () => {
    let isValid = true;
    const newErrors = {
      newPassword: CREDENTIAL_ERRORS.newPasswordRequired,
      confirmPassword: ''
    };

    if (!PASSWORD_REGEX.test(userCredentials.newPassword)) {
      newErrors.newPassword = CREDENTIAL_ERRORS.passwordInvalid;
      isValid = false;
    } else if (userCredentials.confirmPassword !== userCredentials.newPassword) {
      newErrors.confirmPassword = CREDENTIAL_ERRORS.passwordsDoNotMatch;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetPassword = () => {
    navigate('/changePassword/forget');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!next && mailValidation()) {
      setNext(true); // Move to password step
    } else if (userCredentials.resetPassword && validatePasswords()) {
      setNext(false);
      setUserCredentials({
        mailId: '',
        password: '',
        resetPassword: false,
        newPassword: '',
        confirmPassword: ''
      });
      // Navigate after password reset
    } else if (next && passwordValidation()) {
      navigate('/home'); // Navigate on successful login
    }
  };

  const isPasswordReset = next && userCredentials.resetPassword;
  const isLoginButton = next && !userCredentials.resetPassword;



  const value = useGetQuery()


  return (
    <div>
      <LoginWrapper
        handleSubmit={handleSubmit}
        buttonText={isPasswordReset ? PASSWORD_CHANGE_TEXTS.buttonText : isLoginButton ? 'Log In' : 'Next'}
        credentialHeading={isPasswordReset ? PASSWORD_CHANGE_TEXTS.credentialHeading : isLoginButton ? 'Enter Password' : 'Enter Email ID'}
        onClickBack={onClickBack}
        userCredentials={userCredentials}
        next={next}
      >
        <Login
          disclaimerText={PASSWORD_CHANGE_TEXTS.disclaimerText}
          companyLogo={CompanyLogo}
          loginImage={LoginLogo}
          onChangeCredential={onChangeCredential}
          userCredentials={userCredentials}
          errors={errors}
          next={next}
          resetPassword={resetPassword}
        />
      </LoginWrapper>
    </div>
  );
};

export default LoginPage;
