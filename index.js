const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const rooms = require('./src/repository/rooms-in-memory');
const clients = require('./src/repository/clients-in-memory');
const JokenGameSocket = require('./src/joken-game-socket');

io.on('connection', function jokenSocket(socket) {
    let jokenGameSocket = new JokenGameSocket(socket);
    jokenGameSocket.listen();
    clients.push(jokenGameSocket);
});

app.use(cors());

app.get('/rooms', function (req, res) {
    res.send(rooms);
});

app.get('/clients', function (req, res) {
    res.send(
        clients.map(client => ({
            id: client.id,
            data: client.data
        }))
    );
});

const PORT = process.env.PORT || 80;
http.listen(PORT, function () {
    console.log('listening on *:' + PORT);
});