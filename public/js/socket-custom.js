var socket = io();

socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log("Se perdio la consexion con el servidor");
});

socket.on('enviarMensaje', function (msg) {
    console.log(msg);
    
    var node = document.createElement("li");
    var textnode = document.createTextNode(msg.usuario + ": " + msg.mensaje);
    node.appendChild(textnode);
    document.getElementById("chat").appendChild(node);
});

document.getElementById("btnEnviar").onclick = function () { EnviarMensaje(); };

function EnviarMensaje() {
    var strUsuario = document.getElementById("txtUsuario").value;
    var strMensaje = document.getElementById("txtMensaje").value;
    
    socket.emit('enviarMensaje', {
        usuario: strUsuario,
        mensaje: strMensaje
    }, function (resp) {
        console.log(resp);
        if(resp.resp != "ok") {
            alert("Fallo al enviar el mensaje");
        }
    });
}