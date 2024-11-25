import styled from "@emotion/styled";
import {
    Autocomplete,
    Box,
    Divider,
    TextField,
    Typography,
    createFilterOptions,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";

const AddManuallyButton = styled(Typography)({
    color: "#2954E1",
    cursor: "pointer",
    marginLeft: "auto",
    fontSize: "0.875rem",
    fontWeight: 500,
});

const filter = createFilterOptions();

const AppAutoComplete = ({
    freeSolo = true,
    options = [],
    nameParam = "label",
    valueParam = "value",
    placeholder = 'type',
    inputValue,
    error,
    onChange,
    name,
    value,
    onSearch,
    searchString,
    ...props
}) => {
    const [open, setOpen] = useState(false)
    const theme = useTheme()
    const handleAddManually = (customOption) => {

        onChange(name, customOption);
        onSearch('');

        setOpen(false);

    }
    const handleClose = () => {
        setOpen(false);
        onSearch('');

    };
    const handleInputChange = (_, newInputValue, reason) => {
        if (reason == 'input') {
            onSearch(newInputValue);
        }
    }
    return (
        <Autocomplete
            {...props}

            name={name}
            value={value}
            options={options}
            clearOnBlur
            openOnFocus
            freeSolo={freeSolo}
            onChange={(_, value) => onChange(name, value)}
            onInputChange={handleInputChange}
            getOptionLabel={(option) => {
                if (typeof option === "string") {
                    return option;
                }
                return option[nameParam] || "";
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                if (freeSolo && (params.inputValue !== "")) {
                    return [
                        { id: "add-manually", [nameParam]: params.inputValue, isCustom: true },
                        ...filtered,
                    ];
                }

                return filtered;
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeholder}
                    error={Boolean(error)}
                    helperText={error}
                />
            )}
            renderOption={(props, option) => {
                if (option?.isCustom) {
                    return (
                        <>
                            <Box
                                {...props}
                                key={option[valueParam]}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    cursor: "default !important", // Prevent click event on entire option
                                    "&:hover": {
                                        backgroundColor: "transparent !important", // Prevent hover color change
                                    },
                                }}
                                onClick={(event) => event.stopPropagation()}
                            >
                                <Typography variant="subtitle1">{option[nameParam]}</Typography>
                                <AddManuallyButton
                                    role="button"
                                    tabIndex={0}
                                    onClick={(event) => {

                                        handleAddManually(option)
                                    }}
                                >
                                    Add Manually
                                </AddManuallyButton>
                            </Box>
                            <Divider />
                        </>
                    );
                }
                const isSelected = value && option[valueParam] === value[valueParam];

                return (
                    <>

                        <Box
                            {...props}
                            key={option[valueParam]}
                            aria-selected={isSelected ? "true" : "false"}
                            sx={{
                                px: 2,
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: isSelected ? theme.palette.info.light : "transparent",
                                "&:hover": {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: isSelected ? "bold" : "normal" }}>
                                {option[nameParam]}
                            </Typography>
                        </Box>
                        <Divider />
                    </>

                );
            }}
            ListboxProps={{
                sx: {
                    width: 'auto',
                    maxHeight: "153px",
                    overflowY: "auto",
                    padding: 0,
                    color: "inherit",
                    "& .MuiAutocomplete-option": {
                        minHeight: "45px",
                        display: "flex",
                        alignItems: "center",
                        "&:hover, &:focus": {
                            backgroundColor: theme.palette.info.light,
                        },
                    },


                },
            }}
            componentsProps={{
                paper: {
                    sx: {
                        width: 'auto',
                        background: '#F7F9FB',
                        marginTop: 2, // Add gap
                        borderRadius: 2,
                        "& .MuiAutocomplete-noOptions": {
                            color: "inherit",
                            fontWeight: "bold",
                        },


                    },
                },
            }}
            noOptionsText='No data found'
            selectOnFocus

            fullWidth
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => {
                handleClose()
            }}
        />
    );
};

export default AppAutoComplete;
