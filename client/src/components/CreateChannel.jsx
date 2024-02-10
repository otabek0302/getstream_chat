import React, { useState } from 'react'

import CloseIcon from "../assets/CloseIcon.svg"
import UsersList from './Ui/UsersList'
import { useChatContext } from 'stream-chat-react';
import { useResultContext } from '../context/customContext';

const CreateChannel = () => {
  const { setIsCreating } = useResultContext()
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState('');
  const channelId = (`${groupName}-${Math.random().toString(36).substr(2, 9)}`).replace(/[^a-zA-Z0-9!-_]/g, '')



  const createGroup = async () => {
    try {
      const newGroup = await client.channel("team", channelId, {
        name: groupName, members: selectedUsers, image: groupImage
      });

      await newGroup.watch();

      setGroupName('');
      setGroupImage('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newGroup);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='create__channel-container'>
      <div className="create__channel-header">
        <h4>Create a New Channel</h4>
        <button type='button' onClick={() => setIsCreating(false)}>
          <img src={CloseIcon} alt="" />
        </button>
      </div>
      <div className="create__channel-input">
        <div className="create__channel-input__field">
          <p>Name:</p>
          <input placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        </div>
        <div className="create__channel-input__field">
          <p>Image URL</p>
          <input placeholder="Image URL" value={groupImage} onChange={(e) => setGroupImage(e.target.value)} />
        </div>
      </div>
      <p className='create__channel-subtitle'>Add Members</p>
      <div className='create__channel-users'>
        <UsersList setSelectedUsers={setSelectedUsers} />
      </div>
      <div className='create__channel-footer'>
        <h4>Members: {selectedUsers.length}</h4>
        <button type='button' onClick={createGroup} >Create</button>
      </div>
    </div>
  )
}

export default CreateChannel