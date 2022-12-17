import React, { useState } from "react";
import moment from "moment";
import uuid from "react-uuid";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import StyledTabs from "./tabs/StyledTabs";
import StyledTabPanel from "./tabs/StyledTabPanel";
import StyledConversation from "./messages/StyledConversation";
import StyledInput from "./Inputs/StyledInput";
import StyledButton from "./buttons/StyledButton";
import { sortDateByNewest, sortDateByOldest } from "../helpers/dates/dates";
import { Conversation, Message } from "../types/messages";
import { formatDate } from "../helpers/dates/dates";

const useStyles = makeStyles(() => ({
    AppGrid: {
        border: "solid 1px #ececec",
        borderRadius: 10,
        boxShadow: "12px 7px 15px 2px #f0f0f0",
        overflow: "hidden",
        height: "40rem",
    },
    MessagesGrid: {
        background: "#f4f4f4",
        overflow: "overlay",
    },
    InputGrid: {
        background: "#f4f4f4",
    },
    GreenBlob: {
        padding: 1,
        background: "green",
        borderRadius: 20,
        color: "white",
    },
    Ellipses: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "left",
    },
}));

/**
 * Renders a MessageApp.
 * @param conversations static JSON of conversations.
 */
export function MessageApp({
    conversations,
    }: {
    conversations: Conversation[];
}) {
    const classes = useStyles();

    /* store conversations as hook for on the fly mutation */
    const [conversationList, setConversationList] = useState<Conversation[]>(
        sortDateByNewest({ messages: conversations })
    );
    /* index of the currently displayed tab */
    const [conversationTabIndex, setConversationTabIndex] = useState<number>(0);
    /* contains the object the message we are trying to edit */
    const [messageEditing, setMessageEditing] = useState<Message | null>(null);
    /* input text box */
    const [messageInputValue, setMessageInputValue] = useState<string>("");

    const handleAddMessage = () => {
        setConversationList(
            conversationList.map((conversation: Conversation) =>
                /* find the correct conversation to edit */
                conversation.id === conversationList[conversationTabIndex].id
                    ? {
                        ...conversation,
                        messages: [
                            ...conversation.messages,
                            /* add a new message at the end of it */
                            { id: uuid(), text: messageInputValue, last_updated: moment() },
                        ],
                    }
                    : conversation
            )
        );
        setMessageInputValue("");
    };
    const handleEditMessage = () => {
        setConversationList(
            conversationList.map((conversation: Conversation) =>
                /* find the correct conversation to edit */
                conversation.id === conversationList[conversationTabIndex].id
                    ? {
                        ...conversation,
                        /* find the correct message to edit */
                        messages: conversation.messages.map((message: Message) =>
                            message.id === messageEditing?.id
                                ? // set input text as message text
                                { ...message, text: messageInputValue }
                                : message
                        ),
                    }
                    : conversation
            )
        );
        setMessageEditing(null);
        setMessageInputValue("");
    };

    /* triggered by click on a Message, will set up editing functionalities */
    const handleSetEditMessage = (message: Message) => {
        setMessageInputValue(message.text);
        setMessageEditing(message);
    };

    return (
        <Grid
            item
            container
            direction="row"
            flexDirection="row"
            className={classes.AppGrid}
        >
            <Grid item xs={2}>
                <StyledTabs
                    tabs={conversationList.map((conversation: Conversation) => {
                        return {
                            title: conversation.name,
                            subtitle: (
                                <Grid
                                    item
                                    container
                                    flexDirection="row"
                                    direction="row"
                                    spacing={0}
                                    justifyContent="flex-apart"
                                >
                                    <Grid item xs={10} className={classes.Ellipses}>
                                        {formatDate({ date: conversation.last_updated })}
                                    </Grid>
                                    <Grid item xs={2} className={classes.GreenBlob}>
                                        {conversation.messages.length}
                                    </Grid>
                                </Grid>
                            ),
                        };
                    })}
                    tabIndex={conversationTabIndex}
                    setTabIndex={setConversationTabIndex}
                />
            </Grid>
            <Grid
                item
                container
                xs={10}
                direction="column"
                justifyContent="space-between"
                flexDirection="column"
                style={{ height: "100%" }}
            >
                <Grid
                    item
                    className={classes.MessagesGrid}
                    style={{ height: "80%", overflow: "auto" }}
                >
                    {conversationList.map((conversation: Conversation, index: number) => (
                        <StyledTabPanel value={conversationTabIndex} index={index}>
                            <StyledConversation
                                conversation={sortDateByOldest({
                                    messages: conversation.messages,
                                })}
                                editMessage={handleSetEditMessage}
                            />
                        </StyledTabPanel>
                    ))}
                </Grid>
                <Grid
                    container
                    item
                    direction="row"
                    flexDirection="row"
                    style={{ height: "20%" }}
                    className={classes.InputGrid}
                >
                    <Grid item xs={10} container alignItems="center">
                        <Grid item container xs={12}>
                            <StyledInput
                                inputValue={messageInputValue}
                                setInputValue={setMessageInputValue}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={2} container alignItems="center">
                        <Grid item xs={12}>
                            <StyledButton
                                onClick={messageEditing ? handleEditMessage : handleAddMessage}
                                disabled={messageInputValue === ""}
                                text={messageEditing ? "Edit" : "Send"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MessageApp;
