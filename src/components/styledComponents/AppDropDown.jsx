import React from 'react';
import { Autocomplete, TextField, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Sample data for the autocomplete options (now as an array of objects)
const options = [
    { label: "Phoenix North Estates, Phoenix, AZ 85023, USA", value: "AZ" },
    { label: "New York, Phoenix, NY 54321, USA", value: " " },
    { label: "India, Phoenix", value: "LA" },
];

// Styled component for the custom "Add Manually" button
const AddManuallyButton = styled(Button)({
    color: '#1a73e8',
    cursor: 'pointer',
    marginLeft: 'auto',
    fontSize: '0.875rem',
    fontWeight: '500',
    '&:hover': {
        color: '#1a73e8',
        background: '#f5f5f5',
    },
});

const StyledTextField = styled(TextField)({
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
    '& .MuiInputBase-input': {
        padding: '8px 0',
        fontSize: '1rem',
    },
});

const AppAutocompleteComponent = ({ onSearch, searchString }) => {

    const handleSearchChange = (event) => {
        const { value } = event.target
        // Trigger onSearch callback with the new search value
        if (onSearch) {
            onSearch(value);
        }
    };

    // Handle the Add Manually button click
    const handleAddManuallyClick = () => {
        console.log('Add manually clicked');
    };
    return (
        <Autocomplete

            fullWidth
            options={options}
            getOptionLabel={(option) => option.label}  // Specify the label to display
            renderOption={(props, option) => (
                <Box
                    component="li"
                    {...props}
                    sx={{
                        backgroundColor: props['aria-selected'] ? '#e3f2fd' : 'transparent',
                        padding: '8px 16px',
                        '&:hover': {
                            backgroundColor: '#e3f2fd',
                        },
                    }}
                >
                    <Typography variant="body2">{option.label}</Typography>
                </Box>
            )}
            renderInput={(params) => (
                <StyledTextField
                    {...params}
                    label=""
                    variant="outlined"
                    placeholder='Search your address'
                    value={searchString} // Make sure value is controlled
                    onChange={handleSearchChange}
                />
            )}
            ListboxProps={{
                style: {
                    padding: 0,
                },
            }}
            PaperComponent={({ children }) => (
                <Box sx={{ borderRadius: '8px', boxShadow: 3, overflow: 'hidden', mt: 1 }}>
                    {searchString && <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {searchString}
                        </Typography>
                        <AddManuallyButton onClick={() => console.log('first')()}>
                            Add Manually
                        </AddManuallyButton>
                    </Box>}
                    {children}
                </Box>
            )}
        />
    );
};

export default AppAutocompleteComponent;
