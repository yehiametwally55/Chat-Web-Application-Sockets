import express  from "express";
import {dbConnection} from './database/connection.js'
import { noteModel } from "./database/model/note.model.js";
import { Server} from "socket.io";

const app = express();
const port = 3000

app.get('/', (req,res) => res.send('Hello'))
dbConnection();

const server = app.listen(port, ()=> console.log(`app listening on port ${port}`))

const io = new Server(server,{
    cors:"*"
})
io.on("connection", (socket)=>{

console.log("welcome from sockets", socket.id);
socket.on("disconnect", ()=>{
    console.log("disconnect");
})
socket.on("newMessage",data =>{
    console.log(data);
    io.to().emit("replay",data)
})
socket.on("typing", data =>{
    console.log("typing...");
    socket.broadcast.emit("typing","typing...")
})
socket.on("stopTyping", data =>{
    console.log("stopTyping");
    socket.broadcast.emit("stopUserTyping","")
})
})







