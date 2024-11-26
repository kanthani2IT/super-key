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


export const BoldTypographyHeader = styled(Typography)({
  fontWeight: '600',
  fontSize: "14px",
  color:' #000000'
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
    color:"#E9E9E9",
    height:"50px",
    width:"100px",
    textColor:"#7B828F",
    variant:"contained"
  }
}