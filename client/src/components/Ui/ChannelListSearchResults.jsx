import React from 'react'

import { Avatar, useChatContext } from 'stream-chat-react';
import { formatTime } from '../../utills/dateUtils';

const SearchResults = ({ channel, type, setChannel }) => {
    const { client, setActiveChannel } = useChatContext();
    const handleChannel = () => {
        setChannel(channel)
    }
    const handleUser = async () => {
        const filters = {
            type: 'messaging',
            members: { $eq: [client.userID, channel.id] },
        };
        const [existingChannel] = await client.queryChannels(filters);

        if (existingChannel) {
            setActiveChannel(existingChannel);
        } 
    }

    if (type === "channel") {
        const lastMessageTime = formatTime(channel.data?.last_message_at || channel.data?.updated_at)
        const lastMessage = channel.state?.messageSets[0].messages[channel.state.messageSets[0].messages.length - 1]?.text
        const lastMessageUser = channel?.state?.messageSets[0].messages[channel.state.messageSets[0].messages.length - 1]?.user?.name
        const unreadMessage = channel?.state?.unreadCount
        return (
            <li className="channel-list__search-results-item" onClick={handleChannel}>
                <Avatar image={channel.data.image || undefined} name={channel.data.name || ""} shape='circle' size={48} />
                <div className='channel-list__search-results-item__text'>
                    <h1>{channel.data.name}<span>{lastMessageTime}</span></h1>
                    {
                        lastMessage &&
                        <p>{lastMessageUser}: {lastMessage.length > 100 ? `${lastMessage.substring(0, 100)}...` : lastMessage}{unreadMessage ? <span className='unreaded__message'>{unreadMessage}</span> : ""}</p>
                    }
                </div>
            </li>
        )
    }
    
    const lastActivity = formatTime(channel?.last_active || channel.created_at)
    return (
        <li className='channel-list__search-results-item' onClick={handleUser}>
            <div className='channel-list__search-results-item__img'>
                <Avatar image={channel.image || ""} name={channel.name || undefined} shape='circle' size={48} />
                {channel.online && <span />}
            </div>
            <div className='channel-list__search-results-item__text'>
                <h1>{channel.name} <span>{lastActivity}</span></h1>
            </div>
        </li>
    )
}

const ChannelListSearchResults = ({ groups, users, loading, setChannel }) => {
    return (
        <div className="channel-list__header-search__results">
            <div className="channel-list__header-search__results-container">
                <h3>Channels</h3>
                {loading && !groups.length && (
                    <i>Loading...</i>
                )}
                {!loading && !groups.length ? (<i>No channels found !</i>) :
                    (
                        groups?.map((channel) => (
                            <ul className='channel-list__search-results'>
                                <SearchResults
                                    channel={channel}
                                    key={channel?.data?.name}
                                    setChannel={setChannel}
                                    type='channel'
                                />
                            </ul>
                        ))
                    )}
            </div>
            <div className="channel-list__header-search__results-container">
                <h3>Users</h3>
                {loading && !users.length && (
                    <i>Loading...</i>
                )}
                {!loading && !users.length ? (<i>No users found !</i>) :
                    (
                        users?.map((channel) => (
                            <ul className='channel-list__search-results'>
                                <SearchResults
                                    channel={channel}
                                    key={channel?.data?.name}
                                    setChannel={setChannel}
                                    type='user'
                                />
                            </ul>
                        ))
                    )}
            </div>
        </div>
    )
}

export default ChannelListSearchResults