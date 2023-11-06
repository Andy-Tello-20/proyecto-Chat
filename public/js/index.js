(function () {
  let username;
  const socket = io();

  function agregarMensaje(username, mensaje) {
      const logMessages = document.getElementById('log-messages');
      const p = document.createElement('p');
      p.innerHTML = `<strong>${username}:</strong> ${mensaje}`;
      logMessages.appendChild(p);
      scrollDown();
  }

  function scrollDown() {
      const logMessages = document.getElementById('log-messages');
      logMessages.scrollTop = logMessages.scrollHeight;
  }

  document.getElementById('form-message').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.getElementById('input-message');
      const newMessage = {
          username,
          body: input.value,
      };
      socket.emit('new-message', newMessage);
      input.value = '';
      input.focus();
  });

  socket.on('update-conversation', (conversation) => {
      const logMessages = document.getElementById('log-messages');
      logMessages.innerText = '';
      conversation.forEach((message) => {
          const p = document.createElement('p');
          p.innerHTML = `<strong>${message.username}:</strong> ${message.body}`
          logMessages.appendChild(p);
      });
      scrollDown();
  });

  Swal.fire({
      title: 'Ingresa tu nombre',
      input: 'text',
      allowOutsideClick: false,
      inputValidator: (value) => {
          if (!value) {
              return 'Necesitamos que ingreses su username para continuar.'
          }
      }
  })
  .then((result) => {
      username = result.value.trim();
  })
  .catch((error) => {
      console.error('Ah ocurrido un error al capturar el nombre 😨:',  error.message);
  });

})();

  
  