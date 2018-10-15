const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('Welcome to Labyrinth application!');
});

app.listen(3000, function() {
    console.log('Labyrinth app listening on port 3000!');
});

module.exports = { app };
