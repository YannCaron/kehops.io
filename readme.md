# webpack usage

## start server

1. go to your webpack directory

`cd io-configurator`

2. launch node webserver

`npm run start`

## add dependency

find your package on [npmjs.com](https://www.npmjs.com)
example : [rete package](https://www.npmjs.com/package/rete)

install it on your directory
`npm install --save <package-name>`

example: `npm install --save rete`

this will modify your **package.json** with your dependency
The `--save` option add to dependecy section whereas `--save-dev` will add to devdependency (uses during developpment).
