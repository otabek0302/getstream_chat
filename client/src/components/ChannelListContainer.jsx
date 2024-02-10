import React, { useState } from 'react'
import { ChannelList, useChatContext } from "stream-chat-react";

import SideBar from './Ui/SideBar'
import ChannelListHeader from './Ui/ChannelListHeader';
import CustomChannelListPreview from './Ui/CustomChannelListPreview';
import EmtyList from './Ui/EmtyList';


const ChannelListContainer = () => {
    const { client } = useChatContext();
    const [sidebar, setSidebar] = useState(false)

    const filters = { members: { $in: [`${client.userID}`] } };
    return (
        <div className='channel-list__container'>
            <SideBar sidebar={sidebar} setSidebar={setSidebar} />
            <ChannelListHeader sidebar={sidebar} setSidebar={setSidebar} />
            <ChannelList
                filters={filters}
                onMessageNew
                EmptyStateIndicator={EmtyList}
                Preview={(previewProps) => (<CustomChannelListPreview {...previewProps} />)}
            />
        </div>
    )
}

export default ChannelListContainer