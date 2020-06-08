import React from 'react';



const Chat = ({message, setMessage, sendMessage}) => {

    return(
        <div>
          <form>
            <input value={message} placeholder='type message...' onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter'? sendMessage(e): null}/> 
         </form>
        </div>
    )
}

export default Chat;