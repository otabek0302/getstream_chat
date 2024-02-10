import React, { useEffect, useState } from 'react'
import { Avatar, useChatContext } from 'stream-chat-react';
import Loader from './Loader';

const UsersList = ({ setSelectedUsers, selectedUsers, handleSave }) => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const { users } = await client.queryUsers({ id: { $ne: client.userID } }, { id: 1 });

                if (users.length) {
                    setUsers(users.filter(user => user.role === 'user'));
                } else {
                    setListEmpty(true);
                }
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        }

        if (client) getUsers()
    }, [client]);

    if (error) {
        return (
            <div className='user__list-container'>
                <div className="user__list-wrapper">
                    <h2>Error loading, please refresh and try again.</h2>
                </div>
            </div>
        )
    }

    if (listEmpty) {
        return (
            <div className='user__list-container'>
                <div className="user__list-wrapper">
                    <h2>No users found.</h2>
                </div>
            </div>
        )
    }

    return (
        <div className='user__list-container'>
            <div className="user__list-header">
                <div className="user__list-input__field">
                    <input placeholder="Search users by username..." />
                </div>
            </div>
            <div className="user__list-wrapper">
                {loading ? <Loader /> :
                    users?.map((user, i) => (
                        <UserItem index={i} key={user.id} user={user} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                    ))
                }
            </div>
            <button onClick={handleSave} className='delete-btn'>Save</button>
        </div>
    )
}

function UserItem({ user, setSelectedUsers, selectedUsers }) {
    const [selected, setSelected] = useState(selectedUsers?.includes(user?.id) || false)

    const handleSelect = () => {
        if (selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div className={`user__list-item ${selected ? "selected" : ""}`} onClick={handleSelect}>
            <div className="user__list-item__img">
                <Avatar image={user.image} name={user.fullName || user.id} size={62} />
            </div>
            <div className="user__list-item__details">
                <h5>{user.fullName || user.name}</h5>
                <span>{user?.phoneNumber}</span>
            </div>
        </div>
    )
}


export default UsersList
