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

const FilterDrawer = ({
  anchorEl,
  setAnchorEl,
  filterColumns,
  setFilterData,
  selectedTab,
  setSelectedTab,
}) => {
  const [checkedFilters, setCheckedFilters] = useState({});

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleApply = () => {
    // const appliedFilters = [];

    // Object.keys(checkedFilters).forEach((key) => {
    //   if (checkedFilters[key]) {
    //     appliedFilters.push(key);
    //   }
    // });
    // console.log(checkedFilters, appliedFilters,"$$$$ %%%")
    // setFilterData(appliedFilters);
    // setAnchorEl(null);
  };

  const toggleFilter = (idOrName,key) => {
    const updatedCheckedFilters = { ...checkedFilters };

    if (updatedCheckedFilters[idOrName]) {
      delete updatedCheckedFilters[idOrName];
    } else {
      updatedCheckedFilters[idOrName] = true;
    }
    setCheckedFilters(updatedCheckedFilters);
  };

  const priorityColors = {
    High: "#E81616",
    Normal: "#EB6C0B",
    Low: "#DEC013",
  };

  const renderOptions = () => {
    const currentFilters = filterColumns?.[selectedTab]?.data || [];
    return currentFilters?.map((filter) => {
      const color = priorityColors[filter?.name] || "#000";
      if (filterColumns[selectedTab]?.checked) {
        console.log(checkedFilters[filter.name],"$$$$$$$$$$$$")
        return (
          <FormControlLabel
            key={filter.Id || filter.Name}
            control={
              <Checkbox
                checked={!!checkedFilters[filter.Name]}
                onChange={() => toggleFilter(filter.Name, filterColumns[selectedTab]?.checked)}
              />
            }
            label={filter.Name}
            sx={{
              display: "flex",
              mb: 1,
            }}
          />
        );
      }

      return (
        <>
         { console.log(checkedFilters[filter.name],"$$$$$$$$$$$$")}
        
        <AppPriorityItems
          key={filter.name}
          name={filter.name}
          color={color}
          isSelected={!!checkedFilters[filter.name]}
          onClick={() => toggleFilter(filter.name, filterColumns[selectedTab]?.checked)}
        />
        </>
      );
    });
  };

  const renderComponent = () => {
    return (
      <>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ width: "100%" }}>
            {filterColumns?.map((tab, index) => (
              <Button
                key={index}
                variant={selectedTab === index ? "contained" : "none"}
                color={selectedTab === index ? "none" : "default"}
                onClick={() => handleTabClick(index)}
                sx={{
                  width: "155px",
                  height: "41px",
                  margin: "8px 7px",
                  borderRadius: "8px",
                  backgroundColor:
                    selectedTab === index ? "#E0EDFF" : "transparent",
                  color: selectedTab === index ? "#2954E1" : "black",
                }}
              >
                {tab?.label}
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
            // disabled={Object.keys(checkedFilters).length === 0}
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
      // handleClose={() => handleClose()}
      width="500px"
      borderRadius="10px"
    />
  );
};

export default FilterDrawer;
