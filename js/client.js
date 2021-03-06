const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    audio.play();
    
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
const name = prompt("Please enter your name to join the application")
socket.emit('new-user-joined', name)
socket.on('user-joined', name => {
    //const ab=name.concat(' joined the chat')
    append(`${name} joined the chat`, 'right');
})

socket.on('receiver', data => {
    append(`${data.name}:${data.message}`, 'left');
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
})