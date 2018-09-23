const rooms = require('./rooms-in-memory');
const matchs = require('./matchs-in-memory');
const clients = require('./clients-in-memory');

const sameRoom = (room) => _room => _room.id == room.id;

const roomRepo = {
    saveRoom: (room) => rooms[rooms.findIndex(sameRoom(room))] = room,
    getRooms: () => rooms,

}

const matchRepo = {
    saveMatch: (room, match) => matchs[room.id] = match,
}

const playerRepo = {
    removePlayerFromRoom: (room, player) => {
        let foundRoom = rooms.find(_room => _room.id == room.id);
        foundRoom.players.splice(foundRoom.players.indexOf(player), 1);
    },
}

const clientRepo = {
    removeClient: (clientSocket) => clients.splice(clients.indexOf(clientSocket), 1),
}

module.exports = Object.assign({}, roomRepo, matchRepo, clientRepo, playerRepo);