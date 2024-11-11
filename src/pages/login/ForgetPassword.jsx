import PasswordField from "components/styledComponents/PasswordField.jsx";

const PasswordChange = ({
  userCredentials,
  onChangeCredential,
  errors,
  taskId,
}) => {
  return (
    <>
      {taskId === "reset" && (
        <PasswordField
          label="Current Password"
          name="currentPassword"
          value={userCredentials.currentPassword}
          onChange={onChangeCredential}
          error={errors.currentPassword}
          helperText={errors.currentPassword}
        />
      )}

      <PasswordField
        label="New Password"
        name="newPassword"
        value={userCredentials.newPassword}
        onChange={onChangeCredential}
        error={errors.newPassword}
        helperText={errors.newPassword}
      />

      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        value={userCredentials.confirmPassword}
        onChange={onChangeCredential}
        error={errors.confirmPassword}
        helperText={errors.confirmPassword}
      />
    </>
  );
};

export default PasswordChange;
