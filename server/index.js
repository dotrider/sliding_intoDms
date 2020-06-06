const express = require('express'),
    sockets = require('socket.io'),
    http = require('http'),
    PORT_NUM = process.env.PORT_NUM || 4040,
    app = express(),
    server = http.createServer(app);
    io = sockets(server);


server.listen(PORT_NUM, () => console.log(`spinning hardcore on port ${PORT_NUM}`));