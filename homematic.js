module.exports = function (RED) {
    "use strict";

    function HomematicConfigNode (n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;
        this.interfaceName = n.interfaceName;
    }

    RED.nodes.registerType("homematic-config", HomematicConfigNode);

    function HomematicCommands (n) {
        RED.nodes.createNode(this, n);
        this.ccu = n.ccu;
        this.config = RED.nodes.getNode(this.ccu);
        this.function = n.function;
        this.channel = n.channel;
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
                script = this.setValue(this.config.interfaceName, this.channel, this.attribute, this.value);
            }
            if(this.function == "getValue") {
                script = this.getValue(this.config.interfaceName, this.channel, this.attribute)
            }

            let headers = {};
            headers["Content-Length"] = script.length;
            headers["Content-Type"] = "application/x-www-form-urlencoded";

            msg.headers = headers;
            msg.method = "POST";
            msg.url = "http://"+this.config.host+"/tclrega.exe";
            msg.payload = script;

            console.log("**************************PAYLOAD START********************************");
            console.log(msg.headers);
            console.log(msg.payload);
            console.log("***************************PAYLOAD END*********************************");
            this.send(msg);
        });

    }

    RED.nodes.registerType("homematic", HomematicCommands);
};
