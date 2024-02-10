import React from 'react'
import { Channel, useChatContext } from 'stream-chat-react'

import CreateChannel from './CreateChannel'
import EditChannel from './EditChannel'
import UserInfo from './UserInfo'

import ChannelChat from './Ui/ChannelChat'
import CustomMessagePreview from './Ui/CustomMessagePreview'
import EmptyChat from './Ui/EmtyChat'

import { useResultContext } from '../context/customContext'
import EmptyChannel from './Ui/EmptyChannel'

const ChannelContainer = () => {
    const { client } = useChatContext();
    const { isCreating, isEditing, isDetails } = useResultContext()
    if (isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel />
            </div>
        )
    }
    if (isEditing) {
        return (
            <div className="channel__container">
                <EditChannel />
            </div>
        )
    }
    if (isDetails) {
        return (
            <div className="channel__container">
                <UserInfo />
            </div>
        )
    }
    if (Object.values(client.activeChannels).length === 0) {
        return (
            <div className="channel__container">
                <EmptyChannel />
            </div>
        )
    }
    // if (client.activeChannels) {
    //     return (
    //         <div className="channel__container">
    //             <EmptyChannel />
    //         </div>
    //     )
    // }
    
    return (
        <div className='channel__chat-container'>
            <Channel EmptyStateIndicator={EmptyChat} Message={(messageProps, i) => <CustomMessagePreview key={i} {...messageProps} />} >
                <ChannelChat />
            </Channel>
        </div>
    )
}

export default ChannelContainer