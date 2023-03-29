function joinRoom(roomname){
    
    nsSocket.emit("joinroom",roomname)

    nsSocket.off("rommInfo")
    nsSocket.off("updateOnlineUser")
    nsSocket.off("newMessageFromServer")

    nsSocket.on("rommInfo",(roominfo)=>{
        $('.roomName').html(roominfo.title)
        $('.chatBox').html('')
        roominfo.history.forEach(message => {
            $('.chatBox').append(
                `
                <div class="messageBox">
                <img src="${message.avatar}">
                <p class="font-weight-bold userName">${message.username}</p>
                <p>${message.text}</p>
                <span class="time">${message.time}</span>
                </div>
                `
            )
            $('.chatBox').scrollTop($(".chatBox")[0].scrollHeight)
        });
    })

    nsSocket.on('updateOnlineUser',(count)=>{
        $('.onlineCount').html(count)
    })

    nsSocket.on("newMessageFromServer",(message)=>{
            $('.chatBox').append(
                `
                <div class="messageBox">
                <img src="${message.avatar}">
                <p class="font-weight-bold userName">${message.username}</p>
                <p>${message.text}</p>
                <span class="time">${message.time}</span>
                </div>
                `
            )
            $('.chatBox').scrollTop($(".chatBox")[0].scrollHeight)
    })
}

$('.sendBtn').click(()=>{
    let message = $('.messageInput').val()
    nsSocket.emit('newMessageFromClient',message);
    $('.messageInput').val('')
})