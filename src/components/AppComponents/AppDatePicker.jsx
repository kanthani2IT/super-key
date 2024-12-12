import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";

const currentDate = dayjs()
export default function AppDatePicker({
    name = 'date',
    placeholder = "Select Date",
    value,
    onChange,
    onBlur,
    error,
}) {

    useEffect(() => {
        if (!value || value == null) {
            value = currentDate
            onChange({ target: { name, value } });
        }
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker

                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        error: Boolean(error),
                        helperText: error,
                        size: "small"
                    },
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
