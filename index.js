const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Un utilisateur connecté');

  socket.on('sendMessage', (data) => {
    io.emit('newMessage', data);
  });

  socket.on('flash', () => {
    io.emit('flashPage');
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur déconnecté');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
