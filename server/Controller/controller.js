
const users = [];

module.exports = {

    addUser: ({id, name, room}) => {
        
        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();
        //Check if user with room already exist
        const existingUser = users.find(user => user.room === room && user.name === name);

        if(existingUser){
            return {err: 'Username already exist'}
        };

        const user = {id, name, room}
        users.push(user)
        return { user }
    },

    removeUser: (id) => {
        const index = users.findIndex(user => user.id === id);
        
        if(index !== -1){
            return users.splice(index,1)[0]
        }

    },

    getUser: (id) => users.find(user => user.id === id),

    getUsersInRoom: (room) => {
       return users.filter(user => user.room === room)
    }
};

