const express = require('express'),
    sockets = require('socket.io'),
    http = require('http'),
    PORT_NUM = process.env.PORT_NUM || 4040,
    app = express(),
    server = http.createServer(app),
    io = sockets(server);

    //connection set 
    io.on('connection', (socket) => {
        console.log('a user connected!!!!!');
        //JOIN (receiving data from client)
        socket.on('join', ({name, room}, cb ) => {
            console.log(name,room)
            // cb();
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

