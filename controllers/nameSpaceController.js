class namespaceController {

    constructor(title, endpoint) {
        this.title = title;
        this.endpoint = endpoint;
        this.room = [];
    }

    addRoome (room){
        this.room.push(room);
    }
}

module.exports = namespaceController;