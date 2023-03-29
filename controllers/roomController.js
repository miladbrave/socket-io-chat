class roomController {

    constructor(name,title){
        this.name = name;
        this.title = title;
        this.history = []
    }

    addMessage(message){
        this.history.push(message)
    }

    clearHistory (){
        this.history = []
    }
    

}

module.exports = roomController;