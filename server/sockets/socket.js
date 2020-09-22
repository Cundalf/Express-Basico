const { io } = require('../server');

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido'
    });

    client.on('disconect', () => {
        console.log('Usuario desconectado');
    });

    client.on('enviarMensaje', (data, callback) => {
        console.log(data);

        if (data.usuario) {
            callback({
                resp: 'ok'
            });
        } else {
            callback({
                resp: 'error'
            });
        }
        
        client.broadcast.emit('enviarMensaje', data);
    });
});