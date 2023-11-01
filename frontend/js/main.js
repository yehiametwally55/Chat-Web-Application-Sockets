const socket = io("http://localhost:3000")
const myInput = document.getElementById("chatMessage");


function sendMessage(){
 let message = document.getElementById("chatMessage");
 console.log(message.value);
 socket.emit("newMessage", message.value)
 message.value = ""

}

socket.on("replay",(data)=>{
    console.log(data);
    document.querySelector("#test").innerHTML += ` <div class="message_content">${data}</div>`
} )

myInput.addEventListener("input",function (e){
    socket.emit("typing", e.target.value)
} )
myInput.addEventListener("keyup",function (e){
    setTimeout(()=>{
        socket.emit("stopTyping", e.target.value)
    },1000)
})

socket.on("typing", data =>{
    document.getElementById("typingMessage").classList.replace("d-none","d-block")
})
socket.on("stopUserTyping", data =>{
    setTimeout(()=>{
        document.getElementById("typingMessage").classList.replace("d-block","d-none")
    },1000)
})

