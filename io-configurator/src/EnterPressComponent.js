import Rete from "rete";
import ReteRessources from './ReteRessources';

export default class EnterPressComponent extends Rete.Component {
  
    constructor(){
      super('Enter pressed');
      this.task = {
        outputs: {then:'option', else:'option'}
      }
    }
    
    builder(node) {
  
      node
        .addInput(new Rete.Input('act','', ReteRessources.instance.actionSocket))
        .addInput(new Rete.Input('key', 'Key code', ReteRessources.instance.dataSocket))
        .addOutput(new Rete.Output('then', 'Then', ReteRessources.instance.actionSocket))
        .addOutput(new Rete.Output('else', 'Else', ReteRessources.instance.actionSocket));
    }
  
    worker(node, inputs, outputs) {
      if (inputs['key'][0] == 13) 
        this.closed = ['else'];
      else 
        this.closed = ['then'];
  
      console.log('Print', node.id, inputs);
    }
  }