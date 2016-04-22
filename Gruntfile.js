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
        examplePath: 'examples/',
        modulesPath: 'modules/',
        testPath: 'test/',
        docPath: 'docs/',
        distPath: 'dist/',
        newVersion: versionString,
        changeLog: '',
        clean: {
            docTemp: ["<%= docPath %>temp"],
            docVersion: ["<%= docPath %><%= newVersion %>"],
            coverage: ["<%= testPath %>coverage"],
            dist: ["<%= distPath %>"]
        },
        connect:{
            server: {
                options:{
                    hostname: 'localhost',
                    port: 9000,
                    livereload: true
                }
			},
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
            docVersion: {
                options:{
                    hostname: 'localhost',
                    port: 9030,
                    livereload: true
                }
            }
        },
        open:{
            server:{
                path: 'http://localhost:9000/<%= examplePath %>'
            },
            coverage:{
                path: 'http://localhost:9010/<%= testPath %>coverage/'
            },
            docTemp:{
                path: 'http://localhost:9020/<%= docPath %>temp/'
            },
            docVersion:{
                path: 'http://localhost:9030/<%= docPath %><%= newVersion %>'
            }
        },
        watch:{
            server:{
                files:[
                    '<%= examplePath %>app.js',
                    'mock.js',
                    '<%= examplePath %>index.html',
                    '<%= examplePath %>pages/*.*',
                    '<%= modulesPath %>**/*.*'
                ],
                tasks: ['clean:dist', 'prepareModules', 'concat'],
                options:{
                    livereload: 35729
                }
            },
            coverage:{
                files:[
                    '<%= modulesPath %>main.js',
                    '<%= modulesPath %>**/*',
                    '<%= testPath %>modules/*',
                    '<%= testPath %>karma.conf.js',
                    'mock.js'
                ],
                tasks: ['clean:dist', 'prepareModules', 'concat', 'clean:coverage', 'karma'],
                options:{
                    livereload: 35730
                }
            },
            docTemp:{
                files:[
                    '<%= modulesPath %>/**/*.js',
                    '<%= modulesPath %>/main.js'
                ],
                tasks: ['clean:docTemp', 'ngdocs:api'],
                options:{
                    livereload: 35731
                }
            },
            docVersion:{
                files:[
                    '<%= modulesPath %>/**/*.js',
                    '<%= modulesPath %>/main.js'
                ],
                tasks: ['clean:docTemp', 'ngdocs:version'],
                options:{
                    livereload: 35732
                }
            }
        },
        eslint: {
            target: [
                'modules/**/*.js'
            ]
        },
        karma: {
            unit: {
                configFile: '<%= testPath %>/karma.conf.js',
                singleRun: true
            }
        },
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
        coveralls: {
            options: {
                force: false
            },
            docs: {
              src: '<%= testPath %>coverage/**/lcov.info'
            },
        },
    });

	/*************************************
	****         GRUNT TASKS          ****
	*************************************/

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

    grunt.registerTask('lint',[
        'eslint'
    ]);

    grunt.registerTask('test',[
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        // TEST
        'karma'
    ]);

    grunt.registerTask('travis',[
        // TEST + COVERAGE
        'clean:coverage',
        'karma',
        'coveralls',
        // LINT
        'eslint',
        // DOC (TEMP)
        'clean:docTemp',
        'ngdocs:api'
    ]);

    grunt.registerTask('coverage',[
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        // TEST
        'clean:coverage',
        'karma',
        'connect:coverage',
        'open:coverage',
        'watch:coverage'
    ]);

    grunt.registerTask('doc',[
        'clean:docTemp',
        'ngdocs:api',
        'connect:docTemp',
        'open:docTemp',
        'watch:docTemp'
    ]);

    grunt.registerTask('docx',[
        'clean:docVersion',
        'ngdocs:version',
        'connect:docVersion',
        'open:docVersion',
        'watch:docVersion'
    ]);

    grunt.registerTask('version',[
        // COVERAGE
        'clean:coverage',
        'karma',
        // LINT
        'eslint',
        // PROMPT
        'prompt',
        'string-replace:bower',
        'file_append:changelog',
        // DOC
        'clean:docVersion',
        'ngdocs:version',
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat'
    ]);
   
}
