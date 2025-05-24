// const socket = io();

// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector('.container');

// const scrollToBottom = () => {
//   messageContainer.scrollTop = messageContainer.scrollHeight;
// };

// const append = (message, position) => {
//   const messageElement = document.createElement('div');
//   messageElement.innerText = message;
//   messageElement.classList.add('message', position);
//   messageContainer.appendChild(messageElement);
//   scrollToBottom();
// };

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const message = messageInput.value;
//   append(`You : ${message}`, 'right');
//   socket.emit('send', message);
//   messageInput.value = '';
// });

// const name = prompt('Enter your name to join');
// socket.emit('new-user-joined', name);

// socket.on('user-joined', (name) => {
//   append(`${name} joined the chat`, 'right');
// });

// socket.on('receive', (data) => {
//   append(`${data.name} : ${data.message}`, 'left');
// });

// socket.on('left', (name) => {
//   append(`${name} left the chat`, 'left');
// });

// messageInput.addEventListener('input', () => {
//   socket.emit('typing', name);
// });

// socket.on('typing', (userName) => {
//   const typingDiv = document.getElementById('typing-indicator');
//   typingDiv.innerText = `${userName} is typing...`;
//   setTimeout(() => (typingDiv.innerText = ''), 2000);
// });

// document.getElementById('clear-chat').addEventListener('click', () => {
//   messageContainer.innerHTML = '';
// });

// socket.on('word-cloud', (wordFreq) => {
//   const entries = Object.entries(wordFreq);
//   WordCloud(document.getElementById('word-cloud'), {
//     list: entries,
//     gridSize: 8,
//     weightFactor: 10,
//     fontFamily: 'Times, serif',
//     color: 'random-dark',
//     backgroundColor: '#fff',
//   });
// });

// --------------------------------******************--------------------------------
// --------------------------------******************--------------------------------

// // ADD ANIMATIONS CLASSES DYNAMICALLY

const socket = io();
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const sendButton = document.querySelector('.btn');

// Scroll to bottom
const scrollToBottom = () => {
  messageContainer.scrollTop = messageContainer.scrollHeight;
};

// Append message with animation
const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message', position, 'fade-in');
  messageContainer.appendChild(messageElement);
  scrollToBottom();

  // Remove animation class after animation completes
  setTimeout(() => {
    messageElement.classList.remove('fade-in');
  }, 500);
};

// Send button animation on click
sendButton.addEventListener('click', () => {
  sendButton.classList.add('click-animate');
  setTimeout(() => {
    sendButton.classList.remove('click-animate');
  }, 300);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (!message.trim()) return;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});

// Typing animation
let typingTimeout;
messageInput.addEventListener('input', () => {
  socket.emit('typing', name);
  messageInput.classList.add('typing-animate');
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    messageInput.classList.remove('typing-animate');
  }, 1000);
});


// word cloud appearence
let wordData = {}; // Persist words globally

socket.on('word-cloud', (wordFreq) => {
  // Merge new word frequencies
  for (let word in wordFreq) {
    if (wordData[word]) {
      wordData[word] += wordFreq[word];
    } else {
      wordData[word] = wordFreq[word];
    }
  }

  const entries = Object.entries(wordData);
  WordCloud(document.getElementById('word-cloud'), {
    list: entries,
    gridSize: 8,
    weightFactor: 10,
    fontFamily: 'Times, serif',
    color: 'random-dark',
    backgroundColor: 'transparent',
    drawOutOfBound: false,
    rotateRatio: 0.2,
    shuffle: true
  });
});


// app functioning
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => append(`${name} joined the chat`, 'right'));
socket.on('receive', data => append(`${data.name}: ${data.message}`, 'left'));
socket.on('left', name => append(`${name} left the chat`, 'left'));

socket.on('typing', userName => {
  const typingDiv = document.getElementById('typing-indicator');
  typingDiv.innerText = `${userName} is typing...`;
  setTimeout(() => typingDiv.innerText = '', 2000);
});
