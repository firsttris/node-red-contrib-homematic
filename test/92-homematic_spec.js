var should = require("should");

var homematicNode = require("../92-homematic.js");
var helper = require("./helper.js");

describe('ChangeNode', function() {

    beforeEach(function(done) {
        helper.startServer(done);
    });

    afterEach(function(done) {
        helper.unload();
        helper.stopServer(done);
    });

    describe('#homematic' , function() {

	
        it('should be loaded', function(done) {
            var flow = [{"id":"homematicNode1","type":"homematic","name":"homematicNode","wires":[[]]}];
            helper.load(homematicNode, flow, function() {
                var homematicNode1 = helper.getNode("homematicNode1");
                homematicNode1.should.have.property('name', 'homematicNode');
                done();
            });
        });
        
        
        it('creates Session.login object', function(done) {
            var flow = [{"id":"homematicNode1","type":"homematic","name":"homematicNode","_method":"Session.login","_username":"rudi","_password":"ratlos","wires":[["helperNode1"]]},
                        {id:"helperNode1", type:"helper", wires:[]}];
            helper.load(homematicNode, flow, function() {
                var homematicNode1 = helper.getNode("homematicNode1");
                var helperNode1 = helper.getNode("helperNode1");
                helperNode1.on("input", function(msg) {
                    try {
                        msg.payload.method.should.equal("Session.login");
                        msg.payload.params.username.should.equal("rudi");
                        msg.payload.params.password.should.equal("ratlos");
                        done();
                    } catch(err) {
                        done(err);
                    }
                });
                homematicNode1.receive({});
            });
        });




    });
});