import React, { useEffect, useState } from 'react'
import Searchicon from "../../assets/SearchIcon.svg"
import ChannelListSearchResults from "./ChannelListSearchResults"

import { useChatContext } from 'stream-chat-react';

const ChannelListSearch = () => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([])
  const [directsmessage, setDirectsmessage] = useState([])
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    if (!query) {
      setGroups([]);
      setUsers([]);
    }
  }, [query])

  const fetchChannels = async (text) => {
    try {
      const [channelResponse, userResponse] = await Promise.all([
        client.queryChannels({
          type: 'team',
          name: { $autocomplete: text },
          members: { $in: [client.userID] },
        }),
        client.queryChannels({
          type: 'messaging',
          name: { $autocomplete: text },
          members: { $in: [client.userID] },
        }),
      ]);
      const [channels, users] = await Promise.all([channelResponse, userResponse]);

      if (channels.length) { setGroups(channels) }
      if (users.length) { setDirectsmessage(users) }
      setLoading(false);

    } catch (error) {
      setLoading(false);
    }
  };

  const onSearch = (e) => {
    setLoading(true)
    setQuery(e.target.value)
    fetchChannels(e.target.value)
  }

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
  }

  useEffect(() => {
    const usersInformation = [];
    directsmessage.forEach((message) => {
      const membersObject = message?.state?.members;
      if (membersObject && Object.keys(membersObject).includes(client.userID)) {
        for (const key in membersObject) {
          if (key !== client.userID) {
            usersInformation.push(membersObject[key].user);
          }
        }
      }
    });
  
    setUsers(usersInformation);
  }, [client.userID, directsmessage]);

  return (
    <>
      <div className='channel-list__header-search__div'>
        <img src={Searchicon} alt="Search icon" />
        <input type="text" placeholder='Search' value={query} onChange={onSearch} />
      </div>
      {
        query && <ChannelListSearchResults groups={groups} users={users} loading={loading} setChannel={setChannel} />
      }
    </>
  )
}

export default ChannelListSearch