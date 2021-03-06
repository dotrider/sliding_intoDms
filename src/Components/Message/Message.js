import React from 'react';
import  ReactEmoji from 'react-emoji';


const Message = ({message, name}) => {
    let isSentByCurrentUser = false
    
    const trimmedName = name.trim().toLowerCase();

    if(message.user === trimmedName){
        isSentByCurrentUser = true
    }

    return(
       <div style={{width: '50vw', margin: '0 auto', padding: '10px'}}>
           {isSentByCurrentUser?
            <div style={{textAlign: 'right', backgroundColor: '#047BF4', padding: '10px', borderRadius: '10px'}}>
                 <p style={{color: '#F9F9F9'}}>{trimmedName}</p>
                 <p>{ReactEmoji.emojify(message.text)}</p>
            </div>
            :
            <div style={{textAlign: 'left', backgroundColor: '#F9F9F9', padding: '10px', borderRadius: '10px'}}>
                <p style={{color: '#047BF4'}}>{message.user}</p>
                <p>{ReactEmoji.emojify(message.text)}</p>
            </div>}
       </div>
    ) 
}

export default Message;