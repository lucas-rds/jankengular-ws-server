const playerChoosed = (player) => !!player.choice;
const allPlayersHaveChoosen = (players) => players.every(playerChoosed);

module.exports = { playerChoosed, allPlayersHaveChoosen }