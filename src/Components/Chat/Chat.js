import React from 'react';
import style from './Chat.module.css'


const Chat = ({message, setMessage, sendMessage}) => {

    return(
          <form className={style.form}>
            <input className={style.input} value={message} placeholder='type message...' onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter'? sendMessage(e): null}/> 
            <button className={style.button} onClick={e => sendMessage(e)}>Send</button>
         </form>
    )
}

export default Chat;