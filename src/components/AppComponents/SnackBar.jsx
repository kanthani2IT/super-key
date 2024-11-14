import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; // Use Alert for severity-based styling
import { useSnackbar } from './SnackBarProvider'; // Import custom hook to access context

const SuccessSnackbar = () => {
  const { snackbarState, closeSnackbar } = useSnackbar(); // Get state and function from context

  const {
    open, // Snackbar open state
    message="Something went wrong!", // Message to display
    duration, // Duration for auto-hide
    severity, // Severity for color and icon
    anchorOrigin, // Position of the Snackbar
    customColors, // Custom colors for Alert
  } = snackbarState;

  // Automatically close the Snackbar after the specified duration
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        closeSnackbar(); // Close Snackbar after the specified duration
      }, duration);

      // Cleanup the timer to prevent memory leaks
      return () => clearTimeout(timer);
    }
  }, [open, duration, closeSnackbar]);

  // Get styles based on severity
  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'success':
        return {
          backgroundColor: customColors.bgcolor || '#EDF7ED',
          color: customColors.color || '#1F4620',
        };
      case 'error':
        return {
          backgroundColor: customColors.bgcolor || '#FDEDEE',
          color: customColors.color || '#D84544',
        };
      case 'warning':
        return {
          backgroundColor: customColors.bgcolor || '#FFF4E5',
          color: customColors.color || '#724A16',
        };
      case 'info':
        return {
          backgroundColor: customColors.bgcolor || '#E5F6FD',
          color: customColors.color || '#014361',
        };
      default:
        return {};
    }
  };

  return (
    <Snackbar
      open={open} // Controlled via context state
      autoHideDuration={duration}
      anchorOrigin={anchorOrigin} // Position the Snackbar
    >
      <Alert
        onClose={closeSnackbar} // Close manually if needed
        severity={severity} // Severity to control icon and background
        variant="filled"
        sx={{
          ...getSeverityStyles(severity), // Apply styles based on severity
          borderRadius: customColors.borderRadius || '4px', // Custom border radius
          padding: customColors.padding || '6px 12px', // Custom padding
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
