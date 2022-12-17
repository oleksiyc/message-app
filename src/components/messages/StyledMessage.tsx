import { Grid } from "@mui/material";
import React from "react";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import { Message } from "../../types/messages";

const useStyles = makeStyles(() => ({
    MessageGrid: {
        paddingLeft: 30,
    },
    MessageBubble: {
        padding: "12px 15px 12px 15px",
        background: "white",
        borderRadius: "0px 20px 20px 20px",
    },
    MessageDate: {
        fontSize: 13,
        opacity: 0.5,
    },
}));

export function StyledMessage({
    message,
    editMessage,
}: {
    message: Message;
    editMessage: (message: Message) => void;
}) {
    const classes = useStyles();

    const date = moment(message.last_updated).format(
        "dddd, MMMM Do YYYY, h:mm:ss a"
    );

    return (
        <Grid
            container
            direction="column"
            flexDirection="column"
            alignItems="baseline"
            onClick={() => editMessage(message)}
            className={classes.MessageGrid}
        >
            <Grid item className={classes.MessageDate} style={{ marginBottom: 5 }}>
                {date}
            </Grid>
            <Grid item className={classes.MessageBubble} data-testid="message">
                {message.text}
            </Grid>
        </Grid>
    );
}

export default StyledMessage;
