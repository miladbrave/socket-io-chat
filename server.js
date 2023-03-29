const express = require('express')
const socketIo = require("socket.io")
const structure = require("./structure")

const app = express()
app.use(express.static(__dirname + "/public"))

const httpServer = app.listen(3000)
const io = socketIo(httpServer, {
    cors: {
        origin : "*"
    }
})


io.on('connection',(socket) => {
    let snData = structure.map((namespace) => {
        return {
            title : namespace.title,
            endpoint: namespace.endpoint 
        }
    })

    socket.emit('namespaceLoad',snData)
})

structure.forEach((namespace) => {

   io.of(namespace.endpoint).on('connection',(nsSocket)=>{

    nsSocket.username = nsSocket.handshake.query.username
    nsSocket.emit("roomLoad",namespace.room)

    nsSocket.on("joinroom",(roomname) => {
        
        let lastRoom = Array.from(nsSocket.rooms)[1]
       
        nsSocket.leave(lastRoom)
        updateOnlineUser(namespace.endpoint,lastRoom)  

        nsSocket.join(roomname)
         updateOnlineUser(namespace.endpoint,roomname)

        let roomInfo = namespace.room.find((room)=>{
            return room.name === roomname
        })
        // console.log(io.of(namespace.endpoint).in(lastRoom).allSockets())
        // console.log(io.of(namespace.endpoint).in(roomname).allSockets())
        nsSocket.emit("rommInfo",roomInfo)
    })

    nsSocket.on("newMessageFromClient",(message) => {
    
        let currentRoomName = Array.from(nsSocket.rooms)[1]
        let messageStructur = {
            username : nsSocket.username,
            avatar: "avatar.png",
            text: message,
            time: new Date().toLocaleString()
        }

        let room = namespace.room.find((item)=>{
            return item.name === currentRoomName
        })
        
        room.addMessage(messageStructur)
        io.of(namespace.endpoint).in(room.name).emit("newMessageFromServer",messageStructur);
    })

    nsSocket.on('disconnecting',()=>{
        let lastRoom = Array.from(nsSocket.rooms)[1];
        nsSocket.leave(lastRoom);
        updateOnlineUser(namespace.endpoint,lastRoom);
    })
    
   })
})

async function updateOnlineUser(endpoint,roomNmae){
    let onlineUser = await io.of(endpoint).in(roomNmae).allSockets();
    io.of(endpoint).in(roomNmae).emit('updateOnlineUser',Array.from(onlineUser).length)
}




// const express = require('express');
// const socketIo = require('socket.io')
// const app = express();

// app.use(express.static(__dirname + "/public"))
// const httpServer = app.listen(3000);
// const io = socketIo(httpServer,{
//     cors : {
//         origin : '*'
//     }
// })

// io.on("connection",(socket)=>{
//     socket.join("chatroom 1")
//     console.log(socket.handshake.query)
//     console.log(socket.rooms)
//     socket.on("msgFromClient",(data)=>{
//         console.log(data)
//         io.emit("msgForServer",data)
//     })
// })


// const socketIo = require('socket.io')

// const http = require('http')
// const webSocket = require('ws')

// let server = http.createServer();
// // let wss = new webSocket.Server({
// //     server
// // })
// let io = socketIo(server,{
//     cors : {
//         origin : '*'
//     }
// });

// wss.on("headers",(headers, req) =>{
//     console.log(headers);
// })
// wss.on("connection",(socket, req)=>{
//     console.log("new client!")
//     socket.on("message",(msg)=>{
//         console.log(msg)
//         socket.send("OK....welcome to my server")
//     })
// })

// io.on("connection",(socket) => {
//     console.log("A new socket connected!")

//     socket.on("welcome",(data) => {
//         console.log(data);
//         socket.emit("welcome serevr","okey...welcome from server")
//     })
// })


// server.listen(3000);