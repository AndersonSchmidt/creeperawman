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
    
});

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    // Disconnect
    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    // Send Message
    socket.on('add msg', (data) => {
        io.sockets.emit('msg added', {msg: data, user: socket.username});
    });

    // New User
    socket.on('add user', (data) => {
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    function updateUsernames() {
        io.sockets.emit('user added', users);
    }

});

server.listen(3000, () => {
    console.log('Server Running');
});
