import React from 'react';



const Header = ({room}) => {

    return(
        <div>
            <div>
                <h2>Room Name: {room}</h2>
            </div>
            <div>
                <a  href='/'>Leave</a>
            </div>
        </div>
    )
}

export default Header;