const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('Welcome to Labyrinth application!');
});

module.exports = { app };
