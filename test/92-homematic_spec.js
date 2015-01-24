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




    });
});