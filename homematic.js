module.exports = function(RED) {
    "use strict";

    function HomematicConfigNode(n) {
	RED.nodes.createNode(this, n);
	this.device = n.device;
	this.serial = n.serial;
    }
    RED.nodes.registerType("homematic-config", HomematicConfigNode);

    function HomematicCommands(n) {
	RED.nodes.createNode(this, n);
	this._method = n._method;
	this._interface = n._interface;
	this._device = n._device;
	this.addressConfig = RED.nodes.getNode(this._device);
	this._valueKey = n._valueKey;
	this._type = n._type;
	this._username = n._username;
	this._password = n._password;
	this._url = n._url;
	this._interfaceId = n._interfaceId;
	this._value = n._value;
	this._topic = n._topic;
	this._name = n._name;
	var node = this;

	function isNotEmptyOrUndefined(field) {
	    if ((typeof field === "undefined") || (field === "")) {
		return false;
	    } else {
		return true;
	    }
	}

	this.on('input', function(msg) {

	    if (isNotEmptyOrUndefined(node._topic)) {
		msg.topic = node._topic;
	    }
	    var myrequest = {};
	    myrequest.method = node._method;
	    var params = {};

	    if (isNotEmptyOrUndefined(RED.settings.functionGlobalContext) && isNotEmptyOrUndefined(RED.settings.functionGlobalContext["currentSessionid"])) {
		params["_session_id_"] = RED.settings.functionGlobalContext["currentSessionid"];
	    }
	    if (isNotEmptyOrUndefined(node._interface)) {
		params["interface"] = node._interface;
	    }
	    console.log(node.addressConfig);
	    if (isNotEmptyOrUndefined(node.addressConfig) && isNotEmptyOrUndefined(node.addressConfig.serial)) {
		params["address"] = node.addressConfig.serial;
	    }
	    if (isNotEmptyOrUndefined(node._valueKey)) {
		params["valueKey"] = node._valueKey;
	    }
	    if (isNotEmptyOrUndefined(node._type)) {
		params["type"] = node._type;
	    }
	    if (isNotEmptyOrUndefined(node._username)) {
		params["username"] = node._username;
	    }
	    if (isNotEmptyOrUndefined(node._password)) {
		params["password"] = node._password;
	    }
	    if (isNotEmptyOrUndefined(node._url)) {
		params["url"] = node._url;
	    }
	    if (isNotEmptyOrUndefined(node._interfaceId)) {
		params["interfaceId"] = node._interfaceId;
	    }
	    if (isNotEmptyOrUndefined(msg.payload) && isNotEmptyOrUndefined(msg.payload.value)) {
		params["value"] = msg.payload.value;
	    } else if (isNotEmptyOrUndefined(node._value)) {
		params["value"] = node._value;
	    }

	    myrequest.params = params;

	    var headers = {};
	    msg.payload = myrequest;

	    // headers["Content-Length"] = msg.length;
	    headers["Content-Type"] = "application/json";
	    headers["Accept"] = "application/json";
	    msg.headers = headers;
	    
	    console.log("**************************PAYLOAD START********************************");
	    console.log("Topic: "+msg.topic);
	    //console.log(msg.headers);
	    console.log(msg.payload);
	    console.log("***************************PAYLOAD END*********************************");
	    node.send(msg);
	});
    }
    RED.nodes.registerType("homematic", HomematicCommands);
}
