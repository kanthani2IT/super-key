import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, IconButton, Typography, Box, Button, createFilterOptions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddIcCallOutlined, Clear } from '@mui/icons-material';

// Styled component for the custom "Add Manually" button
const AddManuallyButton = styled(Typography)({
    color: '#1a73e8',
    cursor: 'pointer',
    marginLeft: 'auto',
    fontSize: '0.875rem',
    fontWeight: '500',

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
    background: '#EBF1F4',
    borderRadius: '8px',
    '& .MuiInputBase-input': {
        padding: '8px 0',
        fontSize: '1rem',
        '&::placeholder': {
            color: '#757575', // Set the placeholder color here
            opacity: 1,       // Ensure the placeholder is fully opaque
        },
    },
});

const AppAutocompleteComponent = ({ onChange, searchString, value, placeholder, options }) => {
    const [open, setOpen] = useState(false)
    const handleSearchChange = (event) => {
        const search = event.target.value;
        // Trigger onSearch callback with the new search value
        if (onChange) {
            onChange('searchTerm', search);
            if (!search) {
                onchange('value', null)
            }

        }
    };

    // Handle the Add Manually button click
    const handleAddManuallyClick = () => {
        setOpen(false);
        if (onChange) {
            onChange('value', searchString);
            // onChange('searchTerm', null);
        }
    };
    const handleClose = () => {
        setOpen(false);
        if (onChange) {
            onChange('searchTerm', '');
        }
    };
    const handleChange = (value) => {

        if (onChange) {
            onChange('value', value);
        }
        onChange('searchTerm', '');

    }
    const handleClear = () => {
        if (onChange) {
            onChange('value', null, true);
        }
    }
    const filter = createFilterOptions();
    return (
        <Autocomplete
            freeSolo
            selectOnFocus
            clearOnBlur
            fullWidth
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => {
                handleClose()
            }}
            onInputChange={(event, value, reason) => reason == "clear" && handleClear()}
            onChange={(_, value) => handleChange(value?.label)}
            value={value}
            options={options}
            filterOptions={(options, params) => {

                const filtered = filter(options, params);
                if (searchString) {
                    filtered.push({
                        searchTerm: true
                    });
                }
                return filtered;
            }}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.label) {
                    return option.label;
                }
                // Regular option
                return option.label;
            }}
            renderOption={(props, option) => (
                !option.searchTerm && <Box
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
                    placeholder={placeholder ?? 'Search your address'}
                    onBlur={() => {
                        onChange('searchTerm', ''); // Clear search term on blur if dropdown closed without a selection
                    }}
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
                    {searchString != "" && searchString !== value && <Box component={'li'} onMouseDown={(event) => event.preventDefault()} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {searchString}
                        </Typography>
                        <AddManuallyButton
                            role="button" // Accessible role for screen readers
                            tabIndex={0}
                            onMouseDown={(event) => event.preventDefault()} // Prevent dropdown close
                            onClick={handleAddManuallyClick}>
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
