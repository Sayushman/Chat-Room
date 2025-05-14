const socket = io('http://localhost:8000');

// Get DOM elements in respective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// function which will append event to the container 
const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = ''
})

// ask new user for his/her name 
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name );

socket.on('user-joined', data =>{
append(`${name} joined the chat`, 'right')
})

socket.on('receive', data =>{
append(`${data.name}: ${data.message}`, 'left')
})

socket.on('leave', name =>{
append(`${name}: left the chat`, 'left')
})









//function to draw the word-cloud
socket.on('word-cloud', (data) => {
    console.log('Word Cloud Data received:', data);
  
    // Convert object to array for wordcloud2.js format: [[word, weight], ...]
    const wordArray = Object.entries(data);
  
    WordCloud(document.getElementById('word-cloud'), {
      list: wordArray,
      gridSize: Math.round(16 * $('#word-cloud').width() / 1024),
      weightFactor: function (size) {
        return Math.pow(size, 1.5); // Controls font size growth
      },
      fontFamily: 'serif',
      color: 'random-dark',
      backgroundColor: '#fff',
      rotateRatio: 0.5,
      rotationSteps: 2,
      shuffle: true
    });
  });
