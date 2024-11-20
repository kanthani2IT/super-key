import { useNewPassword, useResetPassword } from "hooks/useLogin";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  CREDENTIAL_ERRORS,
  PASSWORD_CHANGE_TEXTS,
  PASSWORD_REGEX,
} from "../../utils/loginUtils"; // Importing static data, errors, and regex
import PasswordChange from "./ForgetPassword";
import LoginWrapper from "./LoginWrapper";
import { useAuthCookies } from "utils/cookie";
const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const { id } = useParams(); // Access the URL parameter (taskId)
  const newPasswordMutation = useNewPassword();
  const resetPasswordMutation = useResetPassword();
  const { getCookie } = useAuthCookies()
  const user = getCookie("user")
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
      if (id == "reset") {
        let payload = {
          email: user?.email || "",
          password: userCredentials.currentPassword,
          newPassword: userCredentials.newPassword,
        }
        newPasswordMutation.mutate(payload);
      } else {
        let payload = {
          password: userCredentials.newPassword,
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
