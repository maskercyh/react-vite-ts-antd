import express from "express";
import routes from "./routes.js";
import expressWs from "express-ws";
const app = express();
const port = 5000;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
expressWs(app);
app.ws("/", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);
  });
  // 连接打开时
  ws.on("open", () => {
    console.log("WebSocket connected");
  });

  // 连接关闭时
  ws.on("close", () => {
    console.log("WebSocket disconnected");
  });
});

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});
