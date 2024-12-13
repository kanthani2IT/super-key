import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const AppPriorityItems = ({ name, color, isSelected, onClick }) => {
  const [selectedPriorityTab, setSelectedPriorityTab] = useState("High");
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "221px",
        height: "37px",
        borderRadius: "6px",
        backgroundColor: isSelected ? "#E0EDFF" : "#FFF",
        padding: "0 8px",
        marginBottom: "8px",
        border: isSelected ? "1px solid #90CAF9" : "1px solid transparent",
        cursor: "pointer",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: color,
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default AppPriorityItems;
