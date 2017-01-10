module.exports = function (RED) {
    "use strict";

    function CCUConfigNode (n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;
        this.interfaceName = n.interfaceName;
    }

    RED.nodes.registerType("ccu-address", CCUConfigNode);

    function DeviceConfigNode (n) {
        RED.nodes.createNode(this, n);
        this.channel = n.channel;
    }

    RED.nodes.registerType("homematic-device", DeviceConfigNode);

    function HomematicCommands (n) {
        RED.nodes.createNode(this, n);
        this.ccu = n.ccu;
        this.device = n.device;
        this.config = RED.nodes.getNode(this.ccu);
        this.device = RED.nodes.getNode(this.device);
        this.function = n.function;
        this.attribute = n.attribute;
        this.value = n.value;
        this.nodeName = n.nodeName;


        this.setValue = function (interfaceName, channel, attribute, value) {
            return "var d = dom.GetObject(\"" + interfaceName + channel + "." + attribute + "\");if (d){d.State(\"" + value + "\");}";
        };

        this.getValue = function (interfaceName, channel, attribute) {
            return "var d = dom.GetObject(\"" + interfaceName + channel + "." + attribute + "\");if (d){Write(d.State());}";
        };

        this.on('input', (msg) => {
            let script = "";
            if(this.function == "setValue") {
                script = this.setValue(this.config.interfaceName, this.device.channel, this.attribute, this.value);
            }
            if(this.function == "getValue") {
                script = this.getValue(this.config.interfaceName, this.device.channel, this.attribute)
            }

            let headers = {};
            headers["Content-Length"] = script.length;
            headers["Content-Type"] = "application/x-www-form-urlencoded";

            msg.headers = headers;
            msg.method = "POST";
            msg.url = "http://"+this.config.host+"/tclrega.exe";
            msg.payload = script;

            this.send(msg);
        });

    }

    RED.nodes.registerType("homematic", HomematicCommands);
};
