import PropTypes from "prop-types";
import { forwardRef, useState } from "react";

import { ExpandAltOutlined } from "@ant-design/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box, Button, Chip, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import FilterDrawer from "./CustomPopup";

const headerSX = {
  px: 3,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

function MainCard(
  {
    border = true,
    boxShadow,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    elevation,
    secondary,
    shadow,
    sx = {},
    title,
    count,
    secondaryAction,
    isFilter,
    noStyles = false,
    onFilterClick,
    ...others
  },
  ref
) {
  const theme = useTheme();
  boxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow;
  const [openFilter, setOpenFilter] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFilterButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenFilter((prev) => !prev);
  };

  const [selectedFilters, setSelectedFilters] = useState([
    { id: 1, data: "Desert Springs", selected: false },
    { id: 2, data: "Rose Dale", selected: false },
    { id: 3, data: "Rose Dal", selected: false },
    { id: 4, data: "Oak Ridge Estates", selected: false },
    { id: 5, data: "Mountain Vista", selected: false },
  ]);

  const toggleFilter = (id) => {
    setSelectedFilters((prev) =>
      prev.map((filter) =>
        filter.id === id ? { ...filter, selected: !filter.selected } : filter
      )
    );
  };
  return (
    <Card
      elevation={elevation || 0}
      ref={ref}
      {...others}
      sx={
        !noStyles && {
          border: border ? "1px solid" : "none",
          borderRadius: 2,
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.divider
              : theme.palette.grey.A800,
          boxShadow:
            boxShadow && (!border || theme.palette.mode === "dark")
              ? shadow || theme.customShadows.z1
              : "inherit",
          ":hover": {
            boxShadow: boxShadow ? shadow || theme.customShadows.z1 : "inherit",
          },
          p: 0,
          "& pre": {
            m: 0,
            fontFamily: theme.typography.fontFamily,
            fontSize: "0.75rem",
          },
          ...sx,
          backgroundColor: theme.palette.primary.lighter,
        }
      }
    >
      {title && (
        <CardHeader
          sx={headerSX}
          title={
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Typography variant="h3">{title}</Typography>
              {count && (
                <Chip
                  variant="combined"
                  color={"success"}
                  label={`${count}`}
                  sx={{ ml: 2 }}
                  size="small"
                />
              )}
            </Stack>
          }
          action={
            secondary && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                {isFilter ? (
                  <Button
                    variant="outlined"
                    color="black"
                    onClick={handleFilterButtonClick}
                    endIcon={
                      <FilterAltIcon sx={{ width: "22px", height: "24px" }} />
                    }
                    sx={{
                      height: "42px",
                      borderRadius: "10px",
                      borderWidth: "0.5px",
                      borderColor: "#000",
                      fontSize: "16px",
                      fontWeight: "500",
                      "&:hover": { backgroundColor: "#E9F3FF" },
                    }}
                  >
                    {" "}
                    {"Filter"}{" "}
                  </Button>
                ) : null}

                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: secondary === "Close" ? "black" : "primary.main",
                  }}
                  // color="primary"
                  onClick={secondaryAction && secondaryAction}
                >
                  {secondary === "Full View" && (
                    <ExpandAltOutlined
                      style={{ marginRight: 2 }}
                      fontSize="medium"
                    />
                  )}
                  {secondary}
                </Typography>
              </Box>
            )
          }
        />
      )}

      {/* card content */}
      {content && (
        <CardContent
          sx={{
            py: 1,
            px: 3,
            mb: 2,
            overflow: "scroll",
            ...contentSX,
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <FilterDrawer
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            anchorEl={anchorEl}
          />
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
}

export default forwardRef(MainCard);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.any,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  modal: PropTypes.bool,
  others: PropTypes.any,
  onFilterClick: PropTypes.func,
};
