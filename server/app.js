let express = require('express');
let app = express();
let cors = require('cors');
app.use(cors());
app.use(express.static('public'));
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

users = [];
connections = [];

app.get('/', (req, res) => {
    res.send('it works');
});

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    // Disconnect
    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket.username), 1);
        connections.splice(connections.indexOf(socket), 1);
        io.sockets.emit('users updated', users);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    // Send Message
    socket.on('add msg', (data) => {
        io.sockets.emit('msg added', {msg: data.msg, sound64: data.sound64, user: socket.username});
    });

    // New User
    socket.on('add user', (username, callback) => {
        if(users.includes(username)) {
            callback(false);
        }else{
            callback(true);
            socket.username = username;
            users.push(socket.username);
            io.sockets.emit('users updated', users);
        }
    });

});

server.listen(8081, () => {
    console.log('Server Running');
});
