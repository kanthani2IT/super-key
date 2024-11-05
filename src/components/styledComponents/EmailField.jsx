// EmailField.js
import { TextField } from '@mui/material';

const EmailField = ({ label = "Email ID", name = "mailId", value, onChange, error, helperText }) => {
  return (
    <TextField
      label={label}
      name={name}
      type="email"
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

export default EmailField;
