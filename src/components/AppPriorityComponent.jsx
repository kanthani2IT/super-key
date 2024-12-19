import { Box, Typography } from "@mui/material";
import { useState } from "react";

const AppPriorityItems = ({
  name,
  color,
  isSelected,
  onClick,
  selectedName,
}) => {
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
        backgroundColor: selectedName === name ? "#E0EDFF" : "#FFF",
        padding: "0 8px",
        marginBottom: "8px",
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
