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
  selectedProperty = [],
  selectedPriority = [],
  setSelectedPriority,
  toggleFilter,
  anchorEl,
  setAnchorEl,
}) => {
  const [selectedTab, setSelectedTab] = useState("Assigned to");
  const isAnyFilteredSelect = selectedProperty.some(
    (filter) => filter.selected
  );

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const handleApply = () => {
    if (!isAnyFilteredSelect) return;
    const appliedFilters = selectedProperty.filter((filter) => filter.selected);
    console.log("Applied Filters:", appliedFilters);
    setAnchorEl(null);
  };

  const colors = {
    0: "#E81616",
    1: "#EB6C0B",
    2: "#DEC013",
  };

  Object.keys(selectedPriority).forEach((key) => {
    selectedPriority[key] = {
      ...selectedPriority[key],
      color: colors[key],
    };
  });

  const renderComponent = () => {
    return (
      <>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Button
              variant={selectedTab === "Assigned to" ? "contained" : "none"}
              color={selectedTab === "Assigned to" ? "none" : "default"}
              onClick={() => handleTabClick("Assigned to")}
              sx={{
                width: "155px",
                height: "41px",
                margin: "8px 7px",
                borderRadius: "8px",
                backgroundColor:
                  selectedTab === "Assigned to" ? "#E0EDFF" : "transparent",
                color: selectedTab === "Assigned to" ? "#2954E1" : "black",
              }}
            >
              Assigned to
            </Button>
            <Button
              variant={selectedTab === "Priority" ? "contained" : "none"}
              color={selectedTab === "Priority" ? "none" : "default"}
              onClick={() => handleTabClick("Priority")}
              sx={{
                width: "155px",
                height: "41px",
                borderRadius: "8px",
                margin: "8px 7px",
                backgroundColor:
                  selectedTab === "Priority" ? "#E0EDFF" : "transparent",
                color: selectedTab === "Priority" ? "#2954E1" : "black",
              }}
            >
              Priority
            </Button>
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
            <Box sx={{ mt: 1 }}>
              {selectedTab === "Assigned to"
                ? selectedProperty.map((filter, index) => (
                    <FormControlLabel
                      key={filter.id}
                      control={
                        <Checkbox
                          checked={filter.selected}
                          onChange={() => toggleFilter(filter.id)}
                        />
                      }
                      label={filter.data}
                      sx={{ display: "block", mb: 1 }}
                    />
                  ))
                : selectedPriority.map((priority) => (
                    <AppPriorityItems
                      key={priority.name}
                      name={priority.name}
                      color={priority.color}
                      isSelected={priority.name === selectedPriority}
                      onClick={() => setSelectedPriority(priority.name)}
                    />
                  ))}
            </Box>
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
            disabled={!isAnyFilteredSelect}
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
      handleClose={() => setAnchorEl(null)}
      width={"500px"}
      borderRadius={"10px"}
    />
  );
};

export default FilterDrawer;
