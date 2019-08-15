import Rete from "rete";

let instance;

export default class ReteRessources {

    static get instance() {
        if (!instance) instance = new ReteRessources();
        return instance;
    }

    constructor() {

        this.actionSocket = new Rete.Socket('Action');
        this.dataSocket = new Rete.Socket('Data');
        
        this.eventHandlers = {
            list: [],
            remove() {
                this
                    .list
                    .forEach(h => {
                        document.removeEventListener('keydown', h);
                    });
                this.list = [];
            },
            add(name, h) {
                document.addEventListener(name, h, false);
                this
                    .list
                    .push(h);
            }
        };

        this.instance = this;
    }

}