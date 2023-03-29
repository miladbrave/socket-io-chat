const username = prompt("what is your name ?")
const socket = io("http://localhost:3000", {
    query : {
        username: username
    }
});
let nsSocket = null;

socket.on('connect',()=>{
    socket.on("namespaceLoad",(item)=>{
        $(".namespaceList").html("")

        item.forEach(namespace => {
            $('.namespaceList').append(
                `
                <div class="btnJoin mt-2 joinNameSpace" ns="${namespace.endpoint }">
                    ${namespace.title}
                </div>
                `
            )
        });
        joinNameSpace(item[0].endpoint);
    })
})

$(document).on("click",".joinNameSpace", function(){
    joinNameSpace($(this).attr("ns"))
})