import {Moment} from "moment";

export type Message = {
    id: string;
    text: string;
    last_updated: string | Moment;
}

export type Conversation = {
    id: string;
    name: string;
    last_updated: string | Moment;
    messages: Message[];
}