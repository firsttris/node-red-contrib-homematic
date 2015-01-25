module.exports = function(RED) {
    "use strict";

    function HomematicCommands(n) {
	RED.nodes.createNode(this, n);
	this._method = n._method;
	this._interface = n._interface;
	this._address = n._address;
	this._valueKey = n._valueKey;
	this._type = n._type;
	this._username = n._username;
	this._password = n._password;
	this._url = n._url;
	this._customAddress = n._customAddress;
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

	    if (isNotEmptyOrUndefined(RED.settings.functionGlobalContext)
		    && isNotEmptyOrUndefined(RED.settings.functionGlobalContext["currentSessionid"])) {
		params["_session_id_"] = RED.settings.functionGlobalContext["currentSessionid"];
	    }

	    if (isNotEmptyOrUndefined(node._interface)) {
		params["interface"] = node._interface;
	    }
	    if (isNotEmptyOrUndefined(node._address)) {
		if (node._address == "customAddress") {
		    params["address"] = node._customAddress;
		} else {
		    params["address"] = node._address;
		}
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
	    if (isNotEmptyOrUndefined(node._value)) {
		params["value"] = node._value;
	    }

	    myrequest.params = params;

	    if (node._method === "Session.logout") {
		RED.settings.functionGlobalContext["currentSessionid"] = "";
	    }

	    var headers = {};
	    msg.payload = myrequest;

	    // headers["Content-Length"] = msg.length;
	    headers["Content-Type"] = "application/json";
	    headers["Accept"] = "application/json";
	    msg.headers = headers;
	    // console.log("Method: " + node._method + " ValueKey: " +
	    // node.valueKey);
	    console.log("**************************PAYLOAD START********************************");
	    console.log(msg);
	    console.log("***************************PAYLOAD END*********************************");
	    node.send(msg);
	});
    }
    RED.nodes.registerType("homematic", HomematicCommands);
}
