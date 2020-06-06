
const user = [];

module.exports = {

    addUser = ({id, name, room}) => {
        
        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();
        //Check if user with room already exist
        const existingUser = user.find(user => user.room === room && user.name === name);

        if(existingUser){
            return {err: 'Username already exist'}
        };

        const newUser = {id, name, room}
        user.push(newUser);
    },

    removeUser = (id) => {
        const index = user.findIndex(user => user.id === id);
        
        if(index !== -1){
            return user.splice(index,1)
        }

    },

    getUser = (id) => user.find(user => user.id === id),

    getUsersInRoom = (room) => {
       return user.filter(user => user.room === room)
    }
};

