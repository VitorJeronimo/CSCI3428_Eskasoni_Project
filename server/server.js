const express = require('express');
const app = express();
const PORT = 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/test', (req, res) => {
  res.send({ express: 'EXPRESS BACKEND SUCCESSFULLY CONNECTED TO REACT'});
});