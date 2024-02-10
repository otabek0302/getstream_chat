import React from 'react'

import Logo from "../../assets/AO.png"
import Logout from "../../assets/LogoutIcon.svg"
import Close from "../../assets/CloseIcon.svg"
import GroupIcon from "../../assets/GroupIcon.svg"
import SearchIcon from "../../assets/SearchIcon.svg"
import { useResultContext } from '../../context/customContext'
import { useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'



const SideBar = ({ sidebar, setSidebar }) => {
    const { client } = useChatContext()
    const { setIsCreating, isCreating, setIsSearching, isSearching } = useResultContext()
    const logout = () => {
        client.disconnectUser()
        const cookie = new Cookies()
        cookie.remove("token")
        cookie.remove("userId")
        cookie.remove("userName");
        cookie.remove("fullName");
        cookie.remove("phoneNumber");
        cookie.remove("picture");

        window.location.reload()
    }
    return (
        <div className={`channel-list__sidebar ${sidebar ? 'show-sidebar' : 'hide-sidebar'}`}>
            <div className='channel-list__sidebar__buttons'>
                <button type='button' onClick={() => setSidebar(!sidebar)}>
                    <img src={Close} alt="" />
                </button>
                <button type='button' onClick={() => setIsCreating(!isCreating)}>
                    <img src={GroupIcon} alt="" />
                </button>
                <button type='button' onClick={() => setIsSearching(!isSearching)}>
                    <img src={SearchIcon} alt="" />
                </button>
                <button type='button' onClick={logout}>
                    <img src={Logout} alt="" />
                </button>
            </div>
            <div className='channel-list__sidebar__logo'>
                <img src={Logo} alt='Logo' />
            </div>
        </div>
    )
}

export default SideBar