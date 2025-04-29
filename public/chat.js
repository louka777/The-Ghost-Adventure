const socket = io();
let pseudo = "";

document.getElementById('pseudo').addEventListener('blur', () => {
  pseudo = document.getElementById('pseudo').value.trim();
  socket.emit('new-user', pseudo);
  if (pseudo.toLowerCase() === 'admin') {
    document.getElementById('admin-controls').style.display = 'block';
  }
});

function sendMessage() {
  const messageInput = document.getElementById('message');
  const message = messageInput.value.trim();
  if (message === "") return;
  socket.emit('send-message', message);
  messageInput.value = "";
}

socket.on('chat-message', (data) => {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = "message";

  const nameSpan = document.createElement('span');
  const textSpan = document.createElement('span');

  if (data.isMod) {
    nameSpan.className = "mod-pseudo";
    textSpan.className = "mod-message";
  } else {
    nameSpan.style.fontWeight = 'bold';
    nameSpan.style.color = 'white';
    textSpan.style.color = 'white';
  }

  nameSpan.textContent = data.pseudo + ": ";
  textSpan.textContent = data.message;

  div.appendChild(nameSpan);
  div.appendChild(textSpan);
  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight;
});

function sendFlash() {
  socket.emit('flash');
}

socket.on('flash', () => {
  let flashes = 0;
  const interval = setInterval(() => {
    document.body.style.backgroundColor = flashes % 2 === 0 ? 'white' : 'black';
    flashes++;
    if (flashes > 10) {
      clearInterval(interval);
      document.body.style.backgroundColor = 'black';
    }
  }, 100);
});
