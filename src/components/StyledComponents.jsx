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
export const BoldTypographyHeader = styled(Typography)({
  fontWeight: '600',
  fontSize: "14px",
  color: ' #000000'
});

export const communityStyles = {
  container: (height) => ({
    height,
    width: '100%',
    overflow: 'auto',
  }),
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    backgroundColor: '#F7F9FB',
    marginBottom: '16px',
  },
  searchInput: {
    width: '240px',
    backgroundColor: '#FFFFFF',
    '& .MuiOutlinedInput-root': {
      height: '36px',
      borderRadius: '8px',
      '&.Mui-focused fieldset': {
        borderColor: '#278B5C',
      },
    },
  },
  searchIcon: {
    color: '#278B5C',
  },
  iconGroup: {
    display: 'flex',
    gap: '16px',
  },
  icon: {
    color: '#000000',
  },
  noData: {
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    color: '#6c757d',
  },
  claims: {
    color: '#278B5C',
    paddingLeft: '30px',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '28px',
    position: 'relative',
  },
  paginationText: {
    fontSize: '14px',
    color: '#6c757d',
  },
  pagination: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    '& .MuiPaginationItem-root': {
      color: '#333',
    },
    '& .Mui-selected': {
      backgroundColor: '#E6F3ED',
      color: '#278B5C',
      border: 'none',
    },
  },
};


export const communityAssetButton = {
  buttonColor: {
    color: "#E9E9E9",
    height: "50px",
    width: "100px",
    textColor: "#7B828F",
    variant: "contained"
  }
}
