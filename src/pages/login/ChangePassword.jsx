import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PasswordChange from './ForgetPassword';
import { PASSWORD_CHANGE_TEXTS, CREDENTIAL_ERRORS, PASSWORD_REGEX } from '../../utils/loginUtils'; // Importing static data, errors, and regex
import LoginWrapper from './LoginWrapper';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the URL parameter (taskId)

  const [userCredentials, setUserCredentials] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const onChangeCredential = (event) => {
    const { name, value } = event.target;
    setUserCredentials((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '' // Clear error when user types
    }));
  };

  const validatePasswords = () => {
    let isValid = true;
    const validationErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    if (id === 'reset') {
      if (!userCredentials.currentPassword.trim()) {
        validationErrors.currentPassword = CREDENTIAL_ERRORS.currentPasswordRequired;
        isValid = false;
      } else if (!PASSWORD_REGEX.test(userCredentials.currentPassword)) {
        validationErrors.currentPassword = CREDENTIAL_ERRORS.passwordInvalid;
        isValid = false;
      }
    }

    if (!userCredentials.newPassword.trim()) {
      validationErrors.newPassword = CREDENTIAL_ERRORS.newPasswordRequired;
      isValid = false;
    } else if (!PASSWORD_REGEX.test(userCredentials.newPassword)) {
      validationErrors.newPassword = CREDENTIAL_ERRORS.passwordInvalid;
      isValid = false;
    }

    if (!userCredentials.confirmPassword.trim()) {
      validationErrors.confirmPassword = CREDENTIAL_ERRORS.confirmPasswordRequired;
      isValid = false;
    } else if (userCredentials.confirmPassword !== userCredentials.newPassword) {
      validationErrors.confirmPassword = CREDENTIAL_ERRORS.passwordsDoNotMatch;
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePasswords()) {
      // Reset user credentials and navigate to login
      setUserCredentials({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      navigate('/login');
    }
  };

  return (
    <div>
      <LoginWrapper
        handleSubmit={handleSubmit}
        buttonText={PASSWORD_CHANGE_TEXTS.buttonText}
        credentialHeading={PASSWORD_CHANGE_TEXTS.credentialHeading}
      >
        <PasswordChange
          taskId={id}
          userCredentials={userCredentials}
          disclaimerText={PASSWORD_CHANGE_TEXTS.disclaimerText}
          onChangeCredential={onChangeCredential}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </LoginWrapper>
    </div>
  );
};

export default ChangePassword;
