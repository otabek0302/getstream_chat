/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import UsersList from './Ui/UsersList'
import { Avatar, Modal, useChatContext } from 'stream-chat-react';

import CloseIcon from "../assets/CloseIcon.svg"
import AddUserIcon from "../assets/AddUserIcon.svg"

import { useResultContext } from '../context/customContext';
import ChannelMembers from './Ui/ChannelMembers';

const EditChannel = () => {
  const { setIsEditing } = useResultContext()
  const { client, channel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([])
  const [groupName, setGroupName] = useState(channel?.data?.name || "");
  const [groupImage, setGroupImage] = useState(channel?.data?.image || "");
  const channelMembers = Object.keys(channel?.state?.members);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    if (channelMembers && channelMembers.length > 0) {
      setSelectedUsers((prevSelectedUsers) => {
        const uniqueUsers = new Set([...prevSelectedUsers, ...channelMembers]);
        return [...uniqueUsers];
      });
    }
  }, []);

  const saveGroup = async () => {

    const nameChanged = groupName !== (channel.data.name || channel.data.id);

    if (nameChanged) {
      await channel.update({ name: groupName, image: groupImage }, { text: `Channel name changed to ${groupName}` });
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setGroupName(null);
    setGroupImage(null);
    setIsEditing(false);
    setSelectedUsers([]);
  }

  const deleteGroup = async () => {
    setIsEditing(false)
    await channel.delete();
    window.location.reload();
  }

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div>
          <UsersList handleSave={saveGroup} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        </div>
      </Modal>
      <div className='edit__channel-container'>
        <div className="create__channel-header">
          <h4>Edit details</h4>
          <button type='button' onClick={() => setIsEditing(false)}>
            <img src={CloseIcon} alt="" />
          </button>
        </div>
        <div className="create__channel-input">
          <div className='channel__image'>
            <Avatar image={channel.data.image} name={channel.data?.name || channel.data?.id} size={120} />
          </div>
          <div className="create__channel-input__field">
            <input placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          </div>
          <div className="create__channel-input__field">
            <input placeholder="Image URL" value={groupImage} onChange={(e) => setGroupImage(e.target.value)} />
          </div>
          {
            channel.data.created_by.id === client.userID && (
              <div className="create__channel-input__field">
                <button type='button' className='delete-btn' onClick={deleteGroup}>Delete Group</button>
              </div>
            )
          }
        </div>
        <div className='edit__channel-subhead'>
          <p>Group Members</p>
          <button type='button' onClick={onOpenModal}>
            <img src={AddUserIcon} alt="" />
          </button>
        </div>
        <div className='edit__channel-users'>
          <ChannelMembers users={channel?.state?.members} />
        </div>
        <div className='create__channel-footer'>
          <h4>Members: {channel?.data?.member_count}</h4>
          <button type='button' onClick={saveGroup} >Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditChannel