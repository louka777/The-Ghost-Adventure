let pseudo = "";
let isModerator = false;

// Demander pseudo
document.getElementById('pseudo').addEventListener('blur', function() {
  pseudo = this.value.trim();
  if (pseudo.toLowerCase() === "admin") {
    isModerator = true;
    document.getElementById('admin-controls').style.display = 'block';
  }
});

function sendMessage() {
  const text = document.getElementById('message').value.trim();
  if (!pseudo || !text) return alert("Entre un pseudo et un message !");
  
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = "message";
  
  const nameSpan = document.createElement('span');
  const textSpan = document.createElement('span');
  
  if (isModerator) {
    nameSpan.className = "mod-pseudo";
    textSpan.className = "mod-message";
  } else {
    nameSpan.style.fontWeight = 'bold';
    nameSpan.style.color = 'white';
    textSpan.style.color = 'white';
  }
  
  nameSpan.textContent = pseudo + ": ";
  textSpan.textContent = text;
  
  div.appendChild(nameSpan);
  div.appendChild(textSpan);
  chat.appendChild(div);
  
  document.getElementById('message').value = "";
}

// Fonction spéciale pour modérateur : flash la page
function flash() {
  if (!isModerator) return;
  let flashes = 0;
  const interval = setInterval(() => {
    document.body.style.backgroundColor = flashes % 2 === 0 ? 'white' : 'black';
    flashes++;
    if (flashes > 10) {
      clearInterval(interval);
      document.body.style.backgroundColor = 'black';
    }
  }, 100);
}
