
import "@babel/polyfill";
import Rete from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
import AlightRenderPlugin from 'rete-alight-render-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import TaskPlugin from 'rete-task-plugin';

import KeydownComponent from './KeydownComponent';
import EnterPressComponent from './EnterPressComponent';
import AlertComponent from './AlertComponent';

var actionSocket = new Rete.Socket('Action');
var dataSocket = new Rete.Socket('Data');

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










var components = [new KeydownComponent, new EnterPressComponent, new AlertComponent];
var container = document.querySelector('#rete')


var editor = new Rete.NodeEditor('tasksample@0.1.0', container,);
editor.use(AlightRenderPlugin);
editor.use(ConnectionPlugin);
editor.use(ContextMenuPlugin);
editor.use(TaskPlugin);

var engine = new Rete.Engine('tasksample@0.1.0');

components.map(c => {
  editor.register(c);
  engine.register(c);
});

editor.on('connectioncreate connectionremove nodecreate noderemove', ()=>{
  if(editor.silent) return;
     
  compile();
});




async function compile() {
    await engine.abort();
    await engine.process(editor.toJSON());
}



var data = {
    'id': 'tasksample@0.1.0',
    'nodes': {
        '2': {
            'id': 2,
            'data': {},
            'group': null,
            'inputs': {},
            'outputs': {
                'act': {
                    'connections': [
                        {
                            'node': 3,
                            'input': 'act'
                        }
                    ]
                },
                'key': {
                    'connections': [
                        {
                            'node': 3,
                            'input': 'key'
                        }
                    ]
                }
            },
            'position': [
                114, 133
            ],
            'name': 'Keydown event'
        },
        '3': {
            'id': 3,
            'data': {},
            'group': null,
            'inputs': {
                'act':{
                    'connections': [
                        {
                            'node': 2,
                            'output': 'act'
                        }
                    ]
                }, 
                'key': {
                    'connections': [
                        {
                            'node': 2,
                            'output': 'key'
                        }
                    ]
                }
            },
            'outputs': {
                'then':{
                    'connections': [
                        {
                            'node': 10,
                            'input': 'act'
                        }
                    ]
                }, 
                'else': {
                    'connections': [
                        {
                            'node': 11,
                            'input': 'act'
                        }
                    ]
                }
            },
            'position': [
                443, 112
            ],
            'name': 'Enter pressed'
        },
        '10': {
            'id': 10,
            'data': {
                'msg': 'Enter!'
            },
            'group': null,
            'inputs': {
                'act': {
                    'connections': [
                        {
                            'node': 3,
                            'output': 'then'
                        }
                    ]
                }
            },
            'outputs': [],
            'position': [
                773, 106
            ],
            'name': 'Alert'
        },
        '11': {
            'id': 11,
            'data': {
                'msg': 'Another key pressed'
            },
            'group': null,
            'inputs': {
                'act': {
                    'connections': [
                        {
                            'node': 3,
                            'output': 'else'
                        }
                    ]
                }
            },
            'outputs': [],
            'position': [
                766, 292
            ],
            'name': 'Alert'
        }
    },
    'groups': {}
}

editor.fromJSON(data).then(() => {
    editor.view.resize();
    compile();
});
