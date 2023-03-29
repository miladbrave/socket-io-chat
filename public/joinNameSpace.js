function joinNameSpace(endpoint){
    if(nsSocket){
        nsSocket.close()
    }
    nsSocket = io(`http://localhost:3000${endpoint}`,{
        query : {
            username
        }
    })

    nsSocket.on("roomLoad",(roomData)=>{
        $('.roomlist').html('');

        roomData.forEach((element) => {

            $('.roomlist').append(
            `
                <div class="btnJoin mt-2 joinRoom" name="${element.name}">
                    ${element.title}
                </div>
            `
            )
        });
        joinRoom(roomData[0].name);
    })
}

$(document).on('click','.joinRoom',function(){
    joinRoom($(this).attr('name'));
})