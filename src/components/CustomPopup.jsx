import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
} from "@mui/material";
import AppMenu from "./AppComponents/AppMenu";
import AppPriorityItems from "./AppPriorityComponent";

const styles = {
  button: (isSelected) => ({
    width: "155px",
    height: "41px",
    margin: "8px 7px",
    borderRadius: "8px",
    backgroundColor: isSelected ? "#E0EDFF" : "transparent",
    color: isSelected ? "#2954E1" : "black",
  }),
  dividerVertical: {
    mx: 2,
    marginLeft: "-20px",
  },
  scrollContainer: {
    width: "100%",
    height: "18rem",
    overflow: "scroll",
    padding: "8px",
  },
  formControlLabel: {
    display: "block",
    mb: 1,
  },
  actionButton: {
    borderRadius: "10px",
    fontWeight: 500,
    fontSize: "14px",
    textTransform: "none",
    width: "45%",
  },
};

const FilterDrawer = ({
  selectedProperty = [],
  selectedPriority = [],
  setSelectedPriority,
  toggleFilter,
  anchorEl,
  setAnchorEl,
}) => {
  const [selectedTab, setSelectedTab] = useState("Assigned to");
  const [checkboxState, setCheckboxState] = useState(
    selectedProperty.map(() => false)
  );
  const isAnyCheckboxSelected = checkboxState.some((isChecked) => isChecked);
  const [currentSelectedPriority, setCurrentSelectedPriority] =
    useState("High");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCheckboxState(selectedProperty.map(() => false));
  };

  const handleCheckboxChange = (index) => {
    const updatedState = [...checkboxState];
    updatedState[index] = !updatedState[index];
    setCheckboxState(updatedState);
  };

  const handleApply = () => {
    if (!isAnyCheckboxSelected) return;
    const selectedFilters = selectedProperty.filter(
      (_, index) => checkboxState[index]
    );
    console.log("!@#$%^&*:", selectedFilters);
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

  const renderComponent = () => (
    <>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Button
            variant={selectedTab === "Assigned to" ? "contained" : "none"}
            color={selectedTab === "Assigned to" ? "none" : "default"}
            onClick={() => handleTabClick("Assigned to")}
            sx={styles.button(selectedTab === "Assigned to")}
          >
            Assigned to
          </Button>
          <Button
            variant={selectedTab === "Priority" ? "contained" : "none"}
            color={selectedTab === "Priority" ? "none" : "default"}
            onClick={() => handleTabClick("Priority")}
            sx={styles.button(selectedTab === "Priority")}
          >
            Priority
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem sx={styles.dividerVertical} />
        <Box sx={styles.scrollContainer}>
          <Box sx={{ mt: 1 }}>
            {selectedTab === "Assigned to" ? (
              selectedProperty.length > 0 ? (
                selectedProperty.map((filter, index) => (
                  <FormControlLabel
                    key={filter.id}
                    control={
                      <Checkbox
                        checked={checkboxState[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    }
                    label={filter.Name}
                    sx={styles.formControlLabel}
                  />
                ))
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    color: "gray",
                    mt: 2,
                    fontSize: "14px",
                  }}
                >
                  No Assignee Found
                </Box>
              )
            ) : selectedPriority.length > 0 ? (
              selectedPriority.map((priority) => (
                <AppPriorityItems
                  key={priority.name}
                  name={priority.name}
                  color={priority.color}
                  isSelected={priority.name === currentSelectedPriority}
                  onClick={() => setCurrentSelectedPriority(priority.name)}
                />
              ))
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  color: "gray",
                  mt: 2,
                  fontSize: "14px",
                }}
              >
                No Priority Found
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 2, p: 1 }}
      >
        <Button
          variant="outlined"
          onClick={() => handleClose()}
          sx={styles.actionButton}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApply}
          disabled={!isAnyCheckboxSelected}
          sx={styles.actionButton}
        >
          Apply
        </Button>
      </Box>
    </>
  );

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
