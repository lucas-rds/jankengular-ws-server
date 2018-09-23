
module.exports = {
    PLAYER_ENTER_ROOM_EVENT: 'player-enter-room',
    START_MATCH_EVENT: 'start-match',
    PLAYER_CHOOSE_VALUE_EVENT: 'player-choose-value',
    DISCONNECT_EVENT: 'disconnect',
    ROOM_UPDATE_EVENT: 'room-update',
    getPlayerChooseValueOnRoomEvent: (room) => `player-choose-value-${room.id}`,
    getMatchStartedOnRoomEvent: (room) => `match-started-${room.id}`,
}