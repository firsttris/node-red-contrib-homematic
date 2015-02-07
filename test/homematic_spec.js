var should = require("should");

var homematicNode = require("../homematic.js");
var helper = require("./helper.js");

describe('HomematicNode', function() {

    beforeEach(function(done) {
	helper.startServer(done);
    });

    afterEach(function(done) {
	helper.unload();
	helper.stopServer(done);
    });

    describe('#homematic', function() {

	it('should be loaded', function(done) {
	    var flow = [ {
		"id" : "homematicNode1",
		"type" : "homematic",
		"name" : "homematicNode",
		"wires" : [ [] ]
	    } ];
	    helper.load(homematicNode, flow, function() {
		var homematicNode1 = helper.getNode("homematicNode1");
		homematicNode1.should.have.property('name', 'homematicNode');
		done();
	    });
	});

	it('should create & send Session.login object', function(done) {
	    var flow = [ {
		"id" : "homematicNode1",
		"type" : "homematic",
		"name" : "homematicNode",
		"_topic" : "_Session.login",
		"_method" : "Session.login",
		"_username" : "rudi",
		"_password" : "ratlos",
		"wires" : [ [ "helperNode1" ] ]
	    }, {
		id : "helperNode1",
		type : "helper",
		wires : []
	    } ];
	    helper.load(homematicNode, flow, function() {
		var homematicNode1 = helper.getNode("homematicNode1");
		var helperNode1 = helper.getNode("helperNode1");
		homematicNode1.should.have.property('name', 'homematicNode');
		helperNode1.on("input", function(msg) {
		    try {
			msg.topic.should.equal("_Session.login");
			msg.payload.method.should.equal("Session.login");
			msg.payload.params.username.should.equal("rudi");
			msg.payload.params.password.should.equal("ratlos");
			done();
		    } catch (err) {
			done(err);
		    }
		});
		homematicNode1.receive({});
	    });
	});

	it('should create & send Interface.setValue object', function(done) {

	    helper.load(homematicNode, [ {
		id : "HomematicConfigNode1",
		type : "homematic-config"
	    }, {
		id : "homematicNode1",
		type : "homematic",
		name : "homematicNode",
		_topic : "_Interface.setValue",
		_method : "Interface.setValue",
		_interface : "BidCos-RF",
		_device : "HomematicConfigNode1",
		_valueKey : "ACTUAL_TEMPERATURE",
		_type : "string",
		_value : "22",
		wires : [ [ "helperNode1" ] ]
	    }, {
		id : "helperNode1",
		type : "helper",
		wires : []
	    } ], {
		"HomematicConfigNode1" : {
		    device : "mydevice",
		    serial : "123456789"
		}
	    }, function() {
		var homematicNode1 = helper.getNode("homematicNode1");
		var helperNode1 = helper.getNode("helperNode1");
		homematicNode1.should.have.property('name', 'homematicNode');
		helperNode1.on("input", function(msg) {
		    try {
			msg.topic.should.equal("_Interface.setValue");
			msg.payload.method.should.equal("Interface.setValue");
			msg.payload.params.interface.should.equal("BidCos-RF");
			//msg.payload.params.address.should.equal("123456789");
			msg.payload.params.valueKey.should.equal("ACTUAL_TEMPERATURE");
			msg.payload.params.type.should.equal("string");
			msg.payload.params.value.should.equal("22");
			done();
		    } catch (err) {
			done(err);
		    }
		});
		homematicNode1.receive({});
	    });
	});

	it('should receive value to create & send Interface.setValue object', function(done) {
	    var flow = [ {
		"id" : "homematicNode1",
		"type" : "homematic",
		"name" : "homematicNode",
		"_topic" : "_Interface.setValue",
		"_method" : "Interface.setValue",
		"_interface" : "BidCos-RF",
		"_valueKey" : "ACTUAL_TEMPERATURE",
		"_type" : "string",
		"wires" : [ [ "helperNode1" ] ]
	    }, {
		id : "helperNode1",
		type : "helper",
		wires : []
	    } ];
	    helper.load(homematicNode, flow, function() {
		var homematicNode1 = helper.getNode("homematicNode1");
		var helperNode1 = helper.getNode("helperNode1");
		homematicNode1.should.have.property('name', 'homematicNode');
		helperNode1.on("input", function(msg) {
		    try {
			msg.topic.should.equal("_Interface.setValue");
			msg.payload.method.should.equal("Interface.setValue");
			msg.payload.params.interface.should.equal("BidCos-RF");
			//msg.payload.params.address.should.equal("123456789");
			msg.payload.params.valueKey.should.equal("ACTUAL_TEMPERATURE");
			msg.payload.params.type.should.equal("string");
			msg.payload.params.value.should.equal("13");
			done();
		    } catch (err) {
			done(err);
		    }
		});
		homematicNode1.receive({
		    payload : {
			value : "13"
		    }
		});
	    });
	});

	it('should create & send Interface.init object', function(done) {
	    var flow = [ {
		"id" : "homematicNode1",
		"type" : "homematic",
		"name" : "homematicNode",
		"_topic" : "_Interface.init",
		"_method" : "Interface.init",
		"_interface" : "BidCos-RF",
		"_url" : "endpointIp",
		"_interfaceId" : "1234",
		"wires" : [ [ "helperNode1" ] ]
	    }, {
		id : "helperNode1",
		type : "helper",
		wires : []
	    } ];
	    helper.load(homematicNode, flow, function() {
		var homematicNode1 = helper.getNode("homematicNode1");
		var helperNode1 = helper.getNode("helperNode1");
		homematicNode1.should.have.property('name', 'homematicNode');
		helperNode1.on("input", function(msg) {
		    try {
			msg.topic.should.equal("_Interface.init");
			msg.payload.method.should.equal("Interface.init");
			msg.payload.params.interface.should.equal("BidCos-RF");
			msg.payload.params.url.should.equal("endpointIp");
			msg.payload.params.interfaceId.should.equal("1234");
			done();
		    } catch (err) {
			done(err);
		    }
		});
		homematicNode1.receive({});
	    });
	});

    });
});