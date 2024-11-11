// TextField.js
import { TextField } from '@mui/material';

const CustomTextField = ({type="text", color = 'primary', label = "Email ID", name = "mailId", value, onChange, error, helperText }) => {
  return (
    <TextField
      color={color}
      label={label}
      name={name}
      type={type}
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

export default CustomTextField;
