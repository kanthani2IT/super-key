import styled from "@emotion/styled";
import { TextField, Typography } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.grey,
}));

export const Image = styled('img')`
    height: ${(props) => props.height || '50vh'};
    width: ${(props) => props.width || '100%'};
`;

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    padding: '6px 10px',
    borderRadius: '8px',
    '& fieldset': {
      borderColor: '#EBEEF2',
    },
    '&:hover fieldset': {
      borderColor: '#EBEEF2',
    },

  },

  '& .MuiInputBase-input': {
    borderRadius: '8px',
    padding: '8px 0',
    fontWeight: "600",
    fontSize: '1rem',
    background: 'none',
    '& fieldset': {
      borderColor: '#EBEEF2',
    },
    '&:hover fieldset': {
      borderColor: '#EBEEF2',
    },
    '&::placeholder': {
      color: '#98A2B2', // Set the placeholder color here
      opacity: 1,
      fontWeight: "600"// Ensure the placeholder is fully opaque
    },
  },
});
