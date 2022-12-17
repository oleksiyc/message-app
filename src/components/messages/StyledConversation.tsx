import { Grid } from "@mui/material";
import React from "react";
import StyledMessage from "./StyledMessage";
import { Message } from "../../types/messages";

export function StyledConversation({
   conversation,
   editMessage,
}: {
    conversation: Message[];
    editMessage: (message: Message) => void;
}) {
    return (
        <Grid
            container
            direction="column"
            flexDirection="column"
            spacing={4}
            alignItems="baseline"
        >
            {conversation.map((message: Message) => (
                <Grid item>
                    <StyledMessage message={message} editMessage={editMessage} />
                </Grid>
            ))}
        </Grid>
    );
}

export default StyledConversation;
