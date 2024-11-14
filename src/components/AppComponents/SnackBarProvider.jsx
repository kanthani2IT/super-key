import React, { createContext, useContext, useState } from 'react';

// Create the Snackbar Context
const SnackbarContext = createContext();

// SnackbarProvider Component to manage Snackbar state
export const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "Success",
    severity: "success",
    duration: 5000,
    anchorOrigin: { vertical: "top", horizontal: "right" },
    customColors: {},
  });

  // Update the Snackbar state
  const updateSnackbar = (newState) => {
    setSnackbarState({
      ...snackbarState,
      ...newState,
      open: true, // Always set open to true when updating
    });
  };

  const closeSnackbar = () => {
    setSnackbarState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <SnackbarContext.Provider value={{ snackbarState, updateSnackbar, closeSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

// Custom hook to use Snackbar context
export const useSnackbar = () => useContext(SnackbarContext);
