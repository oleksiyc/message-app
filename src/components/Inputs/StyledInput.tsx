import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    Input: {
        width: "100%",
        padding: 0,
        background: "white",
        borderRadius: 20,
    },
}));

export function StyledInput({
    inputValue,
    setInputValue,
}: {
    inputValue: string;
    setInputValue: (value: string) => void;
}) {
    const classes = useStyles();
    return (
        <TextField
            inputProps={{ "data-testid": "send-message-input" }}
            sx={{
                fieldset: { border: "none", borderRadius: 20 },
            }}
            style={{marginLeft: 50}}
            className={classes.Input}
            placeholder="Type text to send..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
        />
    );
}

export default StyledInput;
