# node-red-contrib-homematic

:house: Integrate your Homematic devices with <b>Node-RED</b>

[![npm version](https://badge.fury.io/js/node-red-contrib-homematic.svg)](http://badge.fury.io/js/node-red-contrib-homematic)

### Features

node-red-contrib-homematic provides functions to control Homematic devices with <b>Node-RED</b>.<br>

<b>Node-RED</b> - is a visual tool for wiring the Internet of Things (IoT) - read more @http://nodered.org<br>
This node outputs a message to msg.payload containing "remote script calls" which can be send to the CCU using the HttpRequest node.

![Screenshot](https://github.com/firsttris/node-red-contrib-homematic/blob/master/wiki/homematic-node.PNG)

### Communication

This node provides "remote script calls" which can be send using the HttpRequest node

### How to use this Node?

#### Talk to Homematic with node-red-contrib-homematic:

Example shows how to change the level of a dimmer

Inject node ---- Homematic node ---- HttpRequest node ---- Debug node

![Screenshot](https://github.com/firsttris/node-red-contrib-homematic/blob/master/wiki/node-red-contrib-homematic.PNG)

### Homematic node config

#### Configure your CCU

you can configure multiple endpoints

![Screenshot](https://github.com/firsttris/node-red-contrib-homematic/blob/master/wiki/node-red-homematic-config-ccu.PNG)

#### Configure your devices

you can configure multiple devices

![Screenshot](https://github.com/firsttris/node-red-contrib-homematic/blob/master/wiki/node-red-homematic-config-devices.PNG)

your config ccu/devices will be saved..

#### Choose function, channel and attribute

![Screenshot](https://github.com/firsttris/node-red-contrib-homematic/blob/master/wiki/node-red-homematic-config-node.PNG)

#### You can also pass values into the node!

Just pass the input value as the msg.payload parameter and use the "{{msg.payload}}" syntax in the value field.

![Screenshot](https://github.com/firsttris/node-red-contrib-homematic/blob/master/wiki/node-red-homematic-config-node-custom-value.png)


#### Configure HttpRequest node like this

![Screenshot](https://github.com/firsttris/node-red-contrib-homematic/blob/master/wiki/httpRequestEmpty.PNG)

#

### The Vanilla Way

#### Talk to Homematic only with core nodes

Example shows how to change the level of a dimmer

Inject node ---- Function node ---- HttpRequest node ---- Debug node

![Screenshot](https://github.com/firsttris/node-red-contrib-homematic/blob/master/wiki/node-red-homematic-rega.PNG)

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

### XML-RPC API
[Dokumentation](http://www.eq-3.de/Downloads/eq3/download%20bereich/hm_web_ui_doku/HM_XmlRpc_API.pdf)

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

## Code of Conduct
See the [CODE](CODE_OF_CONDUCT.md)

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
