const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = {};
const chatMessages = [];

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

function generateWordFrequency(messages) {
  const wordCount = {};
  messages.forEach(entry => {
    const words = entry.message.toLowerCase().match(/\b\w+\b/g);
    if (words) {
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });
    }
  });
  return wordCount;
}

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', message => {
    chatMessages.push({ user: users[socket.id], message });
    socket.broadcast.emit('receive', { message, name: users[socket.id] });

    const wordFreq = generateWordFrequency(chatMessages);
    io.emit('word-cloud', wordFreq);
  });

  

  socket.on('disconnect', () => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });

  socket.on('typing', name => {
    socket.broadcast.emit('typing', name);
  });
});

// setInterval(() => {
//   const wordFreq = generateWordFrequency(chatMessages);
//   io.emit('word-cloud', wordFreq);
// }, 30000);

server.listen(8000, () => {
  console.log('Server running at http://localhost:8000');
});
