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
	this._customAdress = n._customAdress;
	this._interfaceId = n._interfaceId;
	this._value = n._value;
	this._topic = n._topic;
	this._name = n._name;
	var node = this;

	this.on('input', function(msg) {

	    msg.topic = node._topic;
	    var myrequest = {};
	    myrequest.method = node._method;
	    var params = {};

	    if (RED.settings.functionGlobalContext["currentSessionid"] !== "") {
		params["_session_id_"] = RED.settings.functionGlobalContext["currentSessionid"];
	    }
	    if (node._interface !== "") {
		params["interface"] = node._interface;
	    }
	    if (node._address !== "") {
		if (node._address == "CustomAdress") {
		    params["address"] = node._customAdress;
		} else {
		    params["address"] = node._address;
		}
	    }
	    if (node._valueKey !== "") {
		params["valueKey"] = node._valueKey;
	    }
	    if (node._type !== "") {
		params["type"] = node._type;
	    }
	    if (node._username !== "") {
		params["username"] = node._username;
	    }
	    if (node._password !== "") {
		params["password"] = node._password;
	    }
	    if (node._url !== "") {
		params["url"] = node._url;
	    }
	    if (node._interfaceId !== "") {
		params["interfaceId"] = node._interfaceId;
	    }
	    if (node._value !== "") {
		params["value"] = node._value;
	    }

	    myrequest.params = params;

	    if (node._method == "Session.logout") {
		RED.settings.functionGlobalContext["currentSessionid"] = "";
	    }

	    var headers = {};
	    msg.payload = myrequest;
	    headers["Content-Length"] = msg.length;
	    headers["Content-Type"] = "application/json";
	    headers["Accept"] = "application/json";
	    msg.headers = headers;
	    console.log("Method: " + node._method + " ValueKey: " + node.valueKey);
	    console.log(msg);
	    node.send(msg);
	});
    }
    RED.nodes.registerType("homematic", HomematicCommands);
}
