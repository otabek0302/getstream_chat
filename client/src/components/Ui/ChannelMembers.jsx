import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'
import Loader from './Loader'
import { useResultContext } from '../../context/customContext';

const ChannelMembers = ({ users }) => {
  const { client, setActiveChannel, channel } = useChatContext();
  const { setIsEditing, setIsCreating } = useResultContext()

  const handleUser = async (userId, userName) => {
    const filters = {
      type: 'messaging',
      members: { $eq: [client.userID, userId] },
    };
    const [existingChannel] = await client.queryChannels(filters);

    if (existingChannel) {
      setIsEditing(false)
      setIsCreating(false)
      setActiveChannel(existingChannel);
    } else {
      if (userId === client.userID) return null;
      const newChannel = client.channel('messaging', { name: userName, members: [userId, client.userID] });
      setIsEditing(false)
      setIsCreating(false)
      setActiveChannel(newChannel);
    }
  }

  const handleRemove = async (id) => {
    await channel.removeMembers([id]);
    window.location.reload();
  }

  if (!Object.values(users)?.length) {
    return (
      <div className='user__list-container'>
        <div className="user__list-wrapper">
          <h2>Error loading, please refresh and try again.</h2>
        </div>
      </div>
    )
  }
  return (
    <div className="channel__member-container">
      <ul className="channel__member-list">
        {
          users?.length ? <Loader /> :
            Object.values(users)?.map(({ user }, i) => (
              <li className="channel__member-list__item" key={i}>
                <div className='channel__member-list__item-image' onClick={() => handleUser(user.id, user.name)}>
                  <Avatar image={user?.image} name={user.name || user.id} size={62} />
                </div>
                <div className="channel__member-list__item-content" onClick={() => handleUser(user.id, user.name)}>
                  <h4>{user?.fullName}</h4>
                  <p>{user?.name || user?.phoneNumber}</p>
                </div>
                <div className='channel__member-list__item-btn'>
                    {
                      channel.data?.created_by?.id !== user?.id && (
                        <button type='button' onClick={() => handleRemove(user.id)}>Remove</button>
                      )
                    }
                </div>
              </li>
            ))
        }
      </ul>
    </div>
  )
}

export default ChannelMembers