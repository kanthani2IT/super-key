import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthCookies } from "utils/cookie";
import { useNewPassword, useResetPassword } from "hooks/useLogin";
import {
  CREDENTIAL_ERRORS,
  PASSWORD_CHANGE_TEXTS,
  PASSWORD_REGEX,
} from "../../utils/loginUtils"; // Importing static data, errors, and regex
import PasswordChange from "./ForgetPassword";
import LoginWrapper from "./LoginWrapper";

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  token: "",
};

const ChangePassword = () => {
  const { id } = useParams(); // Access the URL parameter (taskId)
  const newPasswordMutation = useNewPassword();
  const resetPasswordMutation = useResetPassword();
  const { getCookie } = useAuthCookies();

  const [userCredentials, setUserCredentials] = useState(initialState);

  const [errors, setErrors] = useState(initialState);

  const onChangeCredential = (event) => {
    const { name, value } = event.target;
    setUserCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when user types
    }));
  };

  const validatePasswords = () => {
    let isValid = true;
    const validationErrors = initialState;

    if (id === "reset") {
      if (!userCredentials.currentPassword.trim()) {
        validationErrors.currentPassword =
          CREDENTIAL_ERRORS.currentPasswordRequired;
        isValid = false;
      } else if (!PASSWORD_REGEX.test(userCredentials.currentPassword)) {
        validationErrors.currentPassword = CREDENTIAL_ERRORS.passwordInvalid;
        isValid = false;
      }
    } else {
      if (!userCredentials.token.trim()) {
        validationErrors.token = CREDENTIAL_ERRORS.token;
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
      validationErrors.confirmPassword =
        CREDENTIAL_ERRORS.confirmPasswordRequired;
      isValid = false;
    } else if (
      userCredentials.confirmPassword !== userCredentials.newPassword
    ) {
      validationErrors.confirmPassword = CREDENTIAL_ERRORS.passwordsDoNotMatch;
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePasswords()) {
      const token = getCookie("token");
      if (id == "reset") {
        delete userCredentials.token;
        newPasswordMutation.mutate(userCredentials);
      } else {
        let payload = {
          password: userCredentials.newPassword,
          token: userCredentials.token,
        };
        resetPasswordMutation.mutate(payload);
      }
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
