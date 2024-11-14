import { Autocomplete, Box, createFilterOptions, Divider, ListItem, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledTextField } from 'components/StyledComponents';
import { useState } from 'react';

// Styled component for the custom "Add Manually" button
const AddManuallyButton = styled(Typography)({
    color: '#2954E1',
    cursor: 'pointer',
    marginLeft: 'auto',
    fontSize: '0.875rem',
    fontWeight: '500',

});

const OptionComponent = ({ label, props }) => {
    const theme = useTheme()

    return (
        <Box
            component="li"
            {...props}
            sx={{

                backgroundColor: `${theme.palette.primary.lighter} !important`,
                height: "51px",
                '&:hover': {
                    backgroundColor: `${theme.palette.info.light} !important`,

                }

            }}
        >

            <Typography variant="h5">{label}</Typography>
        </Box>
    )
}

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
            renderOption={(props, option, state) => (
                <>  {!option.searchTerm && <OptionComponent label={option.label} props={props} />}
                    {!option.searchTerm && <Divider />}
                </>
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
                <Box sx={{ borderRadius: '8px', boxShadow: 3, overflow: 'hidden', mt: 1.2 }}>
                    {searchString != "" && searchString !== value && <> <Box component={'li'} onMouseDown={(event) => event.preventDefault()} sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px', height: "51px", backgroundColor: '#F7F9FB' }}>
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
                    </Box> <Divider /></>}
                    {children}
                </Box>
            )}

        />
    );
};

export default AppAutocompleteComponent;
