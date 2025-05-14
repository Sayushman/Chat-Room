const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path')
const app = express();
const server = http.createServer(app);


// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '..')));

// route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'iiindex.html'));
  });
  
// to accept request from all origin
const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});



const users = {};

const chatMessages = [];

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    console.log("New user", name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });


  socket.on('send', message => {
  const chatEntry = {
    user: users[socket.id],
    message: message,
  };

  chatMessages.push(chatEntry); // Save to memory

  socket.broadcast.emit('receive', {
    message: message,
    name: users[socket.id]
  });
});


  socket.on('disconnect', () => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(8000, () => {
  console.log('Server running at http://localhost:8000');
});

setInterval(() => {
    console.log("Current Chat Messages:");
    console.table(chatMessages.slice(-10)); // show last 10 messages
  }, 30000);


// function to extract and count words

function generateWordFrequency(messages) {
  const wordCount = {};

  messages.forEach(entry => {
    const words = entry.message.toLowerCase().match(/\b\w+\b/g); // split into words
    if (words) {
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });
    }
  });

  return wordCount;
}

//periodically create the word count data

setInterval(() => {
    const wordFreq = generateWordFrequency(chatMessages);
    console.log("Word Cloud Data:");
    console.table(wordFreq);

    // emit to all connected clients
    io.emit('word-cloud', wordFreq)
    
    // Optional: Clear old messages after processing (simulate non-persistent memory)
    chatMessages.length = 0;
  }, 30000);
  
// emit the data into the frontend 

console.log('word-cloud', generateWordFrequency(chatMessages));


  
