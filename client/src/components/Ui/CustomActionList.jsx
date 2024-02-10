import React from 'react';
import { useChatContext } from 'stream-chat-react';


const CustomActionList = ({ message }) => {
    const { client, channel } = useChatContext();
    const onEdit = async () => {
        if (message) {
            try {
                await client.partialUpdateMessage(message.id, {
                    set: {
                        text: prompt('Edit', message.text),
                        'status': 'edited',
                    },
                });
            } catch (error) {
                console.error('Error updating message:', error);
            }
        }
    }

    const onDelete = async () => {
        if (message) {
            try {
                await client.deleteMessage(message.id, true);
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        }
    }
    const onReply = async () => {
        if (message) {
            const quoted_message = prompt(message.text);
            if (quoted_message !== null) {
                try {
                    await channel.sendMessage({
                        text: quoted_message,
                        quoted_message_id: message.id,
                    });
                } catch (error) {
                    console.error('Error sending reply:', error);
                }
            }
        }
    }
    const onCopyText = async () => {
        navigator.clipboard.writeText(message.text || '');
    }
    return (
        <>
            <div className="custom-action-list">
                <button onClick={onEdit}>
                    Edit
                </button>
                <button onClick={onDelete}>
                    Delete
                </button>
                <button onClick={onReply}>
                    Reply
                </button>
                <button onClick={onCopyText}>
                    Copy Text
                </button>
            </div>
        </>
    );
};

export default CustomActionList;
