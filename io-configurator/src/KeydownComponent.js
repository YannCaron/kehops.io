import Rete from "rete";
import ReteRessources from './ReteRessources';

var eventHandlers = {
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

export default class KeydownComponent extends Rete.Component {
  
    constructor(){
      super('Keydown event');
      this.task = {
        outputs: {act: 'option', key: 'output'},
        init(task){
          eventHandlers.remove();
          eventHandlers.add('keydown', function (e) {
            task.run(e.keyCode);
            task.reset();
          });
        }
      }
    }
    
    builder(node) {
      node.addOutput(new Rete.Output('act', '', ReteRessources.instance.actionSocket))
      node.addOutput(new Rete.Output('key', 'Key code', ReteRessources.instance.dataSocket));
    }
    
    worker(node, inputs, data) {
      console.log('Keydown event', node.id, data);
      return {key: data}
    }
  }