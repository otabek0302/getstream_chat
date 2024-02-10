import React, { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { useNavigate } from 'react-router-dom'
import Cookies from "universal-cookie";

import ChannelListContainer from "../components/ChannelListContainer";
import ChannelContainer from "../components/ChannelContainer";

const cookie = new Cookies();
const authToken = cookie.get("token");
const client = StreamChat.getInstance("fhumfrd7nuwt");

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!authToken) {
            navigate('/register');
        } else {
            navigate('/');
            client.connectUser(
                {
                    id: cookie.get("userId"),
                    name: cookie.get("userName"),
                    fullName: cookie.get("fullName"),
                    image: cookie.get("picture"),
                    phoneNumber: cookie.get("phoneNumber"),
                },
                authToken
            );
        }
    }, [navigate]);
    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer />
                <ChannelContainer />
            </Chat>
        </div>
    )
}

export default Home