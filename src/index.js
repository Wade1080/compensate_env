var fs = require('fs');
const {VM, VMScript} = require('vm2');

const file = `${__dirname}/code.js`;
const windowFile = `${__dirname}/window.js`;
const vm = new VM()
const script = new VMScript(fs.readFileSync(windowFile)+fs.readFileSync(file),"VM2");
debugger
vm.run(script);
debugger
