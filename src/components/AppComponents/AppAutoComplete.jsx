import styled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  createFilterOptions,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import AppToolTip from "./AppToolTip";

const AddManuallyButton = styled(Typography)({
  color: "#2954E1",
  cursor: "pointer",
  marginLeft: "auto",
  fontSize: "0.875rem",
  fontWeight: 500,
});

const AddManuallyOptionWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  cursor: "default !important", // Prevent click event on entire option
  "&:hover": {
    backgroundColor: "transparent !important", // Prevent hover color change
  },
});
const OptionWrapper = styled(Box)(({ theme, isSelected }) => ({
  // px: 2,
  display: "flex",
  alignItems: "center",
  backgroundColor: isSelected ? theme.palette.info.light : "transparent",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const filterOption = createFilterOptions();

const AppAutoComplete = ({
  freeSolo = true,
  options = [],
  nameParam = "label",
  valueParam = "id",
  placeholder = "type",
  inputValue,
  error,
  onChange,
  name,
  value,
  onSearch,
  onBlur,
  loading = false,
  filter = true,
  searchKey = "",
  variant = "outlined",
  disableClearable,
  disabled,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleAddManually = (customOption) => {
    onChange?.({ target: { name, value: customOption?.trim() } });
    onSearch?.("");

    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
    onSearch?.("");
  };
  const handleInputChange = (_, newInputValue, reason) => {
    if (reason == "input") {
      onSearch?.(newInputValue, searchKey ?? name);
    }
  };

  const handleChange = (event, newValue) => {
    onChange?.({ target: { name, value: newValue } });
  };
  const handleBlur = (event) => {
    onBlur?.({ target: { name, value } });
  };
  const isLoading = !options?.length && loading;

  return (
    <Autocomplete
      {...props}
      disableClearable={isLoading || disableClearable}
      name={name}
      value={value}
      options={options}
      clearOnBlur
      openOnFocus
      disabled={isLoading || disabled}
      freeSolo={freeSolo}
      onChange={handleChange}
      onBlur={handleBlur}
      onInputChange={handleInputChange}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        return option[nameParam] || "";
      }}
      filterOptions={(options, params) => {
        const filtered = filter ? filterOption(options, params) : options;
        if (freeSolo && params.inputValue !== "") {
          return [
            {
              id: "add-manually",
              [nameParam]: params.inputValue,
              isCustom: true,
            },
            ...filtered,
          ];
        }

        return filtered;
      }}
      renderInput={(params) => (
        <TextField
          variant={variant}
          {...params}
          placeholder={placeholder}
          error={Boolean(error)}
          helperText={error}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <AppToolTip placement="bottom" title="Fetching...">
                      <CircularProgress color="inherit" size={20} />
                    </AppToolTip>
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        if (option?.isCustom) {
          return (
            <>
              <AddManuallyOptionWrapper
                {...props}
                key={option[valueParam]}
                onClick={(event) => event.stopPropagation()}
              >
                <Typography variant="subtitle1">{option[nameParam]}</Typography>
                <AddManuallyButton
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    handleAddManually(option);
                  }}
                >
                  Add Manually
                </AddManuallyButton>
              </AddManuallyOptionWrapper>
              <Divider />
            </>
          );
        }
        const isSelected = value && option[valueParam] === value[valueParam];

        return (
          <>
            <OptionWrapper
              isSelected={isSelected}
              {...props}
              key={option[valueParam]}
              aria-selected={isSelected ? "true" : "false"}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: isSelected ? "bold" : "normal" }}
              >
                {option[nameParam]}
              </Typography>
            </OptionWrapper>
            <Divider />
          </>
        );
      }}
      ListboxProps={{
        sx: {
          width: "auto",
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
            width: "auto",
            background: theme.palette.primary.lighter,
            marginTop: 2,
            borderRadius: 2,
            "& .MuiAutocomplete-noOptions": {
              color: "inherit",
              fontWeight: "bold",
            },
          },
        },
      }}
      noOptionsText="No data found"
      selectOnFocus
      fullWidth
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => {
        handleClose();
      }}
    />
  );
};

export default AppAutoComplete;
