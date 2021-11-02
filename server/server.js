const express = require('express');
const app = express();
const PORT = 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use()

app.get('/test', (req, res) => {
  res.send({ express: 'EXPRESS BACKEND SUCCESSFULLY CONNECTED TO REACT'});
});

app.get('/new_game', (req, res) => {
  const newGameState = {
    currentLetter: null,
    categoryList: null,
    gameDuration: null,
    playersInLobby: {
      userName: null,
      score: null
    }
  }
  res.send(JSON.stringify(newGameState));
})