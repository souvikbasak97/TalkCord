const io=require('socket.io')(8000,{
    cors:{
        origin:'*',
    }
});
const moment=require('moment');
// const t=moment().format('h:mm a');


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