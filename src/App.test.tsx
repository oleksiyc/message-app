import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import MockData from "./data/messages.json";
import exp from "constants";

describe('Message App', () => {
  it('renders app', () => {
    render(<App />);
    const appTitle = screen.getByText(/Messaging app/i);
    expect(appTitle).toBeInTheDocument();
  });
  it('renders all conversations', () => {
    render(<App />);
    MockData.forEach((conversation, index) => {
      expect(screen.getByText((conversation.name))).toBeInTheDocument();
    });
  });
  it('will render correct messages when selecting a conversation', () => {
    const firstTabId = 0;
    const secondTabId = 1;

    render(<App />);

    /* check to see that the first tab messages are rendered */
    MockData[firstTabId].messages.forEach((message, index) => {
      expect(screen.getByText((message.text))).toBeInTheDocument();
    });

    /* switch to second tab */
    const secondTab = screen.getByTestId(`tab-${secondTabId}`);
    fireEvent.click(secondTab);

    /* check to see the secon tab meesage are not loading */
    MockData[secondTabId].messages.forEach((message) => {
      expect(screen.getByText((message.text))).toBeInTheDocument();
    });

  });
  it('is able to add a new message', () => {
    render(<App />);
    const message = "test";
    const input = screen.getByTestId("send-message-input");
    const button = screen.getByTestId("send-message-button");
    const messageCount = MockData[0].messages.length;

    /* type in message and click send */
    fireEvent.change(input, { target: { value: message } });
    fireEvent.click(button);

    /* expect there to be +1 more messages than at the start */
    const newMessageCount = screen.getAllByTestId("message").length;
    expect(newMessageCount).toBe(messageCount + 1);
    /* expect message to be visable */
    expect(screen.getByText(message)).toBeInTheDocument();
  });
  it('can edit a message', () => {
    render(<App />);
    const message = "test";
    const input = screen.getByTestId("send-message-input");
    const button = screen.getByTestId("send-message-button");
    const messageToChange = screen.getAllByTestId("message")[0];

    /* expect button to say send */
    expect(screen.getByText("Send")).toBeInTheDocument();

    /* click the message to edit it */
    fireEvent.click(messageToChange);
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(input).toHaveValue(messageToChange.textContent);

    /* type in new message and click send */
    fireEvent.change(input, { target: { value: message } });
    fireEvent.click(button);

    /* check new message is rendered */
    expect(messageToChange.textContent).toBe(message);
  });
});
