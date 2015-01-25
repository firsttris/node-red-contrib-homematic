node-red-contrib-homematic
===
integrate your homematic device with <b>Node-RED</b>

[![npm version](https://badge.fury.io/js/node-red-contrib-homematic.svg)](http://badge.fury.io/js/node-red-contrib-homematic) [![Build Status](https://travis-ci.org/firsttris/node-red-contrib-homematic.svg?branch=master)](https://travis-ci.org/firsttris/node-red-contrib-homematic) [![Coverage Status](https://coveralls.io/repos/firsttris/node-red-contrib-homematic/badge.svg?branch=master)](https://coveralls.io/r/firsttris/node-red-contrib-homematic?branch=master) [![devDependency Status](https://david-dm.org/firsttris/node-red-contrib-homematic/dev-status.svg)](https://david-dm.org/firsttris/node-red-contrib-homematic#info=devDependencies)

### Overview
node-red-contrib-homematic provides predefined commands to control homematic devices connected to the CCU using the JSON-RPC API in <b>Node-RED</b>.<br>
<b>Node-RED</b> - is a visual tool for wiring the Internet of Things - read more @http://nodered.org<br>
This node outputs a msg object containing remote procedure calls which can be send to the CCU using the http-request node.
![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/homematic2.PNG)

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/homematic1.PNG)



### Install
```chef
cd node-red/
npm install node-red-contrib-homematic
```

### Something missing?
feel free to create a pull request!
but first run some tests...
```chef
npm install -g mocha
cd node-red/node_modules/node-red-contrib-homematic/
mocha test/homematic_spec.js
```
