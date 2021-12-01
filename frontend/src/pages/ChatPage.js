import React, {useEffect} from 'react'
import { useState } from 'react';
import axios from '../../node_modules/axios/index'

function ChatPage() {
    const [chats, setChats] = useState([]);

    const getChats = async () => {
        const { data } = await axios.get('/api/v1/chat');
        console.log(data)
        setChats(data)
    }

    useEffect(() => {
        getChats()
    },[])
    return (
        <div>
            <h1>Chat Page</h1>
            {
                chats.map((chat) => (
                    <div key={chat._id}>
                        {chat.chatName}
                    </div>
                ))
            }
        </div>
    )
}

export default ChatPage
