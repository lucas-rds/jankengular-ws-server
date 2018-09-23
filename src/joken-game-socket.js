const inMemoryRepository = require('./repository/in-memory-general-repository');
const decideWinner = require('./game/decide-match-winner');
const { allPlayersHaveChoosen } = require('./utils/player-lambda');

const {
    PLAYER_ENTER_ROOM_EVENT,
    START_MATCH_EVENT,
    PLAYER_CHOOSE_VALUE_EVENT,
    DISCONNECT_EVENT,
    ROOM_UPDATE_EVENT,
    getPlayerChooseValueOnRoomEvent,
    getMatchStartedOnRoomEvent
} = require('./constants/event-names');

class JokenGameSocket {
    constructor(socket) {
        this._socket = socket;
        this._data = {};
    }

    get data() {
        return this._data;
    }

    listen() {
        console.log("JokenGameSocket: Listening to new connection");
        this._socket.on(PLAYER_ENTER_ROOM_EVENT, this.onPlayerEnterRoom.bind(this));
        this._socket.on(START_MATCH_EVENT, this.onStartMatch.bind(this));
        this._socket.on(PLAYER_CHOOSE_VALUE_EVENT, this.onPlayerChooseGameValue.bind(this));
        this._socket.on(DISCONNECT_EVENT, this.onDisconnect.bind(this));
    }

    onPlayerEnterRoom({ room, player }) {
        console.log("JokenGameSocket: Player entered room");
        room.players.push(player);
        inMemoryRepository.saveRoom(room);
        this._data.player = player;
        this._data.room = room;
        let rooms = inMemoryRepository.getRooms();
        this._socket.broadcast.emit(ROOM_UPDATE_EVENT, rooms);
        this._socket.emit(ROOM_UPDATE_EVENT, rooms);
    }

    onStartMatch(room) {
        console.log("JokenGameSocket: Match Started");
        const newMatch = {
            id: room.id,
            room: room,
            players: room.players,
            result: []
        }
        inMemoryRepository.saveMatch(room, newMatch);
        let eventName = getMatchStartedOnRoomEvent(room);
        this._socket.broadcast.emit(eventName, newMatch);
        this._socket.emit(eventName, newMatch);
    }

    onPlayerChooseGameValue(data) {
        console.log("JokenGameSocket: Player Selected an Option");
        let { match } = data;
        const eventName = getPlayerChooseValueOnRoomEvent(match.room);
        if (allPlayersHaveChoosen(match.players)) {
            data.match.result = decideWinner(match);
        }
        this._socket.broadcast.emit(eventName, data);
        this._socket.emit(eventName, data);
    }

    onDisconnect() {
        console.log("JokenGameSocket: Player disconnected from game");
        if (this._data.room && this._data.player) {
            inMemoryRepository.removePlayerFromRoom(this._data.room, this._data.player);
            this._socket.broadcast.emit(ROOM_UPDATE_EVENT, inMemoryRepository.getRooms());
        }
        inMemoryRepository.removeClient(this._socket);
    }

}

module.exports = JokenGameSocket;