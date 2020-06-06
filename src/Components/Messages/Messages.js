import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

//Setting up sockets
let socket;

const Messages = (props) => {

    const [name, setName] = useState(''),
    [room, setRoom] = useState('');
    // console.log('messages', props.location.search)
    
    useEffect(() => {
        const {name, room} = queryString.parse(props.location.search);
        // console.log('useEffect', name, room)
        /*-------*/
        socket = io('localhost:4040');
        /*-------*/
        setName(name);
        setRoom(room);
        // console.log('socket', socket)
        /*---Sending to server----*/
        socket.emit('join', {name, room});
        //willUnmount
        return () => {
            socket.emit('disconnect');
            socket.off()
        };
    },['localhost:4040', props.location.search]);

    return(
        <div>
            Messages
        </div>
    )
}

export default Messages;