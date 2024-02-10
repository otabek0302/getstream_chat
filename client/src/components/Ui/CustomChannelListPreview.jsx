import React, { useEffect, useState } from 'react'
import { Avatar, useChatContext } from 'stream-chat-react';

import { formatTime } from '../../utills/dateUtils';

const CustomChannelPreview = ({ channel, setActiveChannel }) => {
    const { channel: actChannel, client } = useChatContext();
    const [activeChannels, setActiveChannels] = useState([]);

    useEffect(() => {
        setActiveChannels(actChannel)
    },[actChannel])

    if (channel.type === "team") {
        const lastMessageTime = formatTime(channel.data?.last_message_at || channel.data?.updated_at)
        const lastMessage = channel.state?.messageSets[0].messages[channel.state.messageSets[0].messages.length - 1]?.text
        const lastMessageUser = channel?.state?.messageSets[0].messages[channel.state.messageSets[0].messages.length - 1]?.user?.name
        const unreadMessage = channel?.state?.unreadCount
        return (
            <li className={`channel-preview__list-item ${ channel?.id === activeChannels?.id ? 'focus' : '' }`} onClick={() => setActiveChannel(channel)}>
                <Avatar image={channel.data?.image || undefined} name={channel.data?.name || ""} shape='circle' size={48} />
                <div className='channel-preview__list-item__text'>
                    <h1>{channel.data?.name}<span>{lastMessageTime}</span></h1>
                    {
                        lastMessage &&
                        <p>
                            {lastMessageUser}: {lastMessage?.length > 100 ? `${lastMessage?.substring(0, 100)}...` : lastMessage}
                            {unreadMessage ? <span className='unreaded__message'>{unreadMessage}</span> : ""}
                        </p>
                    }
                </div>
            </li>
        )
    }

    const members = Object.values(channel.state?.members).filter(({ user }) => user.id !== client.userID);
    const lastActivity = formatTime(members[0]?.user?.last_active || members[0]?.user?.created_at)
    const lastMessage = channel.state.messageSets[0]?.messages[channel.state.messageSets[0].messages.length - 1]?.text
    const unreadMessage = channel.state?.unreadCount
    return (
        <li className={`channel-preview__list-item ${channel?.id === activeChannels?.id ? 'focus' : '' }`}  onClick={() => setActiveChannel(channel)}>
            <div className='channel-preview__list-item__img'>
                <Avatar image={members[0].user?.image || undefined} name={(members[0].user?.name || members[0]?.user?.id) || undefined} shape='circle' size={48} />
                {members[0].user.online && <span />}
            </div>
            <div className='channel-preview__list-item__text'>
                <h1>{members[0]?.user?.fullName || members[0].user?.id} <span>{lastActivity}</span></h1>
                <p>
                    {lastMessage?.length > 100 ? `${lastMessage.substring(0, 100)}...` : lastMessage}
                    {unreadMessage ? <span className='unreaded__message'>{unreadMessage}</span> : ""}
                </p>
            </div>
        </li>
    )
}

export default CustomChannelPreview