const socketio=require('socket.io');
const moment=require('moment');
const path=require('path');
const http=require('http');
const express=require('express');

const app=express();
const server=http.createServer(app);
const io=socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',usrname=>{
         console.log(usrname);
        // console.log(t);
        const t=moment().format('h:mm a');
        users[socket.id]=usrname;
        socket.broadcast.emit("user-joined",{name:usrname,time:t});
    })
    socket.on('send',message=>{
        const t=moment().format('h:mm a');
        socket.broadcast.emit("receive",{message:message,name:users[socket.id],time:t});
    });
    socket.on('disconnect',message=>{
        const t=moment().format('h:mm a');
        socket.broadcast.emit('left',{name:users[socket.id],time:t});
        delete users[socket.id];
    }); 
});

const PORT=process.env.PORT||3000;

server.listen(PORT,()=>console.log(`Server running on port: ${PORT}`));