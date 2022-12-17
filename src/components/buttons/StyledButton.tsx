import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    Button: {
        width: "80%",
        borderRadius: 20,
    },
}));

export function StyledButton({
   onClick,
   disabled,
   text,
}: {
    onClick: () => void;
    disabled: boolean;
    text: string;
}) {
    const classes = useStyles();
    return (
        <Button
            data-testid="send-message-button"
            className={classes.Button}
            disabled={disabled}
            variant="contained"
            onClick={onClick}
            style={{padding: 15}}
        >
            {text}
        </Button>
    );
}

export default StyledButton;
