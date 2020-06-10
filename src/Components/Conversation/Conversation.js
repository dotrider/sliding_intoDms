import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';
import style from './Conversation.module.css'

const Conversation = ({messages, name}) => {


    const mappedMessages = messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div> )
    return(
    <ScrollToBottom className={style.messages}>
        {mappedMessages}
    </ScrollToBottom>
    )
}

export default Conversation;