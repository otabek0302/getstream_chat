import React, { useState } from 'react'
import { MessageInput, MessageList, Thread, Window, useChannelActionContext } from 'stream-chat-react';
import ChannelChatHeader from './ChannelChatHeader'

export const GiphyContext = React.createContext({});

const ChannelChat = () => {
    const [giphyState, setGiphyState] = useState(false);
    const { sendMessage } = useChannelActionContext();

    const overrideSubmitHandler = (message) => {
        let updatedMessage = {
            attachments: message.attachments,
            mentioned_users: message.mentioned_users,
            parent_id: message.parent?.id,
            parent: message.parent,
            text: message.text,
        };

        if (giphyState) {
            updatedMessage = { ...updatedMessage, text: `/#${message.text}` };
        }

        if (sendMessage) {
            sendMessage(updatedMessage);
            setGiphyState(false);
        }
    };

    return (
        <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
            <div className="channel__chat-container__inner">
                <Window>
                    <ChannelChatHeader />
                    <MessageList hideDeletedMessages={true} />
                    <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
                </Window>
                <Thread />
            </div>
        </GiphyContext.Provider>
    )
}

export default ChannelChat