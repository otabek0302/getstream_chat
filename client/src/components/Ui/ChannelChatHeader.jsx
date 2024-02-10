import React from 'react'
import { Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';

import SettingIcon from "../../assets/SettingIcon.svg"
import { formatLastActivity } from '../../utills/dateUtils';
import { useResultContext } from '../../context/customContext';

const ChannelChatHeader = () => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();
  const { setIsEditing, setIsDetails } = useResultContext()

  if (channel.type === "team") {
    return (
      <div className='channel__chat-header__container'>
        <div className='channel__chat-header__left'>
          <Avatar image={channel.data?.image || undefined} name={channel?.data?.name || ""} shape='circle' size={48} />
          <div className='channel__chat-header__left-info'>
            <h2>{channel.data?.name}</h2>
            <p>{channel.data?.member_count} members | {watcher_count}<span className='online'>online</span></p>
          </div>
        </div>
        <div className='channel__chat-header__right'>
          <button type="button" onClick={() => setIsEditing(true)}>
            <img src={SettingIcon} alt="Setting" />
          </button>
        </div>
      </div>
    )
  }

  const members = Object.values(channel.state?.members).filter(({ user }) => user?.id !== client?.userID);
  const { user } = members[0];
  const lastActivity = formatLastActivity(user?.last_active || user?.created_at);
  return (
    <div className='channel__chat-header__container'>
      <div className='channel__chat-header__left'>
        <Avatar image={user?.image || undefined} name={(user?.name || user?.id) || undefined} shape='circle' size={48} />
        <div className='channel__chat-header__left-info'>
          <h2>{user?.fullName || user?.id}</h2>
          {user.online ? <p className='online'>online</p> : <p>last seen {lastActivity}</p>}
        </div>
      </div>
      <div className='channel__chat-header__right'>
        <button type="button" onClick={() => setIsDetails(user)}>
          <img src={SettingIcon} alt="Setting" />
        </button>
      </div>
    </div>
  )
}

export default ChannelChatHeader