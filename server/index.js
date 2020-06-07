const express = require('express'),
    sockets = require('socket.io'),
    http = require('http'),
    PORT_NUM = process.env.PORT_NUM || 4040,
    app = express(),
    server = http.createServer(app),
    io = sockets(server),
    {addUser, removeUser, getUser, getUsersInRoom} = require('../server/Controller/controller');

    //connection set 
    io.on('connection', (socket) => {
        // console.log('a user connected!!!!!'); 
        //JOIN (receiving data from client)
        socket.on('join', ({name, room}, cb ) => {
            // console.log(name,room)
            const { user, err } = addUser({ id: socket.id, name, room});
            if(err) return cb(err)
            // cb();
            socket.join(user.room);
            //Welcomes user
            socket.emit('message', {user: 'admin', text: `Hello ${user.name}, welcome to room ${user.room}`});
            //broadcast sends message to everyone besides especific user that user has joinned
            socket.broadcast
            .to(user.room).emit('message', {user: 'admin', text: `${user.name}, has join`})
            cb()
        })

        socket.on('sendMessage', (message, cd) => {
            const user = getUser(socket.id)

            io.to(user.room).emit('message', { user: user.name, text: message })
            cb()
        })

        ////DISCONNECT
        socket.on('disconnect', () => {
            console.log('connection disconnected');
        });
    });

    app.get('/', (req, res) => {
        res.send('send')
    });

server.listen(PORT_NUM, () => console.log(`spinning hardcore on port ${PORT_NUM}`));

