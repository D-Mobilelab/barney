'use strict';

module.exports = function (grunt) {

	/*************************************
	****         REQUIREMENTS         ****
	*************************************/

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	/*************************************
	****         SINGLE TASKS         ****
	*************************************/

    var versionString = grunt.file.readJSON('bower.json').version;
    var version = versionString.split(".");
    var major = parseInt(version[0]), minor = parseInt(version[1]), patch = parseInt(version[2]);
    var versionMajor = (major+1) + ".0.0";
    var versionMinor = (major) + "." + (minor+1) + ".0";
    var versionPatch = (major) + "." + (minor) + "." + (patch+1);

	grunt.initConfig({
        // VARIABLES
        examplePath: 'examples/',
        modulesPath: 'modules/',
        testPath: 'test/',
        docPath: 'docs/',
        distPath: 'dist/',
        newVersion: versionString,
        changeLog: '',

        // CLEAN
        clean: {
            docTemp: ["<%= docPath %>temp"],
            docVersion: ["<%= docPath %><%= newVersion %>"],
            coverage: ["<%= testPath %>coverage"],
            dist: ["<%= distPath %>"]
        },

        // CONNECT
        connect:{
            coverage: {
                options:{
                    hostname: 'localhost',
                    port: 9010,
                    livereload: true
                }
            },
            docTemp: {
                options:{
                    hostname: 'localhost',
                    port: 9020,
                    livereload: true
                }
            },
            server: {
                options:{
                    hostname: 'localhost',
                    port: 9030,
                    livereload: true
                }
			}
        },

        // OPEN
        open:{
            coverage:{
                path: 'http://localhost:9010/<%= testPath %>coverage/'
            },
            docTemp:{
                path: 'http://localhost:9020/<%= docPath %>temp/'
            },
            server:{
                path: 'http://localhost:9030/<%= examplePath %>'
            }
        },

        // WATCH
        watch:{
            lint:{
                files:[
                    '<%= modulesPath %>**/*.*'
                ],
                tasks: ['eslint']
            },
            test:{
                files:[
                    '<%= modulesPath %>**/*.*',
                    '<%= testPath %>modules/*',
                    '<%= testPath %>karma.conf.js',
                    'mock.js'
                ],
                tasks: ['clean:dist', 'prepareModules', 'concat', 'karma']
            },
            coverage:{
                files:[
                    '<%= modulesPath %>**/*.*',
                    '<%= testPath %>modules/*',
                    '<%= testPath %>karma.conf.js',
                    'mock.js'
                ],
                tasks: ['clean:dist', 'prepareModules', 'concat', 'clean:coverage', 'karma'],
                options:{
                    livereload: 35729
                }
            },
            docTemp:{
                files:[
                    '<%= modulesPath %>**/*.*'
                ],
                tasks: ['clean:docTemp', 'ngdocs:api'],
                options:{
                    livereload: 35730
                }
            },
            server:{
                files:[
                    'mock.js',
                    '<%= examplePath %>**/*.*',
                    '<%= modulesPath %>**/*.*'
                ],
                tasks: ['clean:dist', 'prepareModules', 'concat'],
                options:{
                    livereload: 35731
                }
            }
        },

        // LINT
        eslint: {
            target: [
                'modules/**/*.js'
            ]
        },

        // KARMA
        karma: {
            unit: {
                configFile: '<%= testPath %>/karma.conf.js',
                singleRun: true
            }
        },

        // NG-DOCS
        ngdocs: {
            options: {
            	html5Mode: false,
                title: 'Barney',
            },
            api: {
                options: {
	                dest: '<%= docPath %>temp',
	                startPage: '/api/welcome'
		        },
		        src: ['<%= modulesPath %>/main.js', '<%= modulesPath %>/**/*.js'],
                title: 'API Reference',
                api: true
            },
            version: {
            	options: {
	                dest: '<%= docPath %><%= newVersion %>',
	                startPage: '/version/welcome'
		        },
		        src: ['<%= modulesPath %>/main.js', '<%= modulesPath %>/**/*.js'],
                title: 'API Reference',
                api: true
            }
        },

        // PROMPT
        prompt: {
            target: {
                options: {
                    questions: [{
                        config: 'newVersion',
                        type: 'list',
                        message: 'Current: ' + versionString + ' - Choose a new version for Barney:',
                        default: versionString,
                        choices: [
                            { name: 'No new version (press CTRL+C two times)', value: versionString },
                            { name: 'Major Version (' + versionMajor + ')', value: versionMajor },
                            { name: 'Minor Version (' + versionMinor + ')', value: versionMinor },
                            { name: 'Patch (' + versionPatch + ')', value: versionPatch }                            
                        ]
                    }, {
                        config: 'changeLog',
                        type: 'input',
                        message: 'Features for new version (use ";" to separate features):',
                        default: '',
                        when: function(answers) {
                            return answers['newVersion'] !== versionString;
                        },
                        filter: function(value){
                            // add new version string to changelog
                            value = "** <%= newVersion %> **; " + value; 
                            // remove last char if it's a semicolon
                            if(value.substr(value.length-1) === ';'){ value = value.substr(0, value.length-1)}
                            // replace all semicolons to "\n-"
                            value = value.replace(/;/g, "\n-");
                            // add double newlines and return changelog
                            return value + "\n\n";
                        }
                    }]
                }
            }
        },

        // STRING-REPLACE
        'string-replace': {
            bower: {
                files: {
                    'bower.json': 'bower.json'
                },
                options: {
                    replacements: [{
                        pattern: '"version": "' + versionString + '",',
                        replacement: '"version": "<%= newVersion %>",'
                    }]
                }
            }
        },

        // FILE-APPEND
        'file_append': {
            changelog: {
                files: [
                    {
                        prepend: "<%= changeLog %>",
                        input: 'CHANGELOG',
                        output: 'CHANGELOG'
                    }
                ]
            }
        },

        // COVERALLS
        coveralls: {
            options: {
                force: false
            },
            docs: {
              src: '<%= testPath %>coverage/**/lcov.info'
            },
        },
    });

    grunt.registerTask("prepareModules", "Finds and prepares modules for concatenation.", function() {
        // get the current concat object from initConfig
        var concat = grunt.config.get('concat') || {};

        // get all module directories
        grunt.file.expand("modules/*").forEach(function (dir) {

            // get the module name from the directory name
            var dirName = dir.substr(dir.lastIndexOf('/')+1);

            if(dirName != 'main.js'){
                
                // create a subtask for each module, find all src files
                // and combine into a single js file per module
                concat[dirName] = {
                    src: [
                        dir + '/*.van.js', 
                        dir + '/*.ser.js', 
                        dir + '/*.pro.js', 
                        dir + '/*.fil.js', 
                        dir + '/*.dir.js'
                    ],
                    dest: '<%= distPath %>' + dirName + '.min.js'
                };

            } else {
                concat['main'] = {
                    src: ['modules/main.js'],
                    dest: '<%= distPath %>main.min.js'
                }
            }

            // add module subtasks to the concat task in initConfig
            grunt.config.set('concat', concat);
        });
    });

    /*************************************
    ****         GRUNT TASKS          ****
    *************************************/

    grunt.registerTask('lint',[
        // LINT
        'eslint'
    ]);

    grunt.registerTask('lintx',[
        // LINT
        'eslint',
        // WATCH
        'watch:lint'
    ]);

    /**********************************/

    grunt.registerTask('test',[
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        // TEST
        'karma'
    ]);

    grunt.registerTask('testx',[
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        // TEST
        'karma',
        // WATCH
        'watch:test'
    ]);

    /**********************************/

    grunt.registerTask('coverage',[
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        // TEST + COVERAGE
        'clean:coverage',
        'karma'
    ]);

    grunt.registerTask('coveragex',[
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        // TEST + COVERAGE
        'clean:coverage',
        'karma',
        // CONNECT
        'connect:coverage',
        'open:coverage',
        // WATCH
        'watch:coverage'
    ]);

    /**********************************/

    grunt.registerTask('doc',[
        // DOC (TEMP)
        'clean:docTemp',
        'ngdocs:api'
    ]);

    grunt.registerTask('docx',[
        // DOC (TEMP)
        'clean:docTemp',
        'ngdocs:api',
        // CONNECT
        'connect:docTemp',
        'open:docTemp',
        // WATCH
        'watch:docTemp'
    ]);

    /**********************************/

    grunt.registerTask('serve',[
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        // CONNECT
        'connect:server',
        'open:server',
        'watch:server'
    ]);

    /**********************************/    

    grunt.registerTask('travis',[
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        // TEST + COVERAGE
        'clean:coverage',
        'karma',
        // COVERALLS
        'coveralls',
        // LINT
        'eslint',
        // DOC (TEMP)
        'clean:docTemp',
        'ngdocs:api'
    ]);

    grunt.registerTask('version',[
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        // TEST + COVERAGE
        'clean:coverage',
        'karma',
        // LINT
        'eslint',
        // PROMPT
        'prompt',
        'string-replace:bower',
        'file_append:changelog',
        // DOC (OFFICIAL)
        'clean:docVersion',
        'ngdocs:version'
    ]);
   
}
