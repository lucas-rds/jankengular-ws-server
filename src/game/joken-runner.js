
const jokenMapper = require('./joken-mapper');
const { WIN, LOSE, DRAW } = require('../constants/game-result');

const resultTextMap = {
    [WIN]: "Winner",
    [LOSE]: "Loser",
    [DRAW]: "Draw"
}

const resultToText = (result) => resultTextMap[result];

module.exports = function jokenpo(playA, playB) {
    const playAResult = jokenMapper[playA][playB];
    const playBResult = jokenMapper[playB][playA];
    return [resultToText(playAResult), resultToText(playBResult)];
}