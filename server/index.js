const express = require('express'),
    socket = require('socket.io'),
    http = require('http'),
    PORT_NUM = process.env.PORT_NUM || 4040,
    app = express(),
    server = http.createServer(app),
    io = socket(server),
    {addUser, removeUser, getUser, getUsersInRoom} = require('../server/Controller/controller');

    //connection set 
    io.on('connection', (socket) => {
        // console.log('a user connected!!!!!'); 
        /*(receiving data using same event='join' payload={name,room} from client)
        passing cb to error handling*/
        socket.on('join', ({name, room}, cb ) => {
            console.log('name & room', name, room)
            const { err, user } = addUser({ id: socket.id, name, room});
            if(err) return cb(err)
            //joins user in room
            socket.join(user.room);
            //Welcomes user with message - {'message'} sending payload with user/text to client handling-messages useEffect
            socket.emit('message', {user: 'admin', text: `Hello ${user.name}, welcome to room ${user.room}`});
            //broadcast sends message to everyone besides especific user that user has joinned
            socket.broadcast
            .to(user.room).emit('message', {user: 'admin', text: `${user.name}, has join`});

            //sends all users in the room
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
            cb();

        })

        //Listening/receiving changes/messages from client
        //.on receives 2params, event & cb
        socket.on('sendMessage', (message, cb) => {
            //getting socket.id from 'io.on('connection', (socket)'
            const user = getUser(socket.id)
            //io.to looks for user.room and sends/emit message to client
            io.to(user.room).emit('message', { user: user.name, text: message })
            //Send all users in room when user leaves
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
            cb()
        })

        ////DISCONNECT
        socket.on('disconnect', () => {
            console.log('connection disconnected');
            //Sends message to room that user has left
            const user = removeUser(socket.id);
            if(user){
                io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`})
            }
        });
    });



    app.get('/', (req, res) => { 
        res.send('send')
    });

server.listen(PORT_NUM, () => console.log(`spinning hardcore on port ${PORT_NUM}`));

