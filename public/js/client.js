const socket=io("http://localhost:8000");
const form=document.getElementById('send-container');
const messageInput=document.getElementById('Messageinp');
const messageContainer=document.querySelector(".container");
var audio=new Audio('tone.mp3');

let append=(message,position,name,t)=>{
    const div=document.createElement('div');
    // messageElement.innerText=message;
    // messageElement.classList.add('message');
    // messageElement.classList.add(position);
    // messageContainer.append(messageElement);
    div.classList.add('message');
    div.classList.add(position);
    const p=document.createElement('p');
    p.innerText=name+" "+t;    
    p.classList.add('meta');
    div.appendChild(p);
    const para=document.createElement('p');
    para.innerText=message;
    div.appendChild(para);
    messageContainer.append(div);
    if(position=='left')
        audio.play();
};

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    const p=document.createElement('p');
    append(`${message}`,'right','You',"");
    socket.emit('send',message);
    messageInput.value="";
});
const naem=prompt("Enter your name to join!"); 
socket.emit("new-user-joined",naem);     
socket.on("user-joined",data=>{
    append(`${data.name} joined the chat`,'left',`${data.name}`,`${data.time}`);
});

socket.on("receive",data=>{
    append(`${data.message}`,'left',`${data.name}`,`${data.time}`);
});

socket.on("left",data=>{
    append(`${data.name} left the chat`,'left',`${data.name}`,`${data.time}`);
})
