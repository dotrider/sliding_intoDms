const express = require('express'),
    sockets = require('socket.io'),
    http = require('http'),
    PORT_NUM = process.env.PORT_NUM || 4040,
    app = express(),
    server = http.createServer(app),
    io = sockets(server);


    io.on('conneection', (socket) => {
        console.log('a user connected!!!!!');
        socket.on('disconnect', () => {
            console.log('connection disconnected');
        });
    });

    app.get('/', (req, res) => {
        res.send('send')
    });

server.listen(PORT_NUM, () => console.log(`spinning hardcore on port ${PORT_NUM}`));
