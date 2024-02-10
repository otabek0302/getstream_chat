import React, { useEffect, useState } from 'react'
import { MessageTimestamp, ReactionSelector, messageHasReactions, useMessageContext, QuotedMessage, Attachment, SimpleReactionsList } from 'stream-chat-react';
import CustomActionList from './CustomActionList';

const CustomMessagePreview = () => {
    const [show, setShow] = useState(false)
    const { message, isMyMessage } = useMessageContext();
    const [selected, setSelected] = useState(null)
    const hasAttachments = message.attachments && message.attachments.length > 0;

    const handleClickOutside = () => {
        setShow(false)
    };
    useEffect(() => {
        document.querySelector('.channel-list__container').addEventListener('click', handleClickOutside);
        document.querySelector('.channel__chat-header__container').addEventListener('click', handleClickOutside);
        document.querySelector('.str-chat__input-flat-wrapper').addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const handleSelectMessage = (message) => {
        setSelected(message);
    };

    if (!isMyMessage(message)) {
        return (
            <div className='user__messages-container'>
                <div className='user__message-field' onClick={() => setShow(!show)}>
                    {show && <ReactionSelector />}
                    {message.quoted_message && <div className='user__message-reply'><QuotedMessage /></div>}
                    {hasAttachments && <Attachment attachments={message.attachments} />}
                    {message.attachments && !message.text ? "" : <div className={`my__message-text ${message.status === "edited" ? 'edited' : ""}`}>{message.text}</div>}
                    <div className='my__message-time'> {message.status === "edited" ? 'edited' : ""} <MessageTimestamp /></div>
                    {messageHasReactions(message) && <SimpleReactionsList />}
                </div>
                {show && <CustomActionList message={selected} />}
            </div>
        )
    }

    return (
        <div className='my__messages-container' onClick={() => handleSelectMessage(message)}>
            {show && <CustomActionList message={selected} />}
            <div className='my__message-field' onClick={() => setShow(!show)}>
                {show && <ReactionSelector />}
                {message.quoted_message && <div className='my__message-reply'><QuotedMessage /></div>}
                {hasAttachments && <Attachment attachments={message.attachments} />}
                {message.attachments && !message.text ? "" : <div className={`my__message-text ${message.status === "edited" ? 'edited' : ""}`}>{message.text}</div>}
                <div className='my__message-time'> {message.status === "edited" ? 'edited' : ""} <MessageTimestamp /></div>
                {messageHasReactions(message) && <SimpleReactionsList />}
            </div>
        </div>
    )
}

export default CustomMessagePreview