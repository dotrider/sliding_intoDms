import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

//Setting up sockets
let socket;

const Messages = (props) => {

    const [name, setName] = useState(''),
    [room, setRoom] = useState(''),
    [messages, setMessages] = useState([]),
    [message, setMessage] = useState('');
    // console.log('messages', props.location.search)
    //Handling users join
    useEffect(() => {
        const {name, room} = queryString.parse(props.location.search);
        // console.log('useEffect', name, room)
        /*-------*/
        socket = io('localhost:4040');
        /*-------*/
        setName(name);
        setRoom(room);
        // console.log('socket', socket)
        /*---emit/Sending to server (event='join')(payload={name,room})----*/
        socket.emit('join', {name, room}, () => {

        });
        //willUnmount
        return () => {
            socket.emit('disconnect');
            socket.off()
        };
    },['localhost:4040', props.location.search]);


    //Handling Messages
    useEffect(() => {
        //.on listening/receiving changes/messages from b/e
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    },[messages]);


    const sendMessage = (e) => {
        e.preventDefault();
        if(message){
            //sends/emits message to server
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })}
    }

    console.log('message',message, 'messages', messages)

    return(
        <div>
            <div>
                <input value={message} onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter'? sendMessage(e): null}
                />
                
            </div>
        </div>
    )
}

export default Messages; 