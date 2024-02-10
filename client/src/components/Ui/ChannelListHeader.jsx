import React from 'react'
import ChannelListSearch from './ChannelListSearch'
import MenuIcon from "../../assets/MenuIcon.svg"

const ChannelListHeader = ({ sidebar, setSidebar }) => {
  return (
    <div className='channel-list__header'>
      <div className='channel-list__header-wrapper'>
        <button type='button' onClick={() => setSidebar(!sidebar)}>
          <img src={MenuIcon} alt="Menu icon" />
        </button>
        <ChannelListSearch />
      </div>
    </div>
  )
}

export default ChannelListHeader