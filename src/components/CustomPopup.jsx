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
  operator = "equals",
  filterData = [],
}) => {
  const [checkedFilters, setCheckedFilters] = useState(filterData);
  const [selectedName, setSelectedName] = useState(null);
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleApply = () => {
    const checkingStatus = checkedFilters.map((item) => {
      if (item?.column === "status") {
        return filterData.find((el) => el.column === "status");
      } else return item;
    });
    setFilterData(checkingStatus);
    setAnchorEl(null);
  };

  const handlePriorityColor = (name) => {
    const colorName = selectedName === name ? null : name;
    setSelectedName(colorName);
  };

  const toggleFilter = (idOrName, key) => {
    const updatedCheckedFilters = [...checkedFilters];

    // Check if the filter already exists
    const existingIndex = updatedCheckedFilters.findIndex(
      (filter) => filter.name === idOrName
    );

    if (existingIndex > -1) {
      // Remove the filter if it exists
      updatedCheckedFilters.splice(existingIndex, 1);
    } else {
      // Add the new filter
      updatedCheckedFilters.push({
        column: key,
        name: idOrName,
        operator: operator,
      });
    }
    setCheckedFilters(updatedCheckedFilters);
  };

  const priorityColors = {
    High: "#E81616",
    Normal: "#EB6C0B",
    Low: "#DEC013",
  };

  console.log(selectedTab, "$$$ selected tab2");
  const renderOptions = () => {
    const currentFilters = filterColumns?.[selectedTab]?.data || [];
    return currentFilters?.map((filter) => {
      const color = priorityColors[filter?.name] || "#000";
      if (filterColumns[selectedTab]?.checked) {
        return (
          <FormControlLabel
            key={filter.Id || filter.Name}
            control={
              <Checkbox
                checked={checkedFilters.some(
                  (item) => item.name === filter.Name
                )}
                onChange={() => toggleFilter(filter.Name, selectedTab)}
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
          <AppPriorityItems
            key={filter.name}
            name={filter.name}
            color={color}
            isSelected={checkedFilters.some(
              (item) => item.name === filter.name
            )}
            selectedName={selectedName}
            onClick={() => {
              toggleFilter(filter.name, selectedTab);
              handlePriorityColor(filter.name);
            }}
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
                variant={Number(selectedTab) === index ? "contained" : "none"}
                color={Number(selectedTab) === index ? "none" : "default"}
                onClick={() => handleTabClick(index)}
                sx={{
                  width: "155px",
                  height: "41px",
                  margin: "8px 7px",
                  borderRadius: "8px",
                  backgroundColor:
                    Number(selectedTab) === index ? "#E0EDFF" : "transparent",
                  color: Number(selectedTab) === index ? "#2954E1" : "black",
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
