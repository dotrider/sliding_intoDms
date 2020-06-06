import React, { useState } from 'react';


const Join = (props) => {

    const [name, setName] = useState(''),
    [room, setRoom] = useState('');

    // console.log(props)

    return(
        <div>
            <h1>Join</h1>
            <div>
                <input placeholder='Enter Name' type='text' onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <input placeholder='Enter Room' type='text' onChange={(e) => setRoom(e.target.value)}/>
            </div>
            <button onClick={ e => (!name || !room)? e.preventDefault() : props.history.push(`/messages?name=${name}&room=${room}`)}>Sign in</button>
        </div>
    )
}

export default Join;