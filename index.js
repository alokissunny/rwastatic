const express = require('express');
const path = require('path');
const app = express();
var proxy = require('./setupProxy')

proxy(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(9000);