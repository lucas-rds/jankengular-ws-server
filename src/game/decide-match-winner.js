const play = require('./joken-runner');

module.exports = function decideWinner(match) {
    const [playerA, playerB] = match.players;
    const [playerAResult, playerBResult] = play(playerA.choice, playerB.choice);
    return {
        [playerA.id]: playerAResult,
        [playerB.id]: playerBResult
    };
};