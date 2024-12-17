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
  anchorEl,
  setAnchorEl,
  setSelectedProperties,
}) => {
  const [selectedTab, setSelectedTab] = useState("Properties");
  const isAnyFilteredSelect = selectedProperty.some(
    (filter) => filter.selected
  );

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const handleApply = () => {
    const appliedProperties = selectedProperty.filter(
      (filter) => filter.selected
    );
    const appliedPriorities = selectedPriority.filter(
      (priority) => priority.selected
    );

    console.log("Applied Filters: ", appliedProperties, appliedPriorities);

    setAnchorEl(null);
  };

  const toggleFilter = (idOrName) => {
    console.log(idOrName, "onChange");
    if (selectedTab === "Properties") {
      setSelectedProperties((prev) =>
        prev.map((filter) =>
          filter.id === idOrName
            ? { ...filter, selected: !filter.selected }
            : filter
        )
      );
    } else if (selectedTab === "Priority") {
      setSelectedPriority((prev) =>
        prev.map((priority) =>
          priority.name === idOrName
            ? { ...priority, selected: !priority.selected }
            : priority
        )
      );
    }
  };
  // const colors = {
  //   0: "#E81616",
  //   1: "#EB6C0B",
  //   2: "#DEC013",
  // };

  // Object.keys(selectedPriority).forEach((key) => {
  //   selectedPriority[key] = {
  //     ...selectedPriority[key],
  //     color: colors[key],
  //   };
  // });

  const renderComponent = () => {
    return (
      <>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Button
              variant={selectedTab === "Properties" ? "contained" : "none"}
              color={selectedTab === "Properties" ? "none" : "default"}
              onClick={() => handleTabClick("Properties")}
              sx={{
                width: "155px",
                height: "41px",
                margin: "8px 7px",
                borderRadius: "8px",
                backgroundColor:
                  selectedTab === "Properties" ? "#E0EDFF" : "transparent",
                color: selectedTab === "Properties" ? "#2954E1" : "black",
              }}
            >
              Properties
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
              {selectedTab === "Properties"
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
                      onClick={() => toggleFilter(priority.name)}
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
