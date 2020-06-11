import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Header from '../Header/Header';
import Chat from '../Chat/Chat'
import Conversation from '../Conversation/Conversation';
import UsersContainer from '../UsersContainer/UsersContainer';
import style from './Messages.module.css'

//Setting up sockets
let socket;

const Messages = (props) => {

    const [name, setName] = useState(''),
    [room, setRoom] = useState(''),
    [messages, setMessages] = useState([]),
    [message, setMessage] = useState(''),
    [usersOnline, setUsersOnline] = useState([]);
    // console.log('messages', props.location.search)
    //Handling users join
    useEffect(() => {
        const {name, room} = queryString.parse(props.location.search);
        // console.log('useEffect', name, room)
        /*-------*/
        socket = io('http://192.168.1.5:4040');
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
    },['http://192.168.1.5:4040', props.location.search]);


    //Handling Messages
    useEffect(() => {
        //.on listening/receiving changes/messages from b/e
        socket.on('message', (message) => {
            setMessages([...messages, message])
        });

        socket.on('roomData', (users) => {
            setUsersOnline(users.users)
        })
    },[messages, usersOnline]);


    const sendMessage = (e) => {
        e.preventDefault();
        if(message){
            //sends/emits message to server
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })}
    }

    console.log('message',message, 'messages', messages)
    console.log('usersOnline', usersOnline)
 
    return(
        <div>
            <div className={style.container}>
                <Header room={room}/>
                <Conversation messages={messages} name={name}/>
                <Chat message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
                <UsersContainer usersOnline={usersOnline}/>
        </div>
    )
}

export default Messages; 