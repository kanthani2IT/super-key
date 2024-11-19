import styled from "@emotion/styled";
import { TextField, Typography } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.grey,
}));

export const Image = styled('img')`
  height: 20vh;
  width: 100%;
`;

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    padding: '6px 10px',
    borderRadius: '8px',
    '& fieldset': {
      borderColor: '#d1d9e6',
    },
    '&:hover fieldset': {
      borderColor: '#c0c0c0',
    },
  },
  background: '#F7F9FB',
  borderRadius: '8px',
  '& .MuiInputBase-input': {
    padding: '8px 0',
    fontWeight: "600",
    fontSize: '1rem',
    '&::placeholder': {
      color: '#757575', // Set the placeholder color here
      opacity: 1,       // Ensure the placeholder is fully opaque
    },
  },
});
