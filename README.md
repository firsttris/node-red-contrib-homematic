node-red-contrib-homematic
===
Integrate your homematic device with <b>Node-RED</b>

[![npm version](https://badge.fury.io/js/node-red-contrib-homematic.svg)](http://badge.fury.io/js/node-red-contrib-homematic) 

### Features
node-red-contrib-homematic provides functions to control homematic devices in <b>Node-RED</b>.<br>

<b>Node-RED</b> - is a visual tool for wiring the Internet of Things - read more @http://nodered.org<br>
This node outputs a msg object containing Remote Script Calls which can be send to the CCU using the http-request node.

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/homematic2.PNG)

### Communication

This node uses Homematic Remote Script API (Rega) to talk to Homematic

### How to use this Node?

#### Talk to Homematic with node-red-contrib-homematic:

Example how to change level of a Homematic-dimmer

Inject-Node ---- Homematic-Node ---- HttpRequest-Node ---- Debug-Node

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/node-red-contrib-homematic.PNG)

Homematic-Node config

Choose function, channel, attribute and value you want to set

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/homematic-node.PNG)

Configure your CCU

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/homematic-node-credentials.PNG)

HttpRequest-Node config

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/httpRequestEmpty.PNG)

### Implementation

#### Talk to Homematic only with node-red vanilla nodes:

Example how to change level of a Homematic dimmer

Inject-Node ---- Function-Node ---- HttpRequest-Node ---- Debug-Node

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/node-red-homematic-rega.PNG)

Function-Node Contains
```
var script = "var d = dom.GetObject(\"BidCos-RF.LEQ0990753:1.LEVEL\");if (d){d.State(\"100\");}";
var headers = {};
headers["Content-Length"] = script.length;
headers["Content-Type"] = "application/x-www-form-urlencoded";
msg.headers = headers;
msg.method = "POST";
msg.url = "http://20.1.0.50/tclrega.exe";
msg.payload = script;
return msg;
```
HttpRequest-Node config

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/httpRequestEmpty.PNG)

### Install
```
cd node-red/
npm install node-red-contrib-homematic
```

### Docker Install
On the host machine
```
docker run \
--name nodered \
--restart=always \
-v /home/docker/node-red:/data \
-p 1880:1880 \
-d nodered/node-red-docker
```

Also on the host machine
```
cd /home/docker/node-red
npm install node-red-contrib-homematic
```