import express from "express";
import routes from "./routes.js";
import expressWs from "express-ws";
import socket from "./socket.js";
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
app.ws("/socket", socket);

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});
