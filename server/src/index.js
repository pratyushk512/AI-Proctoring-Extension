import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";


const app = express();


dotenv.config({
  path: './.env' 
});


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});


app.use(cors());


connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed!!!", err);
  });


app.use(express.static('public'));


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  
  socket.on('tabVisibilityChanged', (data) => {
    console.log('Tab visibility changed:', data);
    
  });

  
  socket.on('windowFocusChanged', (data) => {
    console.log('Window focus state changed:', data);
  });

  
  socket.on('clipboardEvent', (data) => {
    console.log(`${data.action} event received. Content:`, data.content);
  });

  
  socket.on('fullscreenChanged', (data) => {
    console.log('Fullscreen state changed:', data);
  });

  
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});
