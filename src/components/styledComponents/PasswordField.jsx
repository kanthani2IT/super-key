// Login.js
import { TextField } from '@mui/material';

const PasswordField = ({ label, name, value, onChange, error, helperText }) => {
  return (
    <TextField
      label={label}
      name={name}
      type="password"
      fullWidth
      margin="normal"
      variant="standard"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
    />
  );
};

export default PasswordField;
