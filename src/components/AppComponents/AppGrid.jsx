import React from "react";
import { Grid2 as Grid } from "@mui/material";

const AppGrid = ({
    children,
    container = false,
    item = false,
    spacing = 2,
    sx = {},
    ...props
}) => {
    return (
        <Grid
            {...props}
            container={container}
            item={item}
            spacing={spacing}
            sx={sx}
        >
            {children}
        </Grid>
    );
};

export default AppGrid;
