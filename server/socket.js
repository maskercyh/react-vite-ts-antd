let clients = [];
export default function (ws, req) {
  clients.push(ws);

  ws.on("message", function (msg) {
    clients.forEach((client) => {
      if (client !== ws) {
        // 不发送给自己
        client.send(msg);
      }
    });
  });
  // 连接打开时
  ws.on("open", (res) => {
    console.log(res);
    console.log("WebSocket connected111");
  });

  // 连接关闭时
  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });
}
