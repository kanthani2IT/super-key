// StyledButton.js
import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Base styled button component
const BaseButton = styled(Button)(({ theme, color }) => ({
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: '6px 12px',
    borderRadius: '8px',
    color: theme.palette.common.white,
    backgroundColor: theme.palette[color].main,
    '&:hover': {
        backgroundColor: theme.palette[color].dark,
    },
}));

// Specific styled buttons with different colors
export const PrimaryButton = (props) => <BaseButton color="primary" {...props} />;
export const SecondaryButton = (props) => <BaseButton color="secondary" {...props} />;
export const SuccessButton = (props) => <BaseButton color="success" {...props} />;
export const WarningButton = (props) => <BaseButton color="warning" {...props} />;
export const ErrorButton = (props) => <BaseButton color="error" {...props} />;

export default {
    PrimaryButton,
    SecondaryButton,
    SuccessButton,
    WarningButton,
    ErrorButton
};
