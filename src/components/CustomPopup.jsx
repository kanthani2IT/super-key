import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import AppMenu from "./AppComponents/AppMenu";
import AppPriorityItems from "./AppPriorityComponent";

const FilterDrawer = ({ anchorEl, setAnchorEl, filterColumns }) => {
  const initialTab = Object.keys(filterColumns)[0];
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [checkedFilters, setCheckedFilters] = useState({});

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleApply = () => {
    const appliedFilters = [];

    Object.keys(checkedFilters).forEach((key) => {
      if (checkedFilters[key]) {
        appliedFilters.push(key);
      }
    });

    if (!isAnyCheckboxSelected) return;
    const selectedFilters = selectedProperty.filter(
      (_, index) => checkboxState[index]
    );

    setAnchorEl(null);
  };

  const toggleFilter = (idOrName) => {
    const updatedCheckedFilters = { ...checkedFilters };

    if (updatedCheckedFilters[idOrName]) {
      delete updatedCheckedFilters[idOrName];
    } else {
      updatedCheckedFilters[idOrName] = true;
    }

    setCheckedFilters(updatedCheckedFilters);
  };
  const renderOptions = () => {
    const currentFilters = filterColumns[selectedTab]?.data || [];
    return currentFilters.map((filter) => {
      if (filterColumns[selectedTab]?.checked) {
        return (
          <FormControlLabel
            key={filter.id || filter.name}
            control={
              <Checkbox
                checked={!!checkedFilters[filter.id || filter.name]}
                onChange={() => toggleFilter(filter.id || filter.name)}
              />
            }
            label={filter.Name}
            sx={{ display: "block", mb: 1 }}
          />
        );
      }

      return (
        <AppPriorityItems
          key={filter.name}
          name={filter.name}
          color={filter.color}
          isSelected={!!checkedFilters[filter.name]}
          onClick={() => toggleFilter(filter.name)}
        />
      );
    });
  };

  const renderComponent = () => {
    return (
      <>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ width: "100%" }}>
            {Object.keys(filterColumns).map((tab) => (
              <Button
                key={tab}
                variant={selectedTab === tab ? "contained" : "none"}
                color={selectedTab === tab ? "none" : "default"}
                onClick={() => handleTabClick(tab)}
                sx={{
                  width: "155px",
                  height: "41px",
                  margin: "8px 7px",
                  borderRadius: "8px",
                  backgroundColor:
                    selectedTab === tab ? "#E0EDFF" : "transparent",
                  color: selectedTab === tab ? "#2954E1" : "black",
                }}
              >
                {filterColumns[tab]?.label}
              </Button>
            ))}
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 2, marginLeft: "-20px" }}
          />
          <Box
            sx={{
              width: "100%",
              height: "18rem",
              overflow: "scroll",
              padding: "8px",
            }}
          >
            <Box sx={{ mt: 1 }}>{renderOptions()}</Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{ display: "flex", justifyContent: "space-between", mt: 2, p: 1 }}
        >
          <Button
            variant="outlined"
            onClick={() => setAnchorEl(null)}
            sx={{
              borderRadius: "10px",
              fontWeight: 500,
              fontSize: "14px",
              textTransform: "none",
              width: "45%",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApply}
            disabled={Object.keys(checkedFilters).length === 0}
            sx={{
              borderRadius: "10px",
              fontWeight: 500,
              fontSize: "14px",
              textTransform: "none",
              width: "45%",
            }}
          >
            Apply
          </Button>
        </Box>
      </>
    );
  };

  return (
    <AppMenu
      renderComponent={renderComponent()}
      anchorEl={anchorEl}
      handleClose={() => handleClose()}
      width="500px"
      borderRadius="10px"
    />
  );
};

export default FilterDrawer;
