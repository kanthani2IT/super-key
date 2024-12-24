import React, { useState, useRef } from 'react';
import { TextField, Box, FormHelperText } from '@mui/material';
import AppGrid from './AppComponents/AppGrid';

const AppOtpInput = ({ length = 6, onComplete, name, error }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputsRef = useRef([]);
    const handleChange = (e, index) => {
        const { value } = e.target;

        if (!/^\d*$/.test(value)) return; // Only allow numeric input

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Ensure only one digit
        setOtp(newOtp);

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus(); // Focus next input
        }

        // if ( newOtp.join('').length === length) {
        onComplete?.({ target: { name, value: newOtp?.join('') } }); // Trigger callback if complete
        // }
    };

    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus(); // Focus previous input
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, length); // Get pasted value
        if (!/^\d+$/.test(pasteData)) return; // Ensure only numeric input

        const newOtp = [...otp];
        pasteData.split('').forEach((char, idx) => {
            if (idx < length) newOtp[idx] = char;
        });
        setOtp(newOtp);

        const nextEmptyIndex = newOtp.findIndex((char) => !char);
        if (nextEmptyIndex !== -1) {
            inputsRef.current[nextEmptyIndex]?.focus();
        }

        // Trigger callback if complete
        if (pasteData.length === length) {
            onComplete?.({ target: { name, value: pasteData } }); // Trigger callback if complete
        }
    };

    return (
        <AppGrid container
            onPaste={handlePaste}
        >
            {otp.map((digit, index) => (
                <AppGrid item size={{ xs: 2 }} >
                    <TextField
                        color='success'
                        focused
                        size='small'
                        key={index}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleBackspace(e, index)}
                        inputProps={{
                            maxLength: 1,
                            style: {
                                textAlign: 'center',
                                // fontSize: '1.5rem',
                                width: '1rem',

                            },
                        }}

                        inputMode='numeric'
                        error={!!error}
                        inputRef={(ref) => (inputsRef.current[index] = ref)} // Track input refs
                        autoComplete="off"
                    />
                </AppGrid>
            ))}
            {error && (
                <AppGrid item size={{ xs: 12 }}>
                    <FormHelperText error>{error}</FormHelperText>
                </AppGrid>
            )}
        </AppGrid>
    );
};

export default AppOtpInput;
