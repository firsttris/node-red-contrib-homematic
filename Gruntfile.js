module.exports = function(grunt) {

    grunt.initConfig({
	pkg : grunt.file.readJSON('package.json'),
	simplemocha : {
	    options : {
		globals : [ 'expect' ],
		timeout : 3000,
		ignoreLeaks : false,
		ui : 'bdd',
		reporter : 'spec'
	    },
	    all : {
		src : [ 'test/*_spec.js' ]
	    },
	},
	jshint : {
	    options : {
		"asi" : true,
		"curly" : true,
		"eqnull" : true,
		"forin" : true,
		"immed" : true,
		"nonbsp" : true,
		"loopfunc" : true,
		"sub" : true
	    },
	    all : {
		src : [ 'homematic.js' ],
	    },
	},
	inlinelint : {
	    html : [ '*/*.html' ]
	}
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-lint-inline');

    grunt.registerTask('default', [ 'jshint:all', 'inlinelint:html', 'simplemocha:all' ]);

};