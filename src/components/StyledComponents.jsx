import styled from "@emotion/styled";
import { alpha, TextField, Typography } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme, color }) => ({
  color: color ?? theme.palette.text.grey,
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



export const BootstrapInput = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F3F6F9',
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 16,
    //   width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
    }),
  },
}));
