#node-red-contrib-homematic

:house: Integrate your Homematic devices with <b>Node-RED</b>

[![npm version](https://badge.fury.io/js/node-red-contrib-homematic.svg)](http://badge.fury.io/js/node-red-contrib-homematic) 

### Features

node-red-contrib-homematic provides functions to control Homematic devices in <b>Node-RED</b>.<br>

<b>Node-RED</b> - is a visual tool for wiring the Internet of Things (IoT) - read more @http://nodered.org<br>
This node outputs a msg object containing "remote script calls" which can be send to the CCU using the http-request node.

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/homematic2.PNG)

### Communication

This node provides "remote script calls" which can be send using the HttpRequest node

### How to use this Node?

#### Talk to Homematic with node-red-contrib-homematic:

Example shows how to change the level of a dimmer

Inject node ---- Homematic node ---- HttpReques node ---- Debug node

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/node-red-contrib-homematic.PNG)

Homematic node config

#### Configure your CCU

you can configure multiple endpoints

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/node-red-homematic-config-ccu.PNG)

#### Configure your devices

you can configure multiple devices

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/node-red-homematic-config-devices.PNG)

your config ccu/devices will be saved..

#### Choose function, channel and attribute

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/node-red-homematic-config-node.PNG)

#### Configure HttpRequest node like this

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/httpRequestEmpty.PNG)



### Implementation

#### Talk to Homematic only with vanilla nodes:

Example shows how to change the level of a dimmer

Inject node ---- Function node ---- HttpRequest node ---- Debug node

![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/node-red-homematic-rega.PNG)

#### Function node content

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

### Exported Flow

Find the exported flow example in "test" directory

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

### Something missing?

You can easily extend this module to fit your needs by editing the html file.
feel free to create a pull request!