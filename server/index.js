const WebSocket = require("ws");

const webSocketServer = new WebSocket.Server({ port: 8080 });

const broadcast = (data) => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

webSocketServer.on("connection", (webSocket) => {
  webSocket.on("message", (message) => {
    console.log("Recieved", message);
    broadcast(message);
  });
});
