import React from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { communityStyles } from 'components/StyledComponents';

const AppTableSearch = ({
  placeholder = 'Search...',
  searchTerm,
  onSearchChange,
  icons = [],
}) => {
  return (
    <Box sx={communityStyles.header}>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={communityStyles.searchIcon} />
            </InputAdornment>
          ),
        }}
        sx={communityStyles.searchInput}
      />
      <Box sx={communityStyles.iconGroup}>
        {icons.map((icon, index) => (
          <IconButton key={index} onClick={icon.onClick}>
            {icon.component}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default AppTableSearch;
