import React from 'react';



const Message = ({message, name}) => {
    let isSentByCurrentUser = false
    
    const trimmedName = name.trim().toLowerCase();

    if(message.user === trimmedName){
        isSentByCurrentUser = true
    }

    return(
       <div style={{width: '30vw', margin: '0 auto'}}>
           {isSentByCurrentUser?
            <div style={{textAlign: 'right', backgroundColor: '#047BF4', padding: '10px'}}>
                 <p style={{color: '#F9F9F9'}}>{trimmedName}</p>
                 <p>{message.text}</p>
            </div>
            :
            <div style={{textAlign: 'left', backgroundColor: '#F9F9F9', padding: '10px'}}>
                <p style={{color: '#047BF4'}}>{message.user}</p>
                <p>{message.text}</p>
            </div>}
       </div>
    ) 
}

export default Message;