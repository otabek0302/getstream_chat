import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react';
import { useResultContext } from '../context/customContext';


import CloseIcon from "../assets/CloseIcon.svg"

const UserInfo = () => {
  const { channel } = useChatContext()
  const { setIsDetails, isDetails } = useResultContext()
  const { image, name, id, fullName, phoneNumber } = isDetails

  const deleteChat = async () => {
    setIsDetails(false)
    await channel.delete();
    window.location.reload();
  }

  return (
    <div className='edit__channel-container'>
      <div className="create__channel-header">
        <h4>Edit details</h4>
        <button type='button' onClick={() => setIsDetails(null)}>
          <img src={CloseIcon} alt="" />
        </button>
      </div>
      <div className="user__details-container">
        <h1>User Profile</h1>
        <div className="user__details-header">
          <Avatar image={image} name={name || id} size={120} />
        </div>
        <div className="user__details-content">
          <div className="user__details-field">
            <label htmlFor="username">Username</label>
            <input type="text" value={name} readOnly />
          </div>
          <div className="user__details-field">
            <label htmlFor="username">Full Name</label>
            <input type="text" value={fullName} readOnly />
          </div>
          <div className="user__details-field">
            <label htmlFor="username">Tel</label>
            <input type="text" value={phoneNumber} readOnly />
          </div>
        </div>
        <div className='mx-auto'>
          <button type='button' className='delete-btn' onClick={deleteChat}>Delete Group</button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo