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
        mockPath: 'mock/',
        modulesPath: 'modules/',
        testPath: 'test/',
        docPath: 'docs/',
        newVersion: versionString,
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
            doc: {
                options:{
                    hostname: 'localhost',
                    port: 9020,
                    livereload: true
                }
            }
        },
        open:{
            server:{
                path: 'http://localhost:9000/<%= mockPath %>'
            },
            coverage:{
                path: 'http://localhost:9010/<%= testPath %>coverage/'
            },
            doc:{
                path: 'http://localhost:9020/<%= docPath %>'
            }
        },
        watch:{
            server:{
                files:[
                    '<%= mockPath %>**/*.js',
                    '<%= mockPath %>**/*.html',
                    '<%= modulesPath %>**/*.js',
                    '<%= modulesPath %>**/*.html'
                ],
                options:{
                    livereload: 35729
                }
            },
            coverage:{
                files:[
                    '<%= mockPath %>**/*',
                    '<%= modulesPath %>**/*',
                    '<%= testPath %>modules/**/*'
                ],
                tasks: ['clean:coverage', 'karma'],
                options:{
                    livereload: 35730
                }
            },
            doc:{
                files:[
                    '<%= modulesPath %>/**/*.js',
                    'docindex.js'
                ],
                tasks: ['clean:doc', 'ngdocs'],
                options:{
                    livereload: 35731
                }
            }
        },
        eslint: {
            target: [
                'modules/**/*.js',
                '!modules/newtontrack_deprecated/*.js',
                '!modules/masonry/*.js'
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
                dest: '<%= docPath %>',
                html5Mode: false,
                title: 'Barney',
                startPage: '/api/welcome'
            },
            api: {
                src: ['docindex.js', '<%= modulesPath %>/**/*.js'],
                title: 'API Reference'
            }
        },
        clean: {
            doc: ["<%= docPath %>"],
            coverage: ["<%= testPath %>coverage"]
        },
        prompt: {
            target: {
                options: {
                    questions: [{
                        config: 'newVersion',
                        type: 'list',
                        message: 'Current: ' + versionString + ' - Choose a new version for Barney:',
                        default: versionMajor,
                        choices: [
                            { name: 'No new version', value: versionString },
                            { name: 'Major Version (' + versionMajor + ')', value: versionMajor },
                            { name: 'Minor Version (' + versionMinor + ')', value: versionMinor },
                            { name: 'Patch (' + versionPatch + ')', value: versionPatch }                            
                        ]
                    }]
                }
            }
        },
        'string-replace': {
            dist: {
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
        }
    });

	/*************************************
	****         GRUNT TASKS          ****
	*************************************/

    grunt.registerTask('serve',[
        'connect:server',
        'open:server',
        'watch:server'
    ]);

    grunt.registerTask('lint',[
        'eslint'
    ]);

    grunt.registerTask('test',[
        'karma'
    ]);

    grunt.registerTask('coverage',[
        'clean:coverage',
        'karma',
        'connect:coverage',
        'open:coverage',
        'watch:coverage'
    ]);

    grunt.registerTask('doc',[
        'clean:doc',
        'ngdocs',
        'connect:doc',
        'open:doc',
        'watch:doc'
    ]);

    grunt.registerTask('version',[
        // COVERAGE
        'clean:coverage',
        'karma',
        // DOC
        'clean:doc',
        'ngdocs',
        // LINT
        'eslint',
        // PROMPT
        'prompt',
        'string-replace'
    ]);
   
}
