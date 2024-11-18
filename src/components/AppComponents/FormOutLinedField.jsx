import { useState } from 'react';

// material-ui
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormHelperText, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';


// ============================|| REUSABLE FORM FIELD COMPONENT ||============================ //

export const FormOutLinedField = ({
  id,
  type,
  name,
  value,
  handleBlur,
  handleChange,
  placeholder,
  label,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <Stack spacing={1}>
      <Typography variant="h7" color="#5B738B" fontSize="0.75rem">
        {label}
      </Typography>
      <OutlinedInput
        id={id}
        type={type === 'password' && showPassword ? 'text' : type}
        value={value}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        fullWidth
        error={Boolean(error)}
        sx={{ background: '#EBF1F4' }}
        endAdornment={
          type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                color="secondary"
              >
                {showPassword ? <Visibility fontSize="small" color="action" /> : <VisibilityOff fontSize="small" color="action" />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      {error && (
        <FormHelperText error>
          {error}
        </FormHelperText>
      )}
    </Stack>
  );
};


