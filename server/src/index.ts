import ws from "ws";
const server = new ws.Server({ port: 3001 });

server.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(message);
    socket.send(`${message}`);
  });
});

// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";

// const ADMIN = "Admin";
// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// app.use(cors());

// server.on("connection", (socket) => {
//   socket.on("message", (message) => {
//     console.log(message);
//   });
// });

// server.listen(3001, () => {
//   console.log("server running at localhost:3001");
// });
