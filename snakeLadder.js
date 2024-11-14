function rollDice() {
  let dice = getRandomInt(1, 6);
  let count = 0;
  while (count++ < 6) dice = getRandomInt(1, 6);
  return dice;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game() {
  const snakes = {
    15: 4,
    32: 22,
    55: 38,
    72: 11,
    84: 62,
    91: 77
  };

  const ladders = {
    8: 24,
    35: 58,
    73: 95,
    62: 87
  };

  let player1 = {
    name: "Player 1",
    position: 0
  };

  let player2 = {
    name: "Player 2",
    position: 0
  };

  let currentPlayer = player1;
  
  while (true) {
    const dice = rollDice();
    let prevPos = currentPlayer.position;
    currentPlayer.position += dice;
    if (currentPlayer.position in snakes) {
      currentPlayer.position = snakes[currentPlayer.position];
    } else if (currentPlayer.position in ladders) {
      currentPlayer.position = ladders[currentPlayer.position];
    } else if (currentPlayer.position > 100) {
      currentPlayer.position = prevPos;
    } else if (currentPlayer.position == 100) break;
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  }
  return currentPlayer;
}

let gamesCount = 1000;
const results = { };
while (--gamesCount > 0) {
  const res = game();
  results[res.name] = (results[res.name] || 0) + 1;
}

console.table(results);
