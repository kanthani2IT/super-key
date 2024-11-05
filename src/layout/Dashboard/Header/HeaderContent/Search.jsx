// material-ui
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

// assets
import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
// ==============================|| HEADER CONTENT - SEARCH ||============================== //

export default function Search() {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%', textAlign: 'center', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 224, lg: 300 } }}>


        <OutlinedInput
          color='success'
          size="small"
          id="header-search"
          fullWidth

          startAdornment={
            <InputAdornment disableRipple position="start" sx={{ mr: -0.5 }}>
              <SearchIcon size={'medium'} color='success' />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight',
            sx: {
              fontWeight: 'bold', // Make placeholder bold
            },
          }}
          disableRipple
          sx={{
            backgroundColor: theme => theme.palette.grey[100], // Set background color to light grey

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.grey.A100, // Set default border color to success
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.success.main, // Optional: Darken border on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.success.main, // Keep success color when focused
            },
          }}
          placeholder="Search Property / Assets"
        />
      </FormControl>
    </Box>
  );
}
