import React from 'react';



const UsersContainer = ({usersOnline}) => {

    console.log('userOnline Container', usersOnline.users)
        const displayUsers = usersOnline.map(user => <div>{user.name}</div>)
    return(
       <div>
          Online: {displayUsers}
       </div>
    ) 
}

export default UsersContainer;