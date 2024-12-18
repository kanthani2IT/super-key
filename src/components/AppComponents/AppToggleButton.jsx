import styled from '@emotion/styled';
import { Paper, ToggleButton, ToggleButtonGroup, toggleButtonGroupClasses } from '@mui/material';
import { useState } from 'react';



const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
        margin: theme.spacing(0.5),
        border: 0,
        borderRadius: "12px",
        padding: theme.spacing(2),

        fontWeight: "bold",
        [`&.${toggleButtonGroupClasses.disabled}`]: {
            border: 0,
        },
        [`&.${toggleButtonGroupClasses.selected} `]: {
            background: theme.palette.common.white,
            color: theme.palette.success.dark,
            boxShadow: '0px 0px 14px 0px #00000026',
            "&:hover": {
                background: theme.palette.common.white,
            }
        },
        "&:hover": {
            background: 'transparent',
            color: theme.palette.success.main,
        },
    },

    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
        marginLeft: -1,
        borderLeft: '1px solid transparent',
    },
}));
const AppToggleButton = ({ handleToggle, buttons = [] }) => {

    const [value, setValue] = useState(buttons[0]?.value)
    const handleChange = (event, newValue) => {
        setValue(newValue);
        handleToggle?.(newValue);
    };
    return (
        <Paper elevation={0} style={{ background: "#f5f5f5", width: "max-content", padding: "5px", borderRadius: "18px" }}>
            <StyledToggleButtonGroup

                size="small"
                value={value}
                exclusive
                onChange={handleChange}
                aria-label="text alignment"
            >
                {buttons?.map(({ label, value }) => (

                    <ToggleButton value={value} disableRipple>
                        {label}
                    </ToggleButton>
                ))}

            </StyledToggleButtonGroup>
        </Paper>
    )
}

export default AppToggleButton